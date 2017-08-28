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
    callback(null, require('kr/Containers/Home').default)
  }, 'Basic')
}

module.exports =()=>{
	return (
        <Route path="home" getComponent={Basic}>

        </Route>
	);
};
