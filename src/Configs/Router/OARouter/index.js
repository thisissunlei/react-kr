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

import OA from 'kr/Containers/OA';
import Basic from 'kr/Containers/Basic';

module.exports =()=>{
	return (
        <Route path="oa" component={Basic}>
            <Route path="index" component={OA.Home}/>
        </Route>
	);
};
