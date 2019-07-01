import axios from 'axios';

import { CHANGE_CURRENT_ADDRESS } from '../types';
import { GEOCODE_URL, GOOGLE_CREDENTIAL } from '../constants';

export const setCurrentAddress = ({
	geometry: { location: payload }
}) => ({
	type: CHANGE_CURRENT_ADDRESS,
	payload
});

export const getAddressess = address => async () => {
	const {
		data: { results: addresses }
	} = await axios.get(`${GEOCODE_URL}?address=${address}&key=${GOOGLE_CREDENTIAL}`);

	return addresses;
};
