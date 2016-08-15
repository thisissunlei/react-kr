import { createStore,combineReducers,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import * as reducers from '../Reducers';
import initState from '../initState';


const loggerMiddleware = createLogger();


module.exports = function configureStore(initialState) {

	let store = createStore(combineReducers(reducers), initState, applyMiddleware(
		thunkMiddleware, loggerMiddleware 
	));

    return store
}




