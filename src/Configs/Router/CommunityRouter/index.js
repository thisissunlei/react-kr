import React from 'react';
import {
	Router,
	Route,
	Link,
	Redirect,
	IndexRoute,
	IndexRedirect
} from 'react-router';

import Basic from 'kr/Containers/Basic';

const Operation_CommunityManage_Detail = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Operation/CommunityManage/Detail').default)
  }, 'Operation_CommunityManage_Detail')
}

const Operation_CommunityManage_CompanyMembers = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Operation/CommunityManage/CompanyMembers').default)
  }, 'Operation_CommunityManage_CompanyMembers')
}
const Operation_CommunityManage_VisitorsToRecord = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Operation/CommunityManage/VisitorsToRecord').default)
  }, 'Operation_CommunityManage_VisitorsToRecord')
}
module.exports =()=>{


	return (
    <Route path="community" component={Basic}>
         <IndexRedirect to="communityManage/detail" />

        {/*销控表*/}
        <Route path="communityManage" component={Basic}>
                <Route path="detail" getComponent={Operation_CommunityManage_Detail}/>
                <Route path="visitorsToRecord" getComponent={Operation_CommunityManage_VisitorsToRecord}/>
        </Route>

        {/*公司成员*/}
        <Route path="companyMembers" component={Basic}>
                <Route path=":companyId/list/:communityId" getComponent={Operation_CommunityManage_CompanyMembers}/>
        </Route>

    </Route>
	);
};
