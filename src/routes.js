import React from 'react';

import { Router, Route, Link,IndexRoute,browserHistory} from 'react-router';


import {
	Home,
	Notify,
	Memo
} from './Containers';

import Master from './master';

export default(

	<Route path="/" component={Master} onUpdate={() => window.scrollTo(0, 0)} >

		<IndexRoute component={Home}/>
		<Route path="index" component={Home}/>
		<Route path="notify" component={Notify}/>
		<Route path="memo" component={Memo}/>

	</Route>

);
