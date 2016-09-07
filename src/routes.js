import React from 'react';

import { Router, Route, Link,IndexRoute,browserHistory} from 'react-router';




import {
	Help,
	Undefined,
	Permission,
	Document,
	Operation,
} from './Containers';

import Master from './master';

export default(

	<Route path="/" component={Master}>
		<IndexRoute component={Permission.Home}/>
		<Route path="index" component={Permission.Home}/>


		{/*运营管理*/}
		<Route path="operation" component={Operation.Basic}>
			<Route path="index" component={Operation.Home}/>
			<Route path="finance" component={Operation.Finance}/>
		</Route>

		{/*权限管理*/}
		<Route path="permission" component={Permission.Basic}>
			<IndexRoute component = {Permission.Home}/>
			<Route path="index" component={Permission.Home}/>
			<Route path="notify" component={Permission.Notify}/>
			<Route path="memo" component={Permission.Memo}/>
			<Route path="docs" component={Permission.Docs}/>
			<Route path="order" component={Permission.Order}/>
		</Route>


		{/*文档管理*/}
		<Route path="document" component={Document.Basic}>
			<Route path="index" component={Document.Home}/>
		</Route>

		{/*帮助*/}
		<Route path="help" component={Help}/>

		{/*404*/}
		<Route path="undefined" component={Undefined}/>
		<Route path="*" component={Undefined}/>

	</Route>

);
