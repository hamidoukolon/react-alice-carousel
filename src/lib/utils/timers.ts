export function debounce(func: (...args) => void, ms = 0) {
	let timer: undefined | number = undefined;

	return function (...args) {
		if (timer) {
			clearTimeout(timer);
			timer = undefined;
		}

		timer = window.setTimeout(() => {
			func.apply(this, args);
			timer = undefined;
		}, ms);
	};
}

export function throttle(func, ms) {
	let isThrottled, savedArgs, savedThis;

	return function () {
		if (isThrottled) {
			savedArgs = arguments;
			savedThis = this;
			return;
		}

		func.apply(this, arguments);
		isThrottled = true;

		setTimeout(function () {
			isThrottled = false;
			if (savedArgs) {
				func.apply(savedThis, savedArgs);
				savedArgs = savedThis = null;
			}
		}, ms);
	};
}
