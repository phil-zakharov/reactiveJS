/**
 * A global array to store all atom instances.
 */
const globalAtoms: Atom<unknown>[] = [];

/**
 * Type definition for a subscription callback.
 */
type Sub<T> = (value: T) => void;

/**
 * Type definition for an effect callback.
 */
type Effect<T> = (value: T) => void;

/**
 * Type definition for an Atom.
 */
type Atom<T> = {
    /**
   * Gets the current value of the atom.
   */
  get(): T
    /**
   * Sets a new value for the atom. If the value is a promise, it waits for the promise to resolve.
   */
  set(value: T): Promise<void>
    /**
   * Subscribes a callback to be called whenever the atom's value changes.
   */
  subscribe(cb: Sub<T>): () => void
    /**
   * Resets the atom's value to its initial value.
   */
  reset(): void;
   /**
   * Creates a derived atom based on the current atom's value.
   */
  derive<K>(cd: (v: T) => K): Atom<K>
    /**
   * Adds an effect callback to be called whenever the atom's value changes.
   */
  effect(cb: Effect<T>): () => void;
};

/**
 * Creates a new atom with the given initial value.
 * @param arg - The initial value of the atom.
 * @returns The created atom.
 */
function atom<T>(arg: T): Atom<T> {
  const initValue = structuredClone(arg);
  let value = initValue;

  const subs = new Set<Sub<T>>();
  const effects = new Set<Effect<T>>();

  const instance: Atom<T> = {
    get() {
      return value;
    },
    async set(arg) {
      if (arg instanceof Promise) {
        setPromise(arg)
      } else if (typeof arg === 'function') {
        const cbResult = arg(structuredClone(value));

        if (cbResult instanceof Promise) {
          setPromise(cbResult)
        } else {
          setValue(cbResult)
        }
      } else {
        setValue(arg);
      }
    },
    subscribe(cb) {
      subs.add(cb);

      return () => subs.delete(cb);
    },
    reset() {
      value = initValue;
      notifySubs(value);
    },
    derive(cb) {
      const siblingAtom = atom(cb(value))
      subs.add((newValue) => {
        siblingAtom.set(cb(newValue))
      })
      return siblingAtom;
    },
    effect(cb: Effect<T>) {
      cb(value)
      effects.add(cb)

      return () => effects.delete(cb)
    }
  };

  globalAtoms.push(instance);

  return instance;

  function notifySubs(value: T) {
    subs.forEach((sub) => sub(value));
    effects.forEach((effect) => effect(value));
  }

  function setValue(v: T) {
    value = structuredClone(v);
    notifySubs(value);
  }

  async function setPromise(v: Promise<T>): Promise<void> {
    try {
      const newValue = await v;
      setValue(newValue)
    } catch (error) {
      console.error(error);
    }
  }
}

/**
 * Gets all atom instances.
 * @returns An array of all atom instances.
 */
atom.all = () => {
  return globalAtoms
}

/**
 * Clears all atom instances.
 * @returns An empty array.
 */
atom.clear = () => {
  globalAtoms.splice(0, globalAtoms.length)
  return globalAtoms;
}
