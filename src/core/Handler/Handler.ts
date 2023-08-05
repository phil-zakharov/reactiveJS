import { PrimitiveValue } from '../Emitter/types';
import { EmitterValue, MapCb } from './types';

export class Handler<T extends PrimitiveValue> {
  private emitter: EmitterValue<T>;
  private mapCbs: MapCb<T>[] = [];

  constructor(emitter: EmitterValue<T>) {
    this.emitter = emitter;
  }

  getValue(): T | T[] {
    let result = this.#unwrapValue();

    if (this.mapCbs.length > 0) {
      const init = Array.isArray(result) ? result : [result];

      result = this.mapCbs.reduce((acc: T | T[], cb: MapCb<T>) => {
        if (Array.isArray(acc)) {
          return cb(...acc);
        }
        return cb(acc);
      }, init);
    }

    return result;
  }

  map(fn: MapCb<T>) {
    this.mapCbs.push(fn);
    return this;
  }

  #unwrapValue(): T | T[] {
    if (Array.isArray(this.emitter)) {
      return this.emitter.flatMap((e) => e.getValue());
    } else {
      return this.emitter.getValue();
    }
  }
}
