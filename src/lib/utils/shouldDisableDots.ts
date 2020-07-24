import { Props, State } from '../types';

export function shouldDisableDots(props: Props, state: State) {
	const { dotsDisabled, controlsStrategy } = props || {};
	const { itemsInSlide, itemsCount } = state || {};

	if (dotsDisabled) {
		return true;
	}

	if (controlsStrategy === 'responsive' && itemsInSlide === itemsCount) {
		return true;
	}

	return false;
}
