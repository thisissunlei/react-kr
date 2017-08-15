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

const SmartHardware_DoorManage_EquipmentAllManage = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/SmartHardware/DoorManage/EquipmentAllManage').default)
  }, 'SmartHardware_DoorManage_EquipmentAllManage')
}

const SmartHardware_DoorManage_OpenLog = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/SmartHardware/DoorManage/OpenLog').default)
  }, 'SmartHardware_DoorManage_OpenLog')
}


module.exports =()=>{


	return (
		<Route path="smarthardware" getComponent={Basic}>
			
			<Route path="doormanage" getComponent={Basic}>
				<Route path="equipmentmanage" getComponent={SmartHardware_DoorManage_EquipmentAllManage}/>
				<Route path="openlog" getComponent={SmartHardware_DoorManage_OpenLog}/>
			</Route>
			
		</Route>
	);
};
