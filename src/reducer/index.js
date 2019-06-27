import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import address from './address';

export const middlewares = () => [ thunk ];

export const initializeStore = (initialState = {}) =>
	createStore(
		combineReducers({
			address
		}),
		initialState,
		composeWithDevTools(applyMiddleware(...middlewares()))
	);
