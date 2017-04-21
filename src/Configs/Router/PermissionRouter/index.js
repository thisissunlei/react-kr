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

import Basic from 'kr/Containers/Basic';

const Permission_PersonalCenter = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Permission/PersonalCenter').default)
  }, 'Permission_PersonalCenter')
}

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

		<Route path="personalCenter" getComponent={Permission_PersonalCenter}/>
		<Redirect from="permission" to="permission/personalCenter" />
	</Route>
	);
};
