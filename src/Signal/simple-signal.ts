interface Observer {
  execute: () => void
}

const context: Observer[] = []

export function createSignal<T>(value: T): [() => T, (v: T) => void] {
  const subscription = new Set<Observer>()

  const read = () => {
    const observer: Observer | undefined = context[context.length - 1]

    if (context.length) {
      subscription.add(observer)
    }

    return value
  }

  const write = (newValue: T) => {
    value = newValue

    for (const observer of subscription) {
      observer.execute()
    }
  }

  return [read, write]
}

export function createEffect(fn: () => void) {
  const effect: Observer = {
    execute() {
      context.push(effect)
      fn()
      context.pop()
    }
  }

  effect.execute()
}

const [count, setCount] = createSignal(0)

createEffect(() => {
  console.log(count())
})

setCount(10)
