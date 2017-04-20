import React from 'react';
import {
	Router,
	Route,
	Link,
	Redirect,
	IndexRoute,
	IndexRedirect
} from 'react-router';

import {
	Actions,
	Store
} from 'kr/Redux';

import Permission from 'kr/Containers/Permission';
import Basic from 'kr/Containers/Basic';

module.exports =()=>{

	return (
		<Route path="permission" component={Basic}>
			{/*
	<Route path="index" component={Permission.Home}/>
	<Route path="notify" component={Permission.Notify}/>
	<Route path="memo" component={Permission.Memo}/>
	<Route path="docs" component={Permission.Docs}/>
	<Route path="order" component={Permission.Order}/>

*/}

		<Route path="personalCenter" component={Permission.PersonalCenter}/>
		<Redirect from="permission" to="permission/personalCenter" />
	</Route>
	);
};
