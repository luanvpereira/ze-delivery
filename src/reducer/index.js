import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import filter from './filter';
import loader from './loader';

export const middlewares = () => [ thunk ];

export const initializeStore = initialState =>
	createStore(
		combineReducers({
			filter,
			loader
		}),
		initialState,
		composeWithDevTools(applyMiddleware(...middlewares()))
	);
