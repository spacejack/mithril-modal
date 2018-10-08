import Modal, {openModal, modalIsOpen} from './modal.js'

const App = {
	view: () => [
		m('.app',
			m('h1', 'Modal Demo'),
			m('p', 'Click below to open a modal'),
			m('p',
				m('button',
					{
						type: 'button',
						onclick() {
							// Open a modal with this content...
							openModal({
								title: 'Hello Modal!',
								content: 'This is an imperative modal example.',
								buttons: [
									{id: 'ok', text: 'Ok'},
									{id: 'cancel', text: 'Cancel'}
								],
								onclick(id) {
									// The modal closes automatically when a button is clicked
									console.log('Clicked modal button id: ' + id)
								}
							})
						}
					},
					'Open Modal'
				),
			)
		),
		// We want to put this modal at the top level of the DOM, after
		// all other root-level nodes so it renders over everything else.
		// The `openModal` function can be used anywhere in the app, but
		// the modal will always be drawn here when open.
		modalIsOpen() && m(Modal)
	]
}

m.mount(document.body, App)
