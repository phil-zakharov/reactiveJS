import { Emitter, PrimitiveValue } from './core/Emitter';
import { EmitterValue, Handler } from './core/Handler';

function createEmitter(value: PrimitiveValue) {
  const instance = new Emitter(value);

  return instance;
}

function createHandler(...emitter: Emitter[] | Handler[]) {
  const instance = new Handler(emitter);

  return instance;
}

const a = createEmitter(1),
  b = createEmitter(2),
  c = createHandler(a, b),
  d = createHandler(c).map((aValue: any, bValue: any) => aValue + bValue + 5);

console.log('1 -> ', a.getValue()); // 1
console.log('2 -> ', b.getValue()); // 2
console.log('Exception -> ', c.getValue()); // Exception
console.log('8 -> ', d.getValue()); // 8

a.setValue((val) => val as number + 10);

console.log('11 -> ', a.getValue()); // 11
console.log('2 -> ', b.getValue()); // 2
console.log('18 -> ', d.getValue()); // 18