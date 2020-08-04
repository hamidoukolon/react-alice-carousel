import { State } from '../types';

export const getStageItemClassName = (i = 0, state: State) => {
	const { fadeoutAnimationIndex } = state;
	const isActive = isActiveItem(i, state) ? ' __active' : '';
	const isCloned = isClonedItem(i, state) ? ' __cloned' : '';
	const isAnimated = i === fadeoutAnimationIndex || 0 ? ' animated animated-out fadeOut' : '';

	return 'alice-carousel__stage-item' + isActive + isCloned + isAnimated;
};

export const isActiveItem = (i = 0, state: State) => {
	const { activeIndex, itemsInSlide, itemsOffset, infinite, autoWidth } = state;

	if (infinite && autoWidth) {
		return i - itemsInSlide === activeIndex + itemsOffset;
	}

	const index = activeIndex + itemsInSlide + itemsOffset;

	// if (!infinite) {
	// 	return i >= index && i < index;
	// }

	return i >= index && i < index + itemsInSlide;
};

export const isClonedItem = (i = 0, state: State) => {
	const { itemsInSlide, itemsOffset, itemsCount, infinite } = state;

	// if (!infinite) {
	// 	return false;
	// }

	const index = itemsInSlide + itemsOffset;

	return i < index || i > itemsCount + index - 1;
};
