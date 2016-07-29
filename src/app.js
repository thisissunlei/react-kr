import React from 'react';
import ReactDOM from 'react-dom';
import { Router,browserHistory} from 'react-router';

import { createStore,combineReducers,applyMiddleware} from 'redux';
import { Provider,connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import {fetchCompanys} from './Action';


import * as reducers from './Reducers';
import routes from './routes';

import initState from './initState';


const loggerMiddleware = createLogger();

let store = createStore(combineReducers(reducers), initState, applyMiddleware(
	thunkMiddleware, loggerMiddleware 
));

store.dispatch(fetchCompanys());

ReactDOM.render((

	<Provider store={store} key="provider"> 
	<Router history={browserHistory} routes={routes} />
	</Provider>

), document.getElementById('app'))



