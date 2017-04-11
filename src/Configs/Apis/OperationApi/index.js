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
    //会员中心-新增会员－社区模糊查询
    'searchCommunityByCommunityText': {
        url: '/api/krspace-finance-web/member/work/community-list?communityText={communityText}',
        method: 'get'
    },
    //验证成员
    'validMember': {
        url: '/api/krspace-finance-web/member/actions/set-as-valid?memberIds={memberIds}&companyId={companyId}',
        method: 'post'
    },
    //批量删除
    'deleteMembers': {
        url: '/api/krspace-finance-web/member/actions/unbind-from-company?memberIds={memberIds}',
        method: 'delete'
    },
    //客户管理-计划表-分配工位-list
    'getStation': {
        url: '/api/krspace-finance-web/find-contract-station/station?communityIds={communityIds}&mainBillId={mainBillId}',
        method: 'get'
    },
    //运营平台－客户管理-计划表-撤场日期修改
    'updateLeaveDate': {
        url: '/api/krspace-finance-web/fina-contract-mainbill/action/update-leaveDate',
        method: 'post'
    },
    //客户管理-计划表-分配员工-获取所有客户
    'getmembers': {
        url: '/api/krspace-finance-web/fina-contract-mainbill/members?customerId={customerId}',
        method: 'get'
    },
    //客户管理-计划表-分配员工-保存更改信息
    'changeStation': {
        url: '/api/krspace-finance-web/find-contract-station/action/change-station',
        method: 'post'
    },
    // 运营平台－获取社区楼层数据
    'getCommunityFloors': {
        url: '/api-old/krspace_operate_web/commnuity/communityBase/getCommunityFloors?communityId={communityId}',
        method: 'get'
    },
    // 计划表获取数据
    'getInstallmentplan': {
        url: '/api/krspace-finance-web/finacontractdetail/getInstallmentplan?year={year}&communityids={communityids}&page={page}&pageSize={pageSize}&type={type}&value={value}',
        method: 'get'
    },
    //运营平台
    'groupNameCheck': {
        url: '/api/krspace-finance-web/stat/group/name/actions/check?groupName={groupName}&id={id}',
        method: 'get'
    },
    //运营平台
    'sortCheck': {
        url: '/api/krspace-finance-web/stat/group/sort/actions/check?sort={sort}&id={id}',
        method: 'get'
    },
    //运营平台－合同详情-修改订单名字
    'edit-order-name': {
        url: ' /api/krspace-finance-web/edit-order-name',
        method: 'put'
    },
    //运营平台－合同详情-订单工位
    'get-order-station': {
        url: ' /api/krspace-finance-web/action/get-order-station?mainBillId={mainBillId}',
        method: 'get'
    },

    //运营平台-会员管理-会员配置-会员卡激活-会卡列表
    'CardActivationList': {
        url: '/api/krspace-finance-web/member/card/mbr-card?foreignCode={foreignCode}&page={page}&pageSize={pageSize}',
        method: 'get'
    },
    //运营平台-会员管理-会员配置-列表
    'memberCardList': {
        url: '/api/krspace-finance-web/member/card/mbr-card?foreignCode={foreignCode}&page={page}&pageSize={pageSize}',
        method: 'get'
    },
    //运营平台-会员管理-会员配置-会员卡激活-会卡批量激活&&运营平台-会员管理-会员配置-会员卡激活-会卡新建激活
    'CardActivation': {
        url: '/api/krspace-finance-web/member/card/mbr-card',
        method: 'post'
    },
    //运营平台-会员管理-会员配置-会员卡激活-会卡编辑
    'CardEdit': {
        url: '/api/krspace-finance-web/member/card/mbr-card',
        method: 'put'
    },
   
}
