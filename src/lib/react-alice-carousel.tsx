import React from 'react';
import VS, { EventData } from 'vanilla-swipe';
import { defaultProps } from './defaultProps';
import { Direction, Props, RootComponent, SlideToItem, State } from './types';
import * as Views from './views';
import * as Utils from './utils';

class AliceCarousel extends React.PureComponent<Props, State> {
	static defaultProps: Props = defaultProps;
	private swipeListener: VS | null = null;
	private isAnimationDisabled: boolean;
	private isHovered: boolean;
	private isTouchMoveProcess: boolean;
	private hasUserAction: boolean;
	private autoPlayIntervalId: undefined | number;
	private lastSwipePosition: undefined | number;
	private rootComponent: null | undefined;
	private rootComponentDimensions: RootComponent;
	private stageComponent: null | undefined;
	private touchEndTimeoutId: number | undefined;
	private slideEndTimeoutId: number | undefined;
	private _handleResizeDebounced: () => void | undefined;
	private _handleTouchmoveThrottled: () => void | undefined;

	constructor(props) {
		super(props);

		const itemsCount = Utils.getItemsCount(props);
		const clones = Utils.createClones(props);

		this.state = {
			activeIndex: 0,
			autoWidth: false,
			clones,
			itemsCount,
			itemsOffset: 0,
			itemsInSlide: 1,
			transformationSet: [],
			infinite: false,
			initialStageHeight: 0,
			isAutoPlaying: false,
			isAutoPlayCanceledOnAction: false,
			isStageContentPartial: false,
			translate3d: 0,
			animationDuration: 0,
			transition: Utils.getTransitionProperty(),
			fadeoutAnimationIndex: null,
			fadeoutAnimationPosition: null,
			fadeoutAnimationProcessing: false,
			stageWidth: 0,
			stageContentWidth: 0,
			swipeLimitMin: 0,
			swipeLimitMax: 0,
			swipeAllowedPositionMax: 0,
			swipeShiftValue: 0,
		};

		this.isHovered = false;
		this.isAnimationDisabled = false;
		this.isTouchMoveProcess = false;
		this.hasUserAction = false;
		this.rootComponent = undefined;
		this.lastSwipePosition = undefined;
		this.rootComponentDimensions = {};
		this.stageComponent = undefined;
		this.touchEndTimeoutId = undefined;
		this.slideEndTimeoutId = undefined;
		this.slideTo = this.slideTo.bind(this);
		this.slidePrev = this.slidePrev.bind(this);
		this.slideNext = this.slideNext.bind(this);
		this._handleTouchmove = this._handleTouchmove.bind(this);
		this._handleTouchend = this._handleTouchend.bind(this);
		this._handleDotClick = this._handleDotClick.bind(this);
		this._handleResize = this._handleResize.bind(this);
		this._handleResizeDebounced = Utils.debounce(this._handleResize, 100);
		this._handleTouchmoveThrottled = Utils.throttle(this._handleTouchmove, 16);
	}

	componentDidMount() {
		this._setInitialState();
		this._setupSwipeHandlers();
		this.props.autoPlay && this._play();

		window.addEventListener('resize', this._handleResizeDebounced);
	}

	componentWillUnmount() {
		this.cancelTimeoutAnimations();
		this.swipeListener && this.swipeListener.destroy();

		window.removeEventListener('resize', this._handleResizeDebounced);
	}

	async _handleResize(e: Event) {
		const { onResizeEvent } = this.props;
		const nextRootComponentDimensions = Utils.getElementDimensions(this.rootComponent);
		const shouldProcessEvent = onResizeEvent || Utils.shouldHandleResizeEvent;

		if (shouldProcessEvent(e, this.rootComponentDimensions, nextRootComponentDimensions)) {
			this.cancelTimeoutAnimations();

			this.rootComponentDimensions = nextRootComponentDimensions;

			const { itemsCount, isAutoPlaying } = this.state;
			const activeIndex = Utils.getUpdateSlidePositionIndex(this.state.activeIndex, itemsCount);
			const currState = Utils.calculateInitialProps({ ...this.props, activeIndex }, this.stageComponent);
			const translate3d = Utils.getTranslate3dProperty(activeIndex, currState);
			const nextState = { ...currState, translate3d, isAutoPlaying };

			Utils.animate(this.stageComponent, { position: -translate3d });

			await this.setState(nextState);

			this._onResized();
			this.isAnimationDisabled = false;
			isAutoPlaying && this._play();
		}
	}

