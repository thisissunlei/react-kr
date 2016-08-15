import React from 'react';

import { Router, Route, Link,IndexRoute,browserHistory} from 'react-router';


import {Home} from './Containers';

import Master from './master';

export default(

	<Route path="/" component={Master}>

	<IndexRoute component={Home}/>

	<Route path="index" component={Home}/>

	</Route>

);
