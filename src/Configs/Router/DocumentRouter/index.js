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

const Document_Home = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Document/Home').default)
  }, 'Document_Home')
}

module.exports =()=>{
	return (
        <Route path="document" getComponent={Basic}>
            <Route path="index" getComponent={Document_Home}/>
        </Route>
	);
};
