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



const Synchronization_System_List = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Synchronization/CooperativeSystem').default)
  }, 'Synchronization_System_List')
}
const Synchronization_Content_List = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Synchronization/SynchronizationContent').default)
  }, 'Synchronization_Content_List')
}
const Synchronization_Journal_List = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Synchronization/Journal').default)
  }, 'Synchronization_Journal_List')
}
module.exports =()=>{


	return (
		<Route path="Synchronization" getComponent={Basic}>
			<Route path="system" getComponent={Synchronization_System_List}/>
			<Route path="content" getComponent={Synchronization_Content_List}/>
			<Route path="journal" getComponent={Synchronization_Journal_List}/>
		</Route>
	);
};
