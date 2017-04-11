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
      url: '/api/krspace-finance-web/finaccount/data/getFinaDataByAjax?page={page}&pageSize={pageSize}&mainbillname={mainbillname}&startDate={startDate}&endDate={endDate}&mainbilltype={mainbilltype}&communityid={communityid}',
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
}
