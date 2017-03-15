import React from 'react';
import ReactDOM from 'react-dom';
import { Router,browserHistory,hashHistory,useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Provider,connect } from 'react-redux';

import routes from './Configs/routes';

import store from './Redux/Store';

//document.domain = "krspace.cn";

injectTapEventPlugin({
	/*
	shouldRejectClick: function (lastTouchEventTimestamp, clickEventTimestamp) {
		return true;
	}
	*/
});


import * as actionCreators from 'kr-ui/../Redux/Actions';



ReactDOM.render((
	<MuiThemeProvider>
		<Provider store={store} key="provider">
			<Router
				routes={routes}
				history={useRouterHistory(createHashHistory)({queryKey: false})}
				onUpdate={() => {
					window.scrollTo(0, 0)
					store.dispatch(actionCreators.setCurrentNav(window.location.hash));
				}}
				/>
		</Provider>
	</MuiThemeProvider>
), document.getElementById('app'))
