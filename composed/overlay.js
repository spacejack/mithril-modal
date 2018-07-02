/**
This Overlay component provides a full-screen cover element.
It is mounted to a separate V/DOM tree appended to the body.
Children supplied to Overlay are rendered into this tree.
The Overlay component can be nested anywhere within your app's
view but will be rendered to display overtop everything else.
*/

const Overlay = function() {
	let dom
	let children

	const OverlayContainer = {
		view: () => children
	}

	return {
		oncreate(v) {
			children = v.children
			// Append a container to the end of body
			dom = document.createElement('div')
			dom.className = 'overlay'
			document.body.appendChild(dom)
			m.mount(dom, OverlayContainer)
		},
		onbeforeupdate(v) {
			children = v.children
		},
		onbeforeremove(v) {
			// Add a class with fade-out exit animation
			dom.classList.add('hide')
			return new Promise(r => {
				dom.addEventListener('animationend', r)
			})
		},
		onremove() {
			m.mount(dom, null)
			// Destroy the overlay dom tree. Using m.mount with
			// null triggers any modal children removal hooks.
			document.body.removeChild(dom)
		},
		view() {}
	}
}
