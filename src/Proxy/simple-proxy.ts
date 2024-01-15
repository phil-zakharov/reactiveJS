const proxyHandler: ProxyHandler<typeof target> = {
	get(target, property) {
		console.log('get property from target')
		return target[property]
	},
	set(target, property, newValue) {
		console.log('set property to target')
		return Reflect.set(target, property, newValue)
	}
}

type Target = Record<string | symbol, string>

const target: Target = {
	name: 'Joe'
}

const proxy = new Proxy(target, proxyHandler)

console.log(proxy.name)
proxy.name = 'Bar'

export {}