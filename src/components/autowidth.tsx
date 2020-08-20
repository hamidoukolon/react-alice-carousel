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
					paddingLeft={100}
					paddingRight={50}
					activeIndex={0}
					infinite={true}
					autoWidth={true}
					// responsive={{ 0: { items: 10 } }}
					// animationDuration={10000}
					animationEasingFunction={'cubic-bezier(0, 0, 0, 1)'}
					onSlideChanged={console.debug}
				>
					<div className="item" style={{ width: 15 }}>
						<h1>1</h1>
					</div>
					<div className="item" style={{ width: 10 }}>
						<h1>2</h1>
					</div>
					<div className="item" style={{ width: 20 }}>
						<h1>3</h1>
					</div>
					<div className="item" style={{ width: 40 }}>
						<h1>4</h1>
					</div>
					<div className="item" style={{ width: 30 }}>
						<h1>5</h1>
					</div>
					<div className="item" style={{ width: 10 }}>
						<h1>6</h1>
					</div>
					<div className="item" style={{ width: 17 }}>
						<h1>7</h1>
					</div>
				</AliceCarousel>
			</div>
		);
	}
}

type AppProps = Record<string, unknown>;
