import React from 'react';

import { Router, Route, Link,IndexRoute,browserHistory} from 'react-router';


import {
	Home,
	Notify,
	Memo,
	Help,
	Docs,
	Order,
	Undefined
} from './Containers';

import Master from './master';

export default(

	<Route path="/" component={Master}  >
		<IndexRoute component={Home}/>
		<Route path="index" component={Home}/>
		<Route path="notify" component={Notify}/>
		<Route path="memo" component={Memo}/>
		<Route path="help" component={Help}/>
		<Route path="docs" component={Docs}/>
		<Route path="order" component={Order}/>
		<Route path="undefined" component={Undefined}/>
	</Route>

);