	cancelTimeoutAnimations() {
		this._clearAutoPlayInterval();
		clearTimeout(this.touchEndTimeoutId);
		clearTimeout(this.slideEndTimeoutId);
		this.touchEndTimeoutId = undefined;
		this.slideEndTimeoutId = undefined;
	}

	get isFadeoutAnimationAllowed() {
		const { itemsInSlide } = this.state;
		const { animationType, paddingLeft, paddingRight, autoWidth, autoHeight } = this.props;

		return (
			animationType === 'fadeout' && itemsInSlide === 1 && !(paddingLeft || paddingRight || autoWidth || autoHeight)
		);
	}

	slideTo(activeIndex: number) {
		this._pause();

		if (this.isFadeoutAnimationAllowed) {
			const fadeoutAnimationPosition = Utils.getFadeoutAnimationPosition(activeIndex, this.state);
			const fadeoutAnimationIndex = Utils.getFadeoutAnimationIndex(this.state);
			this._slideToItem({ activeIndex, fadeoutAnimationIndex, fadeoutAnimationPosition });
		} else {
			this._slideToItem({ activeIndex });
		}
	}

	slidePrev(e) {
		this._pause();
		if (e && e.isTrusted) {
			this.hasUserAction = true;
		}

		const activeIndex = this.state.activeIndex - 1;

		if (this.isFadeoutAnimationAllowed) {
			const fadeoutAnimationPosition = -this.state.stageWidth;
			const fadeoutAnimationIndex = Utils.getFadeoutAnimationIndex(this.state);
			this._slideToItem({ activeIndex, fadeoutAnimationIndex, fadeoutAnimationPosition });
		}

		this._slideToItem({ activeIndex });
	}

	slideNext(e) {
		this._pause();
		if (e && e.isTrusted) {
			this.hasUserAction = true;
		}

		const activeIndex = this.state.activeIndex + 1;

		if (this.isFadeoutAnimationAllowed) {
			const fadeoutAnimationPosition = this.state.stageWidth;
			const fadeoutAnimationIndex = Utils.getFadeoutAnimationIndex(this.state);
			this._slideToItem({ activeIndex, fadeoutAnimationIndex, fadeoutAnimationPosition });
		}
		this._slideToItem({ activeIndex });
	}

	_setupSwipeHandlers() {
		this.swipeListener = new VS({
			element: this.rootComponent,
			delta: this.props.swipeDelta,
			onSwiping: this._handleTouchmoveThrottled,
			onSwiped: this._handleTouchend,
			rotationAngle: 5,
			mouseTrackingEnabled: this.props.mouseTracking,
			touchTrackingEnabled: this.props.touchTracking,
			preventDefaultTouchmoveEvent: !this.props.touchMoveDefaultEvents,
			preventTrackingOnMouseleave: true,
		});

		this.swipeListener.init();
	}

	_handleTouchmove(e, eventData: EventData) {
		const { absX, deltaX } = eventData;
		const { swipeDelta } = this.props;
		const { swipeShiftValue, infinite, translate3d } = this.state;

		this.hasUserAction = true;

		if (this.isAnimationDisabled || (!this.isTouchMoveProcess && absX < Number(swipeDelta))) {
			return;
		}

		this._pause();
		this.isTouchMoveProcess = true;
		let position = Utils.getTouchmoveTranslatePosition(deltaX, translate3d);
		const { swipeLimitMin, swipeLimitMax } = this.state;

		if (infinite === false) {
			if (position > swipeLimitMin || -swipeLimitMax > position) {
				return;
			}

			Utils.animate(this.stageComponent, { position });
			this.lastSwipePosition = position;
			return;
		}

		if (Utils.shouldRecalculateSwipePosition(position, swipeLimitMin, swipeLimitMax)) {
			try {
				recalculatePosition();
			} catch (err) {
				Utils.debug(err);
			}
		}

		Utils.animate(this.stageComponent, { position });
		this.lastSwipePosition = position;

		function recalculatePosition() {
			if (Utils.getIsLeftDirection(deltaX)) {
				position += swipeShiftValue;
			} else {
				position += -swipeShiftValue;
			}

			if (Utils.shouldRecalculateSwipePosition(position, swipeLimitMin, swipeLimitMax)) {
				recalculatePosition();
			}
		}
	}

	_handleTouchend(e, { deltaX }: EventData) {
		if (this.isTouchMoveProcess) {
			this.isTouchMoveProcess = false;
			this.isAnimationDisabled = true;

			const { animationDuration } = this.state;
			const position = Utils.getSwipeTouchendPosition(this.state, deltaX, this.lastSwipePosition);

			this._onSlideChange();
			Utils.animate(this.stageComponent, { position, animationDuration });
			this._handleBeforeTouchEnd(position);
		}
	}

