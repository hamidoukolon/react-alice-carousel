import React from 'react';
import AliceCarousel from '../lib/react-alice-carousel';
import '../lib/scss/alice-carousel.scss';
import '../style.scss';

export default class App extends React.PureComponent<AppProps> {
	state = {
		activeIndex: 0,
		animationDuration: 400,
		animationType: 'RO',
		autoWidth: false,
		infinite: false,
		items: [
			<div className="item" style={{ width: 100 }}>
				<h1 className="__mod">{100}</h1>
			</div>,
			<div className="item" style={{ width: 200 }}>
				<h1 className="__mod-2">2</h1>
			</div>,
			<div className="item" style={{ width: 300 }}>
				<h1>3</h1>
			</div>,
		],
	};

	render() {
		const { autoWidth, items, animationType, infinite, animationDuration } = this.state;

		return (
			<div className="app">
				<h1 className="h1">React Alice Carousel</h1>
				<button onClick={() => this.setState({ animationType: 'LOLO', animationDuration: 1000 })}>Click</button>
				<button onClick={() => this.setState({ animationType: 'R0', animationDuration: 400 })}>Click-</button>
				<AliceCarousel
					items={items}
					// paddingLeft={40}
					// paddingRight={30}
					infinite={infinite}
					autoWidth={autoWidth}
					// activeIndex={activeIndex}
					animationType="fadeout"
					animationDuration={animationDuration}
					// responsive={{ 0: { items: 3 }, 400: { items: 1 } }}
					mouseTracking
				/>
				{/*	<div className="item" style={{ width: 100 }}>*/}
				{/*		<h1 className="__mod">{animationType}</h1>*/}
				{/*	</div>*/}
				{/*	<div className="item" style={{ width: 200 }}>*/}
				{/*		<h1 className="__mod-2">2</h1>*/}
				{/*	</div>*/}
				{/*	<div className="item" style={{ width: 300 }}>*/}
				{/*		<h1>3</h1>*/}
				{/*	</div>*/}
				{/*</AliceCarousel>*/}
			</div>
		);
	}
}

type AppProps = Record<string, unknown>;
