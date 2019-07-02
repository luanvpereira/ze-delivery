import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import style from './style.scss';

const Cardboard = ({ children, className }) => (
	<div className={classnames(style.cardboard, className)}>
		{children}
	</div>
);

Cardboard.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string
};

export default Cardboard;
