import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import * as addressActions from '../address';
import validAddressResponse from '../../../test-utils/mocked-store/address';

import { GEOCODE_URL } from '../../constants';

const mock = new MockAdapter(axios);

describe('address', () => {
	describe('#getAddressess', () => {
		it('should get addresses', async () => {
			mock.onGet(new RegExp(`^${GEOCODE_URL}`)).reply(200, {
				results: validAddressResponse
			});

			const addressess = await addressActions.getAddressess('rua cuiaba')();

			expect(addressess).toEqual(validAddressResponse);
		});
	});
});
