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

const Operation_Home = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/Home').default)
	}, 'Operation_Home')
}

const Operation_GroupSetting = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/GroupSetting').default)
	}, 'Operation_GroupSetting')
}

const Operation_CommunityAllocation_CommunityList = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CommunityAllocation/CommunityList').default)
	}, 'Operation_CommunityAllocation_CommunityList')
}

const Operation_CommunityAllocation_MyAddress = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CommunityAllocation/MyAddress').default)
	}, 'Operation_CommunityAllocation_MyAddress')
}



const Operation_BasicConfig_EquipmentDefinition = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/BasicConfig/EquipmentDefinition').default)
	}, 'Operation_BasicConfig_EquipmentDefinition')
}

const Operation_VoucherManage_VoucherList = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/VoucherManage/VoucherList').default)
	}, 'Operation_VoucherManage_VoucherList')
}

const Operation_CustomerManage_CustomerList = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/CustomerList').default)
	}, 'Operation_CustomerManage_CustomerList')
}

const Operation_CustomerManage_AgreementList = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/AgreementList').default)
	}, 'Operation_CustomerManage_AgreementList')
}

const Operation_CustomerManage_CustomerHighSea = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/CustomerHighSea').default)
	}, 'Operation_CustomerManage_CustomerHighSea')
}


const Operation_CustomerManage_List = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/List').default)
	}, 'Operation_CustomerManage_List')
}

const Operation_CustomerManage_Order_Create = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Order/Create').default)
	}, 'Operation_CustomerManage_Order_Create')
}

const Operation_CustomerManage_Order_Detail = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Order/Detail').default)
	}, 'Operation_CustomerManage_Order_Detail')
}

const Operation_CustomerManage_Order_Edit = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Order/Edit').default)
	}, 'Operation_CustomerManage_Order_Edit')
}

const Operation_CustomerManage_Agreement_Join_Edit = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Join/Edit').default)
	}, 'Operation_CustomerManage_Agreement_Join_Edit')
}

const Operation_CustomerManage_Agreement_Join_Detail = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Join/Detail').default)
	}, 'Operation_CustomerManage_Agreement_Join_Detail')
}

const Operation_CustomerManage_Agreement_Join_Create = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Join/Create').default)
	}, 'Operation_CustomerManage_Agreement_Join_Create')
}

const Operation_CustomerManage_Agreement_Join_Print = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Join/Print').default)
	}, 'Operation_CustomerManage_Agreement_Join_Print')
}

const Operation_CustomerManage_Agreement_Admit_Create = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Admit/Create').default)
	}, 'Operation_CustomerManage_Agreement_Admit_Create')
}

const Operation_CustomerManage_Agreement_Admit_Edit = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Admit/Edit').default)
	}, 'Operation_CustomerManage_Agreement_Admit_Edit')
}

const Operation_CustomerManage_Agreement_Admit_Detail = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Admit/Detail').default)
	}, 'Operation_CustomerManage_Agreement_Admit_Detail')
}

const Operation_CustomerManage_Agreement_Admit_Print = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Admit/Print').default)
	}, 'Operation_CustomerManage_Agreement_Admit_Print')
}

const Operation_CustomerManage_Agreement_Increase_Create = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Increase/Create').default)
	}, 'Operation_CustomerManage_Agreement_Increase_Create')
}

const Operation_CustomerManage_Agreement_Increase_Edit = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Increase/Edit').default)
	}, 'Operation_CustomerManage_Agreement_Increase_Edit')
}

const Operation_CustomerManage_Agreement_Increase_Detail = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Increase/Detail').default)
	}, 'Operation_CustomerManage_Agreement_Increase_Detail')
}

const Operation_CustomerManage_Agreement_Increase_Print = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Increase/Print').default)
	}, 'Operation_CustomerManage_Agreement_Increase_Print')
}

const Operation_CustomerManage_Agreement_Renew_Create = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Renew/Create').default)
	}, 'Operation_CustomerManage_Agreement_Renew_Create')
}

const Operation_CustomerManage_Agreement_Renew_Edit = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Renew/Edit').default)
	}, 'Operation_CustomerManage_Agreement_Renew_Edit')
}

const Operation_CustomerManage_Agreement_Renew_Detail = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Renew/Detail').default)
	}, 'Operation_CustomerManage_Agreement_Renew_Detail')
}

const Operation_CustomerManage_Agreement_Renew_Print = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Renew/Print').default)
	}, 'Operation_CustomerManage_Agreement_Renew_Print')
}

const Operation_CustomerManage_Agreement_Reduce_Create = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Reduce/Create').default)
	}, 'Operation_CustomerManage_Agreement_Reduce_Create')
}

const Operation_CustomerManage_Agreement_Reduce_Edit = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Reduce/Edit').default)
	}, 'Operation_CustomerManage_Agreement_Reduce_Edit')
}

const Operation_CustomerManage_Agreement_Reduce_Detail = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Reduce/Detail').default)
	}, 'Operation_CustomerManage_Agreement_Reduce_Detail')
}

