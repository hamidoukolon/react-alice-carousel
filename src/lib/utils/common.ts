import * as Utils from '.';
import { Props, State } from '../types';
import { getItemsCount } from '.';

export const preserveProps = (prevProps: Props, nextProps: Props) => {
	const { preservePosition } = prevProps || {};
	const { activeIndex } = nextProps || {};
	return preservePosition ? { ...prevProps, activeIndex } : nextProps;
};

export const getItemsInSlide = (itemsCount: number, props: Props) => {
	let itemsInSlide = 1;
	const { responsive, autoWidth = false, infinite = false } = props;

	if (autoWidth && infinite) {
		itemsInSlide = itemsCount;
	} else if (responsive) {
		const configKeys = Object.keys(responsive);

		if (configKeys.length) {
			configKeys.forEach((key) => {
				if (Number(key) < window.innerWidth) {
					itemsInSlide = Math.min(responsive[key].items, itemsCount) || itemsInSlide;
				}
			});
		}
	}
	return itemsInSlide;
};

export const calculateInitialProps = (props: Props, el): State => {
	const { infinite, autoPlay, autoWidth = false } = props;
	const transition = Utils.getTransitionProperty();
	const itemsCount = getItemsCount(props);
	const itemsOffset = Utils.getItemsOffset(props);
	const itemsInSlide = getItemsInSlide(itemsCount, props);
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
