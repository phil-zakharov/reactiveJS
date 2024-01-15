import { Emitter, PrimitiveValue } from '../Emitter'
import { Handler } from './Handler'

export type EmitterValue<T extends PrimitiveValue> = Emitter<T> | Emitter<T>[] | Handler<T> | Handler<T>[];
export type MapCb<T> = (...arg: T[]) => T | T[]