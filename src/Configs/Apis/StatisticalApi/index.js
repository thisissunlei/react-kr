
//数据统计

module.exports = {
  
  //数据统计-集团经营-招商数据已开业
  'openCompanyData': {
    url: '/api/krspace-finance-web/stat/merchant/actions/open?groupId={groupId}&endDate={endDate}&startDate={startDate}',
    method: 'get'
  },
  //数据统计-集团经营-获取当前登陆人的组合模块
  'get-my-groups': {
    url: '/api/krspace-finance-web/stat/group/actions/get-my-groups',
    method: 'get'
  },
  //数据统计-集团经营-招商数据未开业
  'notOpenCompanyData': {
    url: '/api/krspace-finance-web/stat/merchant/actions/notopen?groupId={groupId}&endDate={endDate}&startDate={startDate}',
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
}
