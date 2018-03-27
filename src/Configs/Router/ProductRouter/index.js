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

const Statistical_Home = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Statistical/Home').default)
  }, 'Statistical_Home')
}
const Operation_CommunityAllocation_CommunityList = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Operation/CommunityAllocation/CommunityList').default)
  }, 'Operation_CommunityAllocation_CommunityList')
}
const Operation_CommunityAllocation_CommunityPlanList= (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Operation/CommunityAllocation/CommunityPlanList').default)
  }, 'Operation_CommunityAllocation_CommunityPlanList')
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
const Operation_CustomerManage_Agreement_LessorManage_List= (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Operation/CustomerManage/Agreement/LessorManage/List').default)
  }, 'Operation_CustomerManage_Agreement_LessorManage_List')
}
const Operation_CommunityAllocation_EquipmentList= (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Operation/CommunityAllocation/EquipmentList').default)
  }, 'Operation_CommunityAllocation_EquipmentList')
}
const Operation_CommunityManage_Detail = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Operation/CommunityManage/Detail').default)
  }, 'Operation_CommunityManage_Detail')
}
const Operation_CommunityManage_ControlTable = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Operation/CommunityManage/ControlTable').default)
  }, 'Operation_CommunityManage_ControlTable')
}
const Operation_CommunityAllocation_CommunityPlanMap= (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Operation/CommunityAllocation/CommunityPlanMap').default)
  }, 'Operation_CommunityAllocation_CommunityPlanMap')
}




module.exports =()=>{
	return (

	<Route path="product" getComponent={Basic}>
      <Route path="index" getComponent={Statistical_Home}/>
    {/*社区配置*/}
    <Route path="communityAllocation" getComponent={Basic}>
      <Route path="communityList" getComponent={Operation_CommunityAllocation_CommunityList}/>
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
      {/*平面图配置选择社区*/}
      <Route path="communityPlanList" getComponent={Operation_CommunityAllocation_CommunityPlanList}/>
      {/*平面图配置*/}
      <Route path=":communityId/communityPlanMap" getComponent={Operation_CommunityAllocation_CommunityPlanMap}/>
      <Route path="equipmentList" getComponent={Operation_CommunityAllocation_CommunityPlanMap}/>
      
    </Route>
    <Route path="customerManage" getComponent={Basic}>
      <Route path="lessorManage" getComponent={Operation_CustomerManage_Agreement_LessorManage_List}/>
    </Route>
    <Route path="communityManage" getComponent={Basic}>
      <Route path="detail" getComponent={Operation_CommunityManage_Detail}/>
      <Route path="controlTable" getComponent={Operation_CommunityManage_ControlTable}/>
      
     </Route>
     <Route path="statistical" getComponent={Basic}>
      <Route path="index" getComponent={Statistical_Home}/>
      
     </Route>
		
	</Route>
	);
};
