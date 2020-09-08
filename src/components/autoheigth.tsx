import React from 'react';
import AliceCarousel from '../lib/react-alice-carousel';
import '../lib/scss/alice-carousel.scss';
import '../style.scss';

export default class Autoheigth extends React.PureComponent<AppProps> {
	render() {
		return (
			<div className="app">
				<h1 className="h1">React Alice Carousel</h1>
				<AliceCarousel
					//paddingLeft={100}
					//paddingRight={10}
					// activeIndex={2}
					// infinite={true}
					autoHeight={true}
					touchTracking
					// responsive={{ 0: { items: 3 } }}
					animationDuration={1000}
					onSlideChanged={console.debug}
				>
					<div className="item" style={{ height: 120 }}>
						<h1>1</h1>
					</div>
					<div className="item" style={{ height: 200 }}>
						<h1>2</h1>
					</div>
					<div className="item" style={{ height: 120 }}>
						<h1>3</h1>
					</div>
					<div className="item" style={{ height: 140 }}>
						<h1>4</h1>
					</div>
					<div className="item">
						<h1>5</h1>
					</div>
					<div className="item" style={{ height: 170 }}>
						<h1>6</h1>
					</div>
					<div className="item" style={{ height: 220 }}>
						<h1>7</h1>
					</div>
				</AliceCarousel>
			</div>
		);
	}
}

type AppProps = Record<string, unknown>;
