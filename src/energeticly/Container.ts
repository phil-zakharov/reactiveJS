import { Subscriber } from '../core/Subscriber';
import { Primitive } from './Primitive';

type Source<T> = Primitive<T> | Container<T>;
type Reduce<T> = (values: T[]) => T

export class Container<T> extends Subscriber<T> {
  private sources: Source<T>[] = [];
  private values: T[] = [];

  constructor(public reduce: Reduce<T>, ...sources: Source<T>[]) {
    super();
    sources.forEach((src, index) => {
      this.sources.push(src);
      this.values.push(src.getValue());
      src.subscribe((...v) => this.onUpdateChild(index, ...v));
    });
  }

  onUpdateChild(index: number, ...values: T[]) {
    this.values[index] = this.reduce(values);
    this.runSubs(...this.values)
  }

  map(fn: Function) {
    console.log('🚀 ~ file: Container.ts:27 ~ Container<T> ~ map ~ this.values:', this.values);
    this.values = fn(this.values)
    console.log('🚀 ~ file: Container.ts:27 ~ Container<T> ~ map ~ this.values:', this.values);
    return this
  }

  getValue(): T {
    if (this.sources.length !== this.values.length) {
      return -1 as T
    }
    return this.reduce(this.values)
  }
}
