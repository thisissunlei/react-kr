import React from 'react';
import ReactDOM from 'react-dom';
import { Router,browserHistory} from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';


import typography from 'material-ui/styles/typography';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {cyan500, grey200, darkWhite} from 'material-ui/styles/colors';

import { Provider,connect } from 'react-redux';

import routes from './routes';

import configureStore from './Redux/Store';


injectTapEventPlugin({
	/*
	shouldRejectClick: function (lastTouchEventTimestamp, clickEventTimestamp) {
		return true;
	}
	*/
});


let store = configureStore();

ReactDOM.render((
	<MuiThemeProvider>
		<Provider store={store} key="provider"> 
			<Router history={browserHistory} routes={routes} />
		</Provider>
	</MuiThemeProvider>
), document.body)


