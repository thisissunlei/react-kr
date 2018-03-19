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

const DoorPermission_DoorGroupManage = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/DoorPermission/DoorGroupManage').default)
  }, 'DoorPermission_DoorGroupManage')
}


module.exports =()=>{


	return (
		<Route path="doorpermission" getComponent={Basic}>
			
			
			<Route path="doorgroupmanage" getComponent={DoorPermission_DoorGroupManage}/>
		

      {/* <Route path="equipmentmanage" getComponent={Basic}>
        <Route path="equipmentsearch" getComponent={SmartHardware_EquipmentManage_EquipmentSearch}/>
        <Route path="checkrepeatip" getComponent={SmartHardware_EquipmentManage_IpAddressCheck}/>
      </Route>  */}
        
      
			
		</Route>
	);
};
