export const getDotsNavigationLength = (itemsCount = 0, itemsInSlide = 1, autoWidth) => {
	if (autoWidth) {
		return itemsCount;
	}
	if (Number(itemsInSlide) !== 0) {
		return Math.ceil(itemsCount / itemsInSlide) || 0;
	}
	return 0;
};
