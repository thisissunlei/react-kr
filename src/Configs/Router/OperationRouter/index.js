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

const Operation_CustomerManage_AgreementTrim = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/AgreementTrim').default)
	}, 'Operation_CustomerManage_AgreementTrim')
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

// const Operation_CustomerManage_Agreement_Join_Edit = (location, callback) => {
// 	require.ensure([], require => {
// 		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Join/Edit').default)
// 	}, 'Operation_CustomerManage_Agreement_Join_Edit')
// }

const Operation_CustomerManage_Agreement_Join_Detail = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Join/Detail').default)
	}, 'Operation_CustomerManage_Agreement_Join_Detail')
}

// const Operation_CustomerManage_Agreement_Join_Create = (location, callback) => {
// 	require.ensure([], require => {
// 		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Join/Create').default)
// 	}, 'Operation_CustomerManage_Agreement_Join_Create')
// }

const Operation_CustomerManage_Agreement_Join_Print = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/PureComponents/Agreement/Join/Print').default)
	}, 'Operation_CustomerManage_Agreement_Join_Print')
}

// const Operation_CustomerManage_Agreement_Admit_Create = (location, callback) => {
// 	require.ensure([], require => {
// 		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Admit/Create').default)
// 	}, 'Operation_CustomerManage_Agreement_Admit_Create')
// }

// const Operation_CustomerManage_Agreement_Admit_Edit = (location, callback) => {
// 	require.ensure([], require => {
// 		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Admit/Edit').default)
// 	}, 'Operation_CustomerManage_Agreement_Admit_Edit')
// }

const Operation_CustomerManage_Agreement_Admit_Detail = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Admit/Detail').default)
	}, 'Operation_CustomerManage_Agreement_Admit_Detail')
}

const Operation_CustomerManage_Agreement_Admit_Print = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/PureComponents/Agreement/Admit/Print').default)
	}, 'Operation_CustomerManage_Agreement_Admit_Print')
}

// const Operation_CustomerManage_Agreement_Increase_Create = (location, callback) => {
// 	require.ensure([], require => {
// 		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Increase/Create').default)
// 	}, 'Operation_CustomerManage_Agreement_Increase_Create')
// }

// const Operation_CustomerManage_Agreement_Increase_Edit = (location, callback) => {
// 	require.ensure([], require => {
// 		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Increase/Edit').default)
// 	}, 'Operation_CustomerManage_Agreement_Increase_Edit')
// }

const Operation_CustomerManage_Agreement_Increase_Detail = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Increase/Detail').default)
	}, 'Operation_CustomerManage_Agreement_Increase_Detail')
}

const Operation_CustomerManage_Agreement_Increase_Print = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/PureComponents/Agreement/Increase/Print').default)
	}, 'Operation_CustomerManage_Agreement_Increase_Print')
}

// const Operation_CustomerManage_Agreement_Renew_Create = (location, callback) => {
// 	require.ensure([], require => {
// 		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Renew/Create').default)
// 	}, 'Operation_CustomerManage_Agreement_Renew_Create')
// }

// const Operation_CustomerManage_Agreement_Renew_Edit = (location, callback) => {
// 	require.ensure([], require => {
// 		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Renew/Edit').default)
// 	}, 'Operation_CustomerManage_Agreement_Renew_Edit')
// }

const Operation_CustomerManage_Agreement_Renew_Detail = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Renew/Detail').default)
	}, 'Operation_CustomerManage_Agreement_Renew_Detail')
}

const Operation_CustomerManage_Agreement_Renew_Print = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/PureComponents/Agreement/Renew/Print').default)
	}, 'Operation_CustomerManage_Agreement_Renew_Print')
}

// const Operation_CustomerManage_Agreement_Reduce_Create = (location, callback) => {
// 	require.ensure([], require => {
// 		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Reduce/Create').default)
// 	}, 'Operation_CustomerManage_Agreement_Reduce_Create')
// }

// const Operation_CustomerManage_Agreement_Reduce_Edit = (location, callback) => {
// 	require.ensure([], require => {
// 		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Reduce/Edit').default)
// 	}, 'Operation_CustomerManage_Agreement_Reduce_Edit')
// }

const Operation_CustomerManage_Agreement_Reduce_Detail = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/Reduce/Detail').default)
	}, 'Operation_CustomerManage_Agreement_Reduce_Detail')
}

const Operation_CustomerManage_Agreement_Reduce_Print = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/PureComponents/Agreement/Reduce/Print').default)
	}, 'Operation_CustomerManage_Agreement_Reduce_Print')
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
const Operation_CustomerManage_CustomerSource= (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/CustomerSource').default)
	}, 'Operation_CustomerManage_CustomerSource')
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
{/*注册地址列表*/}
const Operation_CommunityAllocation_RegisteredAddress= (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CommunityAllocation/RegisteredAddress').default)
	}, 'Operation_CommunityAllocation_RegisteredAddress')
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

{/*平面图配置选择社区*/}
const Operation_CommunityAllocation_CommunityPlanList= (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CommunityAllocation/CommunityPlanList').default)
	}, 'Operation_CommunityAllocation_CommunityPlanList')
}

