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

import {OA,Basic} from 'kr/Containers';
module.exports =()=>{
	return (
        <Route path="oa" component={Basic}>
            <Route path="index" component={OA.Home}/>
        </Route>
	);
};
