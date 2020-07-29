import React from 'react';
import { defaultProps } from './defaultProps';
import { Props, State, RootComponent } from './types';
import * as Views from './views';
import * as Utils from './utils';

class AliceCarousel extends React.PureComponent<Props, State> {
	static defaultProps: Props = defaultProps;
	isHovered: boolean;
	isAnimationDisabled: boolean;
	hasUserAction: boolean;
	autoPlayIntervalId: undefined | number;
	rootComponent: React.RefObject<HTMLDivElement> | undefined;
	rootComponentDimensions: RootComponent;
	stageComponent: React.RefObject<HTMLDivElement> | undefined;

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
			infinite: false,
			initialStageHeight: 0,
			isAutoPlaying: false,
			isAutoPlayCanceledOnAction: false,
			translate3d: 0,
			sizesGrid: [],
			animationDuration: 0,
			transition: Utils.getTransitionProperty(),
			fadeoutIndex: null,
			fadeoutPosition: null,
			fadeoutAnimationProcessing: false,
		};

		this.isHovered = false;
		this.isAnimationDisabled = false;
		this.hasUserAction = false;
		this.rootComponent = undefined;
		this.rootComponentDimensions = {};
		this.stageComponent = undefined;
		this.slideTo = this.slideTo.bind(this);
		this.slidePrev = this.slidePrev.bind(this);
		this.slideNext = this.slideNext.bind(this);
		this._handleOnDotClick = this._handleOnDotClick.bind(this);
	}

	componentDidMount() {
		this._setInitialState();

		this.props.autoPlay && this._play();
	}

	slideTo(index: number) {
		this._pause();
		this._slideToItem(index);
	}

	slidePrev(e) {
		this._pause();
		if (e && e.isTrusted) {
			this.hasUserAction = true;
		}

		const { activeIndex } = this.state;
		this._slideToItem(activeIndex - 1);
	}

	slideNext(e) {
		this._pause();
		if (e && e.isTrusted) {
			this.hasUserAction = true;
		}

		const { activeIndex } = this.state;
		this._slideToItem(activeIndex + 1);
	}

	async _slideToItem(activeIndex) {
		const { infinite, fadeOutAnimation } = this.props;
		const { itemsInSlide, itemsCount, animationDuration } = this.state;

		if (
			this.isAnimationDisabled ||
			activeIndex === this.state.activeIndex ||
			(!infinite && Utils.shouldCancelSlide(activeIndex, itemsCount, itemsInSlide))
		) {
			return;
		}
		this._onSlideChange();
		this.isAnimationDisabled = true;

		let fadeoutIndex;
		let fadeoutPosition;
		let transition = Utils.getTransitionProperty({ animationDuration });

		if (fadeOutAnimation) {
			transition = Utils.getTransitionProperty();
			fadeoutIndex = Utils.getFadeoutIndex(this.state.activeIndex);
			fadeoutPosition = Utils.getFadeoutPosition(activeIndex, this.state);
		}

		const translate3d = Utils.getTranslate3dProperty(activeIndex, this.state);
		// const fadeoutPosition = Utils.getFadeoutAnimationPosition(activeIndex, this.state);

		await this.setState({
			activeIndex,
			translate3d,
			transition,
			animationDuration,
			fadeoutPosition,
			fadeoutIndex,
		});

		await Utils.sleep(animationDuration);
		await this._afterSlide();
	}

	_afterSlide = async () => {
		const { activeIndex, itemsCount } = this.state;

		if (Utils.shouldRecalculateSlideIndex(activeIndex, itemsCount)) {
			const nextIndex = Utils.getNextSlideIndex(activeIndex, itemsCount);
			await this._handleUpdateSlidePosition(nextIndex);
		}

		// if (fadeoutPosition) {
		// 	await this.setState({
		// 		fadeoutIndex: null,
		// 		fadeoutPosition: null,
		// 		transition: Utils.getTransitionProperty({ animationDuration }),
		// 	});
		// }

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
		const { disableAutoPlayOnAction, onSlideChanged } = this.props;

		if (disableAutoPlayOnAction && this.hasUserAction && !isAutoPlayCanceledOnAction) {
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

	_isFadeOutAnimationAllowed = () => {
		const { itemsCount } = this.state;
		const { fadeOutAnimation, paddingLeft, paddingRight } = this.props;

		return fadeOutAnimation && !(paddingLeft || paddingRight) && itemsCount === 1;
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
		const styles = Utils.getStageItemStyles(i, this.state);
		const className = Utils.getStageItemClassName(i, this.state);
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
