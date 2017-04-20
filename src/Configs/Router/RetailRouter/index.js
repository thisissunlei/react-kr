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

import Retail from 'kr/Containers/Retail';
import Basic from 'kr/Containers/Basic';

module.exports =()=>{
	return (
        <Route path="retail" component={Basic}>
            <Route path="index" component={Retail.Home}/>
        </Route>
	);
};
