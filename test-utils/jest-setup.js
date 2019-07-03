const assertActions = actionReturn => {
	expect(actionReturn).toHaveProperty('type');
};

global.assertActions = assertActions;
