import React from 'react';
import ReactDOM from 'react-dom';
import { Router,browserHistory,hashHistory,useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Provider } from 'react-redux';
import MobxReact from 'mobx-react';

import routes from 'kr/Configs/Router';

import store from 'kr/Redux/Store';

import MobxStore from 'kr/Store';

import  'kr/Styles/index.less';

//document.domain = "krspace.cn";
injectTapEventPlugin({
	/*
	shouldRejectClick: function (lastTouchEventTimestamp, clickEventTimestamp) {
		return true;
	}
	*/
});

import * as Actions from 'kr/Redux/Actions';

import {Debug} from 'kr/Utils';

window.Debug = Debug;


ReactDOM.render((
	<MuiThemeProvider>
		<Provider store={store} key="provider">
			<MobxReact.Provider {...MobxStore}>
			<Router
				routes={routes}
				history={hashHistory}
				onUpdate={() => {
					window.scrollTo(0, 0)
					store.dispatch(Actions.setCurrentNav(window.location.hash));
					MobxStore.NavModel.setRouter();
				}}
				/>
			</MobxReact.Provider>
		</Provider>
	</MuiThemeProvider>
), document.getElementById('app'))
