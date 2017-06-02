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
        url: '/api/krspace-finance-web/community/sysDeviceDefinition/community-boardroom?communityId={communityId}&whereFloor={whereFloor}&type={type}',
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
        url: '/api/krspace-finance-web/cmt/community/select/use/floor?communityId={communityId}',
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
      //运营平台－社区配置－社区列表
    'communitySearch': {
        url: '/api/krspace-finance-web/cmt/community/list/type/search?businessAreaId={businessAreaId}&openDateBegin={openDateBegin}&openDateEnd={openDateEnd}&cityId={cityId}&countyId={countyId}&opened={opened}&searchKey={searchKey}&searchType={searchType}&pageSize={pageSize}&page={page}&portalShow={portalShow}',
        method: 'get'
    },
    //运营平台－社区配置－社区列表数据准备
    'list-param-data': {
        url: '/api/krspace-finance-web/cmt/community/list-param-data',
        method: 'get'
    },
     //运营平台－合同列表-获取合同是否可创建
    'contracts-creation':{
      url:'/api/krspace-finance-web/fina-contract-mainbill/contracts-creation?mainBillId={mainBillId}',
      method:'get'
    },
    //运营平台－合同列表-客户订单下拉接口
   'orders-names':{
       url:'/api/krspace-finance-web/customer/orders-names?customerId={customerId}',
       method:'get'
    },
    //运营平台－客户管理－招商线索列表
    'shareCustomers': {
        url: '/api/krspace-finance-web/customer/share-customers?page={page}&pageSize={pageSize}&company={company}&createEndDate={createEndDate}&createStartDate={createStartDate}&intentionCityId={intentionCityId}&intentionCommunityId={intentionCommunityId}&levelId={levelId}&sourceId={sourceId}',
        method: 'get'
    },
    //运营平台－客户管理－个人客户列表
    'personalCustomers': {
        url: '/api/krspace-finance-web/customer/personal-customers?page={page}&pageSize={pageSize}&company={company}&createEndDate={createEndDate}&createStartDate={createStartDate}&intentionCityId={intentionCityId}&intentionCommunityId={intentionCommunityId}&levelId={levelId}&sourceId={sourceId}',
        method: 'get'
    },
    //运营平台－客户管理－个人客户列表－导出
    'personalCustomersExport': {
        url: '/api/krspace-finance-web/customer/personal-customers-export',
        method: 'get'
    },
    //运营平台－客户管理－取消客户跟进
    'customerGiveBack': {
        url: '/api/krspace-finance-web/customer/actions/give-back',
        method: 'post'
    },
    //运营平台－客户管理－客户转移
    'customerTransfer': {
        url: '/api/krspace-finance-web/customer/actions/transfer',
        method: 'post'
    },
    //运营平台－客户管理－新增与编辑数据准备
    'customerDataAddList': {
        url: '/api/krspace-finance-web/customer/actions/data-list',
        method: 'get'
    },
    //运营平台－客户管理－新增或编辑客户
    'customerDataEdit': {
        url: '/api/krspace-finance-web/customer/actions/edit',
        method: 'post'
    },
    //运营平台－客户管理-公司名称实时校验
    'corpNameCheck': {
        url: '/api/krspace-finance-web/customer/check/company?id={id}&companyName={companyName}',
        method: 'get'
    },
    //运营平台－客户管理－新增拜访记录
    'customerVisitRecord': {
        url: '/api/krspace-finance-web/customer/visit-log/actions/add',
        method: 'post'
    },
    //运营平台－客户管理－根据客户获取订单列表
    'customerOrdersList': {
        url: '/api/krspace-finance-web/customer/orders?customerId={customerId}',
        method: 'get'
    },
    //运营平台－客户管理－签约客户列表
    'signCustomers': {
        url: '/api/krspace-finance-web/customer/sign-customers?page={page}&pageSize={pageSize}&cityId={cityId}&communityId={communityId}&company={company}&signEndDate={signEndDate}&signStartDate={signStartDate}&mainBillType={mainBillType}',
        method: 'get'
    },
    //运营平台－客户管理－签约客户列表－导出
    'signCustomersExport': {
        url: '/api/krspace-finance-web/customer/sign-customers-export',
        method: 'get'
    },
    //运营平台－客户管理－获取客户编辑信息
    'get-edit-info': {
        url: '/api/krspace-finance-web/customer/actions/get-edit-info?id={id}',
        method: 'get'
    },
    //运营平台－客户管理－获取客户详情
    'get-detail-info': {
        url: '/api/krspace-finance-web/customer/actions/get-detail-info?id={id}&operType={operType}',
        method: 'get'
    },
    //运营平台－客户管理－获取项目类型树
    'get-project-types': {
        url: '/api/krspace-finance-web/cmt/codeCategory/select/use/info',
        method: 'get'
    },
    //运营平台－客户管理－订单删除
    'order-delete': {
        url: '/api/krspace-finance-web/fina-contract-mainbill/actions/delete?id={id}',
        method: 'delete'
    },
    //运营平台－客户管理－领取客户
    'receive-customer': {
        url: '/api/krspace-finance-web/customer/actions/receive',
        method: 'post'
    },
    // 运营平台－计划表获取合同数据
    'getBillContract': {
        url: '/api/krspace-finance-web/finacontractdetail/plan-table/bill-contract?billId={billId}',
        method: 'get'
    },
    // 运营平台－计划表获取合同数据
    'getRedPoint': {
        url: '/api/krspace-finance-web/finacontractdetail/plan-table/redPoint?billId={billId}&remindDate={remindDate}',
        method: 'get'
    },
    //运营平台－计划表获取合同数据
    'getBluePoint': {
        url: '/api/krspace-finance-web/finacontractdetail/plan-table/bluePoint?billId={billId}&detailId={detailId}',
        method: 'get'
    },
    //运营平台－车场接口
    'getLeaveDate': {
        url: '/api/krspace-finance-web/finacontractdetail/plan-table/leaveDate?billId={billId}',
        method: 'get'
    },
    //运营平台－获取出租率
    'getRate': {
        url: '/api/krspace-finance-web/finacontractdetail/plan-table/rate?year={year}&communityids={communityids}',
        method: 'get'
    },
    //运营平台－数据统计-模板分组-修改与新建
    'GroupNewAndEidt': {
        url: '/api/krspace-finance-web/stat/group/actions/add-or-update',
        method: 'post'
    },
    //设备列表
   'equipment-list':{
      url: '/api/krspace-finance-web/cmt/device/list?name={name}&page={page}&pageSize={pageSize}',
      method: 'get'
   },
   //新建设备
   'equipment-submit':{
      url: '/api/krspace-finance-web/cmt/device/action/edit?id={id}&name={name}',
      method: 'post'
   },
   //删除设备
   'equipment-delete':{
      url: '/api/krspace-finance-web/cmt/device/action/delete?id={id}',
      method: 'delete'
   },
   //商圈列表
   'business-list':{
      url: '/api/krspace-finance-web/cmt/business/action/list?districtId={districtId}&page={page}&pageSize={pageSize}&enable={enable}&name={name}&no={no}',
      method: 'get'
   },

   //商圈列表-新建商圈
   'business-new':{
      url: '/api/krspace-finance-web/cmt/business/action/edit?districtId={districtId}&enable={enable}&name={name}&no={no}&sort={sort}&id={id}',
      method: 'post'
   },
    //运营平台－代码分类列表
    'codeCategoryList': {
        url: '/api/krspace-finance-web/cmt/codeCategory/action/list?noOrName={noOrName}&pid={pid}&page={page}&pageSize={pageSize}',
        method: 'get'
    },
    //运营平台－代码分类新增或编辑
    'codeCategoryEdit': {
        url: '/api/krspace-finance-web/cmt/codeCategory/action/edit',
        method: 'post'
    },
    //运营平台－社区列表-城市
    'type-city-community': {
        url: '/api/krspace-finance-web/cmt/community/list/type/city?name={name}&type={type}',
        method: 'get'
    },
    //运营平台－工位列表
    'station-list': {
        url: '/api/krspace-finance-web/cmt/station/list?code={code}&communityId={communityId}&enable={enable}&page={page}&pageSize={pageSize}&stationType={stationType}&spaceId={spaceId}&belongSpace={belongSpace}',
        method: 'get'
    },
    //运营平台－工位新增或编辑
    'station-edit': {
        url: '/api/krspace-finance-web/cmt/station/actions/edit',
        method: 'post'
    },
    //运营平台－校验工位编码
    'station-check-code': {
        url: '/api/krspace-finance-web/cmt/station/check/code?code={code}&id={id}&communityId={communityId}',
        method: 'get'
    },
    //运营平台－工位删除接口
    'station-delete': {
        url: '/api/krspace-finance-web/cmt/station/actions/delete?id={id}',
        method: 'delete'
    },
    //运营平台－获取工位编辑信息
    'station-get-edit': {
        url: '/api/krspace-finance-web/cmt/station/info/type/edit?id={id}',
        method: 'get'
    },
    //运营平台－工位列表数据准备
    'station-param-data': {
        url: '/api/krspace-finance-web/cmt/station/list-param-data?communityId={communityId}',
        method: 'get'
    },
    //运营平台-会议室列表-列表接口
    'meeting-room-list': {
        url: '/api/krspace-finance-web/cmt/space/list?capacityBegin={capacityBegin}&capacityEnd={capacityEnd}&communityId={communityId}&deviceIds={deviceIds}&enable={enable}&page={page}&pageSize={pageSize}&searchKey={searchKey}&searchType={searchType}&spaceType={spaceType}',
        method: 'get'
    },
    //运营平台-会议室列表-获取空间编辑信息
    'meeting-room-eidData': {
        url: '/api/krspace-finance-web/cmt/space/info/type/edit?id={id}',
        method: 'get'
    },
     //运营平台－校验空间名称
    'meeting-check-name': {
        url: '/api/krspace-finance-web/cmt/space/check/name?id={id}&name={name}&communityId={communityId}',
        method: 'get'
    },
     //运营平台－空间列表数据准备
    'meeting-param-data': {
        url: '/api/krspace-finance-web/cmt/space/list-param-data?communityId={communityId}',
        method: 'get'
    },
    //运营平台－空间删除接口
    'meeting-delete': {
        url: '/api/krspace-finance-web/cmt/space/actions/delete?id={id}',
        method: 'delete'
    },
    //运营平台－空间新增或编辑
    'meeting-edit-submit': {
        url: '/api/krspace-finance-web/cmt/space/actions/edit',
        method: 'post'
    },
      //凭证管理--凭证列表--获取社区列表下拉框
      'findCommunityVoucher':{
         url: '/api/krspace-finance-web/finance/paymentEvidence/findCommunity',
         method: 'get'
      },
      //凭证管理--凭证列表--待处理凭证列表
      'wait-voucher-find-page':{
         url: '/api/krspace-finance-web/finance/paymentEvidence/find-page?communityId={communityId}&&page={page}&pageSize={pageSize}&payWay={payWay}&customerName={customerName}&paymentAccount={paymentAccount}&startDate={startDate}&status={status}&stopDate={stopDate}',
         method: 'get'
      },
      //凭证管理--凭证列表--待处理凭证查看
      'findPaymentEvidence':{
         url: '/api/krspace-finance-web/finance/paymentEvidence/findPaymentEvidence?id={id}',
         method: 'get'
      },
      //凭证管理--凭证列表--删除
      'deleteEvidence':{
         url: '/api/krspace-finance-web/finance/paymentEvidence/deleteEvidence?id={id}',
         method: 'delete'
      },
      //凭证管理--凭证列表--已删除凭证列表
      'voucher-find-deleted-page':{
         url: '/api/krspace-finance-web/finance/paymentEvidence/find-deleted-page?communityId={communityId}&page={page}&pageSize={pageSize}&payWay={payWay}&customerName={customerName}&paymentAccount={paymentAccount}&startDate={startDate}&stopDate={stopDate}',
         method: 'get'
      },
      //凭证管理--凭证列表--已审核凭证列表--查看回款详情
      'findReceiptDetail':{
         url: '/api/krspace-finance-web/finance/paymentEvidence/findReceiptDetail?id={id}',
         method: 'get'
      },
      //凭证管理--凭证列表--带处理凭证--添加回款数据
      'findReceiptData':{
         url: '/api/krspace-finance-web/finance/paymentEvidence/findReceiptData?id={id}',
         method: 'get'
      },
        //凭证管理--凭证列表--带处理凭证--添加回款保存
      'add-receipt':{
         url: '/api/krspace-finance-web/finance/paymentEvidence/add-receipt',
         method: 'post'
      },
        //社区配置--我的地点--我的地点列表
      'myAddressList':{
         url: '/api/krspace-finance-web/community/notice/manager-notice-list?communityName={communityName}&page={page}&pageSize={pageSize}',
         method: 'get'
      },
      'addMyAddressData':{
         url: '/api/krspace-finance-web/community/notice/cmt-notice',
         method: 'post'
      },
      'getEditInfo':{
         url: '/api/krspace-finance-web/community/notice/manager-notice?id={id}',
         method: 'get'
      },
    //社区配置--我的地点--删除地点
      'deleteAddress':{
         url: '/api/krspace-finance-web/community/notice/delete?cmtId={cmtId}',
         method: 'delete'
      },
    //社区配置--我的地点--获取基本编辑数据
      'getEditAddress':{
         url: '/api/krspace-finance-web/community/notice/manager-notice?id={id}',
         method: 'get'
      },
      'checkCommunityId':{
         url: '/api/krspace-finance-web/community/notice/available-cmt?cmtId={cmtId}',
         method: 'get'
      },
      //运营平台-社区配置-预约-工位预约
       'station-reservation':{
         url: '/api/krspace-finance-web/cmt-appointment/station/manage-list?communityId={communityId}&date={date}&endDate={endDate}&page={page}&pageSize={pageSize}',
         method: 'get'
      },
      'setExitTotalReturn':{
         url: '/api/krspace-finance-web/rent/total-return?mainbillId={mainbillId}&withdrawDate={withdrawDate}',
          method: 'get'
      },
      'getActivityCommunityList':{
         url: '/api/krspace-finance-web/cmt/community/city-cmt-list',
         method: 'get'
      },

      //获取平面图配置信息
       'plan-get-detail':{
         url: '/api/krspace-finance-web/cmt/floor-graph/edit-info?communityId={communityId}&floor={floor}',
         method: 'get'
      },
      //平面图上传背景图
       'plan-upload':{
         url: '/api/krspace-finance-web/cmt/floor-graph/file/actions/save',
         method: 'post'
      },
      //平面图配置信息保存
       'plan-edit':{
         url: '/api/krspace-finance-web/cmt/floor-graph/actions/edit',
         method: 'post'
      },

}
