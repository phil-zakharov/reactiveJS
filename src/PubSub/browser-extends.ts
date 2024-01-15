export class BrowserExtends extends EventTarget {
	sendMessage(message: string) {
		this.dispatchEvent(new CustomEvent('alarm', {
			detail: {
				message
			}
		}))
	}
}

const browserExtends = new BrowserExtends()

browserExtends.addEventListener('alarm', (e) => { console.log(e) })

browserExtends.sendMessage('hello')