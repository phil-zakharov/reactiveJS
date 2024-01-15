type Data = Record<string, string>
type Callback = (key: string, value: string) => Promise<void>

export class AsyncData {
  data: Data
  subscribers: Callback[]

  constructor(initialData: Data) {
    this.data = initialData
    this.subscribers = []
  }

  subscribe(cb: Callback) {
    if (typeof cb !== 'function') {
      throw new Error('argument must be a function')
    }

    this.subscribers.push(cb)
  }

  async set(key: string, value: string) {
    this.data[key] = value

    const updates = this.subscribers.map(async (cb) => {
      await cb(key, value)
    })

    await Promise.allSettled(updates)
  }
}

const data = new AsyncData({ pizza: 'Pepperoni' })

data.subscribe(async (key, value) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 500)
  })
  console.log(`set ${key} and ${value} and 500 ms timeout`)
})

data.subscribe(async (key, value) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
  console.log(`set ${key} and ${value} and 1000 ms timeout`)
})

async function updateData() {
  await data.set('pizze', 'supreme')
  console.log('All data updates')
}

void updateData()