const Operation_CustomerManage_Agreement_Reduce_Print = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Reduce/Print').default)
	}, 'Operation_CustomerManage_Agreement_Reduce_Print')
}


const Operation_CustomerManage_Agreement_Exit_Create= (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Exit/Create').default)
	}, 'Operation_CustomerManage_Agreement_Exit_Create')
}

const Operation_CustomerManage_Agreement_Exit_Edit= (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Exit/Edit').default)
	}, 'Operation_CustomerManage_Agreement_Exit_Edit')
}

const Operation_CustomerManage_Agreement_Exit_Detail= (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Exit/Detail').default)
	}, 'Operation_CustomerManage_Agreement_Exit_Detail')
}

const Operation_CustomerManage_Agreement_LessorManage_List= (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/LessorManage/List').default)
	}, 'Operation_CustomerManage_Agreement_LessorManage_List')
}

const Operation_CustomerManage_Agreement_Setting_List= (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Setting/List').default)
	}, 'Operation_CustomerManage_Agreement_Setting_List')
}

const Operation_JoinOrder_List= (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/JoinOrder/List').default)
	}, 'Operation_JoinOrder_List')
}

const Operation_JoinOrder_Customer_Edit= (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/JoinOrder/Customer/Edit').default)
	}, 'Operation_JoinOrder_Customer_Edit')
}

const Operation_JoinOrder_Customer_Detail= (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/JoinOrder/Customer/Detail').default)
	}, 'Operation_JoinOrder_Customer_Detail')
}
{/*设备列表*/}
const Operation_CommunityAllocation_EquipmentList= (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CommunityAllocation/EquipmentList').default)
	}, 'Operation_CommunityAllocation_EquipmentList')
}
{/*工位列表选择社区*/}
const Operation_CommunityAllocation_CommunityStation= (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CommunityAllocation/CommunityStation').default)
	}, 'Operation_CommunityAllocation_CommunityStation')
}
{/*工位列表*/}
const Operation_CommunityAllocation_CommunityStationDetail= (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CommunityAllocation/CommunityStationDetail').default)
	}, 'Operation_CommunityAllocation_CommunityStationDetail')
}
{/*会议室列表选择社区*/}
const Operation_CommunityAllocation_CommunityMeetingRoom= (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CommunityAllocation/CommunityMeetingRoom').default)
	}, 'Operation_CommunityAllocation_CommunityMeetingRoom')
}
{/*会议室列表*/}
const Operation_CommunityAllocation_CommunityMeetingRoomDetail= (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CommunityAllocation/CommunityMeetingRoomDetail').default)
	}, 'Operation_CommunityAllocation_CommunityMeetingRoomDetail')
}
{/*代码分类*/}
const Operation_CommunityAllocation_CodeClassification= (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CommunityAllocation/CodeClassification').default)
	}, 'Operation_CommunityAllocation_CodeClassification')
}
{/*商圈列表*/}
const Operation_BasicConfig_BusinessList= (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/BasicConfig/BusinessList').default)
	}, 'Operation_BasicConfig_BusinessList')
}



