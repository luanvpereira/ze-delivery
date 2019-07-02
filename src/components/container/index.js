import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import style from './style.scss';

const Container = ({ children, className }) => (
	<div className={classnames(style.container, className)}>{children} </div>
);

Container.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired
};

export default Container;
