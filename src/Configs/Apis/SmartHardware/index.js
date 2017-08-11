
//智能硬件

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
   //批量删除设备
   'deleteEquipmentBatch':{
      url: '/mockjsdata/53/krspace-iot-platform-web/door-device/delete-batch',
      method: 'delete'
   },

   //单个删除
   'deleteEquipmentSingleURL':{
      url: '/mockjsdata/53/krspace-iot-platform-web/door-device/delete',
      method: 'delete'
   },

    
    //获取为使用设备list
   'getUnusedEquipment':{
      url: '/mockjsdata/53/krspace-iot-platform-web/door-device/unused-list',
      method: 'get'
   },
   //将没有用过的设备添加到列表中
   'changeUnusedToList':{
      url: '/mockjsdata/53/krspace-iot-platform-web/door-device/enable',
      method: 'post'
   },
    


    
   
   
   
}
