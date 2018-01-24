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


const SmartHardware_CenterControlManage_EquipmentManage = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/SmartHardware/CenterControlManage/EquipmentManage').default)
  }, 'SmartHardware_CenterControlManage_EquipmentManage')
}

const SmartHardware_CenterControlManage_SonEquipmentManage = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/SmartHardware/CenterControlManage/SonEquipmentManage').default)
  }, 'SmartHardware_CenterControlManage_SonEquipmentManage')
}

const SmartHardware_CenterControlManage_OperateLog = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/SmartHardware/CenterControlManage/OperateLog').default)
  }, 'SmartHardware_CenterControlManage_OperateLog')
}

const SmartHardware_EquipmentManage_IpAddressCheck =  (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/SmartHardware/EquipmentManage/IpAddressCheck').default)
  }, 'SmartHardware_EquipmentManage_IpAddressCheck')
}

const SmartHardware_EquipmentManage_EquipmentSearch =  (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/SmartHardware/EquipmentManage/EquipmentSearch').default)
  }, 'SmartHardware_EquipmentManage_EquipmentSearch')
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

      <Route path="centercontrolmanage" getComponent={Basic}>
        <Route path="equipmentmanage" getComponent={SmartHardware_CenterControlManage_EquipmentManage}/>
        <Route path="sonequipmentmanage/:sonEquipmentId/:fatherEquipmentId/:fatherName" getComponent={SmartHardware_CenterControlManage_SonEquipmentManage}/>
        <Route path="operatelog" getComponent={SmartHardware_CenterControlManage_OperateLog}/>
      </Route>

      <Route path="equipmentmanage" getComponent={Basic}>
        <Route path="equipmentsearch" getComponent={SmartHardware_EquipmentManage_EquipmentSearch}/>
        <Route path="checkrepeatip" getComponent={SmartHardware_EquipmentManage_IpAddressCheck}/>
      </Route> 
        
      
			
		</Route>
	);
};
