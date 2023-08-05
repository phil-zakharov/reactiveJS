import AsyncEmitter from './core/AsyncEmitter/AsyncEmitter';
import { Emitter } from './core/Emitter';
import { Handler } from './core/Handler';

const sleep55 = new Promise<number>((resolve) =>
  setTimeout(() => resolve(55), 1000),
);

const sleep33 = new Promise<number>((resolve) =>
  setTimeout(() => resolve(33), 1000),
);

const sleepCB = (val: unknown) => {
  return new Promise<number>((resolve) =>
    setTimeout(() => {
      console.log('🚀 ~ file: main.ts:15 ~ setTimeout ~ arg:', val);
      resolve(66);
    }, 1000),
  );
};

const sleepCB2 = (val: unknown) => {
  return new Promise<number>((resolve) =>
    setTimeout(() => {
      console.log('🚀 ~ file: main.ts:15 ~ setTimeout ~ arg:', val);
      resolve(77);
    }, 1000),
  );
};

function createAsyncEmitter<T>(value: T | Promise<T>) {
  return new AsyncEmitter<T>(value);
}

const ae = createAsyncEmitter<number>(10);
const aep = createAsyncEmitter<number>(sleep55);

async function main() {
  console.log('start');
  // aep.getValue().then((val) => console.log('then', val));
  // aep.setValue(44).getValue().then((val) => console.log('then', val));
  aep
    .setValue(sleep33)
    .setValue(sleepCB)
    .setValue(sleepCB2)
    .getValue()
    .then((val) => console.log('then', val));
  console.log('end');
}

main();

// function createEmitter(value: number) {
//   const instance = new Emitter<number>(value);

//   return instance;
// }

// function createHandler(...emitter: Emitter<number>[] | Handler<number>[]) {
//   const instance = new Handler(emitter);

//   return instance;
// }

// const a = createEmitter(1),
//   b = createEmitter(2),
//   c = createHandler(a, b),
//   d = createHandler(c).map((aValue: any, bValue: any) => aValue + bValue + 5);

// console.log('1 -> ', a.getValue());
// console.log('2 -> ', b.getValue());
// console.log('[1,2] -> ', c.getValue());
// console.log('8 -> ', d.getValue());

// a.setValue((val) => val as number + 10);

// console.log('11 -> ', a.getValue());
// console.log('2 -> ', b.getValue());
// console.log('18 -> ', d.getValue());

// c.map((a, b) => a + b)

// console.log('13 -> ', c.getValue())
