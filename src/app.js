import React from 'react';
import ReactDOM from 'react-dom';
import { Router,browserHistory} from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';



import { createStore,combineReducers,applyMiddleware} from 'redux';
import { Provider,connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import {fetchCompanys} from './Action';


import * as reducers from './Reducers';
import routes from './routes';

import initState from './initState';


injectTapEventPlugin({
	/*
	shouldRejectClick: function (lastTouchEventTimestamp, clickEventTimestamp) {
		return true;
	}
	*/
});

const loggerMiddleware = createLogger();

let store = createStore(combineReducers(reducers), initState, applyMiddleware(
	thunkMiddleware, loggerMiddleware 
));

store.dispatch(fetchCompanys());


ReactDOM.render((

	<MuiThemeProvider>
	<Provider store={store} key="provider"> 
	<Router history={browserHistory} routes={routes} />
	</Provider>
	</MuiThemeProvider>

), document.getElementById('app'))


