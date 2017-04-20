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

import Basic from 'kr/Containers/Basic';

const Retail_Home = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Retail/Home').default)
  }, 'Retail_Home')
}

module.exports =()=>{
	return (
        <Route path="retail" component={Basic}>
            <Route path="index" component={Retail_Home}/>
        </Route>
	);
};
