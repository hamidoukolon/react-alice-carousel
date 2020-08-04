import * as Utils from '.';
import { GirdCell, Props, State } from '../types';

export const getSlides = (props: Props) => {
	const { children = [], items = [] } = props;
	return children && children.length ? children : items;
};

export const getItemsCount = (props: Props) => {
	return getSlides(props).length;
};

export const getItemsOffset = (props: Props) => {
	const { infinite, paddingRight, paddingLeft } = props;
	// TODO !infinite
	if (infinite && (paddingLeft || paddingRight)) {
		return 1;
	}
	return 0;
};

export const createClones = (props: Props) => {
	const slides = getSlides(props);

	// TODO !infinite
	if (!props.infinite) {
		return slides;
	}

	const itemsCount = getItemsCount(props);
	const itemsOffset = getItemsOffset(props);
	const itemsInSlide = Utils.getItemsInSlide(itemsCount, props);
	const cursor = Math.min(itemsInSlide, itemsCount) + itemsOffset;
	const clonesAfter = slides.slice(0, cursor);
	const clonesBefore = slides.slice(-cursor);

	return clonesBefore.concat(slides, clonesAfter);
};

export const isElement = (element) => {
	try {
		return element instanceof Element || element instanceof HTMLDocument;
	} catch (e) {
		return false;
	}
};

export const createAutoWidthGrid = (el) => {
	if (isElement(el)) {
		const children: HTMLElement[] = Array.from(el.children || []);

		return children.reduce<GirdCell[]>((acc, child, i) => {
			let position = 0;
			const previewsChildCursor = i - 1;
			const previewsChild = acc[previewsChildCursor];
			const { width = 0 } = getElementDimensions(child?.firstChild);

			if (previewsChild) {
				position =
					previewsChildCursor === 0
						? previewsChild.width
						: previewsChild.width + previewsChild.position;
			}

			acc.push({ position, width });
			return acc;
		}, []);
	}

	return [];
};

export const createFixedWidthGrid = (children, galleryWidth: number, itemsInSlide: number) => {
	const width = getItemWidth(galleryWidth, itemsInSlide);

	return children.reduce((acc, child, i) => {
		let position = 0;
		const previewsChild = acc[i - 1];

		if (previewsChild) {
			position = width + previewsChild.position || 0;
		}

		acc.push({ width, position });
		return acc;
	}, [] as GirdCell[]);
};

export const getItemWidth = (galleryWidth: number, itemsInSlide: number) => {
	return itemsInSlide > 0 ? galleryWidth / itemsInSlide : galleryWidth;
};

export function getElementDimensions(element) {
	if (element && element.getBoundingClientRect) {
		const { width, height } = element.getBoundingClientRect();

		return { width, height };
	}
	return {};
}

export const getAutoHeightProperty = (stageComponent: Element, props: Props, state: State) => {
	const elementCursor = getElementCursor(props, state);
	const element = getElementFirstChild(stageComponent, elementCursor);

	if (isElement(element)) {
		const styles = getComputedStyle(element);
		const marginTop = parseFloat(styles['marginTop']);
		const marginBottom = parseFloat(styles['marginBottom']);

		return Math.ceil(element.offsetHeight + marginTop + marginBottom);
	}
};

export const getElementCursor = (props: Props, state: State) => {
	const { activeIndex, itemsInSlide } = state;
	if (props.infinite) {
		return activeIndex + itemsInSlide + Utils.getItemsOffset(props);
	}
	return activeIndex;
};

export const getElementFirstChild = (stageComponent, cursor) => {
	const children = (stageComponent && stageComponent.children) || [];
	return (children[cursor] && children[cursor].firstChild) || null;
};
