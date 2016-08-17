import { createStore,combineReducers,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import * as reducers from '../Reducers';
import initState from '../initState';

import  callAPIMiddleware from '../Middlewares/callAPIMiddleware';


const loggerMiddleware = createLogger();


module.exports = function configureStore(initialState) {

	let store = createStore(combineReducers(reducers), initState, applyMiddleware(
		thunkMiddleware, loggerMiddleware ,callAPIMiddleware
	));

    return store
}

