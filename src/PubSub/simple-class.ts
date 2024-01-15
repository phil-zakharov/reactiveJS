export class PubSub {
	private events = new Map<string, ((data: unknown) => void)[]>()

	subscribe(event: string, callback: (data: unknown) => void) {
		if (!this.events.has(event)) {
			this.events.set(event, [])
		}

		this.events.get(event)?.push(callback)
	}

	publish(event: string, data: unknown) {
		if (this.events.has(event)) {
			this.events.get(event)?.forEach((cb) => { cb(data) })
		}
	}
}

const pubSubInst = new PubSub()

pubSubInst.subscribe('alarm', (data) => {
	console.log('data: ', data)
})

pubSubInst.publish('alarm', 'ha ha')