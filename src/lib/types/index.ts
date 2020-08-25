export type Props = {
	activeIndex?: number;
	animationType?: 'slide' | 'fadeout' | string;
	animationDuration?: number;
	animationEasingFunction?: string;
	items?: any[];
	children?: any[];
	infinite?: boolean;
	showSlideInfo?: boolean;
	dotsDisabled?: boolean;
	buttonsDisabled?: boolean;
	playButtonEnabled?: boolean;
	autoPlayInterval?: number;
	autoPlayDirection?: string | 'ltr' | 'rtl';
	controlsStrategy?: string | 'default' | 'responsive';
	paddingLeft?: number;
	paddingRight?: number;
	autoWidth?: boolean;
	autoHeight?: boolean;
	autoPlay?: boolean;
	stopAutoPlayOnHover?: boolean;
	preservePosition?: boolean;
	responsive?: Responsive | null;
	onInitialized?: (e: EventObject) => void;
	onSlideChange?: (e: EventObject) => void;
	onSlideChanged?: (e: EventObject) => void;
	swipeDelta?: number;
	swipeExtraPadding?: number;
	mouseTrackingEnabled?: boolean;
	touchTrackingEnabled?: boolean;
	preventAutoPlayOnAction?: boolean;
	preventEventOnTouchMove?: boolean;
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
