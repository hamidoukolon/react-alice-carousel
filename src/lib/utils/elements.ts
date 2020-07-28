import * as Utils from '.';
import { Props, GirdCell } from '../types';

export const getSlides = (props: Props) => {
	const { children = [], items = [] } = props;
	return children && children.length ? children : items;
};

export const getItemsCount = (props: Props) => {
	return getSlides(props).length;
};

export const getItemsOffset = (props: Props) => {
	return props.paddingRight || props.paddingLeft ? 1 : 0;
};

export const createClones = (props: Props) => {
	const { responsive, autoWidth, infinite } = props;
	const slides = getSlides(props);
	const itemsCount = getItemsCount(props);
	const itemsOffset = getItemsOffset(props);
	let itemsInSlide = Utils.getItemsInSlide(responsive, itemsCount);

	if (autoWidth && infinite) {
		itemsInSlide = itemsCount;
	}
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
				position = previewsChildCursor === 0 ? previewsChild.width : previewsChild.width + previewsChild.position;
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
	const items = itemsInSlide || 1;
	return galleryWidth && items > 0 ? galleryWidth / items : 0;
};

export function getElementDimensions(element) {
	if (element && element.getBoundingClientRect) {
		const { width, height } = element.getBoundingClientRect();

		return { width, height };
	}
	return {};
}

export const getGalleryItemHeight = () => {
	return 0;
};

/*	stageComponent: HTMLDivElement,
props: Props,
state: State,*/
