import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../header';
import Footer from '../footer';
import Loader from '../loader';

import style from './style.scss';

const Layout = ({ children, loader }) => (
	<div className={style.layout}>
		<Header />
		{children}
		<Footer />
		{loader && <Loader />}
	</div>
);

Layout.propTypes = {
	children: PropTypes.node.isRequired,
	loader: PropTypes.bool
};

export default connect(({ loader }) => ({ loader }))(Layout);
