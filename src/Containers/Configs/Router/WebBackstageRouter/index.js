import React from 'react';
import {
	Router,
	Route,
	Link,
	Redirect,
	IndexRoute,
	IndexRedirect
} from 'react-router';

import {WebBackstage,Basic} from 'kr/Containers';


module.exports =()=>{


	return (
		<Route path="WebBackstage" component={Basic}>
			{/*活动列表*/}
			<Route path="activity" component={Basic}>
				<Route path="list" component={WebBackstage.ActivityManage.List}/>
			</Route>
		</Route>
	);
};
