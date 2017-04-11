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

import {Retail,Basic} from 'kr/Containers';


module.exports =()=>{


	return (
        <Route path="retail" component={Basic}>
            <Route path="index" component={Retail.Home}/>
        </Route>
	);
};
