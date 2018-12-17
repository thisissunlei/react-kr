
//数据统计

module.exports = {

  //数据统计-集团经营-招商数据已开业
  'openCompanyData': {
    url: '/api/krspace-finance-web/stat/merchant/actions/open?endDate={endDate}&startDate={startDate}',
    method: 'get'
  },
  //数据统计-集团经营-获取当前登陆人的组合模块
  'get-my-groups': {
    url: '/api/krspace-finance-web/stat/group/actions/get-my-groups',
    method: 'get'
  },
  //数据统计-集团经营-招商数据未开业
  'notOpenCompanyData': {
    url: '/api/krspace-finance-web/stat/merchant/actions/notopen?endDate={endDate}&startDate={startDate}',
    method: 'get'
  },
  //数据统计-模板分组-模板列表
  'MouldGroupList': {
    url: '/api/krspace-finance-web/stat/group/group-list?page={page}&pageSize={pageSize}&groupName={groupName}&enable={enable}',
    method: 'get'
  },
  //数据统计-模板分组-分组详情
  'MouldGroupDetails': {
    url: '/api/krspace-finance-web/stat/group/actions/view?id={id}',
    method: 'get'
  },
  //数据统计-模板分组-新建时获取所有模板的数据
  'GroupNewModule': {
    url: '/api/krspace-finance-web/stat/template/list',
    method: 'get'
  },
  //招商数据统计-all列表
 'already-open':{
    url: '/api/krspace-finance-web/stat/merchant/data/customer?endDate={endDate}&startDate={startDate}',
    method: 'get'
 },
   //招商数据统计-导出
 'already-export':{
    url: '/api/krspace-finance-web/stat/merchant/data/customer/export?groupId={groupId}&endDate={endDate}&startDate={startDate}',
    method: 'get'
 },
 //数据统计-集团经营-招商数据已开业导出
  'openCompanyExprot': {
     url: '/api/krspace-finance-web/stat/merchant/open/export?groupId={groupId}&endDate={endDate}&startDate={startDate}',
     method: 'get'
  },
//数据统计-集团经营-招商数据未开业导出
  'notopenCompanyExprot': {
     url: '/api/krspace-finance-web/stat/merchant/notopen/export?groupId={groupId}&endDate={endDate}&startDate={startDate}',
     method: 'get'
  },

  // 数据统计-账龄分析-社区汇总列表
  'communityListAging':{
    url: '/api/krspace-finance-web/finance/explan-summary?communityId={communityId}&endDate={endDate}',
    method: 'get'
  },

  // 数据统计-账龄分析-社区明细列表
  'getDetailList':{
    url: '/api/krspace-finance-web/finance/explan?customerId={customerId}&corporationId={corporationId}&dayType={dayType}&communityId={communityId}&end={end}&endDate={endDate}',
    method: 'get'
  },
  // 数据统计-账龄分析-高级查询主体准备数据
  'getMainbody':{
    url: '/api/krspace-sso-web/dict/corporation/id-name',
    method: 'get'
  },
  //数据报表-总列表
   'getReportList':{
      url: '/api/krspace-finance-web/csr/source/stat/list/type/search?cityId={cityId}&communityId={communityId}&searchStartDate={searchStartDate}&searchEndDate={searchEndDate}',
      method: 'get'
    },

   //数据报表－工位详情
   'report-station-detail':{
      url: '/api/krspace-finance-web/csr/source/stat/detail/type/add?cityId={cityId}&communityId={communityId}&sourceId={sourceId}&searchStartDate={searchStartDate}&searchEndDate={searchEndDate}&page={page}&pageSize={pageSize}',
      method: 'get'
   },
   //数据报表－签约详情
   'report-sign-detail':{
      url: '/api/krspace-finance-web/csr/source/stat/detail/type/sign?cityId={cityId}&communityId={communityId}&sourceId={sourceId}&searchStartDate={searchStartDate}&searchEndDate={searchEndDate}&page={page}&pageSize={pageSize}',
      method: 'get'
   },
    //数据报表－高级查询
   'report-data-list':{
        url: '/z/bs/cmt/city/select/use/type/list',
    //  url: '/api/krspace-finance-web/cmt/city/select/use/type/list',
        method: 'get'
   },

}
