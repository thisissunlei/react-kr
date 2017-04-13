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
    customerManage,
    WebBackstage,
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
        <Route path="demo" component={Basic}>

            <Route path="zhangqu" component={Demo.ZhangQu}/>
            <Route path="machaoyue" component={Demo.MaChaoYue}/>
            <Route path="dongfanai" component={Demo.DongFanAi}/>
            <Route path="liuyihao" component={Basic}>
                <Route path="new" component={Demo.LiuYiHao.New}/>
                <Route path="detail" component={Demo.LiuYiHao.Detail}/>
            </Route>
            <Route path="zhangchi" component={Demo.ZhangChi}/>
            <Route path="tanlinlin" component={Demo.TanLinLin}/>
            <Route path="wushulin" component={Demo.WuShuLin}/>
        </Route>

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
        <Route path="operation" component={Basic}>
                <Route path="index" component={Operation.Home}/>
        {/*分组模版管理*/}
        <Route path="groupSetting" component={Operation.GroupSetting}/>

        {/*社区配置*/}
        <Route path="communityAllocation" component={Basic}>
                <Route path="communityList" component={Operation.CommunityAllocation.CommunityList}/>
                {/*设备列表*/}
                <Route path="equipmentList" component={Operation.CommunityAllocation.EquipmentList}/>
        </Route>
        {/*基础配置*/}
        <Route path="basicConfig" component={Basic}>
            {/*商圈列表*/}
            <Route path="businessList" component={Operation.BasicConfig.BusinessList} />

            {/*设备定义*/}
            <Route path="EquipmentDefinition" component={Operation.BasicConfig.EquipmentDefinition} name="EquipmentDefinition"/>
            
        </Route>
                 {/*客户管理*/}
                <Route path="customerManage" component={Basic}>
                    <Route path="customerList" component={Operation.CustomerManage.CustomerList} />
                    <Route path="agreementList" component={Operation.CustomerManage.AgreementList} />
                    {/*客户公海*/}
                    <Route path="customerHighSea" component={Operation.CustomerManage.CustomerHighSea}/>
                    <Route path="list" component={Operation.CustomerManage.List} />

                    <Route path=":customerId/" component={Basic} >

                                {/*订单*/}
                                <Route path="order" component={Basic}>
                                    <Route path="create" component = {Operation.CustomerManage.Order.Create} name="customerManage_order_create"/>
                                    <Route path=":orderId/detail" component = {Operation.CustomerManage.Order.Detail} name="customerManage_order_detail"/>
                                    <Route path=":orderId/Edit" component = {Operation.CustomerManage.Order.Edit} name="customerManage_order_edit"/>


                                    {/*合同信息*/}
                                    <Route path=":orderId/agreement" component={Basic}>

                                                                    {/*入驻协议书*/}
                                                                    <Route path="join" component={Basic}>
                                                                        <Route path=":id/edit" component={Operation.CustomerManage.Agreement.Join.Edit}/>
                                                                        <Route path=":id/detail" component={Operation.CustomerManage.Agreement.Join.Detail}/>
                                                                        <Route path="create" component={Operation.CustomerManage.Agreement.Join.Create}/>
                                                                        <Route path=":id/print" component={Operation.CustomerManage.Agreement.Join.Print}/>
                                                                    </Route>

                                                                    {/*承租意向书*/}
                                                                    <Route path="admit" component={Basic}>
                                                                        <Route path="create" component={Operation.CustomerManage.Agreement.Admit.Create}/>
                                                                        <Route path=":id/edit" component={Operation.CustomerManage.Agreement.Admit.Edit}/>
                                                                        <Route path=":id/detail" component={Operation.CustomerManage.Agreement.Admit.Detail}/>
                                                                        <Route path=":id/print" component={Operation.CustomerManage.Agreement.Admit.Print}/>
                                                                    </Route>

                                                                    {/*增租协议书*/}
                                                                    <Route path="increase" component={Basic}>
                                                                        <Route path="create" component={Operation.CustomerManage.Agreement.Increase.Create}/>
                                                                        <Route path=":id/edit" component={Operation.CustomerManage.Agreement.Increase.Edit}/>
                                                                        <Route path=":id/detail" component={Operation.CustomerManage.Agreement.Increase.Detail}/>
                                                                        <Route path=":id/print" component={Operation.CustomerManage.Agreement.Increase.Print}/>
                                                                    </Route>

                                                                    {/*续租协议书*/}
                                                                    <Route path="renew" component={Basic}>
                                                                        <Route path="create" component={Operation.CustomerManage.Agreement.Renew.Create}/>
                                                                        <Route path=":id/edit" component={Operation.CustomerManage.Agreement.Renew.Edit}/>
                                                                        <Route path=":id/detail" component={Operation.CustomerManage.Agreement.Renew.Detail}/>
                                                                        <Route path=":id/print" component={Operation.CustomerManage.Agreement.Renew.Print}/>
                                                                    </Route>

                                                                    {/*减租协议书*/}
                                                                    <Route path="reduce" component={Basic}>
                                                                        <Route path="create" component={Operation.CustomerManage.Agreement.Reduce.Create}/>
                                                                        <Route path=":id/edit" component={Operation.CustomerManage.Agreement.Reduce.Edit}/>
                                                                        <Route path=":id/detail" component={Operation.CustomerManage.Agreement.Reduce.Detail}/>
                                                                        <Route path=":id/print" component={Operation.CustomerManage.Agreement.Reduce.Print}/>

                                                                    </Route>

                                                                    {/*退租协议书*/}
                                                                    <Route path="exit" component={Basic}>
                                                                        <Route path="create" component={Operation.CustomerManage.Agreement.Exit.Create}/>
                                                                        <Route path=":id/edit" component={Operation.CustomerManage.Agreement.Exit.Edit}/>
                                                                        <Route path=":id/detail" component={Operation.CustomerManage.Agreement.Exit.Detail}/>
                                                                    </Route>

                                                                </Route>
                               </Route>

                    </Route>

                    {/*合同配置*/}
                    <Route path="agreement" component={Basic} >
                            

                            {/*出租方管理*/}
                            <Route path="lessorManage" component={Basic}>
                                <Route path="list" component={Operation.CustomerManage.Agreement.LessorManage.List}/>
                            </Route>

                            {/*分组管理*/}
                            <Route path="setting" component={Basic}>
                                <Route path="list" component={Operation.CustomerManage.Agreement.Setting.List}/>
                            </Route>
                    </Route>



                </Route>

                {/*入驻订单*/}
                <Route path="joinOrder" component={Basic}>
                    <Route path="list" component={Operation.JoinOrder.List}/>
                    <Route path="customer" component={Basic}>
                        <Route path="edit" component = {Operation.JoinOrder.Customer.Edit}/>
                        <Route path="detail" component = {Operation.JoinOrder.Customer.Detail}/>
                    </Route>
                </Route>
        </Route>

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


    {/*后台管理*/}
        <Route path="WebBackstage" component={Basic}>


            {/*活动列表*/}
            <Route path="activity" component={Basic}>
                <Route path="list" component={WebBackstage.ActivityManage.List}/>
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
