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

const OA_Organization_Home = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/OA/Organization/Home').default)
  }, 'OA_Organization_Home')
}

const OA_Organization_Labour = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/OA/Organization/Labour').default)
  }, 'OA_Organization_Labour')
}

const OA_PersonalManage_PeopleState = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/OA/PersonalManage/PeopleState').default)
  }, 'OA_PersonalManage_PeopleState')
}

const OA_BasicConfig_PostList = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/OA/BasicConfig/PostList').default)
  }, 'OA_BasicConfig_PostList')
}

const OA_BasicConfig_PostType = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/OA/BasicConfig/PostType').default)
  }, 'OA_BasicConfig_PostType')
}

const OA_BasicConfig_RankList = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/OA/BasicConfig/RankList').default)
  }, 'OA_BasicConfig_RankList')
}

module.exports =()=>{
	return (
        <Route path="oa" getComponent={Basic}>
          {/*组织架构*/}
            <Route path="organization" getComponent={Basic}>
              <Route path="home" getComponent={OA_Organization_Home}/>
              <Route path=":dimId/labour" getComponent={OA_Organization_Labour}/>
            </Route>
            
						{/*人员管理*/}
            <Route path="personalManage" getComponent={Basic}>
						  <Route path="peopleState" getComponent={OA_PersonalManage_PeopleState}/>
            </Route>

            {/*基础配置*/}
            <Route path="basicConfig" getComponent={Basic}>
						  <Route path="postList" getComponent={OA_BasicConfig_PostList}/>
						  <Route path="postType" getComponent={OA_BasicConfig_PostType}/>
						  <Route path="rankList" getComponent={OA_BasicConfig_RankList}/>
            </Route>
        </Route>
	);
};
