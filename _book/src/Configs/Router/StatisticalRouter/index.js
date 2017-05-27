

import React from 'react';
import {
	Router,
	Route,
	Link,
	Redirect,
	IndexRoute,
	IndexRedirect
} from 'react-router';


const Basic = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Basic').default)
  }, 'Basic')
}

const Statistical_Home = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Statistical/Home').default)
  }, 'Statistical_Home')
}

module.exports =()=>{

	return (
		<Route path="statistical" getComponent={Basic}>
            <Route path="index" getComponent={Statistical_Home}/>
                <IndexRedirect to="index" />
        </Route>
	);
};
