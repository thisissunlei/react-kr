

import React from 'react';
import {
	Router,
	Route,
	Link,
	Redirect,
	IndexRoute,
	IndexRedirect
} from 'react-router';

import {Statistical,Basic} from 'kr/Containers';


module.exports =()=>{


	return (
		<Route path="statistical" component={Basic}>
            <Route path="index" component={Statistical.Home}/>
                <IndexRedirect to="index" />
        </Route>
	);
};
