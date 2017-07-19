//OA
module.exports = {
  //维度列表
  'dim-list': {
      url: '/api/krspace-erp-web/dim/list',
      method: 'get'
  },
  //新建维度
  'dim-save': {
      url: '/api/krspace-erp-web/dim/save',
      method: 'post'
  },
  //编辑维度
  'dim-update': {
      url: '/api/krspace-erp-web/dim/update',
      method: 'post'
  },
  //维度详情
  'dim-detail': {
      url: '/api/krspace-erp-web/dim/detail?id={id}',
      method: 'get'
  },
  //查看某个机构
  'org-detail': {
      url: '/api/krspace-erp-web/dim/org-detail?orgId={orgId}&orgType={orgType}',
      method: 'get'
  },
  //编辑机构
  'org-update': {
      url: '/api/krspace-erp-web/dim/org-update',
      method: 'post'
  },
  //根据维度ID获取下面的机构
  'org-list': {
      url: '/api/krspace-erp-web/dim/org-list?id={id}',
      method: 'get'
  },
  //根据机构ID获取人员信息
  'hrm-list': {
      url: '/api/krspace-erp-web/dim/hrm-list?orgId={orgId}',
      method: 'get'
  },
  //根据机构ID获取下级机构
  'next-org-list': {
      url: '/api/krspace-erp-web/dim/hrm-list?next-org-list={next-org-list}',
      method: 'get'
  },
  //新建下级
  'save-junior': {
      url: '/api/krspace-erp-web/dim/save-junior',
      method: 'post'
  },
  //封存机构
  'org-cancel': {
      url: '/api/krspace-erp-web/dim/cancel',
      method: 'post'
  },
}
