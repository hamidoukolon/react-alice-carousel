import React from 'react';
import AliceCarousel from '../lib/react-alice-carousel';
import '../lib/scss/alice-carousel.scss';
import '../style.scss';

export default class Autowidth extends React.PureComponent<AppProps> {
	render() {
		return (
			<div className="app">
				<h1 className="h1">React Alice Carousel</h1>
				<AliceCarousel
					//
					// paddingLeft={40}
					// paddingRight={40}
					// activeIndex={0}
					infinite={true}
					autoWidth={true}
					// responsive={{ 0: { items: 10 } }}
					// animationDuration={10000}
					animationEasingFunction={'cubic-bezier(0, 0, 0, 1)'}
					onSlideChanged={console.debug}
					touchTrackingEnabled={true}
				>
					<div className="item" style={{ width: 50 }}>
						<h1>1</h1>
					</div>
					<div className="item" style={{ width: 60 }}>
						<h1>2</h1>
					</div>
					<div className="item" style={{ width: 70 }}>
						<h1>3</h1>
					</div>
					<div className="item" style={{ width: 80 }}>
						<h1>4</h1>
					</div>
					<div className="item" style={{ width: 90 }}>
						<h1>5</h1>
					</div>
					<div className="item" style={{ width: 100 }}>
						<h1>6</h1>
					</div>
					<div className="item" style={{ width: 120 }}>
						<h1>7</h1>
					</div>
				</AliceCarousel>
			</div>
		);
	}
}

type AppProps = Record<string, unknown>;
