import addressReponse from '../../../test-utils/mocked-store/address'

export const setCurrentAddress = jest.fn().mockImplementation(() => ({
	type: Math.floor(Math.random() * 1000)
}));

export const clearCurrentAddress = jest.fn().mockImplementation(() => ({
	type: Math.floor(Math.random() * 1000)
}));

export const getAddressess = address => jest.fn().mockImplementation(() => {
	if (address == 'rua cuiaba') {
		return Promise.resolve(addressReponse);
	} else {
		return Promise.resolve([]);
	}
});
