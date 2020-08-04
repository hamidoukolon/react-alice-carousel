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
		return i - itemsInSlide + itemsOffset === activeIndex + itemsOffset;
	}

	const index = activeIndex + itemsInSlide + itemsOffset;

	// TODO !infinite
	if (!infinite) {
		return i >= activeIndex && i < index;
	}

	return i >= index && i < index + itemsInSlide;
};

export const isClonedItem = (i = 0, state: State) => {
	const { itemsInSlide, itemsOffset, itemsCount, infinite, autoWidth } = state;

	if (!infinite) {
		return false;
	}

	if (infinite && autoWidth) {
		return i < itemsInSlide || i > itemsCount - 1 + itemsInSlide;
	}

	const index = itemsInSlide + itemsOffset;

	return i < index || i > itemsCount - 1 + index;
};
