import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import filter from './filter';

export const middlewares = () => [ thunk ];

export const initializeStore = initialState =>
	createStore(
		combineReducers({
			filter
		}),
		initialState,
		composeWithDevTools(applyMiddleware(...middlewares()))
	);
