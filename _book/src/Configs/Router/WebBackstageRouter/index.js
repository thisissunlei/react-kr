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

module.exports =()=>{


	return (
		<Route path="WebBackstage" getComponent={Basic}>
			{/*活动列表*/}
			<Route path="activity" getComponent={Basic}>
				<Route path="list" getComponent={WebBackstage_ActivityManage_List}/>
			</Route>
			<Route path="news" getComponent={Basic}>
				<Route path="list" getComponent={WebBackstage_News}/>
			</Route>
		</Route>
	);
};