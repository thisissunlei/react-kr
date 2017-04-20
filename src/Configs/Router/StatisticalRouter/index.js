

import React from 'react';
import {
	Router,
	Route,
	Link,
	Redirect,
	IndexRoute,
	IndexRedirect
} from 'react-router';

import Statistical from 'kr/Containers/Statistical';
import Basic from 'kr/Containers/Basic';

module.exports =()=>{

	return (
		<Route path="statistical" component={Basic}>
            <Route path="index" component={Statistical.Home}/>
                <IndexRedirect to="index" />
        </Route>
	);
};
