export type Props = {
	activeIndex?: number;
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
	fadeoutAnimation?: boolean;
	stopAutoPlayOnHover?: boolean;
	preservePosition?: boolean;
	responsive?: Responsive;
	onInitialized?: (e: EventObject) => void;
	onSlideChange?: (e: EventObject) => void;
	onSlideChanged?: (e: EventObject) => void;
	animationDuration?: number;
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
	sizesGrid: GirdCell[];
	initialStageHeight: number;
	animationDuration?: number;
	transition: string;
	isAutoPlayCanceledOnAction: boolean;
	fadeoutAnimationIndex: number | null;
	fadeoutAnimationPosition: number | null;
	fadeoutAnimationProcessing: boolean;
};

export type Style = {
	transition: string;
	transform?: string;
};

export type Transition = {
	animationDuration?: number;
	transitionTimingFunction?: string;
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

export type GirdCell = {
	width: number;
	position: number;
};
