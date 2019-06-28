import { CHANGE_CURRENT_ADDRESS } from '../../types';
import { currentAddress } from '../address';
describe('address', () => {
	describe('#currentAddress', () => {
		it('should return a new payload', () => {
			const newPayload = 'faria lima';

			expect(currentAddress(undefined, {
				type: CHANGE_CURRENT_ADDRESS,
				payload: newPayload
			})).toEqual(newPayload);
		});

		it('should return null when type is not found', () => {
			expect(currentAddress(undefined, {})).toBe(null);
		});
	});
});
