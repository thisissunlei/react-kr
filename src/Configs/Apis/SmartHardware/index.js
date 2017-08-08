
//官网后台

module.exports = {
	

	//二代们近列表
   'getDecondeEquipmentList':{
      url: '/mockjsdata/53/krspace-iot-platform-web/door-device/list?communityId={communityId}&deviceId={deviceId}&doorCode={doorCode}&doorType={doorType}&floor={floor}&page={page}&pageSize={pageSize}',
      method: 'get'
   },
   //新增编辑设备实时校验编号
   'getDeviceIDRepeat':{
      url: '/mockjsdata/53/krspace-iot-platform-web/door-device/deviceid-check?deviceId={deviceId}',
      method: 'get'
   },
   //新增编辑设备
   'addOrEditEquipment':{
      url: '/mockjsdata/53/krspace-iot-platform-web/door-device/edit',
      method: 'put'
   },
   
   
   
}
