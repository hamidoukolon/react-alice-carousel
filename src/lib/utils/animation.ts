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

export const getFadeoutAnimationIndex = (currentIndex) => {
	return currentIndex + 1;
};

export const getFadeoutAnimationPosition = (nextIndex, state: State) => {
	const { activeIndex, stageWidth } = state;

	if (nextIndex < activeIndex) {
		return (activeIndex - nextIndex) * -stageWidth || 0;
	} else {
		return (nextIndex - activeIndex) * stageWidth || 0;
	}
};
