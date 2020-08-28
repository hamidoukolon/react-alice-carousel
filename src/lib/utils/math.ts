import { State, Props, TransformationSetItem } from '../types';

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

export const getSwipeLimitMin = (state: Partial<State>, props: Partial<Props>) => {
	const { itemsOffset = 0, transformationSet = [] } = state;
	const { infinite, swipeExtraPadding = 0 } = props;

	if (infinite) {
		const { position } = transformationSet[itemsOffset];
		return position;
	}

	const { width } = transformationSet[0];
	return Math.min(swipeExtraPadding, width);
};

export const getSwipeLimitMax = (state: Partial<State>, props: Partial<Props>) => {
	const { infinite, swipeExtraPadding = 0 } = props;
	const { itemsCount = 1, itemsOffset = 0, itemsInSlide = 1, transformationSet = [] } = state;

	if (infinite) {
		const cursor = itemsCount + itemsOffset + itemsInSlide;
		const { position } = transformationSet[cursor];
		return position;
	}

	const { position } = getTransformationSetItem(-itemsInSlide, transformationSet);
	return position + swipeExtraPadding;
};

export const shouldRecalculateSwipePosition = (currentPosition, minPosition, maxPosition) => {
	return currentPosition >= -minPosition || Math.abs(currentPosition) >= maxPosition;
};

export const getIsLeftDirection = (deltaX = 0) => deltaX < 0;

export const getTransformationSetItem = (cursor = 0, transformationSet: TransformationSetItem[] = []) => {
	const [item] = transformationSet.slice(cursor);
	return item || { position: 0, width: 0 };
};

export const getSwipeShiftValue = (cursor = 0, transformationSet: TransformationSetItem[] = []) => {
	const { position } = getTransformationSetItem(cursor, transformationSet);
	return position;
};

export const getTransformationItemIndex = (transformationSet: TransformationSetItem[] = [], position = 0) => {
	return transformationSet.findIndex((item) => item.position >= Math.abs(position));
};

export const getSwipeTransformationCursor = (
	transformationSet: TransformationSetItem[] = [],
	position = 0,
	deltaX = 0,
) => {
	const cursor = getTransformationItemIndex(transformationSet, position);
	return getIsLeftDirection(deltaX) ? cursor : cursor - 1;
};

export const getSwipeTouchendPosition = (state: State, deltaX = 0, swipePosition = 0) => {
	const { infinite, autoWidth, isStageContentPartial, swipeAllowedPositionMax, transformationSet } = state;
	const cursor = getSwipeTransformationCursor(transformationSet, swipePosition, deltaX);
	const { position } = getTransformationSetItem(cursor, transformationSet);

	if (!infinite) {
		if (autoWidth && isStageContentPartial) {
			return 0;
		}

		if (position > swipeAllowedPositionMax) {
			return -swipeAllowedPositionMax;
		}
	}

	return -position;
};

export const getSwipeTouchendIndex = (state: State, position = 0) => {
	const { transformationSet, itemsInSlide, itemsOffset, itemsCount, infinite } = state;
	const index = getTransformationItemIndex(transformationSet, position);

	if (infinite) {
		const shift = itemsInSlide + itemsOffset;

		if (index < shift) {
			return itemsCount - itemsInSlide - itemsOffset + index;
		} else if (index >= shift + itemsCount) {
			return index - (shift + itemsCount);
		} else {
			return index - shift;
		}
	}

	return index;
};
