import {
	SHOW_LOADER,
	HIDE_LOADER
} from '../types';

export const showLoader = () => ({
	type: SHOW_LOADER
});

export const hideLoader = () => ({
	type: HIDE_LOADER
});
