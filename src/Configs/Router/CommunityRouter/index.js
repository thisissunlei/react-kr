import React from 'react';
import {
	Router,
	Route,
	Link,
	Redirect,
	IndexRoute,
	IndexRedirect
} from 'react-router';

const Basic = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Basic').default)
  }, 'Basic')
}

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

module.exports =()=>{


	return (
    <Route path="community" getComponent={Basic}>
         <IndexRedirect to="communityManage/detail" />

        {/*销控表*/}
        <Route path="communityManage" getComponent={Basic}>
                <Route path="detail" getComponent={Operation_CommunityManage_Detail}/>
        </Route>

        {/*公司成员*/}
        <Route path="companyMembers" getComponent={Basic}>
                <Route path=":companyId/list/:communityId" getComponent={Operation_CommunityManage_CompanyMembers}/>
        </Route>
    </Route>
	);
};
