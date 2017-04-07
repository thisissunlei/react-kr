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


import DemoRouter from './DemoRouter';
import OperationRouter from './OperationRouter';

import {
    Welcome,
    Help,
    Undefined,
    Permission,
    Document,
    Operation,
    Basic,
    OA,
    Initialize,
    Demo,
    Finance,
    Member,
    Community,
    Retail,
    Statistical,
    customerManage
} from 'kr/Containers';

import Master from 'kr/master';

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

        <Route path="initialize" component={Initialize}/>

        {/*demo*/}

				{DemoRouter()}

        {/*会员中心*/}
        <Route path="member" component={Basic}>
             <IndexRedirect to="memberManage/list" />
            <Route path="memberManage" component={Basic}>
                <Route path="list"  component={Member.MemberManage.List}/>
                <Route path=":memberId/detail/:companyId"  component={Member.MemberManage.Detail}/>
                <Route path="setting"  component={Member.MemberManage.Setting}/>
                <Route path="card"  component={Member.MemberManage.Card}/>
                <Route path="doormanage"  component={Member.MemberManage.DoorManage}/>
            </Route>

        </Route>

        {/*统计看板*/}
        <Route path="statistical" component={Basic}>
            <Route path="index" component={Statistical.Home}/>
                <IndexRedirect to="index" />
        </Route>


        {/*社区经营*/}
        <Route path="community" component={Basic}>
             <IndexRedirect to="communityManage/detail" />
            {/*销控表*/}

            <Route path="communityManage" component={Basic}>
                    <Route path="detail" component={Operation.CommunityManage.Detail}/>
            </Route>
            {/*公司成员*/}

            <Route path="companyMembers" component={Basic}>
                    <Route path=":companyId/list/:communityId" component={Operation.CommunityManage.CompanyMembers}/>
            </Route>
        </Route>

        {/*OA办公*/}
        <Route path="oa" component={Basic}>
            <Route path="index" component={OA.Home}/>
        </Route>

        {/*商品零售*/}
        <Route path="retail" component={Basic}>
            <Route path="index" component={Retail.Home}/>
        </Route>

           {/*运营管理*/}
           
               {OperationRouter()}

            {/*财务管理*/}
               <Route path="finance" component={Basic}>

            <IndexRedirect to="manage/audit/auditlist"/>

            <Route path="manage" component={Basic}>
                <Route path="orderbill" component={Basic}>
                    <Route path="receiptList" component={Finance.Manage.OrderBill.ReceiptList}/> {/*订单账单*/}
                    <Route path="orderList" component={Finance.Manage.OrderBill.OrderList}/> {/*订单账单明细*/}
                    <Route path=":orderId/detail" component={Finance.Manage.OrderBill.OrderBillDetail}/>
                </Route>

                <Route path="fundSetting" component={Basic}>
                    <Route path="totalFund" component={Finance.Manage.FundSetting.TotalFund}/>
                    <Route path=":fundId/detailFund" component={Finance.Manage.FundSetting.DetailFund}/>
                </Route>

                {/*开票列表*/}
                <Route path="invoice" component={Basic}>
                    <Route path="list" component={Finance.Manage.Invoice}/>
                </Route>

                {/*代码配置*/}
                <Route path="codeSetting" component={Basic}>
                    <Route path="attribute" component={Finance.Manage.CodeSetting.Attribute}/>
                    <Route path="subject" component={Finance.Manage.CodeSetting.Subject}/>
                </Route>
                {/*审核列表*/}
                <Route path="audit" component={Basic}>
                    <Route path="auditlist" component={Finance.Manage.Audit}/>
                </Route>
            </Route>
        </Route>


        {/*权限管理*/}
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

        {/*文档管理*/}
        <Route path="document" component={Basic}>
            <Route path="index" component={Document.Home}/>
        </Route>

        {/*帮助*/}
        <Route path="help" component={Help}/>

        {/*404*/}
        <Route path="undefined" component={Undefined}/>
        <Route path="*" component={Undefined}/>

    </Route>

);
