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
      url: '/api/krspace-erp-web/dim/hrm-list?orgId={orgId}&orgType={orgType}&nameAndEmail={nameAndEmail}',
      method: 'get'
  },
  //根据机构ID获取下级机构
  'next-org-list': {
      url: '/api/krspace-erp-web/dim/next-org-list?orgId={orgId}&orgType={orgType}&dimId={dimId}',
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
  //获取所有的维度（排除自己)
  'extra-list': {
      url: '/api/krspace-erp-web/dim/extra-list?dimId={dimId}',
      method: 'get'
  },
  //人员组件
  'hrm-search': {
      url: '/api/krspace-erp-web/hrm/resource/select/type/name-or-email?nameOrEmail={nameOrEmail}',
      method: 'get'
  },
  //职务列表－列表
  'postJobList': {
      url: '/api/krspace-erp-web/hrm/job/list/type/search?page={page}&pageSize={pageSize}&typeId={typeId}&name={name}',
      method: 'get'
  },
  //职务列表－新增
  'postListAdd': {
      url: '/api/krspace-erp-web/hrm/job/add',
      method: 'post'
  },
  /*====离职列表接口*/
  //离职列表-列表接口
  'getLeaveList': {
      url: '/api/krspace-erp-web/hrm/resource/list/type/dimission?page={page}&pageSize?{pageSize}&searchKey&{searchKey}',
      method: 'get'
  },

}
