
type Target = Record<string | symbol, string>

const target: Target = {
	_name: 'Joe'
}

Object.defineProperty(target, 'name', {
	get(this: Target) {
		console.log('get property from target')
		return this._name
	},
	set(this: Target, newValue: string) {
		console.log('set value to target')
		this._name = newValue
	},
})

console.log(target.name)
target.name = 'Bar'

export {}