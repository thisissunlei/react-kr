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



const Basic = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Basic').default)
  }, 'Basic')
}

const Permission_PersonalCenter = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Permission/PersonalCenter').default)
  }, 'Permission_PersonalCenter')
}
const Permission_User = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Permission/User').default)
  }, 'Permission_User')
}
const Permission_Operations = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Permission/Operations').default)
  }, 'Permission_Operations')
}
const Permission_AccountManage_AccountList = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Permission/AccountManage/AccountList').default)
  }, 'Permission_AccountManage_AccountList')
}
const Permission_Login = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Permission/Login').default)
  }, 'Permission_Login')
}
const Permission_UserList = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Permission/UserList').default)
  }, 'Permission_UserList')
}
const Permission_AccountManage_OperationsLogs = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Permission/AccountManage/OperationsLogs').default)
  }, 'Permission_AccountManage_OperationsLogs')
}
const Permission_LoginLog = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Permission/LoginLog').default)
  }, 'Permission_LoginLog')
}
module.exports =()=>{

	return (
		<Route path="permission" getComponent={Basic}>
      <IndexRedirect to="accountManage/accountList"/>
		{/*
		<Route path="index" component={Permission.Home}/>
		<Route path="notify" component={Permission.Notify}/>
		<Route path="memo" component={Permission.Memo}/>
		<Route path="docs" component={Permission.Docs}/>
		<Route path="order" component={Permission.Order}/>

		*/}
		<Route path="user" getComponent={Permission_User}/>
		<Route path="operations" getComponent={Permission_Operations}/>
		<Route path="login" getComponent={Permission_Login}/>
    <Route path="loginlog" getComponent={Permission_LoginLog}/>
    <Route path="accountManage" getComponent={Basic}>
  			<Route path="accountList" getComponent={Permission_AccountManage_AccountList}/>
        <Route path="operationsLogs" getComponent={Permission_AccountManage_OperationsLogs}/>
    </Route>
		<Route path="userlist/:userId" getComponent={Permission_UserList}>
			<Redirect from="permission" to="permission/userlist"/>
		</Route>
		<Route path="personalCenter" getComponent={Permission_PersonalCenter}/>
		<Redirect from="permission" to="permission/personalCenter" />
	</Route>
	);
};
