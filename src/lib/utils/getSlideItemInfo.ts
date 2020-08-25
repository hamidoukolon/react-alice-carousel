import { State } from '../types';

export const getSlideItemInfo = (state: State) => {
	const { itemsInSlide, activeIndex, infinite, itemsCount, isStageContentPartial } = state || {};
	const isPrevSlideDisabled = (infinite === false && activeIndex === 0) || isStageContentPartial;
	const isNextSlideDisabled =
		(infinite === false && itemsCount - itemsInSlide === activeIndex) || isStageContentPartial;

	return { isPrevSlideDisabled, isNextSlideDisabled };
};
