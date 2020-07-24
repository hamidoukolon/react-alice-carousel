export const getStartIndex = (index, childrenLength) => {
	return Math.min(index, childrenLength - 1) || 0;
};

export const getNextSlideIndex = (activeIndex, itemsCount) => {
	if (activeIndex < 0) return itemsCount - 1;
	if (activeIndex >= itemsCount) return 0;

	return activeIndex;
};

export const shouldRecalculateSlideIndex = (activeIndex, itemsCount) => {
	return activeIndex < 0 || activeIndex >= itemsCount;
};

export const shouldCancelSlide = (activeIndex, itemsCount, itemsInSlide) => {
	return activeIndex < 0 || activeIndex > itemsCount - itemsInSlide;
};
