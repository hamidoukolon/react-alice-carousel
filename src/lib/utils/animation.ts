import * as Utils from '.';
import { State } from '../types';

export function animate(element, options) {
	const { position = 0, animationDuration = 0 } = options || {};

	if (Utils.isElement(element)) {
		element.style['transition'] = `transform ${animationDuration}ms`;
		element.style['transform'] = `translate3d(${position}px, 0, 0)`;
	}
	return element;
}

export const getFadeoutPosition = (nextIndex, state: Partial<State>) => {
	const { sizesGrid } = state;
	const position = (sizesGrid && sizesGrid[nextIndex].position) || null;
	return position || null;
};

export const getFadeoutIndex = (currentIndex) => {
	return currentIndex === 0 ? 1 : currentIndex + 1;
};

export const getFadeoutAnimationPosition = (nextIndex, state: State) => {
	const { activeIndex, sizesGrid } = state;
	const { width = 0 } = sizesGrid[0] || {};

	if (nextIndex < activeIndex) {
		return (activeIndex - nextIndex) * -width || 0;
	} else {
		return (nextIndex - activeIndex) * width || 0;
	}
};
