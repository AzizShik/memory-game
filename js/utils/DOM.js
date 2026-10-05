export function createElement(tag, obj = {}) {
	const element = document.createElement(tag);

	const { classArr = [], id, text, parent, children = [], attrs } = obj;

	if (classArr.length) {
		element.className = classArr.join(' ');
	}

	if (id) {
		element.id = id;
	}

	if (text) {
		element.textContent = text;
	}

	if (parent) {
		parent.append(element);
	}

	if (children.length) {
		element.append(...children);
	}

	if (attrs) {
		Object.entries(attrs).forEach(([attr, value]) => {
			element.setAttribute(attr, value);
		});
	}

	return element;
}

export function createButton(obj) {
	const { classArr = [], text } = obj;

	const button = createElement('button', {
		classArr: classArr,
		text,
		attrs: { type: 'button' },
	});

	return button;
}
