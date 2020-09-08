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
					paddingLeft={40}
					paddingRight={30}
					infinite={true}
					// animationType="fadeout"
					responsive={{ 0: { items: 3 }, 400: { items: 1 } }}
					mouseTracking
				>
					<div className="item">
						<h1 className="__mod">1</h1>
					</div>
					<div className="item">
						<h1 className="__mod-2">2</h1>
					</div>
					<div className="item">
						<h1>3</h1>
					</div>
				</AliceCarousel>
			</div>
		);
	}
}

type AppProps = Record<string, unknown>;
