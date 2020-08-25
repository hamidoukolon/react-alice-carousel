import { State, TransformationSetItem } from '../types';

export const getStartIndex = (index, childrenLength) => {
	return Math.min(index, childrenLength - 1) || 0;
};

export const getUpdateSlidePositionIndex = (activeIndex, itemsCount) => {
	if (activeIndex < 0) return itemsCount - 1;
	if (activeIndex >= itemsCount) return 0;

	return activeIndex;
};

export const shouldRecalculateSlideIndex = (activeIndex, itemsCount) => {
	return activeIndex < 0 || activeIndex >= itemsCount;
};

export const shouldCancelSlideAnimation = (activeIndex, itemsCount, itemsInSlide) => {
	return activeIndex < 0 || activeIndex > itemsCount - itemsInSlide;
};

export const getMinSwipeLimit = (state: State) => {
	const { itemsOffset, transformationSet } = state;
	const { position } = transformationSet[itemsOffset];

	return position;
};

export const getMaxSwipeLimit = (state: State) => {
	const { itemsCount, itemsOffset, itemsInSlide, transformationSet } = state;
	const { position } = transformationSet[itemsCount + itemsOffset + itemsInSlide];

	return position;
};

export const shouldRecalculateSwipePosition = (currentPosition, minPosition, maxPosition) => {
	return currentPosition >= -minPosition || Math.abs(currentPosition) >= maxPosition;
};

export const getIsLeftDirection = (deltaX = 0) => deltaX < 0;

export const getTransformationSetItem = (
	cursor = 0,
	transformationSet: TransformationSetItem[] = [],
) => {
	const [item] = transformationSet.slice(cursor);
	return item || { position: 0, width: 0 };
};

export const getStageContentWidth = (
	cursor = 0,
	transformationSet: TransformationSetItem[] = [],
) => {
	const { position, width } = getTransformationSetItem(cursor, transformationSet);
	return position + width;
};

export const getSwipeShiftValue = (cursor = 0, transformationSet: TransformationSetItem[] = []) => {
	const { position } = getTransformationSetItem(cursor, transformationSet);
	return position;
};

export const getSwipeTransformationCursor = (
	deltaX = 0,
	position = 0,
	transformationSet: TransformationSetItem[] = [],
) => {
	const cursor = transformationSet.findIndex((item) => item.position >= Math.abs(position));
	return getIsLeftDirection(deltaX) ? cursor : cursor - 1;
};

export const getSwipeTransformation = (state: State, deltaX = 0, swipePosition = 0) => {
	const {
		infinite,
		autoWidth,
		isStageContentPartial,
		swipeAllowedPositionMax,
		transformationSet,
	} = state;
	const cursor = getSwipeTransformationCursor(deltaX, swipePosition, transformationSet);
	const { position } = getTransformationSetItem(cursor, transformationSet);

	if (!infinite) {
		console.debug({ cursor, swipePosition, position, swipeAllowedPositionMax, deltaX });
		if (position > swipeAllowedPositionMax) {
			return -swipeAllowedPositionMax;
		}
	}

	if (autoWidth && isStageContentPartial) {
		return 0;
	}

	return -position;
};
