interface Observer {
  next(val: number): void
  error(err: string): void
  complete(): void
}

type Producer = (ob: Observer) => (() => void) | undefined

class Observable {
  producer: Producer
  constructor(producer: Producer) {
    this.producer = producer
  }

  subscribe(observer: Observer | null) {
    if (typeof observer !== 'object' || observer === null) {
      throw new Error(
        'Observer must be an object with next, error, and complete methods'
      )
    }

    if (typeof observer.next !== 'function') {
      throw new Error('Observer must have a next method')
    }

    if (typeof observer.error !== 'function') {
      throw new Error('Observer must have an error method')
    }

    if (typeof observer.complete !== 'function') {
      throw new Error('Observer must have a complete method')
    }

    const unsubscribe = this.producer(observer)

    return {
      unsubscribe: () => {
        if (unsubscribe && typeof unsubscribe === 'function') {
          unsubscribe()
        }
      }
    }
  }
}

const observable = new Observable((ob) => {
  ob.next(1)
  ob.next(2)
  ob.next(3)
  ob.complete()

  return () => {
    console.log('observer unsubscribe')
  }
})

const observer: Observer = {
  next(val) {
    console.log(`recieved value ${val}`)
  },
  error(err) {
    console.log(`Error: ${err}`)
  },
  complete() {
    console.log('Completed')
  }
}

const subscription = observable.subscribe(observer)

subscription.unsubscribe()
