import React from 'react';

import { Router, Route, Link,IndexRoute,browserHistory} from 'react-router';




import Permission from './Containers/Permission';

import {
	Help,
	Undefined
} from './Containers';

import Master from './master';

export default(

	<Route path="/" component={Master}  >
		<IndexRoute component={Permission.Home}/>
		<Route path="index" component={Permission.Home}/>

		<Route path="permission" component={Permission.Home}>
			<Route path="notify" component={Permission.Notify}/>
			<Route path="memo" component={Permission.Memo}/>
			<Route path="docs" component={Permission.Docs}/>
			<Route path="order" component={Permission.Order}/>
		</Route>



		<Route path="help" component={Help}/>

		<Route path="undefined" component={Undefined}/>


	</Route>

);
