import React from 'react';
import AliceCarousel from '../lib/react-alice-carousel';
import '../lib/scss/alice-carousel.scss';
import '../style.scss';

export default class App extends React.PureComponent<AppProps> {
	render() {
		return (
			<div className="app">
				<h1 className="h1">React Alice Carousel</h1>
				<AliceCarousel
					// paddingLeft={100}
					// paddingRight={1}
					// infinite={true}
					// fadeoutAnimation={true}
					// fadeoutAnimation
					// responsive={{ 0: { items: 2 } }}
					animationDuration={800}

					// autoHeight
					// activeIndex={1}
					// onSlideChange={console.debug}
				>
					<div className="item">
						<h1>1</h1>
					</div>
					<div className="item">
						<h1>2</h1>
					</div>
					<div className="item">
						<h1>3</h1>
					</div>
					<div className="item">
						<h1>4</h1>
					</div>
					<div className="item">
						<h1>5</h1>
					</div>
					<div className="item">
						<h1>6</h1>
					</div>
				</AliceCarousel>
			</div>
		);
	}
}

type AppProps = Record<string, unknown>;
