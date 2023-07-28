import { Emitter, PrimitiveValue } from '../Emitter';
import { Handler } from './Handler';

export type EmitterValue = Emitter | Emitter[] | Handler | Handler[];
export type MapCb = (...arg: PrimitiveValue[]) => PrimitiveValue | PrimitiveValue[]