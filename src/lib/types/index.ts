export type Props = {
	activeIndex?: number;
	animationType?: 'slide' | 'fadeout' | string; //
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
	disableAutoPlayOnAction?: boolean;
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
	initialStageHeight: number;
	animationDuration?: number;
	transition: string;
	isAutoPlayCanceledOnAction: boolean;
	fadeoutAnimationIndex: number | null;
	fadeoutAnimationPosition: number | null;
	fadeoutAnimationProcessing: boolean;
	transformationSet: TransformationItem[];
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

export type TransformationItem = {
	width: number;
	position: number;
};
