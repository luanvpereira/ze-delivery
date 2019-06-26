import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export const middlewares = () => [thunk];

export const initializeStore = (initialState = {}) =>
	createStore(
		combineReducers({}),
		initialState,
		composeWithDevTools(applyMiddleware(...middlewares())),
	);
