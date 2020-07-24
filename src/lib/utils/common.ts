import * as Utils from '.';
import { Props, State, Responsive } from '../types';
import { getItemsCount } from '.';

export const preserveProps = (prevProps: Props, nextProps: Props) => {
	const { preservePosition } = prevProps || {};
	const { startIndex } = nextProps || {};
	return preservePosition ? { ...prevProps, startIndex } : nextProps;
};

export const getItemsInSlide = (
	responsiveConfig?: Responsive,
	childrenLength = 0,
	autoWidth = false,
	infinite = false,
) => {
	let itemsInSlide = 1;

	if (autoWidth && infinite) {
		itemsInSlide = childrenLength;
	} else if (responsiveConfig) {
		const configKeys = Object.keys(responsiveConfig);

		if (configKeys.length) {
			configKeys.forEach((key) => {
				if (Number(key) < window.innerWidth) {
					itemsInSlide = Math.min(responsiveConfig[key].items, childrenLength) || itemsInSlide;
				}
			});
		}
	}
	return itemsInSlide;
};

export const calculateInitialProps = (props: Props, el): State => {
	const { startIndex, responsive, infinite, autoPlay, autoWidth = false } = props;
	const transition = Utils.getTransitionProperty();
	const itemsCount = getItemsCount(props);
	const itemsOffset = Utils.getItemsOffset(props);
	const itemsInSlide = getItemsInSlide(responsive, itemsCount, autoWidth, infinite);
	const activeIndex = Utils.getStartIndex(startIndex, itemsCount);
	const { width: stageWidth } = Utils.getElementDimensions(el);

	const clones = Utils.createClones(props);
	const sizesAutoGrid = Utils.createAutoWidthGrid(el);
	const sizesFixedGrid = Utils.createFixedWidthGrid(clones, stageWidth, itemsInSlide);
	const sizesGrid = autoWidth ? sizesAutoGrid : sizesFixedGrid;

	const translate3d = Utils.getTranslate3dProperty(activeIndex, { itemsInSlide, itemsOffset, sizesGrid });

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
		transitionDuration: props.transitionDuration,
		transition,
	};
};
