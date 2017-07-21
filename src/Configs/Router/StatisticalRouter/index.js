

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
//招商数据
const Statistical_Home = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Statistical/Home').default)
  }, 'Statistical_Home')
}

//账龄分析
const Statistical_AgingAccount = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Statistical/AgingAccount').default)
  }, 'Statistical_AgingAccount')
}
//数据报表
const Statistical_DataReport = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Statistical/DataReport').default)
  }, 'Statistical_DataReport')
}



module.exports =()=>{

	return (
		<Route path="statistical" getComponent={Basic}>
        {/*招商数据*/}
        <Route path="index" getComponent={Statistical_Home}/>
        {/*账龄分析*/}
        <Route path="agingaccount" getComponent={Statistical_AgingAccount}/>
        {/*数据报表*/}
        <Route path="dataReport" getComponent={Statistical_DataReport}/>
        <IndexRedirect to="index" />
    </Route>
	);
};
