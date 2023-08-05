import { EmitterValue, MapCb, PrimitiveValue } from './types'

class AsyncHandler<T extends PrimitiveValue> {
  private emitter: EmitterValue<T>
  private mapCbs: MapCb<T>[] = [];

  constructor (emitter: EmitterValue<T>) {
    this.emitter = emitter
  }

}

export default AsyncHandler