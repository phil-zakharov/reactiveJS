import { Container } from './energeticly/Container';
import { Primitive } from './energeticly/Primitive';

function fromValue(v: number) {
  return new Primitive<number>(v);
}

function from(...r: (Primitive<number> | Container<number>)[]) {
  return new Container<number>(reduce, ...r);
}

function reduce(nums: number[]): number {
  return nums.reduce((acc, v) => acc + v, 0);
}

const a = fromValue(1),
  b = fromValue(2),
  c = from(a, b),
  d = from(c).map((aValue: any, bValue: any) => aValue + bValue + 5);

console.log(a);
console.log(b);
console.log(c);
console.log(d);

console.log('1 -> ', a.getValue()); // 1
console.log('2 -> ', b.getValue()); // 2
console.log('Exception -> ', c.getValue()); // Exception
console.log('8 -> ', d.getValue()); // 8

a.updateValue((val) => val + 10);

console.log('11 -> ', a.getValue()); // 11
console.log('2 -> ', b.getValue()); // 2
console.log('18 -> ', d.getValue()); // 18
