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

import {Member,Basic} from 'kr/Containers';

module.exports =()=>{
	return (
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
	);
};
