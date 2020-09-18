import React from 'react';
import Gallery from '../../../lib/react-alice-carousel';
import '../../../lib/scss/alice-carousel.scss';

const BasicPage = () => {
	return (
		<section className="p-basic">
			<Gallery mouseTracking>
				<div className="item">
					<h1 className="__mod">1</h1>
				</div>
				<div className="item">
					<h1 className="__mod-2">2</h1>
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
			</Gallery>
		</section>
	);
};

export default BasicPage;
