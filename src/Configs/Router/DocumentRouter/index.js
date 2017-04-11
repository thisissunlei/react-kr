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

import {Document,Basic} from 'kr/Containers';


module.exports =()=>{
	return (
        <Route path="document" component={Basic}>
            <Route path="index" component={Document.Home}/>
        </Route>
	);
};
