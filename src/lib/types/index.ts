export type Props = {
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
	duration?: number;
	stopAutoPlayOnHover?: boolean;
	preservePosition?: boolean;
	startIndex?: number;
	responsive?: Responsive;
	onInitialized: (e: EventObject) => void;
	onSlideChange: (e: EventObject) => void;
	transitionDuration?: number;
};

export type State = {
	clones: any[];
	itemsCount: number;
	itemsInSlide: number;
	activeIndex: number;
	infinite?: boolean;
	isAutoPlaying: boolean;
	translate3d: number;
	itemsOffset: number;
	stageWidth?: number;
	sizesGrid: GirdCell[];
	initialStageHeight: number;
	transitionDuration?: number;
	transition: string;
	isAutoPlayCanceledOnAction: boolean;
};

export type Style = {
	transition: string;
	transform?: string;
};

export type Transition = {
	transitionDuration?: number;
	transitionTimingFunction?: string;
};

export type Responsive = {
	[key: number]: {
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

export type SlideOptions = {
	shouldSkipRecalculation?: boolean;
	duration?: number;
};
