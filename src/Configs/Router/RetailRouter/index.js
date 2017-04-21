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

const Retail_Home = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Retail/Home').default)
  }, 'Retail_Home')
}

module.exports =()=>{
	return (
        <Route path="retail" getComponent={Basic}>
            <Route path="index" getComponent={Retail_Home}/>
        </Route>
	);
};
