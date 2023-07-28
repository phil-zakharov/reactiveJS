import { Subscriber } from './core/Subsciber/Subscriber';

type Value = number;

class PrimitiveValue extends Subscriber {
  private value;

  constructor(value: Value) {
    super();
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  updateValue(cb: (s: Value) => Value) {
    this.value = cb(this.value);
    this.runSubs(this.value);
  }
}

class ContainerValue extends Subscriber {
  private sources: (PrimitiveValue | ContainerValue)[] = [];
  private values: Value[] = [];
  private cb: Function | null = null;

  constructor(...items: (PrimitiveValue | ContainerValue)[]) {
    super();
    items.forEach((item, index) => {
      this.values.push(item.getValue());
      this.sources.push(item);
      item.subscribe((...v) => this.onUpdateChild(index, ...v as number[]));
    });
  }

  map(cb: (...s: Value[]) => Value) {
    this.cb = cb;
    return this;
  }

  onUpdateChild(index: number, ...values: Value[]) {
    if (values.length === 1) {
      this.values[index] = values[0];
    } else if (this.values.length === 1) {
      this.values[index] = values.reduce((acc, v) => acc + v, 0);
    }
    this.runSubs(...this.values);
  }

  getValue(): Value {
    if (!this.cb) return -1;
    if (this.values.length !== this.cb.length) {
      const s = this.sources[0]
      if (s instanceof ContainerValue) {
        return s.map((...v) => this.cb!(...v)).getValue()
      }
    }
    return this.cb(...this.values);
  }
}

function fromValue(v: Value) {
  return new PrimitiveValue(v);
}

function from(...r: (PrimitiveValue | ContainerValue)[]) {
  return new ContainerValue(...r);
}


const a = fromValue(1),
  b = fromValue(2),
  c = from(a, b),
  d = from(c).map((aValue: any, bValue: any) => aValue + bValue + 5);

console.log('1 -> ', a.getValue()); // 1
console.log('2 -> ', b.getValue()); // 2
console.log('Exception -> ', c.getValue()); // Exception
console.log('8 -> ', d.getValue()); // 8

a.updateValue((val) => val + 10);

console.log('11 -> ', a.getValue()); // 11
console.log('2 -> ', b.getValue()); // 2
console.log('18 -> ', d.getValue()); // 18
