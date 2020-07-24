export const getDotsNavigationLength = (slidesLength = 0, itemsInSlide = 1, infinite, autoWidth) => {
	if (infinite && autoWidth) {
		return itemsInSlide;
	}
	if (Number(itemsInSlide) !== 0) {
		return Math.ceil(slidesLength / itemsInSlide) || 0;
	}
	return 0;
};
