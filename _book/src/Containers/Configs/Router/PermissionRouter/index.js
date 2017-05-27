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

import {Permission,Basic} from 'kr/Containers';

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
		<Route path="user" component={Permission.User}/>
		<Route path="operations" component={Permission.Operations}/>
		<Route path="accountList" component={Permission.AccountList}/>
		<Route path="login" component={Permission.Login}/>
		<Route path="userlist/:userId" component={Permission.UserList}>
			<Redirect from="permission" to="permission/userlist"/>
		</Route>
		<Route path="personalCenter" component={Permission.PersonalCenter}/>
		<Redirect from="permission" to="permission/personalCenter" />
	</Route>
	);
};
