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

const Member_MemberManage_List = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Member/MemberManage/List').default)
  }, 'Member_MemberManage_List')
}

const Member_MemberManage_Detail = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Member/MemberManage/Detail').default)
  }, 'Member_MemberManage_Detail')
}

const Member_MemberManage_Setting = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Member/MemberManage/Setting').default)
  }, 'Member_MemberManage_Setting')
}

const Member_MemberManage_Card = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Member/MemberManage/Card').default)
  }, 'Member_MemberManage_Card')
}

const Member_MemberManage_DoorManage = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Member/MemberManage/DoorManage').default)
  }, 'Member_MemberManage_DoorManage')
}

module.exports =()=>{
	return (
    <Route path="member" getComponent={Basic}>
         <IndexRedirect to="memberManage/list" />
        <Route path="memberManage" getComponent={Basic}>
            <Route path="list"  getComponent={Member_MemberManage_List}/>
            <Route path=":memberId/detail/:companyId"  getComponent={Member_MemberManage_Detail}/>
            <Route path="setting"  getComponent={Member_MemberManage_Setting}/>
            <Route path="card"  getComponent={Member_MemberManage_Card}/>
            <Route path="doormanage"  getComponent={Member_MemberManage_DoorManage}/>
        </Route>
    </Route>
	);
};