	_handleBeforeTouchEnd(position: number) {
		this.lastSwipePosition = undefined;
		const { animationDuration } = this.state;

		this.touchEndTimeoutId = setTimeout(async () => {
			const activeIndex = Utils.getSwipeTouchendIndex(this.state, position);
			const translate3d = Utils.getTranslate3dProperty(activeIndex, this.state);

			Utils.animate(this.stageComponent, { position: -translate3d });

			if (this.state.activeIndex !== activeIndex) {
				const transition = Utils.getTransitionProperty();

				await this.setState({ activeIndex, translate3d, transition });
				this._onSlideChanged();
			} else {
				this.isAnimationDisabled = false;
				this.touchEndTimeoutId = undefined;
			}
		}, animationDuration);
	}

	async _slideToItem({ activeIndex = 0, fadeoutAnimationIndex = null, fadeoutAnimationPosition = null }: SlideToItem) {
		const { infinite, animationEasingFunction } = this.props;
		const { itemsInSlide, itemsCount, animationDuration } = this.state;

		if (
			this.isAnimationDisabled ||
			this.state.activeIndex === activeIndex ||
			(!infinite && Utils.shouldCancelSlideAnimation(activeIndex, itemsCount, itemsInSlide))
		) {
			return;
		}
		this.isAnimationDisabled = true;
		this._onSlideChange();

		let transition;
		let fadeoutAnimationProcessing = false;
		const translate3d = Utils.getTranslate3dProperty(activeIndex, this.state);

		if (fadeoutAnimationIndex !== null && fadeoutAnimationPosition !== null) {
			fadeoutAnimationProcessing = true;
			transition = Utils.getTransitionProperty();
		} else {
			transition = Utils.getTransitionProperty({
				animationDuration,
				animationEasingFunction,
			});
		}

		await this.setState({
			activeIndex,
			transition,
			translate3d,
			animationDuration,
			fadeoutAnimationIndex,
			fadeoutAnimationPosition,
			fadeoutAnimationProcessing,
		});

		this.slideEndTimeoutId = setTimeout(async () => {
			console.debug('SLIDE AnimationCanceled');
			await this._beforeSlideChanged();
		}, animationDuration);
	}

	_beforeSlideChanged = async () => {
		const { activeIndex, itemsCount, fadeoutAnimationProcessing } = this.state;

		if (Utils.shouldRecalculateSlideIndex(activeIndex, itemsCount)) {
			const nextIndex = Utils.getUpdateSlidePositionIndex(activeIndex, itemsCount);
			await this._handleUpdateSlidePosition(nextIndex);
		}

		if (fadeoutAnimationProcessing) {
			await this.setState({
				fadeoutAnimationIndex: null,
				fadeoutAnimationPosition: null,
				fadeoutAnimationProcessing: false,
			});
		}

		this._onSlideChanged();
	};

	async _handleUpdateSlidePosition(activeIndex) {
		const { animationDuration } = this.state;
		const translate3d = Utils.getTranslate3dProperty(activeIndex, this.state);
		const transition = Utils.getTransitionProperty({ animationDuration: 0 });

		await this.setState({
			activeIndex,
			translate3d,
			transition,
			animationDuration,
		});
	}

	_setInitialState() {
		const initialState = Utils.calculateInitialProps(this.props, this.stageComponent);

		this.setState(initialState, () => this._onInitialized(initialState));
	}

	_onInitialized(initialState): void {
		this.rootComponentDimensions = Utils.getElementDimensions(this.rootComponent);

		if (this.props.onInitialized) {
			this.props.onInitialized(this._getEventObject(initialState));
		}
	}

	_onSlideChange() {
		if (this.props.onSlideChange) {
			this.props.onSlideChange(this._getEventObject());
		}
	}

	_onResized() {
		if (this.props.onResized) {
			this.props.onResized(this._getEventObject());
		}
	}

	async _onSlideChanged() {
		const { isAutoPlaying, isAutoPlayCanceledOnAction } = this.state;
		const { cancelAutoPlayOnAction, onSlideChanged } = this.props;

		if (cancelAutoPlayOnAction && this.hasUserAction && !isAutoPlayCanceledOnAction) {
			await this.setState({ isAutoPlayCanceledOnAction: true, isAutoPlaying: false });
		} else {
			isAutoPlaying && this._play();
		}

		this.isAnimationDisabled = false;
		onSlideChanged && onSlideChanged(this._getEventObject());
	}

