import { createStore,combineReducers,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import {Reducers} from '../Modules';

import initState from '../initState';

import  callAPIMiddleware from '../Middlewares/callAPIMiddleware';


const loggerMiddleware = createLogger();


module.exports = function configureStore(initialState) {

	let store = createStore(combineReducers(Reducers), initState, applyMiddleware(
		thunkMiddleware, loggerMiddleware ,callAPIMiddleware
	));

    return store
}

