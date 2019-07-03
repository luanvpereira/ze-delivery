import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import style from './style.scss';

const FormField = ({ label, className, isLoading, search, type, children, ...props }) => {
	if (type !== 'select') {
		return <div className={classnames({
			[style.formFieldIsLoading]: isLoading,
			[style.formFieldSearch]: !isLoading && search
		}, className)}>
			{label && <p className={style.formFieldLabel}>{label}</p>}
			<div className={style.formField}>
				<input type={type}
					className={style.formFieldInput}
					{...props} />
			</div>
		</div>;
	}

	return (
		<div className={className}>
			{label && <p className={style.formFieldLabel}>{label}</p>}
			<div className={style.formField}>
				<select className={style.formFieldSelect} {...props}>
					{children}
				</select>
			</div>
		</div>
	);
};

FormField.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	label: PropTypes.string,
	isLoading: PropTypes.bool,
	search: PropTypes.bool,
	type: PropTypes.string
};

FormField.propTypes = {
	type: 'text'
};

export default FormField;
