

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







const Statistical_PaymentRemindTable = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Statistical/PaymentRemindTable').default)
  }, 'Statistical_PaymentRemindTable')
}

module.exports =()=>{

	return (
		<Route path="statistical" getComponent={Basic}>
            <Route path="index" getComponent={Statistical_Home}/>
                <IndexRedirect to="index" />

            <Route path="paymentremindtable" getComponent={Statistical_PaymentRemindTable}/>

        </Route>





	);
};
