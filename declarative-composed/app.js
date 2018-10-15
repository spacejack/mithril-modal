const App = function() {
	let showModal = false

	return {
		view: () => m('.app',
			m('h1', 'Modal Demo'),
			m('p', 'Click below to open a modal'),
			m('p',
				m('button',
					{
						type: 'button',
						onclick() {showModal = true}
					},
					'Open Modal'
				),
				// Even though this modal is nested within our App vdom,
				// it will appear on top of everything else, appended
				// to the end of document body.
				showModal && m(Modal, {
					title: 'Hello Modal!',
					content: 'Click below to close this modal.',
					buttons: [{id: 'close', text: 'Close'}],
					onClose(id) {showModal = false}
				})
			)
		)
	}
}

m.mount(document.body, App)
