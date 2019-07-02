import { combineReducers } from 'redux';

import {
	CHANGE_METHOD_ADDRESS,
	CHANGE_CURRENT_CATEGORY,
	CHANGE_FILTER_TEXT
} from '../types';

export const id = (state = null, { type, payload }) => {
	switch (type) {
		case CHANGE_METHOD_ADDRESS:
			return payload;

		default:
			return state;
	}
};

export const categoryId = (state = 0, { type, payload }) => {
	switch (type) {
		case CHANGE_CURRENT_CATEGORY:
			return payload;

		default:
			return state;
	}
};

export const search = (state = '', { type, payload }) => {
	switch (type) {
		case CHANGE_FILTER_TEXT:
			return payload;

		default:
			return state;
	}
};

export default combineReducers({
	id,
	categoryId,
	search
});
