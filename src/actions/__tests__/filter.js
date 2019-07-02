import * as filterActions from '../filter';

const assertActions = actionReturn => {
	expect(actionReturn).toHaveProperty('type');
};

describe('filter', () => {
	it('check actions', () => {
		assertActions(filterActions.setCurrentMethod());
		assertActions(filterActions.changeCategory());
		assertActions(filterActions.changeFilterText());
	});
});
