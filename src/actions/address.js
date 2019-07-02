import axios from 'axios';

import { GEOCODE_URL, GOOGLE_CREDENTIAL } from '../constants';

export const getAddressess = address => async () => {
	const {
		data: { results: addresses }
	} = await axios.get(`${GEOCODE_URL}?address=${address}&key=${GOOGLE_CREDENTIAL}`);

	return addresses;
};
