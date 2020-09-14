export const defaultProps = {
	activeIndex: 0, // 1 u
	animationDuration: 400, // 1 u
	animationEasingFunction: 'ease', // 1 u
	animationType: 'slide', // 1 u
	autoHeight: false, // 1 u
	autoWidth: false, // 1 ---
	autoPlay: false, // 1 u
	autoPlayDirection: 'ltr', // u
	autoPlayInterval: 400, // 1 u
	cancelAutoPlayOnAction: false, // 1 u
	cancelAutoPlayOnHover: false, // 1 u
	children: undefined, // 1 ---
	controlsStrategy: 'default', // 1 u
	disableButtonsControls: false, // 1
	disableDotsControls: false, // 1 u
	disablePlayButtonControls: true, // 1 u
	disableSlideInfo: true, // 1 u
	infinite: false, // 1 ---
	items: undefined, // 1 ---
	mouseTracking: false, // 1 u
	paddingLeft: 0, // 1 ---
	paddingRight: 0, // 1 ---
	responsive: undefined, // 1 ---
	swipeDelta: 20, // u
	swipeExtraPadding: 200, // 1 ---
	touchTracking: true, // 1 u
	touchMoveDefaultEvents: true, // 1 u
	onInitialized: () => undefined, // 1 u
	onResized: () => undefined, // 1 u
	onResizeEvent: undefined, // 1 u
	onSlideChange: () => undefined, // 1 u
	onSlideChanged: () => undefined, // 1 u
};
