export const hideLoader = jest.fn().mockImplementation(() => ({
	type: Math.floor(Math.random() * 1000)
}));

export const showLoader = jest.fn().mockImplementation(() => ({
	type: Math.floor(Math.random() * 1000)
}));
