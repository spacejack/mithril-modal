/**
This Modal component uses the Overlay component to provide a
full screen cover and renders a dialog-like widget within that
waits for the user to click a button. A Modal instance can
be nested anywhere within your app's view and will be rendered
on top of everything else.

Expected attrs are as follows:

interface Attrs {
	title: m.Children
	content: m.Children
	buttons: {id: string, text: string}[]
	onClose(id: string): void
}

At least one button should be provided otherwise there
will be no way to close the modal.
*/

const Modal = function(v) {
	let clickedId

	return {
		view({attrs: {title, content, buttons, onClose}}) {
			if (clickedId != null) {
				// We need to allow the Overlay component execute its exit
				// animation. Because it is a child of this component it,
				// will not fire when this component is removed.
				// Instead, we need to remove it first before this component
				// goes away.
				// When a button is clicked we omit the Overlay component
				// from this Modal component's subsequent view renders,
				// which will trigger Overlay's onbeforeremove hook.
				return null
			}
			return m(Overlay,
				{
					onremove() {
						// Wait for the overlay's removal animation to complete.
						// Then we fire our parent's callback, which will
						// presumably remove this Modal component.
						Promise.resolve().then(() => {
							onClose(clickedId)
							m.redraw()
						})
					}
				},
				m('.modal',
					m('h3', title),
					m('.modal-content', content),
					m('.modal-buttons',
						buttons.map(b =>
							m('button',
								{
									type: 'button',
									disabled: clickedId != null,
									onclick() {
										clickedId = b.id
									}
								},
								b.text
							)
						)
					)
				)
			)
		}
	}
}
