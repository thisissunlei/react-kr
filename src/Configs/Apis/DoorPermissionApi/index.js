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
      
}






