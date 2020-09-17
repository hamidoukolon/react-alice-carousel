import React from 'react';
import Header from './header';
import Navigation, { scheme } from './navigation';
import '../main.scss';

export default class App extends React.PureComponent<AppProps> {
	state = {
		navId: '',
	};

	componentDidMount() {
		const [{ id }] = scheme;
		const { hash = '#' } = window.location;
		const hashId = hash.slice(1);

		if (scheme.find(({ id }) => id === hashId)) {
			this.setState({ navId: hashId });
		} else {
			this.setState({ navId: id });
		}
	}

	setActive = (navId = '') => {
		this.setState({ navId });
	};

	render() {
		return (
			<div className="app">
				<Header />
				<Navigation onclick={this.setActive} />
			</div>
		);
	}
}

type AppProps = Record<string, unknown>;
