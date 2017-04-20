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


import Welcome from 'kr/Containers/Welcome';
import Help from 'kr/Containers/Help';
import Undefined from 'kr/Containers/Undefined';
import Basic from 'kr/Containers/Basic';
import Initialize from 'kr/Containers/Initialize';
import Demo from 'kr/Containers/Demo';


import Master from 'kr/master';

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


export default (

    <Route path="/" component={Master}>

        <IndexRoute component={Welcome}  onEnter={({params}, replace) =>{
            Store.dispatch(Actions.switchSidebarNav(false));
        }} onLeave={({params},replace)=>{
            Store.dispatch(Actions.switchSidebarNav(true));
        }}/>

        <Route path="index" component={Welcome}  onEnter={({params}, replace) =>{
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

		{/*帮助*/}
		<Route path="help" component={Help}/>

        <Route path="initialize" component={Initialize}/>

		{/*404*/}
		<Route path="undefined" component={Undefined}/>
		<Route path="*" component={Undefined}/>

	</Route>

);
