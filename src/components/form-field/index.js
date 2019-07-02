import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import style from './style.scss';

const FormField = ({ label, className, isLoading, ...props }) => (
	<div className={classnames({
		[style.formFieldIsLoading]: isLoading
	}, className)}>
		<p className={style.formFieldLabel}>{label}</p>
		<div className={style.formField}>
			<input type="text"
				className={style.formFieldInput}
				{...props} />
		</div>
	</div>
);

FormField.propTypes = {
	className: PropTypes.string,
	label: PropTypes.string,
	isLoading: PropTypes.bool
};

export default FormField;
