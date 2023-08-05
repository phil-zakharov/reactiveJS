import AsyncEmitter from '../AsyncEmitter';
import AsyncHandler from './AsyncHandler';

export type PrimitiveValue = string | number;
export type EmitterValue<T extends PrimitiveValue> =
  | AsyncEmitter<T>
  | AsyncEmitter<T>[]
  | AsyncHandler<T>
  | AsyncHandler<T>[];
export type MapCb<T> = (...arg: CanPromise<T>[]) => CanPromise<T | T[]>;
