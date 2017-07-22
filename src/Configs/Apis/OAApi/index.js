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
      url: '/api/krspace-erp-web/dim/hrm-list?orgId={orgId}&orgType={orgType}&nameAndEmail={nameAndEmail}&dimId={dimId}',
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
  /*====离职列表接口*/
  //离职列表-列表接口
  'getLeaveList': {
      url: '/api/krspace-erp-web/hrm/resource/list/type/dimission?page={page}&pageSize?{pageSize}&searchKey&{searchKey}',
      method: 'get'
  },
   /*====在职列表接口*/
   //在职列表-列表接口
  'getInServiceList': {
    url: '/api/krspace-erp-web/hrm/resource/list/type/incumbency?page={page}&pageSize?{pageSize}&searchKey&{searchKey}',
    method: 'get'
  },
  //在职列表-获取离职类型   ------
  'getDepartureType': {
    url: '/api/krspace-erp-web/hrm/resource/list/type/incumbency?page={page}&pageSize?{pageSize}&searchKey&{searchKey}',
    method: 'get'
  },
   //在职列表-离职提交
 'leaveOnSubmit': {
    url: '/api/krspace-erp-web/hrm/resource/dimission',
    method: 'post'
  },
   //在职列表-离职提交
 'transferOnSubmit': {
    url: '/api/krspace-erp-web/hrm/resource/move',
    method: 'post'
  },
  //在职列表-部门下拉  -----
 'getDepartmentList': {
    url: '/api/krspace-erp-web/hrm/resource/move',
    method: 'get'
  },
  //在职列表-接触账号  -----
 'removeAccount': {
    url: '/api/krspace-erp-web/hrm/resource/delete/account',
    method: 'post'
  },
  
  /*职务类型*/
  //职务类型－列表
  'postTypeList': {
    url: '/api/krspace-erp-web/hrm/job-type/list/type/search?code={code}&name={name}',
    method: 'get'
  },
  //职务类型－下拉数据
  'post-type-info': {
    url: '/api/krspace-erp-web/hrm/job-type/info/type/edit-data',
    method: 'get'
  },
  //职务类型新增
  'post-type-add': {
    url: '/api/krspace-erp-web/hrm/job-type/add',
    method: 'post'
  },
  //职务类型获取编辑信息
  'post-type-watch': {
    url: '/api/krspace-erp-web/hrm/job-type/info/type/edit?id={id}',
    method: 'get'
  },
   //职务类型编辑提交
  'post-type-edit': {
    url: '/api/krspace-erp-web/hrm/job-type/edit',
    method: 'post'
  },
   //职务类型删除
  'post-type-delete': {
    url: '/api/krspace-erp-web/hrm/job-type/delete?id={id}',
    method: 'delete'
  },
  /*职级列表*/
   //职级列表－列表
  'rank-list-list': {
    url: '/api/krspace-erp-web/hrm/job-level/list/type/search?name={name}&typeId={typeId}',
    method: 'get'
  },
  //职级职务类型名称下拉
  'rank-type-info': {
    url: '/api/krspace-erp-web/hrm/job-type/select/type/info?orgType={orgType}&orgId={orgId}',
    method: 'get'
  },
  //职级列表－新增
  'rank-list-add': {
    url: '/api/krspace-erp-web/hrm/job-level/add',
    method: 'post'
  },
  //职级列表－编辑
  'rank-list-edit': {
    url: '/api/krspace-erp-web/hrm/job-level/edit',
    method: 'post'
  },
  //职级列表－获取编辑信息
  'rank-list-watch': {
    url: '/api/krspace-erp-web/hrm/job-level/info/type/edit?id={id}',
    method: 'get'
  },
  //职级列表－删除
  'rank-list-delete': {
    url: '/api/krspace-erp-web/hrm/job-level/delete?id={id}',
    method: 'delete'
  },
  /*职务列表*/
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
   //职务列表－编辑
  'post-list-edit': {
      url: '/api/krspace-erp-web/hrm/job/edit',
      method: 'post'
  },
  //职务列表－删除
  'post-list-delete': {
      url: '/api/krspace-erp-web/hrm/job/delete?id={id}',
      method: 'delete'
  },
  //职务列表－查看
  'post-list-watch': {
      url: '/api/krspace-erp-web/hrm/job/info/type/edit?id={id}',
      method: 'get'
  },
  
  /*人员详情*/
  
  
}
