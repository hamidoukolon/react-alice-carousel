import React from 'react';
import Header from './header';
// import Navigation from './navigation';
import getPageComponent from './pages';
import scheme from './scheme';
import '../main.scss';

export default class App extends React.PureComponent<AppProps> {
	state = {
		pageID: '',
	};

	componentDidMount() {
		this.setInitialState();
	}

	setInitialState() {
		const { hash = '#' } = window.location;
		const hashId = hash.slice(1);

		if (scheme.find(({ id }) => id === hashId)) {
			this.setActivePage(hashId);
		} else {
			const [{ id }] = scheme;
			this.setActivePage(id);
		}
	}

	setActivePage = (pageID = '') => {
		this.setState({ pageID });
	};

	render() {
		const { pageID } = this.state;
		return (
			<div className="app">
				<Header />
				{/*<Navigation onclick={this.setActivePage} scheme={scheme} />*/}
				<main className="s-main">
					<h2 className="title">
						<span>{pageID}</span> example
					</h2>
					{getPageComponent(pageID)}
				</main>
			</div>
		);
	}
}

type AppProps = Record<string, unknown>;
