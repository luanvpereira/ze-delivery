import wait from '../wait';

describe('wait', () => {
	it('should call a promise callback only once when trying to dispatch several times', async () => {
		jest.useFakeTimers();

		const dispatch = jest.fn();
		const dispatchFunc = cb => wait('DISPATCH', 600).then(cb);

		const dispatches = [];

		for (let i = 0; i < 100; i++) {
			dispatches.push(Promise.resolve(true));
			dispatchFunc(dispatch);
		}

		jest.runAllTimers();

		Promise.all(dispatches).then(() => {
			expect(dispatch.mock.calls).toHaveLength(1);
		});
	});
});
