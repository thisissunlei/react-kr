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
    //门禁权限组已授权设备/iot-platform/auth/device-grant/list
    'getGroupAuthorizeEquipmentApi':{
        url: '/mockjsdata/53/iot-platform/auth/device-grant/list?communityId={communityId}&deviceId={deviceId}&doorType={doorType}&floor={floor}',
        method: 'get'
    },
      
}






