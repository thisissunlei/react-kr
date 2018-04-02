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


const Permission_SystemManage_AppLoginLogs = (location, callback) => {
  require.ensure([], require => {
      callback(null, require('kr/Containers/Permission/SystemManage/AppLoginLogs').default)
  }, 'Permission_SystemManage_AppLoginLogs')
}

const Permission_OpCode = (location, callback) => {
  require.ensure([], require => {
      callback(null, require('kr/Containers/Permission/OpCode').default)
  }, 'Permission_OpCode')
}
const Permission_SystemManage_MessageList = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Permission/SystemManage/MessageList').default)
  }, 'Permission_SystemManage_MessageList')
}

const Permission_SystemManage_UpdateLog = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Permission/SystemManage/UpdateLog').default)
  }, 'Permission_SystemManage_UpdateLog')
}


const Permission_AccountManage_OperationSource = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Permission/AccountManage/OperationSource').default)
  }, 'Permission_AccountManage_OperationSource')
}

const Permission_MenuSetting = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Permission/MenuSetting').default)
  }, 'Permission_MenuSetting')
}

const Permission_ProcessManage_ProcessSetting= (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Permission/ProcessManage/ProcessSetting').default)
  }, 'Permission_ProcessManage_ProcessSetting')
}

const Permission_ProcessManage_Dictionary= (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Permission/ProcessManage/Dictionary').default)
  }, 'Permission_ProcessManage_Dictionary')
}

const Permission_ProcessManage_BasicSetting= (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Permission/ProcessManage/BasicSetting').default)
  }, 'Permission_ProcessManage_BasicSetting')
}


const Permission_ProcessManage_Form= (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Permission/ProcessManage/Form').default)
  }, 'Permission_ProcessManage_Form')
}
/*首页配置-轮播列表*/
const Permission_HomePageSetting_SwperList = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Permission/HomePageSetting/SwperList').default)
  }, 'Permission_HomePageSetting_SwperList')
}

/*首页配置-动态列表*/
const Permission_HomePageSetting_DynamicsList = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Permission/HomePageSetting/DynamicsList').default)
  }, 'Permission_HomePageSetting_SwperList')

}

const Permission_ProcessManage_SqlModel= (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Permission/ProcessManage/SqlModel').default)
  }, 'Permission_ProcessManage_SqlModel')
}
// 登录拆分
const Permission_LoginLog_App = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Permission/LoginLog/AppLog').default)
  }, 'Permission_LoginLog')
}
const Permission_LoginLog_PC = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Permission/LoginLog/PcLog').default)
  }, 'Permission_LoginLog')
}


module.exports =()=>{

	return (
		<Route path="permission" getComponent={Basic}>
      <IndexRedirect to="accountManage/accountList"/>
      <Route path="user" getComponent={Permission_User}/>
		  <Route path="user/:page" getComponent={Permission_User}/>
		  <Route path="operations" getComponent={Permission_Operations}/>
      <Route path="loginlog" getComponent={Permission_LoginLog_PC}/>
      <Route path="loginlogApp" getComponent={Permission_LoginLog_App}/>
      <Route path="accountManage" getComponent={Basic}>
          <Route path="accountList" getComponent={Permission_AccountManage_AccountList}/>
          <Route path="operationsLogs" getComponent={Permission_AccountManage_OperationsLogs}/>
          <Route path="operationSource" getComponent={Permission_AccountManage_OperationSource}/>
      </Route>
      {/*首页配置*/}

       <Route path="homePageSetting" getComponent={Basic}>
          <Route path="swperList" getComponent={Permission_HomePageSetting_SwperList}/>
          <Route path="dynamicsList" getComponent={Permission_HomePageSetting_DynamicsList}/>
      </Route>
      <Route path="userlist/:userId/:page" getComponent={Permission_UserList}>
        <Redirect from="permission" to="permission/userlist"/>
      </Route>
      <Route path="opCode" getComponent={Permission_OpCode}/>
      <Route path="menuSetting" getComponent={Permission_MenuSetting}/>
      <Route path="personalCenter" getComponent={Permission_PersonalCenter}/>
      <Redirect from="permission" to="permission/personalCenter" />
      <Route path="systemManage" getComponent={Basic}>
      <Route path="appLoginLogs" getComponent={Permission_SystemManage_AppLoginLogs}/>
        <Route path="messageList" getComponent={Permission_SystemManage_MessageList}/>
            <Route path="update-log" getComponent={Permission_SystemManage_UpdateLog}/>
      </Route>
    {/*流程管理*/}
    <Route path="processManage" getComponent={Basic}>
      <Route path="processSetting" getComponent={Permission_ProcessManage_ProcessSetting}/>
      <Route path="dictionary" getComponent={Permission_ProcessManage_Dictionary}/>
      <Route path="form" getComponent={Permission_ProcessManage_Form}/>
      <Route path=":processId/basicSetting" getComponent={Permission_ProcessManage_BasicSetting}/>
      <Route path="sqlModel" getComponent={Permission_ProcessManage_SqlModel}/>
    </Route>
	  </Route>
	);
};