{/*平面图配置*/}
const Operation_CommunityAllocation_CommunityPlanMap= (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CommunityAllocation/CommunityPlanMap').default)
	}, 'Operation_CommunityAllocation_CommunityPlanMap')
}

const Operation_CommunityAllocation_AppManage=(location, callback)=>{
  require.ensure([], require => {
    callback(null, require('kr/Containers/Operation/CommunityAllocation/AppManage').default)
  }, 'Operation_CommunityAllocation_AppManage')
}
const Operation_CommunityAllocation_NoticeManage=(location, callback)=>{
  require.ensure([], require => {
    callback(null, require('kr/Containers/Operation/CommunityAllocation/NoticeManage').default)
  }, 'Operation_CommunityAllocation_NoticeManage')
}
const Operation_CommunityAllocation_Integration=(location, callback)=>{
  require.ensure([], require => {
    callback(null, require('kr/Containers/Operation/CommunityAllocation/IntegrationManage').default)
  }, 'Operation_CommunityAllocation_Integration')
}

const Operation_RedHoodActive_BarrageAudit=(location, callback)=>{
  require.ensure([], require => {
    callback(null, require('kr/Containers/Operation/RedHoodActive/BarrageAudit').default)
  }, 'Operation_RedHoodActive_BarrageAudit')
}
const Operation_CommunityAllocation_Activitys=(location, callback)=>{
	require.ensure([], require => {
	  callback(null, require('kr/Containers/Operation/CommunityAllocation/Activitys').default)
	}, 'Operation_CommunityAllocation_Activitys')
  }
  const Operation_CommunityAllocation_AdvertManage=(location, callback)=>{
	require.ensure([], require => {
	  callback(null, require('kr/Containers/Operation/CommunityAllocation/AdvertManage').default)
	}, 'Operation_CommunityAllocation_AdvertManage')
  }
  const Operation_CommunityAllocation_AppOpinion=(location, callback)=>{
	require.ensure([], require => {
	  callback(null, require('kr/Containers/Operation/CommunityAllocation/AppOpinion').default)
	}, 'Operation_CommunityAllocation_AppOpinion')
  }
  const Operation_CommunityAllocation_CompanyVerify=(location, callback)=>{
	require.ensure([], require => {
	  callback(null, require('kr/Containers/Operation/CommunityAllocation/CompanyVerify').default)
	}, 'Operation_CommunityAllocation_CompanyVerify')
  }
  
  const DoorPermission_MemberDoorPermmision = (location, callback) => {
	require.ensure([], require => {
	  callback(null, require('kr/Containers/DoorPermission/MemberDoorPermmision').default)
	}, 'DoorPermission_MemberDoorPermmision')
  }

