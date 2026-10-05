import { createElement } from './utils/DOM.js';

export class Modal {
	constructor() {
		this.overlayEl = null;
		this.isOpen = false;
		this.handleKeydown = event => {
			if (event.key === 'Escape') {
				this.close();
			}
		};
	}

	open(contentEl) {
		this.overlayEl = createElement('div', { classArr: ['overlay'] });

		const modalEl = createElement('div', {
			classArr: ['modal'],
			attrs: { role: 'dialog', 'aria-modal': 'true' },
			children: [contentEl],
		});

		this.overlayEl.append(modalEl);

		this.overlayEl.addEventListener('click', event => {
			if (event.target === this.overlayEl) {
				this.close();
			}
		});

		document.body.append(this.overlayEl);
		document.body.classList.add('is-modal-open');
		document.addEventListener('keydown', this.handleKeydown);

		this.isOpen = true;
	}

	close() {
		if (!this.isOpen) return;

		this.isOpen = false;
		document.removeEventListener('keydown', this.handleKeydown);
		document.body.classList.remove('is-modal-open');
		this.overlayEl.remove();
		this.overlayEl = null;
	}
}