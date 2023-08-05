import { PrimitiveValue } from './types';

type SetValueArg<T> = T | ((arg: T) => T)

export class Emitter<T extends PrimitiveValue> {
  private value;

  constructor(value: T) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  setValue(arg: SetValueArg<T>) {
    if (typeof arg === 'function') {
      this.value = arg(this.getValue())
    } else {
      this.value = arg;
    }
  }
}
