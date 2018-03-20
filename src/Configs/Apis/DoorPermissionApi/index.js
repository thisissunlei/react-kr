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
    //新增门禁组
   'deleteDoorGroup':{
        url: '/mockjsdata/53/iot-platform/auth/user-group/delete?id={id}',
        method: 'delete'
    },
    //新增门禁组
    'getDoorGroupMemberList':{
        url: '/mockjsdata/53/iot-platform/auth/user-group/user/list?name={name}&communityId={communityId}&groupId={groupId}&customerId={customerId}&phone={phone}&date={date}',
        method: 'get'
    },
      
}






