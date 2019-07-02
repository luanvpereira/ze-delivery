import React from 'react';
import PropTypes from 'prop-types';

import Header from '../header';
import Footer from '../footer';

import style from './style.scss';

const Layout = ({ children }) => (
	<div className={style.layout}>
		<Header />
		{children}
		<Footer />
	</div>
);

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default Layout;
