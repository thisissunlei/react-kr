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
{/*新销控表*/}
const Operation_CommunityManage_ControlTable = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Operation/CommunityManage/ControlTable').default)
  }, 'Operation_CommunityManage_ControlTable')
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

const Operation_CommunityManage_Visitor = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Operation/CommunityManage/Visitor').default)
  }, 'Operation_CommunityManage_Visitor')
}
{/*所有预约*/}
const Operation_CommunityManage_AllAppointment= (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CommunityManage/AllAppointment').default)
	}, 'Operation_CommunityManage_AllAppointment')
}

const Operation_CommunityManage_HoldList= (location, callback) => {
	require.ensure([], require => {
		callback(null, require('kr/Containers/Operation/CommunityManage/HoldList').default)
	}, 'Operation_CommunityManage_HoldList')
}

module.exports =()=>{


	return (
    <Route path="community" getComponent={Basic}>
         <IndexRedirect to="communityManage/detail" />

        {/*销控表*/}
        <Route path="communityManage" getComponent={Basic}>
                <Route path="detail" getComponent={Operation_CommunityManage_Detail}/>
                <Route path="controlTable" getComponent={Operation_CommunityManage_ControlTable}/>
                <Route path="visitorsToRecord" getComponent={Operation_CommunityManage_VisitorsToRecord}/>
                <Route path="holdList" getComponent={Operation_CommunityManage_HoldList}/>
                {/*所有预约*/}
                
                <Route path="allAppointment" getComponent={Operation_CommunityManage_AllAppointment}/>
                
      
        </Route>
            
        {/*公司成员*/}
        <Route path="companyMembers" getComponent={Basic}>
                <Route path=":companyId/list/:communityId" getComponent={Operation_CommunityManage_CompanyMembers}/>
        </Route>
        {/*访客列表*/}
        <Route path="visitor" getComponent={Basic}>
                <Route path="list" getComponent={Operation_CommunityManage_Visitor}/>
        </Route>

    </Route>
	);
};
