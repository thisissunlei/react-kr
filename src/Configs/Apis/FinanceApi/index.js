//财务管理

module.exports = {
  //财务管理－属性配置－列表
  'viewFinaFinaflowProperty': {
      url: '/krspace-finance-web/finaccount/property/viewFinaFinaflowProperty',
      method: 'get'
  },

  //财务管理－属性配置-查看
  'viewFinaFinaflowProperty': {
      url: '/krspace-finance-web/finaccount/property/viewFinaFinaflowProperty',
      method: 'get'
  },
  //财务管理－订单账单列表-分页获取订单
  'getFinaDataByList': {
      url: '/api/krspace-finance-web/finaccount/data/getFinaDataByAjax?page={page}&pageSize={pageSize}&mainbillname={mainbillname}&startDate={startDate}&endDate={endDate}&mainbilltype={mainbilltype}&communityid={communityid}&departmentId={departmentId}',
      method: 'get'
  },
  //财务管理－订单账单列表-高级查询
  'getFinaDataCommunityAndMainBillType': {
      url: '/api/krspace-finance-web/finaccount/data/getFinaDataCommunityAndMainBillType',
      method: 'get'
  },
  //财务管理－订单账单列表-高级查询-订单类型
  'getMainBillTypeList': {
      url: '/api/krspace-finance-web/finaccount/data/getMainBillTypeList',
      method: 'get'
  },
  //财务管理－订单账单列表-高级查询-社区类型
  'getCommunityListByParams': {
      url: '/api/krspace-finance-web/finaccount/data/getCommunityListByParams?communityName={communityName}',
      method: 'get'
  },
  //财务管理－订单账单列表-导出
  'finaExportExcel': {
      url: '/api/krspace-finance-web/finaccount/data/exportExcel?communityid={communityid}&customername={customername}&endDate={endDate}&mainbilltype={mainbilltype}&startDate={startDate}&idList={idList}',
      method: 'get'
  },
  //财务管理－科目配置－新建(修改)
  'saveFinaFinaflowAccountModel': {
      url: '/api/krspace-finance-web/finaccount/finaFinaflowAccountModel/saveFinaFinaflowAccountModel',
      method: 'post'
  },
  //财务管理－科目配置－搜索(list)
  'getFinaFinaflowAccountModelByAjax': {
      url: '/api/krspace-finance-web/finaccount/finaFinaflowAccountModel/getFinaFinaflowAccountModelByAjax?accountname={accountname}&currentPage={currentPage}&pageSize={pageSize}',
      method: 'get'
  },
  //财务管理－科目配置－导出
  'getfinancExportExcel': {
      url: '/api/krspace-finance-web/finaccount/finaFinaflowAccountModel/exportExcel?idList={idList}',
      method: 'get'
  },
  //财务--款项--获取一级款项分页
    'findPage': {
        url: '/api/krspace-finance-web/finaccount/category/findPage?page={page}&pageSize={pageSize}&searchParam={searchParam}',
        method: 'get'
    },
    //财务--款项--创建一级款项
    'createFirstCategory': {
        url: '/api/krspace-finance-web/finaccount/category/createFirstCategory',
        method: 'post'
    },
    //财务--款项--查看款项详情
    'getById': {
        url: '/api/krspace-finance-web/finaccount/category/getById?id={id}',
        method: 'get'
    },
    //财务--款项--编辑一级款项
    'editFirstCategory': {
        url: '/api/krspace-finance-web/finaccount/category/editFirstCategory',
        method: 'post'
    },
    //财务--款项--子款项分页数据
    'findSubCategoryPage': {
        url: '/api/krspace-finance-web/finaccount/category/findSubCategoryPage?page={page}&pageSize={pageSize}&searchParam={searchParam}&parentId={parentId}',
        method: 'get'
    },
    //财务--款项--创建二级款项
    'createSubCategory': {
        url: '/api/krspace-finance-web/finaccount/category/createSubCategory',
        method: 'post'
    },
    //财务--款项--编辑二级款项
    'editSubCategory': {
        url: '/api/krspace-finance-web/finaccount/category/editSubCategory',
        method: 'post'
    },
    //财务--回款--二级子项
    'getSubCategoryFlow': {
        url: '/api/krspace-finance-web/finaccount/data/getSubCategoryFlow?mainbillid={mainbillid}&firstCategoryId={firstCategoryId}&flowType={flowType}',
        method: 'get'
    },
    //财务--审核列表--待审核--获取列表信息
    'get-fince-info': {
        url: '/api/krspace-finance-web/finaVerify/data/get-fince-info?verifyStatus={verifyStatus}&payWay={payWay}&flowCategoryId={flowCategoryId}&dealStartTime={dealStartTime}&dealEndTime={dealEndTime}&customerName={customerName}&createStratTime={createStratTime}&createEndTime={createEndTime}&corporationId={corporationId}&communityId={communityId}&page={page}&pageSize={pageSize}',
        method: 'get'
    },
    //财务--审核列表--高级查询--获取社区
    'get-mainbill-community': {
        url: '/api/krspace-finance-web/finaVerify/data/get-mainbill-community?communityName={communityName}',
        method: 'get'
    },
    //财务--审核列表--高级查询--获取收款方式
    'get-fina-payway': {
        url: '/api/krspace-finance-web/finaVerify/data/get-fina-payway',
        method: 'get'
    },
    //财务--审核列表--高级查询--获取收款类型
    'get-fina-paytype': {
        url: '/api/krspace-finance-web/finaVerify/data/get-fina-paytype?catagoryName={catagoryName}',
        method: 'get'
    },
    //财务--审核列表--高级查询--获取主体
    'get-fina-corporation': {
        url: '/api/krspace-finance-web/finaVerify/data/get-fina-corporation?corporationName={corporationName}',
        method: 'get'
    },
    //财务--审核列表--获取条目数
    'get-fina-flow-count': {
        url: '/api/krspace-finance-web/finaVerify/data/get-fina-flow-count?communityId={communityId}&corporationId={corporationId}&createEndTime={createEndTime}&createStratTime={createStratTime}&customerName={customerName}&dealEndTime={dealEndTime}&dealStartTime={dealStartTime}&flowCategoryId={flowCategoryId}&payWay={payWay}&verifyStatus={verifyStatus}',
        method: 'get'
    },
    //财务--审核列表--已审核--获取款项及金额
    'get-fina-flow-category': {
        url: '/api/krspace-finance-web/finaVerify/data/get-fina-flow-category?verifyStatus={verifyStatus}&payWay={payWay}&flowCategoryId={flowCategoryId}&dealStartTime={dealStartTime}&dealEndTime={dealEndTime}&customerName={customerName}&createStratTime={createStratTime}&createEndTime={createEndTime}&corporationId={corporationId}&communityId={communityId}&page={page}&pageSize={pageSize}',
        method: 'get'
    },
    //财务--审核列表--添加回款--查询客户列表
    'get-customer-info': {
        url: '/api/krspace-finance-web/finaVerify/data/get-customer-info?customerName={customerName}',
        method: 'get'
    },
    //财务--审核列表--添加回款--订单列表
    'get-mainbill': {
        url: '/api/krspace-finance-web/finaVerify/data/get-mainbill?mainBillName={mainBillName}&customerId={customerId}',
        method: 'get'
    },
    //财务--审核列表--添加回款--获取我司账户
    'get-account-info': {
        url: '/api/krspace-finance-web/finaVerify/data/get-account-info?accountType={accountType}&corporationId={corporationId}',
        method: 'get'
    },
    //财务--审核列表--添加回款--获取订单类型
    'get-mainbill-type': {
        url: '/api/krspace-finance-web/finaVerify/data/get-mainbill-type',
        method: 'get'
    },
    //财务--审核列表--添加回款--新建客户和订单
    'save-customer': {
        url: '/api/krspace-finance-web/finaVerify/opt/save-customer?communityid={communityid}&company={company}&mainbilldesc={mainbilldesc}&mainbillname={mainbillname}&mainbilltype={mainbilltype}&name={name}&tel={tel}',
        method: 'post'
    },
    //财务--审核列表--添加回款--付款明细
    'get-finaflow-info': {
        url: '/api/krspace-finance-web/finaVerify/data/get-finaflow-info?mainBillId={mainBillId}',
        method: 'get'
    },
    //财务--审核列表--已审核--编辑回款--付款信息
    'get-fina-infos': {
        url: '/api/krspace-finance-web/finaVerify/data/get-fina-info?finaVerifyId={finaVerifyId}',
        method: 'get'
    },
    //财务--审核列表--已审核--编辑回款--table
    'get-fina-flow-logs': {
        url: '/api/krspace-finance-web/finaVerify/data/get-fina-flow-logs?finaVerifyId={finaVerifyId}',
        method: 'get'
    },
    //财务--审核列表--已审核--编辑回款--付款明细
    'get-flow-edit-info': {
        url: '/api/krspace-finance-web/finaVerify/data/get-flow-edit-info?finaVerifyId={finaVerifyId}',
        method: 'get'
    },
    //财务--审核列表--已审核--编辑保存
    'edit-verify-checked': {
        url: '/api/krspace-finance-web/finaVerify/opt/edit-verify-checked',
        method: 'post'
    },
    //财务--审核列表--添加回款--获得公司主体及订单
    'get-mainbill-info': {
        url: '/api/krspace-finance-web/finaVerify/data/get-mainbill-info?mainBillId={mainBillId}',
        method: 'get'
    },
    //财务--待审核--删除
    'del-fina-unchecked-record': {
        url: '/api/krspace-finance-web/finaVerify/opt/del-fina-unchecked-record',
        method: 'post'
    },
    //财务--已退回--删除
    'del-fina-returned-record': {
        url: '/api/krspace-finance-web/finaVerify/opt/del-fina-returned-record',
        method: 'post'
    },
    //财务--审核--审核
    'edit-verify-status': {
        url: '/api/krspace-finance-web/finaVerify/opt/edit-verify-status',
        method: 'post'
    },
    //财务--审核--添加回款--保存
    'save-flow-verify': {
        url: '/api/krspace-finance-web/finaVerify/opt/save-flow-verify',
        method: 'post'
    },
    //财务--审核--批量审核
    'batch-edit-verify-status': {
        url: '/api/krspace-finance-web/finaVerify/opt/batch-edit-verify-status',
        method: 'post'
    },
    //财务--审核--导出
    'auditExport': {
        url: '/api/krspace-finance-web/finaVerify/data/export-excel?idList={idList}&communityId={communityId}&corporationId={corporationId}&createEndTime={createEndTime}&createStratTime={createStratTime}&customerName={customerName}&dealEndTime={dealEndTime}&dealStartTime={dealStartTime}&flowCategoryId={flowCategoryId}&payWay={payWay}&verifyStatus={verifyStatus}',
        method: 'get'
    },
    //财务--待审核--编辑回款--保存
    'edit-flow-unchecked-verify': {
        url: '/api/krspace-finance-web/finaVerify/opt/edit-flow-unchecked-verify',
        method: 'post'
    },
    //财务--已退回--编辑回款--保存
    'edit-flow-returned-verify': {
        url: '/api/krspace-finance-web/finaVerify/opt/edit-flow-returned-verify',
        method: 'post'
    },
    //财务--审核--添加回款--新建订单
    'save-main-bill': {
        url: '/api/krspace-finance-web/finaVerify/opt/save-main-bill',
        method: 'post'
    },
    //财务--审核--添加回款--新建客户和订单--生成订单名称
    'getMainbillName': {
        url: '/api/krspace-finance-web/finaVerify/data/get-mainbill-name?company={company}&mainBillTypeName={mainBillTypeName}',
        method: 'get'
    },
    //财务--审核--添加回款--新建订单--生成订单名称
    'get-mainbill-id': {
        url: '/api/krspace-finance-web/finaVerify/data/get-mainbill-id?customerId={customerId}&mainBillTypeName={mainBillTypeName}',
        method: 'get'
    },
     
    //财务管理－订单明细账－补历史收入
    'runStationIncome': {
        url: '/api/krspace-finance-web/finaccount/opt/runStationIncome?mainbillId={mainbillId}',
        method: 'get'
    },
    //财务管理－订单明细账－补充完成之后
    'removeRunningTag': {
        url: '/api/krspace-finance-web/finaccount/opt/removeRunningTag',
        method: 'post'
    },
    //财务管理－订单明细账-分页获得财务流水
    'getPageAccountFlow': {
        url: '/api/krspace-finance-web/finaccount/data/getAccountFlow?accountId={accountId}&accountType={accountType}&orderId={orderId}&endTime={endTime}&page={page}&pageSize={pageSize}&propertyId={propertyId}&startTime={startTime}',
        method: 'get'
    },
    //财务管理－订单明细账-订单明细页首次加载
    'getAccountFlow': {
        url: '/api/krspace-finance-web/finaccount/data/getFinaContractBillDataById?accountType={accountType}&mainbillid={mainbillid}&page={page}&pageSize={pageSize}',
        method: 'get'
    },
    //财务管理－订单明细账-回款
    'receiveMoney': {
        url: '/api/krspace-finance-web/finaccount/opt/receiveMoney',
        method: 'post'
    },
    //财务管理－订单明细账-退款
    'payBack': {
        url: '/api/krspace-finance-web/finaccount/opt/payBack',
        method: 'post'
    },
    //财务管理－订单明细账-查询代码列表
    'findAccountList': {
        url: '/api/krspace-finance-web/finaccount/data/findAccountList?accountType={accountType}',
        method: 'get'
    },
    //财务管理－订单明细账-转押金
    'transToDeposit': {
        url: '/api/krspace-finance-web/finaccount/opt/transToDeposit',
        method: 'post'
    },
    //财务管理－订单明细账-转押金按钮查询合同编号
    'findContractListById': {
        url: '/api/krspace-finance-web/finaccount/data/findContractListById?mainbillId={mainbillId}',
        method: 'get'
    },
    //财务管理－订单明细账-转营收
    'transToOperateIncome': {
        url: '/api/krspace-finance-web//finaccount/opt/transToOperateIncome',
        method: 'post'
    },
    //财务管理－订单明细账-添加挂账
    'supplementIncome': {
        url: '/api/krspace-finance-web//finaccount/opt/onAccount',
        method: 'post'
    },
    //财务管理－订单明细账-补收入
    'addIncome': {
        url: '/api/krspace-finance-web/finaccount/opt/supplementIncome?mainbillid={mainbillid}',
        method: 'get'
    },
    //财务管理－开票列表-list
    'getFnaInvoiceModelListByAjax': {
        url: '/api/krspace-finance-web/finaccount/fnaInvoiceModel/getFnaInvoiceModelListByAjax?pageSize={pageSize}&operatedate={operatedate}&page={page}&operateName={operateName}&invoiceType={invoiceType}&creater={creater}',
        method: 'get'
    },
    //财务管理-订单明细账-款项查询
    'getPropList': {
        url: '/api/krspace-finance-web/finaccount/data/getPropList?accountType={accountType}',
        method: 'get'
    },
    //财务管理-订单明细账-款项和代码列表
    'findAccountAndPropList': {
        url: '/api/krspace-finance-web/finaccount/data/findPayWayAndCategoryList?flowType={accountType}',
        method: 'get'
    },
    //财务管理-订单明细账-查看流水
    'getAccountFlowDetail': {
        url: '/api/krspace-finance-web/finaccount/data/getAccountFlowDetail?id={id}',
        method: 'get'
    },
    //财务系统－订单明细账－二期－添加挂帐
    'onNewAccountg': {
        url: '/api/krspace-finance-web/finaccount/opt/onAccount',
        method: 'post'
    },
    //财务系统－订单明细账－二期－点击挂帐所需数据
    'getOnNewAccountData': {
        url: '/api/krspace-finance-web/finaccount/data/getOnAccountData?mainbillId={mainbillId}',
        method: 'get'
    },
    //财务系统－订单明细账－二期－根据选中id来获取金额
    'getFlowRemainMoney': {
        url: '/api/krspace-finance-web/finaccount/data/getFlowRemainMoney?flowId={flowId}',
        method: 'get'
    },
    //财务系统－订单明细账－二期－点击转移加载数据
    'getTransferData': {
        url: '/api/krspace-finance-web/finaccount/data/getTransferData?flowId={flowId}&mainbillId={mainbillId}',
        method: 'get'
    },
    //财务系统－订单明细账－二期－转移确定
    'transferPayment': {
        url: '/api/krspace-finance-web/finaccount/opt/transferPayment',
        method: 'post'
    },
    //财务系统－订单明细账－二期－分页加载流水数据
    'getAccountNewFlow': {
        url: '/api/krspace-finance-web/finaccount/data/getAccountFlow?accountId={accountId}&accountType={accountType}&orderId={orderId}&endTime={endTime}&page={page}&pageSize={pageSize}&propertyId={propertyId}&startTime={startTime}&tradingCode={tradingCode}',
        method: 'get'
    },
    //财务系统－订单明细账－二期－支付方式
    'findAccountListTwo': {
        url: '/api/krspace-finance-web/finaccount/data/findAccountList',
        method: 'get'
    },
    //财务系统－订单明细账－二期－点击回款加载数据
    'getPaymentActData': {
        url: '/api/krspace-finance-web/finaccount/data/getPaymentActData?mainbillId={mainbillId}',
        method: 'get'
    },
    //财务系统－订单明细账－二期－点击确定进行回款操作
    'returnMoneyNew': {
        url: '/api/krspace-finance-web/finaccount/opt/returnMoney',
        method: 'post'
    },
    //财务系统－审核列表-获得付款账户显示
    'get-payment-account': {
        url: '/api/krspace-finance-web/finaVerify/data/get-payment-account',
        method: 'get'
    },
    //同步中心创建基本数据
    'get-tongbu-basic-data': {
        url: 'http://st.krspace.cn/api/krspace-op-web/sync/sync-cmt-ctrl-create',
        method: 'get'
    },
    //同步中心创建提交
    'get-tongbu-submit': {
        url: 'http://st.krspace.cn/api/krspace-op-web/sync/sync-cmt-ctrl',
        method: 'post'
    },
}
