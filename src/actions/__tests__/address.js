import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import * as addressActions from '../address';
import validAddressResponse from '../../../test-utils/mocked-store/address';

import { CHANGE_CURRENT_ADDRESS } from '../../types';
import { GEOCODE_URL } from '../../constants';

const mock = new MockAdapter(axios);

describe('address', () => {
	describe('#setCurrentAddress', () => {
		it('should be a valid action', () => {
			expect(addressActions.setCurrentAddress(validAddressResponse[0])).toEqual({
				type: CHANGE_CURRENT_ADDRESS,
				payload: {
					formattedAddress: 'R. Cuiabá - Alto da Mooca, São Paulo - SP, Brazil',
					location: { lat: -23.5606203, lng: -46.5903842 },
					placeId: 'ChIJn826YLJezpQRDhdmNWzKsdw'
				}
			});
		});
	});

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
