import {
	CHANGE_METHOD_ADDRESS,
	CHANGE_CURRENT_CATEGORY,
	CHANGE_FILTER_TEXT
} from '../types';

export const setCurrentMethod = payload => ({
	type: CHANGE_METHOD_ADDRESS,
	payload
});

export const changeCategory = payload => ({
	type: CHANGE_CURRENT_CATEGORY,
	payload: parseInt(payload, 10)
});

export const changeFilterText = payload => ({
	type: CHANGE_FILTER_TEXT,
	payload
});
