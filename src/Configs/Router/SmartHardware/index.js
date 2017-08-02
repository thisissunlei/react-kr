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

const WebBackstage_ActivityManage_List = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/WebBackstage/ActivityManage/List').default)
  }, 'WebBackstage_ActivityManage_List')
}
const WebBackstage_News = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/WebBackstage/News').default)
  }, 'WebBackstage_News')
}

const WebBackstage_CommunityAllocation = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/WebBackstage/CommunityAllocation').default)
  }, 'WebBackstage_CommunityAllocation')
}

module.exports =()=>{


	return (
		<Route path="smarthardware" getComponent={Basic}>
			{/*活动列表*/}
			<Route path="doormanage" getComponent={Basic}>
				<Route path="equipmentmanage" getComponent={WebBackstage_ActivityManage_List}/>
			</Route>
			<Route path="news" getComponent={Basic}>
				<Route path="list" getComponent={WebBackstage_News}/>
			</Route>
      {/*官网社区配置*/}
			<Route path="communityAllocation" getComponent={WebBackstage_CommunityAllocation}/>
		</Route>
	);
};
