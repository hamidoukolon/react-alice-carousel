export const getSlideInfo = (activeIndex = 0, slidesLength = 0) => {
	let slideIndex = activeIndex + 1;

	if (slideIndex < 1) {
		slideIndex = slidesLength;
	} else if (slideIndex > slidesLength) {
		slideIndex = 1;
	}

	return { slideIndex, slidesLength };
};
