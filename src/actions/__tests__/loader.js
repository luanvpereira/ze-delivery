import * as loaderActions from '../loader';

describe('loader', () => {
	it('check actions', () => {
		assertActions(loaderActions.showLoader());
		assertActions(loaderActions.hideLoader());
	});
});
