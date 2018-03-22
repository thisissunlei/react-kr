//智能硬件

module.exports = {
	

	//门禁权限列表
   'getDoorPermissionList':{
      url: '/mockjsdata/53/iot-platform/auth/user-group/list?pageSize={pageSize}&name={name}&page={page}&communityId={communityId}&customerId={customerId}&groupLevel={groupLevel}',
      method: 'get'
   },
   //新增门禁组
   'newCreateDoorGroup':{
        url: '/mockjsdata/53/iot-platform/auth/user-group/add',
        method: 'post'
    },
    //删除门禁组
   'deleteDoorGroup':{
        url: '/mockjsdata/53/iot-platform/auth/user-group/delete?id={id}',
        method: 'delete'
    },
    //获取组成员列表
    'getDoorGroupMemberList':{
        url: '/mockjsdata/53/iot-platform/auth/user-group/user/list?name={name}&communityId={communityId}&groupId={groupId}&customerId={customerId}&phone={phone}&date={date}',
        method: 'get'
    },
    //删除组成员
    'deleteGroupMemberApi':{
        url: '/mockjsdata/53/iot-platform/auth/user-group-mapping/delete?ids={ids}',
        method: 'delete'
    },
    //添加组成员
    'addGroupMemberApi':{
        url: '/mockjsdata/53/iot-platform/auth/user-group-mapping/add',
        method: 'post'
    },
    //门禁权限组已授权设备/iot-platform/auth/device-grant/list
    'getGroupAuthorizeEquipmentApi':{
        url: '/mockjsdata/53/iot-platform/auth/device-grant/list?communityId={communityId}&deviceId={deviceId}&doorType={doorType}&floor={floor}&title={title}&doorCode={doorCode}',
        method: 'get'
    },
    //从门禁组中删除设备
    'deleteEquipmentFromGroupApi':{
        url: '/mockjsdata/53/iot-platform/auth/device-grant/delete?ids={ids}',
        method: 'delete'
    },
    //门禁组所有可选择设备
    'doorGroupAllEquipmentApi':{
        url: '/mockjsdata/53/iot-platform/door-device/select-items?communityId={communityId}&deviceId={deviceId}&doorType={doorType}&floor={floor}&title={title}&doorCode={doorCode}',
        method: 'get'
    },
    //增加设备到门禁授权组
    'addEquipmentToGroupApi':{
        url: '/mockjsdata/53/iot-platform/auth/device-grant/add',
        method: 'post'
    },
    //获取所有成员列表数据以供添加成员到组
    'getAllMemberInDoorPermissionApi':{
        url: '/mockjsdata/53/sso/user/list?communityId={communityId}&customerId={customerId}&name={name}&phone={phone}',
        method: 'post'
    },
    //获取所有成员列表数据以供添加成员到组
    'getDoorGroupDetailApi':{
        url: '/mockjsdata/53/iot-platform/auth/user-group/detail?id={id}',
        method: 'get'
    },

    // 编辑门禁组
    'editDoorGroupApi':{
        url: '/mockjsdata/53/iot-platform/auth/user-group/edit',
        method: 'put'
    },
}






