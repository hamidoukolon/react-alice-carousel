import { State } from '../types';

export const getSlideItemInfo = (state: State) => {
	const { itemsInSlide, activeIndex, infinite, itemsCount } = state || {};
	const isPrevSlideDisabled = infinite === false && activeIndex === 0;
	const isNextSlideDisabled = infinite === false && itemsCount - itemsInSlide === activeIndex;

	return { isPrevSlideDisabled, isNextSlideDisabled };
};