module.exports =()=>{
	return (

	<Route path="operation" getComponent={Basic}>
		<Route path="index" getComponent={Operation_Home}/>
		{/*分组模版管理*/}
		<Route path="groupSetting" getComponent={Operation_GroupSetting}/>

		{/*社区配置*/}
		<Route path="communityAllocation" getComponent={Basic}>

      	<Route path="communityList" getComponent={Operation_CommunityAllocation_CommunityList}/>
    	<Route path="myaddress" getComponent={Operation_CommunityAllocation_MyAddress}/>
      
	    {/*设备列表*/}
	    <Route path="equipmentList" getComponent={Operation_CommunityAllocation_EquipmentList}/>
	    {/*工位列表选择社区*/}
	    <Route path="communityStation" getComponent={Operation_CommunityAllocation_CommunityStation}/>
	    {/*工位列表*/}
	    <Route path=":communityId/communityStationDetail" getComponent={Operation_CommunityAllocation_CommunityStationDetail}/>
	    {/*会议室列表选择社区*/}
	    <Route path="communityMeetingRoom" getComponent={Operation_CommunityAllocation_CommunityMeetingRoom}/>
	    {/*会议室列表*/}
	    <Route path=":communityId/communityMeetingRoomDetail" getComponent={Operation_CommunityAllocation_CommunityMeetingRoomDetail}/>
	    {/*代码分类*/}
	    <Route path="codeClassification" getComponent={Operation_CommunityAllocation_CodeClassification}/>
	</Route>
    {/*基础配置*/}
    

		<Route path="basicConfig" getComponent={Basic}>
      <Route path="EquipmentDefinition" getComponent={Operation_BasicConfig_EquipmentDefinition} name="EquipmentDefinition"/>
      {/*商圈列表*/}
      <Route path="businessList" getComponent={Operation_BasicConfig_BusinessList} />
		</Route>

		{/*凭证管理*/}
		<Route path="voucherManage" getComponent={Basic} >
		{/*凭证列表*/}
			<Route path="voucherList" getComponent={Operation_VoucherManage_VoucherList}/>
		</Route>

		{/*客户管理*/}
		<Route path="customerManage" getComponent={Basic}>
			<Route path="customerList" getComponent={Operation_CustomerManage_CustomerList} />
			<Route path="agreementList" getComponent={Operation_CustomerManage_AgreementList} />
			{/*客户公海*/}
			<Route path="customerHighSea" getComponent={Operation_CustomerManage_CustomerHighSea}/>
			<Route path="list" getComponent={Operation_CustomerManage_List} />

		<Route path=":customerId/" getComponent={Basic} >

		{/*订单*/}
		<Route path="order" getComponent={Basic}>
			<Route path="create" getComponent = {Operation_CustomerManage_Order_Create} name="customerManage_order_create"/>
			<Route path=":orderId/detail" getComponent = {Operation_CustomerManage_Order_Detail} name="customerManage_order_detail"/>
			<Route path=":orderId/Edit" getComponent = {Operation_CustomerManage_Order_Edit} name="customerManage_order_edit"/>


		{/*合同信息*/}
		<Route path=":orderId/agreement" getComponent={Basic}>

			{/*入驻协议书*/}
			<Route path="join" getComponent={Basic}>
				<Route path=":id/edit" getComponent={Operation_CustomerManage_Agreement_Join_Edit}/>
				<Route path=":id/detail" getComponent={Operation_CustomerManage_Agreement_Join_Detail}/>
				<Route path="create" getComponent={Operation_CustomerManage_Agreement_Join_Create}/>
				<Route path=":id/print" getComponent={Operation_CustomerManage_Agreement_Join_Print}/>
			</Route>

			{/*承租意向书*/}
			<Route path="admit" getComponent={Basic}>
				<Route path="create" getComponent={Operation_CustomerManage_Agreement_Admit_Create}/>
				<Route path=":id/edit" getComponent={Operation_CustomerManage_Agreement_Admit_Edit}/>
				<Route path=":id/detail" getComponent={Operation_CustomerManage_Agreement_Admit_Detail}/>
				<Route path=":id/print" getComponent={Operation_CustomerManage_Agreement_Admit_Print}/>
			</Route>

			{/*增租协议书*/}
			<Route path="increase" getComponent={Basic}>
				<Route path="create" getComponent={Operation_CustomerManage_Agreement_Increase_Create}/>
				<Route path=":id/edit" getComponent={Operation_CustomerManage_Agreement_Increase_Edit}/>
				<Route path=":id/detail" getComponent={Operation_CustomerManage_Agreement_Increase_Detail}/>
				<Route path=":id/print" getComponent={Operation_CustomerManage_Agreement_Increase_Print}/>
			</Route>

			{/*续租协议书*/}
			<Route path="renew" getComponent={Basic}>
				<Route path="create" getComponent={Operation_CustomerManage_Agreement_Renew_Create}/>
				<Route path=":id/edit" getComponent={Operation_CustomerManage_Agreement_Renew_Edit}/>
				<Route path=":id/detail" getComponent={Operation_CustomerManage_Agreement_Renew_Detail}/>
				<Route path=":id/print" getComponent={Operation_CustomerManage_Agreement_Renew_Print}/>
			</Route>

			{/*减租协议书*/}
			<Route path="reduce" getComponent={Basic}>
				<Route path="create" getComponent={Operation_CustomerManage_Agreement_Reduce_Create}/>
				<Route path=":id/edit" getComponent={Operation_CustomerManage_Agreement_Reduce_Edit}/>
				<Route path=":id/detail" getComponent={Operation_CustomerManage_Agreement_Reduce_Detail}/>
				<Route path=":id/print" getComponent={Operation_CustomerManage_Agreement_Reduce_Print}/>

			</Route>

			{/*退租协议书*/}
			<Route path="exit" getComponent={Basic}>
				<Route path="create" getComponent={Operation_CustomerManage_Agreement_Exit_Create}/>
				<Route path=":id/edit" getComponent={Operation_CustomerManage_Agreement_Exit_Edit}/>
				<Route path=":id/detail" getComponent={Operation_CustomerManage_Agreement_Exit_Detail}/>
			</Route>

	</Route>

	</Route>




	</Route>
	{/*合同配置*/}
		<Route path="agreement" getComponent={Basic} >

		{/*出租方管理*/}
			<Route path="lessorManage" getComponent={Basic}>
				<Route path="list" getComponent={Operation_CustomerManage_Agreement_LessorManage_List}/>
			</Route>

		{/*基础配置*/}
			<Route path="setting" getComponent={Basic}>
				<Route path="list" getComponent={Operation_CustomerManage_Agreement_Setting_List}/>
			</Route>
		</Route>


	{/*入驻订单*/}
		<Route path="joinOrder" getComponent={Basic}>
			<Route path="list" getComponent={Operation_JoinOrder_List}/>
			<Route path="customer" getComponent={Basic}>
			<Route path="edit" getComponent = {Operation_JoinOrder_Customer_Edit}/>
			<Route path="detail" getComponent = {Operation_JoinOrder_Customer_Detail}/>
      </Route>
		</Route>
	</Route>
	</Route>
	);
};
