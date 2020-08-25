import * as Utils from '.';
import { Props, State, Style, Transition } from '../types';

export const getRenderWrapperStyles = (props: Props, state: State, element) => {
	const { paddingLeft, paddingRight, autoHeight, animationDuration } = props || {};
	const height = autoHeight ? Utils.getAutoheightProperty(element, props, state) : undefined;
	const transition = height ? `height ${animationDuration}ms` : undefined;

	return {
		height,
		transition,
		paddingLeft: `${paddingLeft}px`,
		paddingRight: `${paddingRight}px`,
	};
};

export const getTransitionProperty = (options?: Transition): string => {
	const { animationDuration = 0, animationEasingFunction = '' } = options || {};
	return `transform ${animationDuration}ms ${animationEasingFunction}`;
};

export const getRenderStageStyles = (nextStyles, currentStyles: Style): Style => {
	const { translate3d = 0 } = nextStyles || {};
	const transform = `translate3d(${-translate3d}px, 0, 0)`;

	return { ...currentStyles, transform };
};

export const getRenderStageItemStyles = (i: number, state: State) => {
	const {
		transformationSet,
		fadeoutAnimationIndex,
		fadeoutAnimationPosition,
		fadeoutAnimationProcessing,
		animationDuration,
	} = state;
	const { width } = transformationSet[i] || {};

	if (fadeoutAnimationProcessing && fadeoutAnimationIndex === i) {
		return {
			transform: `translateX(${fadeoutAnimationPosition}px)`,
			animationDuration: `${animationDuration}ms`,
			width: `${width}px`,
		};
	}

	return { width };
};

export const getTranslate3dProperty = (nextIndex, state: Partial<State>) => {
	const { autoWidth, infinite, itemsOffset = 0, itemsInSlide = 0, transformationSet = [] } = state;
	let cursor = nextIndex + itemsOffset + itemsInSlide;

	// TODO !infinite
	if (!infinite) {
		cursor = nextIndex;
	}

	if (autoWidth && infinite) {
		cursor = nextIndex + itemsInSlide + itemsOffset;
	}

	const { position } = transformationSet[cursor] || {};

	return position;
};
