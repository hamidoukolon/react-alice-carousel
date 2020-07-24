import * as Utils from '.';

export function animate(element, options) {
	const { position = 0, transitionDuration = 0 } = options || {};

	if (Utils.isElement(element)) {
		element.style['transition'] = `transform ${transitionDuration}ms`;
		element.style['transform'] = `translate3d(${position}px, 0, 0)`;
	}
	return element;
}
