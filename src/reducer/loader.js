import {
	SHOW_LOADER,
	HIDE_LOADER
} from '../types';

export default (state = false, { type }) => {
	switch (type) {
		case SHOW_LOADER:
			return true;

		case HIDE_LOADER:
			return false;

		default:
			return state;
	}
};
