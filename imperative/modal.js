/**
@typedef {{
	title: string
	content?: any
	buttons?: {id: string; text: string}[]
	redraw?: boolean
	onclick?(id: string): void
}} Options
*/

/** @type {Options} */
let options = {title: 'Modal'}
let isOpen = false

/**
 * @param {Options} opts
 */
export function openModal (opts) {
	// Deep copy the supplied opts
	isOpen = true
	options = {...opts}
	options.buttons = opts.buttons ? opts.buttons.map(b => ({...b})) : []
	// Redraw by default unless caller suppressed
	if (options.redraw == null || options.redraw === true) {
		m.redraw()
	}
}

/** Calls redraw by default unless called with `false` */
export function closeModal (redraw = true) {
	isOpen = false
	// Redraw by default unless caller suppressed
	if (redraw) {
		m.redraw()
	}
}

export function modalIsOpen() {
	return isOpen
}

/** Modal component */
const Modal = {
	onbeforeremove ({dom}) {
		// Trigger hide animation, wait for it to finish
		dom.classList.add('hide')
		return new Promise(r => {
			dom.addEventListener('animationend', r)
		})
	},

	view() {
		return m('.modal',
			m('.modal-box',
				m('h3',
					options.title
				),
				options.content && m('.modal-content',
					options.content
				),
				m('.modal-buttons',
					options.buttons.map(b =>
						m('button',
							{
								type: 'button',
								disabled: !isOpen,
								onclick() {
									isOpen = false
									options.onclick && options.onclick(b.id)
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

export default Modal
