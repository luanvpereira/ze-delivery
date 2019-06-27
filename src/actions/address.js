import axios from 'axios';

import { CHANGE_CURRENT_ADDRESS } from '../types';
import { GEOCODE_URL, GOOGLE_CREDENTIAL } from '../constants';

export const setCurrentAddress = ({
	formatted_address: formattedAddress,
	geometry: { location },
	place_id: placeId
}) => dispatch => {
	dispatch({
		type: CHANGE_CURRENT_ADDRESS,
		payload: {
			formattedAddress,
			location,
			placeId
		}
	});
};

export const clearCurrentAddress = () => ({
	type: CHANGE_CURRENT_ADDRESS,
	payload: null
});

export const getAddressess = address => async () => {
	const {
		data: { results: addresses }
	} = await axios.get(`${GEOCODE_URL}?address=${address}&key=${GOOGLE_CREDENTIAL}`);

	return addresses;
};
