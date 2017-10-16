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

const Member_MemberManage_DoorManage = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Member/MemberManage/DoorManage').default)
  }, 'Member_MemberManage_DoorManage')
}
const Member_MemberManage_CardManage = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Member/MemberManage/CardManage').default)
  }, 'Member_MemberManage_CardManage')
}



module.exports =()=>{
	return (
    <Route path="member" getComponent={Basic}>
         <IndexRedirect to="memberManage/list" />
        <Route path="memberManage" getComponent={Basic}>
            <Route path="list"  getComponent={Member_MemberManage_List}/>
            <Route path="cardmanage"  getComponent={Member_MemberManage_CardManage}/>
						<Route path="doormanage"  getComponent={Member_MemberManage_DoorManage}/>
        </Route>
    </Route>
	);
};
