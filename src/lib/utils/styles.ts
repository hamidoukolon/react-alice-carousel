import * as Utils from '.';
import { Props, State, Style, Transition } from '../types';

export const getRenderWrapperStyles = (props: Props, state: State, element) => {
	const { paddingLeft, paddingRight, autoHeight, animationDuration } = props || {};
	// TODO
	const height = autoHeight && element && Utils.getGalleryItemHeight(/*element, props, state*/);
	const transition = height ? `height ${animationDuration}ms` : undefined;

	return {
		height,
		transition,
		paddingLeft: `${paddingLeft}px`,
		paddingRight: `${paddingRight}px`,
	};
};

export const getTransitionProperty = (options?: Transition): string => {
	const { animationDuration = 0, transitionTimingFunction = '' } = options || {};
	return `transform ${animationDuration}ms ${transitionTimingFunction}`;
};

export const getRenderStageStyles = (nextStyles, currentStyles: Style): Style => {
	const { translate3d = 0 } = nextStyles || {};
	const transform = `translate3d(${-translate3d}px, 0, 0)`;

	return { ...currentStyles, transform };
};

export const getStageItemStyles = (i: number, state: State) => {
	const { sizesGrid, fadeoutPosition, fadeoutIndex, animationDuration } = state;
	const { width } = sizesGrid[i] || {};

	if (fadeoutPosition && fadeoutIndex === 9000) {
		return {
			transform: `translateX(${fadeoutPosition}px)`,
			animationDuration: `${animationDuration}ms`,
			width: `${width}px`,
		};
	}

	return { width };
};

export const getTranslate3dProperty = (nextIndex, state: Partial<State>) => {
	const { itemsOffset = 0, itemsInSlide = 0, sizesGrid = [] } = state;
	const cursor = nextIndex + itemsOffset + itemsInSlide;
	const { position } = sizesGrid[cursor] || {};

	return position;
};

// TODO
// export const getTranslatePosition = (nextIndex, state: Partial<State>) => {
// 	const { itemsOffset = 0, itemsInSlide = 0, sizesGrid = [] } = state;
// 	const cursor = nextIndex + itemsOffset + itemsInSlide;
// 	const { position } = sizesGrid[cursor] || {};
//
// 	return position;
// };
//
// export const getTranslatePositionAutoWidth = (nextIndex, state: Partial<State>) => {
// 	const { infinite, itemsOffset = 0, itemsInSlide = 0, sizesGrid = [], stageWidth = 0, itemsCount = 0 } = state;
// 	const cursor = nextIndex + itemsOffset + itemsInSlide;
// 	const { position } = sizesGrid[cursor] || {};
//
// 	if (infinite) {
// 		return position;
// 	}
//
// 	const limit = getAutoWidthTranslatePositionLimit(sizesGrid, cursor);
//
// 	if (stageWidth < limit) {
// 		const { position } = sizesGrid[itemsCount + itemsOffset + itemsInSlide] || {};
// 		return Math.ceil(position) - stageWidth;
// 	}
//
// 	return position;
// };
//
// export const getAutoWidthTranslatePositionLimit = (sizesGrid, cursor) => {
// 	return sizesGrid.reduce((acc, { position }, index) => {
// 		if (index <= cursor) {
// 			acc += position;
// 		}
// 		return acc;
// 	}, 0);
// };
