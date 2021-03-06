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
        url: '/api/iot-platform/card',
        method: 'put'
    },
      //运营平台－社区配置－社区列表
    'communitySearch': {
        url: '/api/krspace-finance-web/cmt/community/list/type/search?businessAreaId={businessAreaId}&openDateBegin={openDateBegin}&openDateEnd={openDateEnd}&cityId={cityId}&countyId={countyId}&opened={opened}&searchKey={searchKey}&searchType={searchType}&pageSize={pageSize}&page={page}&portalShow={portalShow}&closed={closed}',
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
        url: '/api/krspace-finance-web/customer/personal-customers?page={page}&pageSize={pageSize}&company={company}&createEndDate={createEndDate}&createStartDate={createStartDate}&intentionCityId={intentionCityId}&intentionCommunityId={intentionCommunityId}&levelId={levelId}&sourceId={sourceId}&receiveId={receiveId}',
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
    // //运营平台－客户管理－新增或编辑客户
    // 'managerCustomerDataEdit': {
    //     url: '/api/krspace-finance-web/customer/actions/medit',
    //     method: 'post'
    // },
     //运营平台－客户管理－新增或编辑客户
     'customerDataEdit':{
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
        url: '/api/krspace-finance-web/customer/sign-customers?page={page}&pageSize={pageSize}&cityId={cityId}&communityId={communityId}&company={company}&signEndDate={signEndDate}&signStartDate={signStartDate}&mainBillType={mainBillType}&sourceId={sourceId}',
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
         url: '/api/krspace-finance-web/fnaContractWithdrawalController/total-return?mainbillId={mainbillId}&withdrawDate={withdrawDate}',
          method: 'get'
      },
      'getActivityCommunityList':{
         url: '/api/krspace-finance-web/cmt/community/city-cmt-list',
         method: 'get'
      },
      //获取销控表平面图列表信息
      'getControlGraph':{
         url: '/api/krspace-finance-web/cmt/floor-graph/list?communityId={communityId}&endDate={endDate}&floor={floor}&page={page}&pageSize={pageSize}&startDate={startDate}',
         method: 'get'
      },
      //获取销控表平面图列表出租数信息
      'getGraphRent':{
         url: '/api/krspace-finance-web/cmt/floor-graph/list-num?communityId={communityId}&endDate={endDate}&floor={floor}&startDate={startDate}',
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

      //群组管理列表(搜索)
       'cluster-list':{
         url: '/api/krspace-finance-web/cluster/manager/list?clusterName={clusterName}&cmtId={cmtId}&pageSize={pageSize}&page={page}',
         method: 'get'
      },
      //群组-查看群组
       'cluster-detail':{
         url: '/api/krspace-finance-web/cluster/manager/detail?clusterId={clusterId}',
         method: 'get'
      },
      //群组-删除群组
       'cluster-delete':{
         url: '/api/krspace-finance-web/cluster/manager/delete',
         method: 'post'
      },
      //群组-新建群组
       'cluster-insert':{
         url: '/api/krspace-finance-web/cluster/manager/insert',
         method: 'post'
      },
      //群组-修改群组
       'cluster-update':{
         url: '/api/krspace-finance-web/cluster/manager/update',
         method: 'post'
      },
      //app后台-帖子审核
       'topic-list':{
         url: '/api/krspace-finance-web/cluster/topic/list',
         method: 'get'
      },
      //app后台-帖子审核-获取处理数据
       'topic-detail':{
         url: '/api/krspace-finance-web/cluster/topic/detail?id={id}',
         method: 'get'
      },
      //app后台-帖子审核-处理
       'topic-handle':{
         url: '/api/krspace-finance-web/cluster/topic/dispose',
         method: 'post'
      },
      //app后台-小黑屋
       'punish-list':{
         url: '/api/krspace-finance-web/cluster/punish/list',
         method: 'get'
      },
      //app后台-小黑屋-提前释放
       'punish-release':{
         url: '/api/krspace-finance-web/cluster/punish/release',
         method: 'post'
      },
      //app后台-小黑屋-加刑
       'punish-add':{
         url: '/api/krspace-finance-web/cluster/punish/inflict',
         method: 'post'
      },
      //群组-获取所有城市
       'getcity-list':{
         url: '/api/krspace-finance-web/cluster/manager/city',
         method: 'get'
      },
      //群组-获取所有社区
       'getcommunity-list':{
         url: '/api/krspace-finance-web/cmt/community/select/use/type/city',
         method: 'get'
      },

      // 获取枚举字典接口
      'getListDic': {
            url: '/api/krspace-finance-web/dict/common',
            method: 'get'
       },
      // 获取积分列表
      'get-point': {
         url: '/api/krspace-finance-web/point/manage/find-page?cmtId={cmtId}&customerName={customerName}&page={page}&pageSize={pageSize}',
         method: 'get'
       },
       // 获取积分消费记录
      'get-point-detail': {
         url: '/api/krspace-finance-web/point/manage/find-log-page?customerId={customerId}&page={page}&pageSize={pageSize}',
         method: 'get'
       },
       // 充值积分
      'save-add-point': {
            url: '/api/krspace-finance-web/point/manage/add-point',
            method: 'post'
       },

    //客户来源配置-删除客户来源
    'delete-source': {
        url: '/z/us/csr/source/actions/delete?',
     //   url: '/api/order/csr/source/actions/delete?id={id}',
        method: 'delete'
    },
    //客户来源配置-客户来源列表
    'list-source': {
        url:'/z/us/csr/source/list/type/search',
       // url: '/api/order/csr/source/list/type/search?page={page}&pageSize={pageSize}&searchKey={searchKey}',
        method: 'get'
    },
    //客户来源配置-新增客户来源
    'new-source': {
        url: '/z/us/csr/source/actions/save',
     //   url: '/api/order/csr/source/actions/save',
        method: 'post'
    },
    //客户来源配置-编辑客户来源
    'edit-source': {
        url: '/z/us/csr/source/actions/edit',
      //  url: '/api/order/csr/source/actions/edit',
        method: 'post'
    },
     //客户来源配置-子项是否可删除
    'del-child-source': {
        url: '/api/krspace-finance-web/csr/source/check/delete/sub?id={id}',
        method: 'get'
    },
     //客户来源配置-校验客户来源名称
    'check-name-source': {
        url: '/z/us/csr/source/check/name',
     //   url: '/api/order/csr/source/check/name?id={id}&name={name}',
        method: 'get'
    },
    //客户来源配置-校验客户来源编码
    'check-code-source': {
        url:'/z/us/csr/source/check/code',
       // url: '/api/krspace-finance-web/csr/source/check/code?id={id}&code={code}',
        method: 'get'
    },
    //客户来源配置-校验客户来源编码
    'check-order-source': {
        url: '/z/us/csr/source/check/order',
      //  url: '/api/krspace-finance-web/csr/source/check/order?id={id}&orderNum={orderNum}',
        method: 'get'
    },
    //客户来源配置-获取客户来源信息
    'get-detail-source': {
        url: '/z/us/csr/source/info/type/edit',
     //   url: '/api/order/csr/source/info/type/edit?id={id}',
        method: 'get'
    },

    //运营平台-基本配置-设备定义（一代门禁）--重置设备
    'resetEquipmentInfo': {
        url: '/api/krspace-finance-web/community/sysDeviceDefinition/device-definition/actions/reset',
        method: 'post'
    },
    //运营平台-基本配置-设备定义（一代门禁）--删除设备
    'deleteEquipmentInfo': {
        url: '/api/krspace-finance-web/community/sysDeviceDefinition/device-definition/actions/delete',
        method: 'post'
    },
    //APP管理-公告管理-公告分页
    'get-notice-page': {
        url: '/api/krspace-finance-web/notice/management/page?page={page}&pageSize={pageSize}&cmtId={cmtId}&searchText={searchText}',
        method: 'get'
    },
    //APP管理-公告管理-创建公告
    'create-notice': {
        url: '/api/krspace-finance-web/notice/management/create',
        method: 'post'
    },
    //APP管理-公告管理-删除公告
    'delete-notice': {
        url: '/api/krspace-finance-web/notice/management/delete',
        method: 'post'
    },
    //APP管理-公告管理-发布公告
    'publish-notice': {
        url: '/api/krspace-finance-web/notice/management/publish',
        method: 'post'
    },
    //APP管理-公告管理-编辑公告
    'edit-notice': {
        url: '/api/krspace-finance-web/notice/management/edit',
        method: 'post'
    },
    //APP管理-公告管理-获取公告详情
    'get-notice-detail': {
        url: '/api/krspace-finance-web/notice/management/detail?noticeId={noticeId}',
        method: 'get'
    },
    //APP管理-公告管理-获取是否有全国 公告的权限
    'get-findCmtRight': {
        url: '/api/krspace-finance-web/notice/management/findCmtRight',
            method: 'get'
    },

    //运营主页--本月回款
    'get-month-payment': {
        url: '/api/krspace-finance-web/operation/month-payment?customerId={customerId}&cmtId={cmtId}&page={page}&pageSize={pageSize}',
        method: 'get'
    },
    //运营主页--累积回款
    'get-total-payment': {
        url: '/api/krspace-finance-web/operation/total-payment?customerId={customerId}&cmtId={cmtId}&page={page}&pageSize={pageSize}',
        method: 'get'
    },
    //运营主页--社区欠款
    'get-cmt-arrearages': {
        url: '/api/krspace-finance-web/operation/cmt-arrearages?customerId={customerId}&cmtId={cmtId}&page={page}&pageSize={pageSize}',
        method: 'get'
    },
    //运营主页--现入住
    'get-settled-customer': {
        url: '/api/krspace-finance-web/operation/settled-customer?customerId={customerId}&cmtId={cmtId}&page={page}&pageSize={pageSize}',
        method: 'get'
    },
    //运营主页--未入住
    'get-signed-customer': {
        url: '/api/krspace-finance-web/operation/signed-customer?customerId={customerId}&cmtId={cmtId}&page={page}&pageSize={pageSize}',
        method: 'get'
    },
    //运营主页--客户总数
    'get-total-customer': {
        url: '/api/krspace-finance-web/operation/total-customer?customerId={customerId}&cmtId={cmtId}&page={page}&pageSize={pageSize}',
        method: 'get'
    },
    //运营主页--跟进中
    'get-following-customer': {
        url: '/api/krspace-finance-web/operation/following-customer?customerId={customerId}&cmtId={cmtId}&page={page}&pageSize={pageSize}',
        method: 'get'
    },
    //运营主页--新增线索
    'get-new-clue': {
        url: '/api/krspace-finance-web/operation/new-clue?customerId={customerId}&cmtId={cmtId}&page={page}&pageSize={pageSize}',
        method: 'get'
    },
    //运营主页--数据
    'get-home-data': {
        url: '/api/krspace-finance-web/operation/home?cmtId={cmtId}',
        method: 'get'
    },
    //运营主页--应收账款
    'get-accounts-receivable': {
        url: '/api/krspace-finance-web/operation/accounts-receivable?cmtId={cmtId}&page={page}&pageSize={pageSize}',
        method: 'get'
    },
    //运营主页--到期合同
    'get-expire-contract': {
        url: '/api/krspace-finance-web/operation/expire-contract?cmtId={cmtId}&page={page}&pageSize={pageSize}',
        method: 'get'
    },
    //运营主页--带入驻合同
    'get-settled-contract': {
        url: '/api/krspace-finance-web/operation/settled-contract?cmtId={cmtId}&page={page}&pageSize={pageSize}',
        method: 'get'
    },
    //运营主页--带入驻合同
    'get-appointment': {
        url: '/api/krspace-finance-web/operation/appointment?cmtId={cmtId}&page={page}&pageSize={pageSize}',
        method: 'get'
    },
    'get-community-list': {
        url: '/api/krspace-finance-web/operation/city-cmt-list',
        method: 'get'
    },
    'get-company-name': {
        url: '/api/krspace-finance-web/customer/all-customers?company={company}',
        method: 'get'
    },
    //红木馆-待审核列表
    'get-wait-audit': {
        url: '/api/top-audit/activity/admin/list?page={page}&pageSize={pageSize}&status={status}',
        method: 'get'
    },
    //红木馆-待审核列表
    'get-wait-audit-edit': {
        url: '/api/top-audit/activity/admin/edit',
        method: 'post'
    },
     //红木馆-待审核列表
    'get-wait-audit-delete': {
        url: '/api/top-audit/activity/admin/delete',
        method: 'post'
    },
    'delete-reduce-contract': {
        url: '/api/krspace-finance-web/fnaContractRentController/deleteFnaContractRent?contractId={contractId}',
        method: 'delete'
    },
    'delete-increase-contract': {
        url: '/api/krspace-finance-web/checkinagreement/delete-increase-contract?contractId={contractId}',
        method: 'delete'
    },
    'delete-renew-contract': {
        url: '/api/krspace-finance-web/checkinagreement/delete-continue-contract?contractId={contractId}',
        method: 'delete'
    },
    //App管理-活动管理-新建活动
    'create-activity': {
        url: '/api/krspace-finance-web/activity/management/create',
        method: 'post'
    },
    //App管理-活动管理-删除活动
    'delete-activity': {
        url: '/api/krspace-finance-web/activity/management/delete',
        method: 'post'
    },
    //App管理-活动管理-发布活动
    'publish-activity': {
        url: '/api/krspace-finance-web/activity/management/publish',
        method: 'post'
    },
    //App管理-活动管理-活动分页
    'activity-page': {
        url: '/api/krspace-finance-web/activity/management/activity-page?page={page}&pageSize={pageSize}',
        method: 'get'
    },
    //App管理-活动管理-查看活动详情
    'activity-detail': {
        url: '/api/krspace-finance-web/activity/management/detail?id={id}',
        method: 'get'
    },
    //App管理-活动管理-报名列表
    'actor-page': {
        url: '/api/krspace-finance-web/activity/management/actor-page?id={id}&page={page}&pageSize={pageSize}',
        method: 'get'
    },
    //App管理-活动管理-编辑活动
    'edit-activity': {
        url: '/api/krspace-finance-web/activity/management/edit',
        method: 'post'
    },
    //App管理-活动管理-获取是否有全国活动的权限
    'activity-findCmtRight': {
        url: '/api/krspace-finance-web/activity/management/findCmtRight',
        method: 'get'
    },
    //App管理-活动管理-通过社区id 查询社区地址
    'activity-findCmtAddres': {
        url: '/api/krspace-finance-web/activity/management/findCmtAddress?cmtId={cmtId}',
        method: 'get'
    },
    //App管理-App意见反馈-分页
    'opinion-page': {
        url: '/api/krspace-finance-web/app/question/page?page={page}&pageSize={pageSize}',
        method: 'get'
    },
    //App管理-App意见反馈-查看详情
    'opinion-detail': {
        url: '/api/krspace-finance-web/app/question/detail?id={id}',
        method: 'get'
    },
    //App管理-App意见反馈-处理
    'opinion-handle': {
        url: '/api/krspace-finance-web/app/question/handle',
        method: 'post'
    },
    //社区经营-意见反馈-查看详情
    'question-detail': {
        url: '/api/krspace-finance-web/op/community/question/detail?id={id}',
        method: 'get'
    },
    //社区经营-意见反馈-处理
    'question-handle': {
        url: '/api/krspace-finance-web/op/community/question/handle',
        method: 'post'
    },
    //App管理-广告管理-启动页-创建广告
    'create-advert': {
        url: '/api/krspace-finance-web/advertising/boot/create',
        method: 'post'
    },
    //App管理-广告管理-启动页-删除广告
    'delete-advert': {
        url: '/api/krspace-finance-web/advertising/boot/delete',
        method: 'post'
    },
    //App管理-广告管理-启动页-发布广告
    'publish-advert': {
        url: '/api/krspace-finance-web/advertising/boot/publish',
        method: 'post'
    },
    //App管理-广告管理-启动页-分页
    'advert-page': {
        url: '/api/krspace-finance-web/advertising/boot/page?page={page}&pageSize={pageSize}',
        method: 'get'
    },
    //App管理-广告管理-启动页-查看详情
    'advert-detail': {
        url: '/api/krspace-finance-web/advertising/boot/detail?id={id}',
        method: 'get'
    },
    //App管理-广告管理-启动页-编辑广告
    'advert-edit': {
        url: '/api/krspace-finance-web/advertising/boot/edit',
        method: 'post'
    },
    //App管理-广告管理-banner-创建广告
    'create-banner': {
        url: '/api/krspace-finance-web/advertising/banner/create',
        method: 'post'
    },
    //App管理-广告管理-banner-删除广告
    'delete-banner': {
        url: '/api/krspace-finance-web/advertising/banner/delete',
        method: 'post'
    },
    //App管理-广告管理-banner-发布广告
    'publish-banner': {
        url: '/api/krspace-finance-web/advertising/banner/publish',
        method: 'post'
    },
    //App管理-广告管理-banner-分页
    'banner-page': {
        url: '/api/krspace-finance-web/advertising/banner/page?page={page}&pageSize={pageSize}',
        method: 'get'
    },
    //App管理-广告管理-banner-查看详情
    'banner-detail': {
        url: '/api/krspace-finance-web/advertising/banner/detail?id={id}',
        method: 'get'
    },
    //App管理-广告管理-banner-编辑广告
    'edit-banner': {
        url: '/api/krspace-finance-web/advertising/banner/edit',
        method: 'post'
    },
    'change-visit-state': {
        url: '/api/krspace-finance-web/sys/visit-record/actions/edit/type/visit-status',
        method: 'post'
    },
    //优惠选项
    'sale-tactics': {
        url: '/api/krspace-finance-web/sale-tactics?communityId={communityId}',
        method: 'get'
    },
    //计算优惠
    'count-sale': {
        url: '/api/krspace-finance-web/count-sale',
        method: 'post'
    },
    
    //运营平台-会员管理-会员卡管理
    'MemberCardManageList': {
        url: '/api/iot-platform/card/list?type={type}&value={value}&page={page}&pageSize={pageSize}',
        method: 'get'
    },
    //运营平台-会员管理-会员卡片编辑回显
    'MemberCardEditShow': {
        url: '/api/iot-platform/card/edit-info?id={id}',
        method: 'get'
    },

    //运营平台-会员管理-会员卡片查看回显
    'MemberCardSeeDetail': {
        url: '/api/iot-platform/card/detail?id={id}',
        method: 'get'
    },
    //运营平台-社区分期列表
    'community-stage-list': {
        url: '/api/krspace-finance-web/cmt/community/zone/list/search?communityId={communityId}',
        method: 'get'
    },
    
    //运营平台-社区分期列表-新增
    'community-stage-add': {
        url: '/api/krspace-finance-web/cmt/community/zone/save',
        method: 'post'
    },
     //运营平台-社区分期列表-编辑
     'community-stage-edit': {
        url: '/api/krspace-finance-web/cmt/community/zone/update',
        method: 'post'
    },

    //运营平台-社区分期-可配置明细查询
    'stage-detail-search': {
        url: '/api/krspace-finance-web/cmt/community/zone/config/search?communityId={communityId}&detailType={detailType}&floor={floor}&numberMax={numberMax}&numberMin={numberMin}',
        method: 'get'
    },
    //运营平台-社区分期-已存在配置查询
    'stage-down-search': {
        url: '/api/krspace-finance-web/cmt/community/zone/configed/search?zoneId={zoneId}',
        method: 'get'
     },

     //运营平台-APP管理-积分管理-充值记录
     'charge-list': {
        url: '/api/krspace-finance-web/point/manage/charge-list?companyId={companyId}&page={page}&pageSize={pageSize}',
        method: 'get'
    },
    //运营平台-APP管理-我的地点-查找姓名
    'find-by-name': {
            url: '/api/krspace-finance-web/member/find-by-name?mbrNameStr={mbrNameStr}',
            method: 'get'
    },
    //运营平台-APP管理-企业认证-分页
    'verification-page': {
        url: '/api/krspace-finance-web/company/verification/page?verifyStatus={verifyStatus}&page={page}&pageSize={pageSize}',
        method: 'get'
    }, 
    //运营平台-APP管理-企业认证-审核详情信息
    'verification-detail': {
        url: '/api/krspace-finance-web/company/verification/detail?companyId={companyId}',
        method: 'get'
    }, 
     //运营平台-APP管理-企业认证-审核通过
     'verification-pass': {
        url: '/api/krspace-finance-web/company/verification/pass',
        method: 'post'
    },  
    //运营平台-APP管理-企业认证-审核不通过
    'verification-failed': {
        url: '/api/krspace-finance-web/company/verification/failed',
        method: 'post'
    }, 
    //运营平台-APP管理-企业认证-编辑提交
    'verification-edit': {
        url: '/api/krspace-finance-web/company/verification/edit',
        method: 'post'
    },  

    // 合同调整列表
    'agreementTrimList': {
        url: '/api/krspace-op-web/fina-contract-change-list?page={page}&pageSize={pageSize}&customerId={customerId}',
        method: 'get'
    },
    // 合同调整保存
    'agreementTrimSave': {
        url: '/api/krspace-op-web/fina-contract-detail-save',
        method: 'post'
    },
    //清除测试数据
    'delete-demo': {
        url: '/api/krspace-op-web/fina-contract-detail-delete-test',
        method: 'post'
    },
     //注册地址－列表
     'register-address-list': {
        url: '/api/krspace-finance-web/cmt/register-address/list/type/search?communityId={communityId}&page={page}&pageSize={pageSize}',
        method: 'get'
    },
    //注册地址－新建
    'register-address-add': {
        url: '/api/krspace-finance-web/cmt/register-address/add',
        method: 'post'
    },
     //注册地址－删除
     'register-address-delete': {
        url: '/api/krspace-finance-web/cmt/register-address/delete?id={id}',
        method: 'delete'
    },
    //注册地址－编辑回显
    'register-address-get': {
        url: '/api/krspace-finance-web/cmt/register-address/info/type/edit?id={id}',
        method: 'get'
    },
     //注册地址－编辑
     'register-address-edit': {
        url: '/api/krspace-finance-web/cmt/register-address/edit',
        method: 'post'
    },  
     //注册地址－获取社区
     'register-get-community': {
        url: '/api/krspace-finance-web/cmt/register-address/select/type/community?communityId={communityId}',
        method: 'get'
    },
     //确认月收入数据
     'init-report-income': {
        url: '/api/krspace-op-web/init-report-income',
        method: 'post'
    },
     //计算合同租赁期限
     'contract-date-range': {
        url: '/api/krspace-op-web/finacontractdetail/contract-date-range?start={start}&end={end}',
        method: 'get'
    },
     //App管理--公告管理--所有社区接口
     'get-all-list': {
        url: '/z/bs/cmt/community/all/list',
       // url: '/api/krspace-finance-web/cmt/community/all/list?communityName={communityName}',
        method: 'get'
    },
    //App管理--公告管理--过期
    'expire-notice': {
        url: '/api/krspace-finance-web/notice/management/expire',
        method: 'post'
    },
    //App管理--广告管理--banner--下架
    'banner-unpublish': {
        url: '/api/krspace-finance-web/advertising/banner/unpublish',
        method: 'post'
    },
    //App管理--广告管理--启动页--下架
    'boot-unpublish': {
        url: '/api/krspace-finance-web/advertising/boot/unpublish',
        method: 'post'
    },
    'get-source-list': {
        url: '/api/krspace-sso-web/sys/enmu?enmuKey={enmuKey}',
        method: 'get'
    },
    //社区运营--社区运营--会议室--社区列表
    'get-community-new-list': {
        url: '/z/bs/cmt/community/all/list',
      //  url: '/api/krspace-op-web/cmt/community/all/list?cmtName={cmtName}',
        method: 'get'
    },
    
    //社区运营--社区运营--会议室--楼层
    'get-krmting-room-stock-floor-list': {
        url: '/api/krspace-op-web/krmting/room/stock/floor/list?cmtId={cmtId}',
        method: 'get'
    },
     //社区运营--社区运营--会议室--会议室预定列表
     'get-krmting-room-stock-list': {
        url: '/api/krspace-op-web/krmting/room/stock/list?cmtId={cmtId}&floor={floor}&meetingDate={meetingDate}&page={page}&pageSize={pageSize}',
        method: 'get'
    },
    //社区运营--社区运营--会议室--根据订单id来源查询订单详情
    'get-krmting-room-stock-info': {
        url: '/api/krspace-op-web/krmting/room/stock/info?orderNo={orderNo}&orderSource={orderSource}',
        method: 'get'
    },
    //App--广告--启动页--城市列表
    'get-app-common-enter-citis': {
        url: '/api/krspace-finance-web/app/common/enter-citis?cityName={cityName}',
        method: 'get'
    },
    //App--广告--启动页--详情
    'get-app-advertising-boot-detail': {
        url: '/api/krspace-finance-web/advertising/boot/detail?id={id}',
        method: 'get'
    },
    //项目-社区联动-获取社区关联情况
    'get-community-edit-info': {
        url: '/api/pm/project-community/edit-info?communityId={communityId}',
        method: 'get'
    },
    //项目-社区联动-可选关联项目列表
    'get-project-community-list': {
        url: '/api/pm/project-community/list?communityId={communityId}',
        method: 'get'
    },
    //项目-社区联动-保存项目-社区关联关系
    'post-community-save': {
        url: '/api/pm/project-community/save',
        method: 'post'
    },
    //查询项目-社区关联字段数据
    'get-community-info-related': {
        url: '/api/pm/project-community/community-info?projectId={projectId}',
        method: 'get'
    },

}
