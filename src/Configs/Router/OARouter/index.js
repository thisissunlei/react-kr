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

const Basic = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Basic').default)
  }, 'Basic')
}

const OA_Home = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/OA/Home').default)
  }, 'OA_Home')
}

module.exports =()=>{
	return (
        <Route path="oa" getComponent={Basic}>
            <Route path="index" getComponent={OA_Home}/>
        </Route>
	);
};
