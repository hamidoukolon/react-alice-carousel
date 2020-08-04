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

export const getFadeoutAnimationIndex = (state: State) => {
	const { infinite, activeIndex, itemsInSlide } = state;
	return infinite ? activeIndex + itemsInSlide : activeIndex;
};

export const getFadeoutAnimationPosition = (nextIndex, state: State) => {
	const { activeIndex, stageWidth } = state;

	if (nextIndex < activeIndex) {
		return (activeIndex - nextIndex) * -stageWidth || 0;
	} else {
		return (nextIndex - activeIndex) * stageWidth || 0;
	}
};
