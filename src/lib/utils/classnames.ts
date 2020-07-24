import { State } from '../types';

export const getStageItemClassName = (i = 0, state: State) => {
	const { infinite } = state;
	const isActive = isActiveItem(i, state) ? ' __active' : '';
	const isCloned = isClonedItem(i, state) ? ' __cloned' : '';
	const isHidden = !infinite && isCloned ? ' __hidden' : '';

	return 'alice-carousel__stage-item' + isActive + isCloned + isHidden;
};

export const isActiveItem = (i = 0, state: State) => {
	const { activeIndex, itemsInSlide, itemsOffset } = state;

	const index = activeIndex + itemsInSlide + itemsOffset;
	return i >= index && i < index + itemsInSlide;
};

export const isClonedItem = (i = 0, state: State) => {
	const { itemsInSlide, itemsOffset, itemsCount } = state;
	const index = itemsInSlide + itemsOffset;

	return i < index || i > itemsCount + index - 1;
};
