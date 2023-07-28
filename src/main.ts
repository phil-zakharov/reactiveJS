import { Emitter, PrimitiveValue } from './core/Emitter';
import { EmitterValue, Handler } from './core/Handler';

function createEmitter(value: PrimitiveValue) {
  const instance = new Emitter(value);

  return instance;
}

function createHandler(emitter: EmitterValue) {
  const instance = new Handler(emitter);

  return instance;
}

const e = createEmitter(10);
const a = createHandler(e);
const b = createHandler(a);
// const d = createHandler(a , b)

console.log('e = 10', e.getValue());
console.log('a = 10', a.getValue());
console.log('b = 10', b.getValue());
e.setValue(15);
console.log('e = 15', e.getValue());
console.log('b = 15', b.getValue());
console.log('a = 15', a.getValue());
e.setValue((prev) => (prev as number) * 2);
console.log('e = 30', e.getValue());
console.log('a = 30', a.getValue());
console.log('b = 30', b.getValue());
b.map((v) => (v as number) * 3);
console.log('e = 30', e.getValue());
console.log('a = 30', a.getValue());
console.log('b = 90', b.getValue());
b.map((v) => (v as number) + 3.3);
console.log('e = 30', e.getValue());
console.log('a = 30', a.getValue());
console.log('b = 93.3', b.getValue());
a.map((v) => (v as number) + 5.5);
console.log('e = 30', e.getValue());
console.log('a = 35.5', a.getValue());
console.log('b = 109.8', b.getValue());
