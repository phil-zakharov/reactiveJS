export const browserApiEvent = new CustomEvent('alarm', {
	detail: {
		name: 'Joe'
	}
})

window.addEventListener('alarm', (e) => { console.log(e) })

window.dispatchEvent(browserApiEvent)