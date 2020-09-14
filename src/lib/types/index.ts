export type Props = {
	activeIndex?: number;
	animationType?: 'slide' | 'fadeout' | string;
	animationDuration?: number;
	animationEasingFunction?: string;
	items?: any[];
	children?: any;
	infinite?: boolean;
	disableSlideInfo?: boolean;
	disableDotsControls?: boolean;
	disableButtonsControls?: boolean;
	disablePlayButtonControls?: boolean;
	autoPlayInterval?: number;
	autoPlayDirection?: string | Direction;
	controlsStrategy?: string | ControlsStrategy;
	paddingLeft?: number;
	paddingRight?: number;
	autoWidth?: boolean;
	autoHeight?: boolean;
	autoPlay?: boolean;
	cancelAutoPlayOnHover?: boolean;
	preservePosition?: boolean;
	responsive?: Responsive;
	onResizeEvent?: (e: Event, prevProps: ElementDimensions, nextProps: ElementDimensions) => boolean;
	onResized?: (e: EventObject) => void;
	onInitialized?: (e: EventObject) => void;
	onSlideChange?: (e: EventObject) => void;
	onSlideChanged?: (e: EventObject) => void;
	swipeDelta?: number;
	swipeExtraPadding?: number;
	mouseTracking?: boolean;
	touchTracking?: boolean;
	cancelAutoPlayOnAction?: boolean;
	touchMoveDefaultEvents?: boolean;
};

export type State = {
	clones: any[];
	autoWidth: boolean;
	itemsCount: number;
	itemsInSlide: number;
	activeIndex: number;
	infinite?: boolean;
	isAutoPlaying: boolean;
	translate3d: number;
	itemsOffset: number;
	stageWidth: number;
	stageContentWidth: number;
	initialStageHeight: number;
	animationDuration?: number;
	transition: string;
	isAutoPlayCanceledOnAction: boolean;
	isStageContentPartial: boolean;
	fadeoutAnimationIndex: number | null;
	fadeoutAnimationPosition: number | null;
	fadeoutAnimationProcessing: boolean;
	transformationSet: TransformationSetItem[];
	swipeLimitMin: number;
	swipeLimitMax: number;
	swipeAllowedPositionMax: number;
	swipeShiftValue: number;
};

export type Style = {
	transition: string;
	transform?: string;
};

export type Transition = {
	animationDuration?: number;
	animationEasingFunction?: string;
};

export type Responsive = {
	[key: string]: {
		items: number;
	};
};

export type EventObject = {
	item: number;
	slide: number;
	itemsInSlide: number;
	isPrevSlideDisabled: boolean;
	isNextSlideDisabled: boolean;
};

export type RootComponent = {
	width?: number;
	height?: number;
};

export type TransformationSetItem = {
	width: number;
	position: number;
};

export type SlideTo = {
	activeIndex: number;
	fadeoutAnimationIndex?: number | null;
	fadeoutAnimationPosition?: number | null;
};

export enum ControlsStrategy {
	DEFAULT = 'default',
	RESPONSIVE = 'responsive',
}

export enum Direction {
	RTL = 'rtl',
	LTR = 'ltr',
}

export type ElementDimensions = {
	width?: number;
};
