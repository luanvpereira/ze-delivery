import {
	CHANGE_METHOD_ADDRESS,
	CHANGE_CURRENT_CATEGORY,
	CHANGE_FILTER_TEXT
} from '../../types';

import * as filter from '../filter';

describe('filter', () => {
	describe('id', () => {
		it('should change `id` key from filter', () => {
			const action = {
				type: CHANGE_METHOD_ADDRESS,
				payload: 2
			};

			expect(filter.id(undefined, action)).toBe(action.payload);
		});
	});

	describe('categoryId', () => {
		it('should change `categoryId` key from filter', () => {
			const action = {
				type: CHANGE_CURRENT_CATEGORY,
				payload: 3
			};

			expect(filter.categoryId(undefined, action)).toBe(action.payload);
		});
	});

	describe('search', () => {
		it('should change `search` key from filter', () => {
			const action = {
				type: CHANGE_FILTER_TEXT,
				payload: 'text to search'
			};

			expect(filter.search(undefined, action)).toBe(action.payload);
		});
	});
});
