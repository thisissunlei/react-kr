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

const SmartHardware_DoorManage_FailureWarning = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/SmartHardware/DoorManage/FailureWarning').default)
  }, 'SmartHardware_DoorManage_FailureWarning')
}


const SmartHardware_DoorManage_UpgradeManage = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/SmartHardware/DoorManage/UpgradeManage').default)
  }, 'SmartHardware_DoorManage_UpgradeManage')
}


const SmartHardware_PrintManage_EquipmentManage = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/SmartHardware/PrintManage/EquipmentManage').default)
  }, 'SmartHardware_PrintManage_EquipmentManage')
}


const SmartHardware_PrintManage_PrinterConfig = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/SmartHardware/PrintManage/PrinterConfig').default)
  }, 'SmartHardware_PrintManage_PrinterConfig')
}

const SmartHardware_PrintManage_PrintLog = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/SmartHardware/PrintManage/PrintLog').default)
  }, 'SmartHardware_PrintManage_PrintLog')
}


const SmartHardware_PrintManage_PriceConfig = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/SmartHardware/PrintManage/PriceConfig').default)
  }, 'SmartHardware_PrintManage_PriceConfig')
}



module.exports =()=>{


	return (
		<Route path="smarthardware" getComponent={Basic}>
			
			<Route path="doormanage" getComponent={Basic}>
				<Route path="equipmentmanage" getComponent={SmartHardware_DoorManage_EquipmentAllManage}/>
				<Route path="openlog" getComponent={SmartHardware_DoorManage_OpenLog}/>
				<Route path="warning" getComponent={SmartHardware_DoorManage_FailureWarning}/>
				<Route path="upgrademanage" getComponent={SmartHardware_DoorManage_UpgradeManage}/>
				
			</Route>
			<Route path="printmanage" getComponent={Basic}>
				<Route path="equipmentmanage" getComponent={SmartHardware_PrintManage_EquipmentManage}/>
				<Route path="printerconfig" getComponent={SmartHardware_PrintManage_PrinterConfig}/>
				<Route path="printlog" getComponent={SmartHardware_PrintManage_PrintLog}/>
				<Route path="priceconfig" getComponent={SmartHardware_PrintManage_PriceConfig}/>
				
			</Route>
			
		</Route>
	);
};
