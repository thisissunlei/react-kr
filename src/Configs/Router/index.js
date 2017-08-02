import React from 'react';
import {
    Router,
    Route,
    Link,
    Redirect,
    IndexRoute,
    browserHistory,
    IndexRedirect
} from 'react-router';

import {
    Actions,
    Store
} from 'kr/Redux';


import Basic from 'kr/Containers/Basic';
import Demo from 'kr/Containers/Demo';


import DemoRouter from './DemoRouter';
import MemberRouter from './MemberRouter';
import CommunityRouter from './CommunityRouter';
import PermissionRouter from './PermissionRouter';
import DocumentRouter from './DocumentRouter';
import WebBackstageRouter from './WebBackstageRouter';
import FinanceRouter from './FinanceRouter';
import StatisticalRouter from './StatisticalRouter';
import OARouter from './OARouter';
import RetailRouter from './RetailRouter';
import OperationRouter from './OperationRouter';
import SmartHardware from './SmartHardware';

const Master = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/master').default)
  }, 'Master')
}

const Welcome = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Welcome').default)
  }, 'Welcome')
}

const Help = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Help').default)
  }, 'Help')
}


const Initialize = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Initialize').default)
  }, 'Initialize')
}

const Undefined = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Undefined').default)
  }, 'Undefined')
}



export default (

    <Route path="/" getComponent={Master}>

        <IndexRoute getComponent={Welcome}  onEnter={({params}, replace) =>{
            Store.dispatch(Actions.switchSidebarNav(false));
        }} onLeave={({params},replace)=>{
            Store.dispatch(Actions.switchSidebarNav(true));
        }}/>

        <Route path="index" getComponent={Welcome}  onEnter={({params}, replace) =>{
            Store.dispatch(Actions.switchSidebarNav(false));
        }} onLeave={({params},replace)=>{
            Store.dispatch(Actions.switchSidebarNav(true));
        }}/>

        <Redirect from="messages/:id" to="/messages/:id" />

        {DemoRouter()}
        {MemberRouter()}

        {/*统计看板*/}

            {StatisticalRouter()}

        {/*社区经营*/}
        {CommunityRouter()}

        {/*OA办公*/}
        {OARouter()}
        {/*商品零售*/}

        {RetailRouter()}

        {/*运营管理*/}
        {OperationRouter()}

        {/*财务管理*/}
        {FinanceRouter()}

        {/*后台管理*/}
        {WebBackstageRouter()}

        {/*权限管理*/}
        {PermissionRouter()}

        {/*文档管理*/}
        {DocumentRouter()}
        
        {/*智能硬件*/}
        {SmartHardware()}

		{/*帮助*/}
		<Route path="help" getComponent={Help}/>

        <Route path="initialize" getComponent={Initialize}/>

		{/*404*/}
		<Route path="undefined" getComponent={Undefined}/>
		<Route path="*" getComponent={Undefined}/>

    </Route>

);
