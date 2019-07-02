export const setCurrentMethod = jest.fn()
	.mockImplementation(() => ({ type: Math.floor(Math.random() * 20) }));

export const changeCategory = jest.fn()
	.mockImplementation(() => ({ type: Math.floor(Math.random() * 20) }));

export const changeFilterText = jest.fn()
	.mockImplementation(() => ({ type: Math.floor(Math.random() * 20) }));
