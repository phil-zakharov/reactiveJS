export class Subject<T> {
	private observers = new Set<Observer<T>>()

	addObserver(observer: Observer<T>) {
		this.observers.add(observer)
	}

	removeObserver(observer: Observer<T>) {
		this.observers.delete(observer)
	}

	notify(data: T) {
		this.observers.forEach((ob) => { ob.update(data) })
	}
}

export class Observer<T> {
	update(data: T) {
		console.log(data)
	}
}


const subject = new Subject()
const observer = new Observer()

subject.addObserver(observer)

subject.notify('hello, it`s me')