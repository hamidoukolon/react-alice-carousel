import React, { memo } from 'react';
import scheme from './scheme';
import './styles.scss';

const Navigation = ({ onclick }) => {
	return (
		<nav className="navigation">
			{scheme.map(({ id, name }) => {
				return (
					<a href={`/#${id}`} key={id} className="navigation-item" onClick={() => onclick(id)}>
						{name}
					</a>
				);
			})}
		</nav>
	);
};

export { scheme };
export default memo(Navigation);
