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

const Office_OfficeBackground_DownOffice = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Office/OfficeBackground/DownOffice').default)
  }, 'Office_OfficeBackground_DownOffice')
}

const Office_OfficeBackground_NewOffice = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Office/OfficeBackground/NewOffice').default)
  }, 'Office_OfficeBackground_NewOffice')
}

const Office_OfficeBackground_Todo = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Office/OfficeBackground/Todo').default)
  }, 'Office_OfficeBackground_Todo')
}

const Office_OfficeBackground_OwnAdd = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Office/OfficeBackground/OwnAdd').default)
  }, 'Office_OfficeBackground_OwnAdd')
}

const Office_OfficeBackground_ContractMonitor = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Office/OfficeBackground/ContractMonitor').default)
  }, 'Office_OfficeBackground_ContractMonitor')
}

module.exports =()=>{
	return (
        <Route path="office" getComponent={Basic}>
            {/*oa后台*/}
            <Route path="officeBackground" getComponent={Basic}>
                <Route path="downOffice" getComponent={Office_OfficeBackground_DownOffice}/>
                <Route path="newOffice" getComponent={Office_OfficeBackground_NewOffice}/>
                <Route path="todo" getComponent={Office_OfficeBackground_Todo}/>
                <Route path="ownAdd" getComponent={Office_OfficeBackground_OwnAdd}/>
                <Route path="contractMonitor" getComponent={Office_OfficeBackground_ContractMonitor}/>
            </Route>
        </Route>
	);
};
