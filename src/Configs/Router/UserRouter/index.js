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

const Operation_CommunityAllocation_AppManage=(location, callback)=>{
  require.ensure([], require => {
    callback(null, require('kr/Containers/Operation/CommunityAllocation/AppManage').default)
  }, 'Operation_CommunityAllocation_AppManage')
}
const OA_BasicConfig_PostList = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/OA/BasicConfig/PostList').default)
  }, 'OA_BasicConfig_PostList')
}

const Operation_CustomerManage_CustomerList = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CustomerManage/CustomerList').default)
	}, 'Operation_CustomerManage_CustomerList')
}

const Member_MemberManage_DoorManage = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Member/MemberManage/DoorManage').default)
  }, 'Member_MemberManage_DoorManage')
}

const OA_PersonalManage_PeopleState = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/OA/PersonalManage/PeopleState').default)
  }, 'OA_PersonalManage_PeopleState')
}

const Member_MemberManage_List = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Member/MemberManage/List').default)
  }, 'Member_MemberManage_List')
}
const Member_MemberManage_CardManage = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Member/MemberManage/CardManage').default)
  }, 'Member_MemberManage_CardManage')
}
const DoorPermission_MemberDoorPermmision = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/DoorPermission/MemberDoorPermmision').default)
  }, 'DoorPermission_MemberDoorPermmision')
}
const DoorPermission_CompanyDoorPermission = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/DoorPermission/CompanyDoorPermission').default)
  }, 'DoorPermission_CompanyDoorPermission')
}




module.exports =()=>{
	return (

	<Route path="user" getComponent={Basic}>
      <Route path="index" getComponent={Operation_CommunityAllocation_AppManage}/>
      {/*基础配置*/}
      <Route path="basicConfig" getComponent={Basic}>
        <Route path="postList" getComponent={OA_BasicConfig_PostList}/>
      </Route>
		<Route path="communityAllocation" getComponent={Basic}>
			<Route path="appmanage" getComponent={Operation_CommunityAllocation_AppManage}/>
		</Route>
		{/*客户管理*/}
		<Route path="customerManage" getComponent={Basic}>
			<Route path="customerList" getComponent={Operation_CustomerManage_CustomerList} />
	    </Route>
	    <Route path="memberManage" getComponent={Basic}>
            <Route path="cardmanage"  getComponent={Member_MemberManage_CardManage}/>
            <Route path="list"  getComponent={Member_MemberManage_List}/>
			<Route path="doormanage"  getComponent={DoorPermission_CompanyDoorPermission}/>
        </Route>
        <Route path="personalManage" getComponent={Basic}>
			<Route path="peopleState" getComponent={OA_PersonalManage_PeopleState}/>
        </Route>
        <Route path="memberdoormanage/:memberId" getComponent={DoorPermission_MemberDoorPermmision}/>


	</Route>
	);
};
