import React from 'react';
import ReactDOM from 'react-dom';
import { Router,browserHistory,hashHistory,useRouterHistory,Route,IndexRoute} from 'react-router';
import {createHashHistory} from 'history';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Provider } from 'react-redux';
import MobxReact from 'mobx-react';

import store from 'kr/Redux/Store';

import MobxStore from 'kr/Store';

injectTapEventPlugin({ });

import * as Actions from 'kr/Redux/Actions';

import {Debug} from 'kr/Utils';

window.Debug = Debug;

const Master  = ({...props})=><div {...props}></div>;
const Welcome  = ({...props})=><div>welcome</div>;

ReactDOM.render((
	<MuiThemeProvider>
		<Provider store={store} key="provider">
			<MobxReact.Provider {...MobxStore}>
				<Router
					routes={  
						<Route path="/" component={Master}>
							<IndexRoute component={Welcome} />
							<Route path="index" component={Welcome} />
						</Route>
					}
					history={hashHistory}
				/>
			</MobxReact.Provider>
		</Provider>
	</MuiThemeProvider>
), document.getElementById('app'))
