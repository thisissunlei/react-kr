//运营平台


module.exports = {
  

   //客户公海列表－查询
   'highSeaSearch':{
      url: '/api/krspace-finance-web/csr/market/list/type/search?cityId={cityId}&page={page}&pageSize={pageSize}&sourceId={sourceId}',
      method: 'get'
   },
   //客户公海列表－获取导入结果接口
   'highSeaDataGet':{
      url: '/api/krspace-finance-web/csr/market/import/actions/get-result?batchId={batchId}',
      method: 'get'
   },



   //运营平台-基础配置-设备定义-设备列表
    'equipmentList': {
        url: '/api/krspace-finance-web/community/sysDeviceDefinition/device-list?communityId={communityId}&deviceCode={deviceCode}&floor={floor}&functionId={functionId}&hardwareId={hardwareId}&page={page}&pageSize={pageSize}&propertyId={propertyId}&typeId={typeId}',
        method: 'get'
    },
    //运营平台-基础配置-设备定义-新增或编辑
    'equipmentNewCreateOrEdit': {
        url: '/api/krspace-finance-web/community/sysDeviceDefinition/device-definition',
        method: 'post'
    },
    //运营平台-基础配置-设备定义-门编号、智能硬件ID判重
    'doorNumberAndHardwareId': {
        url: '/api/krspace-finance-web/community/sysDeviceDefinition/door-hardware-repetition?type={type}&code={code}&id={id}',
        method: 'get'
    },
    //运营平台-基础配置-设备定义-获取楼层
    'getFloorByComunity': {
        url: '/api/krspace-finance-web/community/sysDeviceDefinition/getWherefloor?communityId={communityId}',
        method: 'get'
    },
    //运营平台-基础配置-设备定义-根据属性获取对应位置
    'getLocationByProperty': {
        url: '/api/krspace-finance-web/community/community-boardroom?communityId={communityId}&whereFloor={whereFloor}',
        method: 'get'
    },
    //运营平台-基础配置-设备定义-传图片
    'postEquipmentImg': {
        url: '/api/krspace-finance-web/community/sysDeviceDefinition/upload-pic',
        method: 'post'
    },
    //运营平台-基础配置-设备定义-根据设备上下线
    'onlineOrOffline': {
        url: '/api/krspace-finance-web/community/sysDeviceDefinition/editOnlineForSysDeviceDefinition',
        method: 'post'
    },
    //运营平台-基础配置-设备定义-向指定社区推送图片(单张)
    'uploadImgToEquipmentSingle': {
        url: '/api/krspace-finance-web/community/sysDeviceDefinition/single-push-device',
        method: 'post'
    },
    //运营平台-基础配置-设备定义-向指定社区推送图片（多张）
    'oploadImgToEquipment': {
        url: '/api/krspace-finance-web/community/sysDeviceDefinition/push-device',
        method: 'post'
    },
    //运营平台-基础配置-设备定义-获取真实设备ID
    'getEquipmentNum': {
        url: '/api/krspace-finance-web/community/sysDeviceDefinition/device-filter',
        method: 'post'
    },
    //运营平台-基础配置-设备定义-获取社区机器之下设备
    'getCommunityEquipment': {
        url: '/api/krspace-finance-web/community/sysDeviceDefinition/community-hardware',
        method: 'get'
    },
    //运营平台-基础配置-设备定义-轮询获取推送结果
    'getPushImgRes': {
        url: '/api/krspace-finance-web/community/sysDeviceDefinition/getPollingResult',
        method: 'get'
    },
    //运营平台-基础配置-设备定义-获取上传图片成功／失败数据
    'getSuccedOrErrData': {
        url: '/api/krspace-finance-web/community/sysDeviceDefinition/getSendResult',
        method: 'get'
    },
   
}
