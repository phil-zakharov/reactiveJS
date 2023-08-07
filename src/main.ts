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

