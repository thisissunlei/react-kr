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


const PublicPage_DynamicsDetail = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/PublicPage/DynamicsDetail').default)
  }, 'PublicPage_DynamicsDetail')
}
const PublicPage_DynamicsProfile = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/PublicPage/DynamicsProfile').default)
  }, 'PublicPage_DynamicsProfile')
}


module.exports =()=>{
	return (
        <Route path="publicPage" getComponent={Basic}>
            {/*oa后台*/}
        
            <Route path="dynamicsDetail" getComponent={PublicPage_DynamicsDetail}/>
            <Route path="dynamicsProfile" getComponent={PublicPage_DynamicsProfile}/>
            
        </Route>
	);
};
