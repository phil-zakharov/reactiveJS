import { Emitter } from './core/Emitter';
import { Handler } from './core/Handler';

function createEmitter(value: number) {
  const instance = new Emitter<number>(value);

  return instance;
}

function createHandler(...emitter: Emitter<number>[] | Handler<number>[]) {
  const instance = new Handler(emitter);

  return instance;
}

const a = createEmitter(1),
  b = createEmitter(2),
  c = createHandler(a, b),
  d = createHandler(c).map((aValue: any, bValue: any) => aValue + bValue + 5);

console.log('1 -> ', a.getValue());
console.log('2 -> ', b.getValue());
console.log('[1,2] -> ', c.getValue());
console.log('8 -> ', d.getValue());

a.setValue((val) => val as number + 10);

console.log('11 -> ', a.getValue());
console.log('2 -> ', b.getValue());
console.log('18 -> ', d.getValue());

c.map((a, b) => a + b)

console.log('13 -> ', c.getValue())