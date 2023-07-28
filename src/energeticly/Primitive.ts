import { Subscriber } from '../core/Subsciber/Subscriber';

export class Primitive<T> extends Subscriber<T> {
  private value;

  constructor(value: T) {
    super();
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  updateValue(cb: (v: T) => T) {
    this.value = cb(this.value);
    this.runSubs(this.value);
  }
}