//   const Member_MemberManage_Detail = (location, callback) => {
// 	  require.ensure([], require => {
// 	    callback(null, require('kr/Containers/Member/MemberManage/Detail').default)
// 	  }, 'Member_MemberManage_Detail')
// 	}
module.exports =()=>{
	return (

	<Route path="operation" getComponent={Basic}>
		<Route path="index" getComponent={Operation_Home}/>
		{/*分组模版管理*/}
		<Route path="groupSetting" getComponent={Operation_GroupSetting}/>
		

        <Route path="memberdoormanage/:memberId" getComponent={DoorPermission_MemberDoorPermmision}/>
		
		{/*社区配置*/}
		<Route path="communityAllocation" getComponent={Basic}>

			<Route path="myaddress" getComponent={Operation_CommunityAllocation_MyAddress}/>
			<Route path="communityList" getComponent={Operation_CommunityAllocation_CommunityList}/>
			{/*设备列表*/}
			<Route path="equipmentList" getComponent={Operation_CommunityAllocation_EquipmentList}/>
			{/*工位列表选择社区*/}
			<Route path="communityStation" getComponent={Operation_CommunityAllocation_CommunityStation}/>
			{/*工位列表*/}
			<Route path=":communityId/communityStationDetail" getComponent={Operation_CommunityAllocation_CommunityStationDetail}/>
			{/*注册地址列表*/}
			<Route path="registeredAddress" getComponent={Operation_CommunityAllocation_RegisteredAddress}/>
			{/*会议室列表选择社区*/}
			<Route path="communityMeetingRoom" getComponent={Operation_CommunityAllocation_CommunityMeetingRoom}/>
			{/*会议室列表*/}
			<Route path=":communityId/communityMeetingRoomDetail" getComponent={Operation_CommunityAllocation_CommunityMeetingRoomDetail}/>
			{/*代码分类*/}
			<Route path="codeClassification" getComponent={Operation_CommunityAllocation_CodeClassification}/>
			{/*平面图配置选择社区*/}
			<Route path="communityPlanList" getComponent={Operation_CommunityAllocation_CommunityPlanList}/>
			{/*平面图配置*/}
			<Route path=":communityId/communityPlanMap" getComponent={Operation_CommunityAllocation_CommunityPlanMap}/>
			{/*App管理后台*/}
			<Route path="appmanage" getComponent={Operation_CommunityAllocation_AppManage}/>
			<Route path="noticemanage" getComponent={Operation_CommunityAllocation_NoticeManage}/>
			<Route path="integration" getComponent={Operation_CommunityAllocation_Integration}/>
			<Route path="activity" getComponent={Operation_CommunityAllocation_Activitys}/>
			<Route path="advert" getComponent={Operation_CommunityAllocation_AdvertManage}/>
			<Route path="opinion" getComponent={Operation_CommunityAllocation_AppOpinion}/>
			<Route path="companyVerify" getComponent={Operation_CommunityAllocation_CompanyVerify}/>
			
		</Route>
		{/*基础配置*/}
		<Route path="basicConfig" getComponent={Basic}>
			<Route path="EquipmentDefinition" getComponent={Operation_BasicConfig_EquipmentDefinition} name="EquipmentDefinition"/>
			{/*商圈列表*/}
			<Route path="businessList" getComponent={Operation_BasicConfig_BusinessList} />
		</Route>
		{/*客户管理*/}
		<Route path="customerManage" getComponent={Basic}>
			<Route path="customerList" getComponent={Operation_CustomerManage_CustomerList} />
			<Route path="agreementList" getComponent={Operation_CustomerManage_AgreementList} />
			<Route path="agreementtrim" getComponent={Operation_CustomerManage_AgreementTrim} />
			{/*客户公海*/}
			<Route path="customerHighSea" getComponent={Operation_CustomerManage_CustomerHighSea}/>
			<Route path="list" getComponent={Operation_CustomerManage_List} />
			{/*客户来源配置*/}
			<Route path="customerSource" getComponent={Operation_CustomerManage_CustomerSource} />
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
							{/*<Route path=":id/edit" getComponent={Operation_CustomerManage_Agreement_Join_Edit}/>*/}
							<Route path=":id/detail" getComponent={Operation_CustomerManage_Agreement_Join_Detail}/>
							<Route path=":id/print" getComponent={Operation_CustomerManage_Agreement_Join_Print}/>
						</Route>

						{/*承租意向书*/}
						<Route path="admit" getComponent={Basic}>
							{/*<Route path="create" getComponent={Operation_CustomerManage_Agreement_Admit_Create}/>
							<Route path=":id/edit" getComponent={Operation_CustomerManage_Agreement_Admit_Edit}/>*/}
							<Route path=":id/detail" getComponent={Operation_CustomerManage_Agreement_Admit_Detail}/>
							<Route path=":id/print" getComponent={Operation_CustomerManage_Agreement_Admit_Print}/>
						</Route>

						{/*增租协议书*/}
						<Route path="increase" getComponent={Basic}>
							{/*<Route path="create" getComponent={Operation_CustomerManage_Agreement_Increase_Create}/>
							<Route path=":id/edit" getComponent={Operation_CustomerManage_Agreement_Increase_Edit}/>*/}
							<Route path=":id/detail" getComponent={Operation_CustomerManage_Agreement_Increase_Detail}/>
							<Route path=":id/print" getComponent={Operation_CustomerManage_Agreement_Increase_Print}/>
						</Route>

						{/*续租协议书*/}
						<Route path="renew" getComponent={Basic}>
							{/*<Route path="create" getComponent={Operation_CustomerManage_Agreement_Renew_Create}/>
							<Route path=":id/edit" getComponent={Operation_CustomerManage_Agreement_Renew_Edit}/>*/}
							<Route path=":id/detail" getComponent={Operation_CustomerManage_Agreement_Renew_Detail}/>
							<Route path=":id/print" getComponent={Operation_CustomerManage_Agreement_Renew_Print}/>
						</Route>

						{/*减租协议书*/}
						<Route path="reduce" getComponent={Basic}>
							{/*<Route path="create" getComponent={Operation_CustomerManage_Agreement_Reduce_Create}/>
							<Route path=":id/edit" getComponent={Operation_CustomerManage_Agreement_Reduce_Edit}/>*/}
							<Route path=":id/detail" getComponent={Operation_CustomerManage_Agreement_Reduce_Detail}/>
							<Route path=":id/print" getComponent={Operation_CustomerManage_Agreement_Reduce_Print}/>

						</Route>

						{/*退租协议书*/}
						<Route path="exit" getComponent={Basic}>
							{/*<Route path="create" getComponent={Operation_CustomerManage_Agreement_Exit_Create}/>
							<Route path=":id/edit" getComponent={Operation_CustomerManage_Agreement_Exit_Edit}/>*/}
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

		{/*弹幕后台*/}
		<Route path="redHoodActive" getComponent={Basic}>
			<Route path="barrageAudit" getComponent={Operation_RedHoodActive_BarrageAudit}/>
		</Route>

		<Route path="member" getComponent={Basic}>
	        <Route path="memberManage" getComponent={Basic}>
	            {/* <Route path=":memberId/detail/:companyId"  getComponent={Member_MemberManage_Detail}/>	        */}
			 </Route>
	    </Route>
	</Route>
	);
};
