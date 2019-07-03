import {
	SHOW_LOADER,
	HIDE_LOADER
} from '../../types';

import loader from '../loader';

describe('loader', () => {
	it('should return state as true when passing SHOW_LOADER type', () => {
		expect(
			loader(undefined, {
				type: SHOW_LOADER
			})
		).toBe(true);
	});

	it('should return state as false when passing HIDE_LOADER type', () => {
		expect(
			loader(undefined, {
				type: HIDE_LOADER
			})
		).toBe(false);
	});

	it('should return state as false when passing any type', () => {
		expect(
			loader(undefined, {})
		).toBe(false);
	});
});
