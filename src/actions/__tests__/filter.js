import * as filterActions from '../filter';

describe('filter', () => {
	it('check actions', () => {
		assertActions(filterActions.setCurrentMethod());
		assertActions(filterActions.changeCategory());
		assertActions(filterActions.changeFilterText());
	});
});
