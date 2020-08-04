import * as Utils from '.';
import { Props, State, Responsive } from '../types';
import { getItemsCount } from '.';

export const preserveProps = (prevProps: Props, nextProps: Props) => {
	const { preservePosition } = prevProps || {};
	const { activeIndex } = nextProps || {};
	return preservePosition ? { ...prevProps, activeIndex } : nextProps;
};

export const getItemsInSlide = (
	responsiveConfig?: Responsive,
	itemsCount = 0,
	autoWidth = false,
	infinite = false,
) => {
	let itemsInSlide = 1;

	if (autoWidth && infinite) {
		itemsInSlide = itemsCount;
	} else if (responsiveConfig) {
		const configKeys = Object.keys(responsiveConfig);

		if (configKeys.length) {
			configKeys.forEach((key) => {
				if (Number(key) < window.innerWidth) {
					itemsInSlide = Math.min(responsiveConfig[key].items, itemsCount) || itemsInSlide;
				}
			});
		}
	}
	return itemsInSlide;
};

export const calculateInitialProps = (props: Props, el): State => {
	const { responsive, infinite, autoPlay, autoWidth = false, paddingLeft, paddingRight } = props;
	const transition = Utils.getTransitionProperty();
	const itemsCount = getItemsCount(props);
	const itemsOffset = Utils.getItemsOffset(props);
	const itemsInSlide = getItemsInSlide(responsive, itemsCount, autoWidth, infinite);
	const activeIndex = Utils.getStartIndex(props.activeIndex, itemsCount);
	const { width: stageWidth } = Utils.getElementDimensions(el);

	const clones = Utils.createClones(props);
	const sizesAutoGrid = Utils.createAutoWidthGrid(el);
	const sizesFixedGrid = Utils.createFixedWidthGrid(clones, stageWidth, itemsInSlide);
	const sizesGrid = autoWidth ? sizesAutoGrid : sizesFixedGrid;

	const translate3d = Utils.getTranslate3dProperty(activeIndex, {
		itemsInSlide,
		itemsOffset,
		sizesGrid,
		autoWidth,
		infinite,
	});

	return {
		autoWidth,
		activeIndex,
		itemsCount,
		itemsOffset,
		itemsInSlide,
		clones,
		infinite,
		translate3d,
		sizesGrid,
		stageWidth,
		initialStageHeight: 0,
		isAutoPlaying: Boolean(autoPlay),
		isAutoPlayCanceledOnAction: false,
		animationDuration: props.animationDuration,
		transition,
		fadeoutAnimationIndex: null,
		fadeoutAnimationPosition: null,
		fadeoutAnimationProcessing: false,
	};
};
