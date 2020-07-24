export const getDotsNavigationLength = (slidesLength = 0, itemsInSlide = 1) => {
	if (Number(itemsInSlide) !== 0) {
		return Math.ceil(slidesLength / itemsInSlide) || 0;
	}
	return 0;
};
