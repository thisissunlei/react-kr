import React from 'react';
import {
	Router,
	Route,
	Link,
	Redirect,
	IndexRoute,
	IndexRedirect
} from 'react-router';

// import WebBackstage from 'kr/Containers/WebBackstage';
import Basic from 'kr/Containers/Basic';

const WebBackstage_ActivityManage_List = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/WebBackstage/ActivityManage/List').default)
  }, 'WebBackstage_ActivityManage_List')
}

module.exports =()=>{


	return (
		<Route path="WebBackstage" component={Basic}>
			{/*活动列表*/}
			<Route path="activity" component={Basic}>
				<Route path="list" getComponent={WebBackstage_ActivityManage_List}/>
			</Route>
		</Route>
	);
};
