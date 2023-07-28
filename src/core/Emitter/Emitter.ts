import { PrimitiveValue } from './types';

type SetValueArg = PrimitiveValue | ((arg: PrimitiveValue) => PrimitiveValue)

export class Emitter {
  #value;

  constructor(value: PrimitiveValue) {
    this.#value = value;
  }

  getValue() {
    return this.#value;
  }

  setValue(arg: SetValueArg) {
    if (typeof arg === 'function') {
      this.#value = arg(this.getValue())
    } else {
      this.#value = arg;
    }
  }
}
