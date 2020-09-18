import React from 'react';
import BasicPage from './basic';
import './styles.scss';

export default function getPageComponent(pageID = '', scheme) {
	if (pageID === scheme[0].id) {
		return <BasicPage />;
	}

	return null;
}
