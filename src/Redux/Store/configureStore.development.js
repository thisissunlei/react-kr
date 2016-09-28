import { createStore,combineReducers,applyMiddleware,compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import {Reducers} from '../Modules';

import initState from '../initState';

import  callAPIMiddleware from '../Middlewares/callAPIMiddleware';


const loggerMiddleware = createLogger();


function configureStore(initialState) {

	let store = createStore(combineReducers(Reducers), initState, compose(applyMiddleware(
			thunkMiddleware, loggerMiddleware ,callAPIMiddleware
		),
		 typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
	));

    return store
}

module.exports = configureStore(initState);

