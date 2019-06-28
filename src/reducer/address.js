import { combineReducers } from 'redux';

import { CHANGE_CURRENT_ADDRESS } from '../types';

export const currentAddress = (state = null, { type, payload }) => {
	switch (type) {
		case CHANGE_CURRENT_ADDRESS:
			return payload;

		default:
			return state;
	}
};

export default combineReducers({
	currentAddress
});
