

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


const Statistical_AgingAccount = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Statistical/AgingAccount').default)
  }, 'Statistical_AgingAccount')
}


module.exports =()=>{

	return (
		<Route path="statistical" getComponent={Basic}>
            <Route path="index" getComponent={Statistical_Home}/>
            <Route path="agingaccount" getComponent={Statistical_AgingAccount}/>
                <IndexRedirect to="index" />
        </Route>





	);
};
