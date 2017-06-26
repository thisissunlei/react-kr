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

const Permission_SystemManage_AppLoginLogs = (location, callback) => {
  require.ensure([], require => {
      callback(null, require('kr/Containers/Permission/SystemManage/AppLoginLogs').default)
  }, 'Permission_SystemManage_AppLoginLogs')
}

const Permission_SystemManage_MessageList = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Permission/SystemManage/MessageList').default)
  }, 'Permission_SystemManage_MessageList')
}
const Permission_SystemManage_VersionManage = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Permission/SystemManage/VersionManage').default)
  }, 'Permission_SystemManage_VersionManage')
}
const Permission_AccountManage_OperationSource = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Permission/AccountManage/OperationSource').default)
  }, 'Permission_AccountManage_OperationSource')
}
module.exports =()=>{

	return (
		<Route path="permission" getComponent={Basic}>
      <IndexRedirect to="accountManage/accountList"/>
		<Route path="user" getComponent={Permission_User}/>
		<Route path="operations" getComponent={Permission_Operations}/>
    <Route path="loginlog" getComponent={Permission_LoginLog}/>
    <Route path="accountManage" getComponent={Basic}>
  			<Route path="accountList" getComponent={Permission_AccountManage_AccountList}/>
        <Route path="operationsLogs" getComponent={Permission_AccountManage_OperationsLogs}/>
        <Route path="operationSource" getComponent={Permission_AccountManage_OperationSource}/>
    </Route>
		<Route path="userlist/:userId" getComponent={Permission_UserList}>
			<Redirect from="permission" to="permission/userlist"/>
		</Route>
		<Route path="personalCenter" getComponent={Permission_PersonalCenter}/>
	  <Redirect from="permission" to="permission/personalCenter" />
    <Route path="systemManage" getComponent={Basic}>
     <Route path="appLoginLogs" getComponent={Permission_SystemManage_AppLoginLogs}/>
      <Route path="messageList" getComponent={Permission_SystemManage_MessageList}/>
    </Route>
	  </Route>


	);
};