	_getEventObject = (state = this.state) => {
		const { itemsInSlide: itemsInSlide, activeIndex: item } = state;
		const { isNextSlideDisabled, isPrevSlideDisabled } = Utils.getSlideItemInfo(state);
		const slide = Utils.getActiveSlideIndex(isNextSlideDisabled, state);

		return { item, slide, itemsInSlide, isNextSlideDisabled, isPrevSlideDisabled };
	};

	_handleOnPlayPauseToggle = async () => {
		const { isAutoPlaying } = this.state;

		this.hasUserAction = true;

		await this.setState({ isAutoPlaying: !isAutoPlaying, isAutoPlayCanceledOnAction: true });
		isAutoPlaying ? this._pause() : this._play();
	};

	_handleDotClick(index) {
		this.hasUserAction = true;
		this.slideTo(index);
	}

	_handleOnMouseEnter = () => {
		if (this.props.cancelAutoPlayOnHover && this.state.isAutoPlaying) {
			this.isHovered = true;
			this._pause();
		}
	};

	_handleOnMouseLeave = () => {
		if (this.state.isAutoPlaying) {
			this.isHovered = false;
			this._play();
		}
	};

	_play() {
		this._setAutoPlayInterval();
	}

	_pause = () => {
		this._clearAutoPlayInterval();
	};

	_setRootComponentRef = (node) => {
		return (this.rootComponent = node);
	};

	_setStageComponentRef = (node) => {
		return (this.stageComponent = node);
	};

	_setAutoPlayInterval() {
		const { autoPlayDirection, autoPlayInterval } = this.props;

		this.autoPlayIntervalId = setTimeout(() => {
			if (!this.isHovered) {
				autoPlayDirection === Direction.RTL ? this.slidePrev({}) : this.slideNext({});
			}
		}, autoPlayInterval);
	}

	_clearAutoPlayInterval() {
		clearTimeout(this.autoPlayIntervalId);
		this.autoPlayIntervalId = undefined;
	}

	_renderStageItem = (item, i: number) => {
		const styles = Utils.getRenderStageItemStyles(i, this.state);
		const className = Utils.getRenderStageItemClasses(i, this.state);
		return <Views.StageItem styles={styles} className={className} key={`stage-item-${i}`} item={item} />;
	};

	_renderSlideInfo = () => {
		const { activeIndex, itemsCount } = this.state;
		return <Views.SlideInfo slidesLength={itemsCount} activeIndex={activeIndex} />;
	};

	_renderDotsNavigation() {
		return <Views.DotsNavigation state={this.state} onClick={this._handleDotClick} />;
	}

	_renderPrevButton() {
		const { isPrevSlideDisabled } = Utils.getSlideItemInfo(this.state);
		return <Views.PrevNextButton name="prev" disabled={isPrevSlideDisabled} onClick={this.slidePrev} />;
	}

	_renderNextButton() {
		const { isNextSlideDisabled } = Utils.getSlideItemInfo(this.state);
		return <Views.PrevNextButton name="next" disabled={isNextSlideDisabled} onClick={this.slideNext} />;
	}

	_renderPlayPauseButton() {
		const { isAutoPlaying } = this.state;
		return <Views.PlayPauseButton isPlaying={isAutoPlaying} onClick={this._handleOnPlayPauseToggle} />;
	}

	render() {
		const { translate3d, clones, transition } = this.state;
		const shouldDisableDots = Utils.shouldDisableDots(this.props, this.state);
		const wrapperStyles = Utils.getRenderWrapperStyles(this.props, this.state, this.stageComponent);
		const stageStyles = Utils.getRenderStageStyles({ translate3d }, { transition });

		return (
			<div className="alice-carousel">
				<div ref={this._setRootComponentRef}>
					<div
						style={wrapperStyles}
						className="alice-carousel__wrapper"
						onMouseEnter={this._handleOnMouseEnter}
						onMouseLeave={this._handleOnMouseLeave}
					>
						<ul style={stageStyles} className="alice-carousel__stage" ref={this._setStageComponentRef}>
							{clones.map(this._renderStageItem)}
						</ul>
					</div>
				</div>

				{shouldDisableDots ? null : this._renderDotsNavigation()}
				{this.props.disableSlideInfo ? null : this._renderSlideInfo()}
				{this.props.disableButtonsControls ? null : this._renderPrevButton()}
				{this.props.disableButtonsControls ? null : this._renderNextButton()}
				{this.props.disablePlayButtonControls ? null : this._renderPlayPauseButton()}
			</div>
		);
	}
}

export default AliceCarousel;
