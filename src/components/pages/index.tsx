import React from 'react';
import BasicPage from './basic';
import './styles.scss';

export default function getPageComponent(pageID = '') {
	if (pageID === 'basic') {
		return <BasicPage />;
	}

	return null;
}
