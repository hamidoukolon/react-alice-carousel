import React, { MouseEventHandler } from 'react';

import * as Utils from '../utils';
import { State } from '../types';

export const DotsNavigation = ({ state, onClick, onMouseEnter, onMouseLeave }: Props) => {
	const { itemsCount, itemsInSlide, infinite } = state;
	const { isNextSlideDisabled } = Utils.getSlideItemInfo(state);
	const dotsLength = Utils.getDotsNavigationLength(itemsCount, itemsInSlide);

	return (
		<ul className="alice-carousel__dots">
			{Array.from({ length: itemsCount }).map((item, i) => {
				if (i < dotsLength) {
					const isTheLastDotIndex = checkIsTheLastDotIndex(i, Boolean(infinite), dotsLength);
					// TODO check, refactoring
					const itemIndex = getItemIndexForDotNavigation(
						i,
						isTheLastDotIndex,
						itemsCount,
						itemsInSlide,
					);
					const activeIndex = Utils.getActiveSlideIndex(isNextSlideDisabled, state);
					const className = activeIndex === i ? ' __active' : '';

					return (
						<li
							key={`dot-item-${i}`}
							onMouseEnter={onMouseEnter}
							onMouseLeave={onMouseLeave}
							onClick={() => onClick(itemIndex)}
							className={`alice-carousel__dots-item${className}`}
						/>
					);
				}
			})}
		</ul>
	);
};

export const checkIsTheLastDotIndex = (index: number, infinite: boolean, dotsLength: number) => {
	return !infinite && index === dotsLength - 1;
};

export const getItemIndexForDotNavigation = (
	index: number,
	isTheLastIndex: boolean,
	slidesLength: number,
	itemsInSlide: number,
) => {
	const result = isTheLastIndex ? slidesLength - itemsInSlide : index * itemsInSlide;
	return result || 0;
};

type Props = {
	state: State;
	onClick: (index: number) => void;
	onMouseEnter?: MouseEventHandler;
	onMouseLeave?: MouseEventHandler;
};
