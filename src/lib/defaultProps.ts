export const defaultProps = {
	activeIndex: 0, // 1
	animationDuration: 400, // 1 u
	animationEasingFunction: 'ease', // 1 u
	animationType: 'slide', // 1 u
	autoHeight: false, // 1
	autoWidth: false, // 1
	autoPlay: false, // 1
	autoPlayDirection: 'ltr', // u
	autoPlayInterval: 400, // 1 u
	cancelAutoPlayOnAction: true, // 1 u
	cancelAutoPlayOnHover: true, // 1 u
	cancelDefaultTouchmoveEventOnSwiping: false, // 1
	children: undefined, // 1
	controlsStrategy: 'default', // 1 u
	disableButtonsControls: false, // 1
	disableDotsControls: false, // 1 u
	disablePlayButtonControls: true, // 1 u
	disableSlideInfo: true, // 1 u
	infinite: false, // 1
	items: [], // 1
	disableMouseTracking: false,
	disableTouchTracking: false,
	paddingLeft: 0, // 1
	paddingRight: 0, // 1
	preservePosition: false, // TODO
	responsive: null, // 1
	swipeDelta: 20, // u
	swipeExtraPadding: 200, // u?
	handleResizeEvent: () => undefined, // TODO
	onResized: () => undefined, // TODO
	onInitialized: () => undefined, // 1
	onSlideChange: () => undefined, // 1
	onSlideChanged: () => undefined, // 1
};
