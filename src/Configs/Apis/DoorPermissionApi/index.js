//智能硬件

module.exports = {
	

	//门禁权限列表
   'getDoorPermissionList':{
      url: '/api/iot-platform/auth/user-group/list?pageSize={pageSize}&name={name}&page={page}&communityId={communityId}&customerId={customerId}&groupLevel={groupLevel}',
      method: 'get'
   },
   //新增门禁组
   'newCreateDoorGroup':{
        url: '/api/iot-platform/auth/user-group/add',
        method: 'post'
    },
    //删除门禁组
   'deleteDoorGroup':{
        url: '/api/iot-platform/auth/user-group/delete?id={id}',
        method: 'delete'
    },
    //获取组成员列表
    'getDoorGroupMemberList':{
        url: '/api/iot-platform/auth/user-group/user/list?name={name}&communityId={communityId}&groupId={groupId}&customerId={customerId}&phone={phone}&date={date}',
        method: 'get'
    },
    //删除组成员
    'deleteGroupMemberApi':{
        url: '/api/iot-platform/auth/user-group-mapping/delete',
        method: 'post'
    },
    //添加组成员
    'addGroupMemberApi':{
        url: '/api/iot-platform/auth/user-group-mapping/add',
        method: 'post'
    },
    //个人/门禁权限组已授权设备
    'getGroupAuthorizeEquipmentApi':{
        url: '/api/iot-platform/auth/device-grant/list?communityId={communityId}&deviceId={deviceId}&doorCode={doorCode}&doorType={doorType}&floor={floor}&title={title}&granteeId={granteeId}&granteeType={granteeType}',
        method: 'get'
    },
    //从门禁组/个人已授权设备中删除设备
    'deleteEquipmentFromGroupApi':{
        url: '/api/iot-platform/auth/device-grant/delete',
        method: 'post'
    },
    //门禁组所有可选择设备
    'doorGroupAllEquipmentApi':{
        url: '/api/iot-platform/door-device/select-items?communityId={communityId}&deviceId={deviceId}&doorType={doorType}&floor={floor}&title={title}&doorCode={doorCode}',
        method: 'get'
    },
    //增加设备到门禁授权组
    'addEquipmentToGroupApi':{
        url: '/api/iot-platform/auth/device-grant/add',
        method: 'post'
    },
    //获取所有成员列表数据以供添加成员到组
    'getAllMemberInDoorPermissionApi':{
        url: '/api/sso/user/list?communityId={communityId}&customerId={customerId}&name={name}&phone={phone}',
        method: 'get'
    },
    //获取门禁组详情
    'getDoorGroupDetailApi':{
        url: '/api/iot-platform/auth/user-group/detail?id={id}',
        method: 'get'
    },

    // 编辑门禁组
    'editDoorGroupApi':{
        url: '/api/iot-platform/auth/user-group/edit',
        method: 'put'
    },

    // 用户所属门禁组列表
    'getGroupContainMember':{
        url: '/api/iot-platform/auth/user/belong-to-group/list?uid={uid}',
        method: 'get'
    },
    //个人权限页将个人移出权限组
    'personPageDropOutGroup':{
        url: '/api/iot-platform/auth/user-group/user/delete?uid={uid}&groupId={groupId}',
        method: 'delete'
    },


    
}






