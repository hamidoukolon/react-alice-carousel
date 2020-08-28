import React from 'react';
import VS, { EventData } from 'vanilla-swipe';
import { defaultProps } from './defaultProps';
import { Props, State, RootComponent, SlideToItem } from './types';
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
	private lastSwipeDirection: undefined | string;
	private rootComponent: null | undefined;
	private rootComponentDimensions: RootComponent;
	private stageComponent: null | undefined;
	private _throttledOnTouchMove: () => void | undefined;

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
		this.lastSwipeDirection = undefined;
		this.rootComponentDimensions = {};
		this.stageComponent = undefined;
		this.slideTo = this.slideTo.bind(this);
		this.slidePrev = this.slidePrev.bind(this);
		this.slideNext = this.slideNext.bind(this);
		this._onTouchMove = this._onTouchMove.bind(this);
		this._onTouchEnd = this._onTouchEnd.bind(this);
		this._handleOnDotClick = this._handleOnDotClick.bind(this);
		this._throttledOnTouchMove = Utils.throttle(this._onTouchMove, 16);
	}

	componentDidMount() {
		this._setInitialState();
		this._setupSwipeHandlers();
		this.props.autoPlay && this._play();
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
			onSwiping: this._throttledOnTouchMove,
			onSwiped: this._onTouchEnd,
			rotationAngle: 5,
			mouseTrackingEnabled: this.props.mouseTrackingEnabled,
			touchTrackingEnabled: this.props.touchTrackingEnabled,
			preventDefaultTouchmoveEvent: this.props.preventEventOnTouchMove,
			preventTrackingOnMouseleave: true,
		});

		this.swipeListener.init();
	}

	_getTranslateXPosition = (deltaX) => {
		const { translate3d } = this.state;
		return -(translate3d - Math.floor(deltaX));
	};

	_onTouchMove(e, eventData: EventData) {
		const { absX, deltaX } = eventData;
		const { swipeDelta } = this.props;
		const { swipeShiftValue, infinite } = this.state;

		this.hasUserAction = true;

		if (this.isAnimationDisabled || (!this.isTouchMoveProcess && absX < Number(swipeDelta))) {
			return;
		}

		this._pause();
		this.isTouchMoveProcess = true;
		let position = this._getTranslateXPosition(deltaX);
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

	_onTouchEnd(e, { deltaX }: EventData) {
		if (this.isTouchMoveProcess) {
			this.isTouchMoveProcess = false;
			this.isAnimationDisabled = true;

			const { animationDuration } = this.state;
			const position = Utils.getSwipeTouchendPosition(this.state, deltaX, this.lastSwipePosition);

			Utils.animate(this.stageComponent, { position, animationDuration });
			this._beforeTouchEnd(position);
		}
	}

	async _beforeTouchEnd(position: number) {
		const { animationDuration } = this.state;

		await Utils.sleep(animationDuration);

		const activeIndex = Utils.getSwipeTouchendIndex(this.state, position);
		const translate3d = Utils.getTranslate3dProperty(activeIndex, this.state);

		this.lastSwipePosition = undefined;
		Utils.animate(this.stageComponent, { position: -translate3d });

		await this.setState({
			activeIndex,
			translate3d,
			transition: Utils.getTransitionProperty(),
		});

		this._onSlideChanged();
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
		this._onSlideChange();
		this.isAnimationDisabled = true;

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
		await Utils.sleep(animationDuration);
		await this._beforeSlideChanged();
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

	async _onSlideChanged() {
		const { isAutoPlaying, isAutoPlayCanceledOnAction } = this.state;
		const { preventAutoPlayOnAction, onSlideChanged } = this.props;

		if (preventAutoPlayOnAction && this.hasUserAction && !isAutoPlayCanceledOnAction) {
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

	_handleOnDotClick(index) {
		this.hasUserAction = true;
		this.slideTo(index);
	}

	_handleOnMouseEnter = () => {
		if (this.props.stopAutoPlayOnHover && this.state.isAutoPlaying) {
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

		this.autoPlayIntervalId = window.setTimeout(() => {
			if (!this.isHovered) {
				autoPlayDirection === 'rtl' ? this.slidePrev({}) : this.slideNext({});
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
		return <Views.DotsNavigation state={this.state} onClick={this._handleOnDotClick} />;
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

				{this.props.showSlideInfo ? this._renderSlideInfo() : null}
				{shouldDisableDots ? null : this._renderDotsNavigation()}
				{!this.props.buttonsDisabled ? this._renderPrevButton() : null}
				{!this.props.buttonsDisabled ? this._renderNextButton() : null}
				{this.props.playButtonEnabled ? this._renderPlayPauseButton() : null}
			</div>
		);
	}
}

export default AliceCarousel;
