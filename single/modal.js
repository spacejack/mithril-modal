const Modal = function() {
	let dom
	let children

	const ModalContainer = {
		view: () => children
	}

	return {
		oncreate(v) {
			children = v.children
			// Append a modal container to the end of body
			dom = document.createElement('div')
			// The modal class has a fade-in animation
			dom.className = 'modal'
			document.body.appendChild(dom)
			m.mount(dom, ModalContainer)
		},
		onbeforeupdate(v) {
			children = v.children
		},
		onbeforeremove() {
			// Add a class with fade-out exit animation
			dom.classList.add('hide')
			return new Promise(r => {
				dom.addEventListener('animationend', r)
			})
		},
		onremove() {
			m.mount(dom, null)
			// Destroy the modal dom tree. Using m.mount with
			// null triggers any modal children removal hooks.
			document.body.removeChild(dom)
		},
		view() {}
	}
}
