import React from 'react';
import './styles.scss';

const Navigation = ({ onclick, scheme }) => {
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

export default Navigation;
