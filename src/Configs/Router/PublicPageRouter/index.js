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
const PublicPage_PrintOther = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/PublicPage/PrintOther').default)
  }, 'PublicPage_PrintOther')
}

const PublicPage_TemplatePrint = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/PublicPage/TemplatePrint').default)
  }, 'PublicPage_TemplatePrint')
}




module.exports =()=>{
	return (
        <Route path="publicPage" getComponent={Basic}>
            {/*oa后台*/}
        
            <Route path=":id/dynamicsDetail" getComponent={PublicPage_DynamicsDetail}/>
            <Route path="dynamicsProfile" getComponent={PublicPage_DynamicsProfile}/>
            <Route path=":printId/printOther" getComponent={PublicPage_PrintOther}/>
            <Route path="templatePrint" getComponent={PublicPage_TemplatePrint}/>
            
        </Route>
	);
};
