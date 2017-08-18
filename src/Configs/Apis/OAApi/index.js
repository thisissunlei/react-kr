//OA
var OAApi = {
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
      url: '/api/krspace-erp-web/dim/hrm-list?orgId={orgId}&orgType={orgType}&nameAndEmail={nameAndEmail}&dimId={dimId}&page={page}&pageSize={pageSize}&hrmResourceAttributes={hrmResourceAttributes}&hrmResourceType={hrmResourceType}&startTime={startTime}&endTime={endTime}',
      method: 'get'
  },
  //根据机构ID获取下级机构
  'next-org-list': {
      url: '/api/krspace-erp-web/dim/next-org-list?orgId={orgId}&orgType={orgType}&dimId={dimId}&page={page}&pageSize={pageSize}',
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
  //判断是否是主维度
  'is-main-dim': {
      url: '/api/krspace-erp-web/dim/is-main-dim?dimId={dimId}',
      method: 'get'
  },
  /*====离职列表接口*/
  //离职列表-列表接口
  'getLeaveList': {
      url: '/api/krspace-erp-web/hrm/resource/list/type/dimission?page={page}&pageSize={pageSize}&searchKey={searchKey}',
      method: 'get'
  },
   /*====在职列表接口*/
   //在职列表-列表接口
  'getInServiceList': {
    url: '/api/krspace-erp-web/hrm/resource/list/type/incumbency?page={page}&pageSize={pageSize}&searchKey={searchKey}',
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
  //在职列表调动提交
   'service-switch': {
    url: '/api/krspace-erp-web/hrm/resource/move',
    method: 'post'
  },
  //在职列表-绑定门禁卡  -----
 'bindingCard': {
    url: '/api/krspace-erp-web/hrm/resource/binding/card',
    method: 'post'
  },
   //在职列表-获取门禁卡信息  -----
 'cardInfo': {
    url: '/api/krspace-erp-web/hrm/resource/info/type/card?resourceId={resourceId}',
    method: 'get'
  },
  /*职务类型*/
  //职务类型－列表
  'postTypeList': {
    url: '/api/krspace-erp-web/hrm/job-type/list/type/search?code={code}&name={name}&page={page}&pageSize={pageSize}',
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
    url: '/api/krspace-erp-web/hrm/job-level/list/type/search?name={name}&typeId={typeId}&page={page}&pageSize={pageSize}',
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
  //基本信息显示
  'people-basic-watch': {
      url: '/api/krspace-erp-web/hrm/resource/info/type/edit?id={id}',
      method: 'get'
  },
  //基本信息编辑
  'people-basic-edit': {
      url: '/api/krspace-erp-web/hrm/resource/edit',
      method: 'post'
  },
  //个人信息显示
  'people-person-watch': {
      url: '/api/krspace-erp-web/hrm/resource/info/type/person?resourceId={resourceId}',
      method: 'get'
  },
  //编辑个人信息提交
  'people-person-edit': {
      url: '/api/krspace-erp-web/hrm/resource/edit/type/person',
      method: 'post'
  },
  //工作信息接口
  'people-work-watch': {
      url: '/api/krspace-erp-web/hrm/resource/info/type/workinfo?resourceId={resourceId}',
      method: 'get'
  },
  //编辑工作信息提交
  'people-workinfo-edit': {
      url: '/api/krspace-erp-web/hrm/resource/edit/type/workinfo',
      method: 'post'
  },

  /*家庭*/
  //个人信息里面的家庭列表
  'people-family-list': {
      url: '/api/krspace-erp-web/hrm/resource/list/type/family?resourceId={resourceId}',
      method: 'get'
  },

  //个人信息里面的家庭获取编辑信息
  'people-family-get': {
      url: '/api/krspace-erp-web/hrm/resource/info/type/family?id={id}',
      method: 'get'
  },
  
  //个人信息里面的家庭新增
  'people-family-add': {
      url: '/api/krspace-erp-web/hrm/resource/add/type/family',
      method: 'post'
  },

  //个人信息里面的家庭编辑提交
  'people-family-edit': {
      url: '/api/krspace-erp-web/hrm/resource/edit/type/family',
      method: 'post'
  },

  //个人信息里面的家庭删除
  'people-family-delete': {
      url: '/api/krspace-erp-web/hrm/resource/delete/type/family?id={id}',
      method: 'delete'
  },

  /*工作记录 */
  //个人信息里面的工作记录列表
  'people-job-list': {
      url: '/api/krspace-erp-web/hrm/resource/list/type/work-record?resourceId={resourceId}',
      method: 'get'
  },
  
  //个人信息里面的工作记录获取编辑
  'people-job-get': {
      url: '/api/krspace-erp-web/hrm/resource/info/type/work-record?id={id}',
      method: 'get'
  },
  
  //个人信息里面的工作记录新增
  'people-job-add': {
      url: '/api/krspace-erp-web/hrm/resource/add/type/work-record',
      method: 'post'
  },

  //个人信息里面的工作记录编辑提交
  'people-job-edit': {
      url: '/api/krspace-erp-web/hrm/resource/edit/type/work-record',
      method: 'post'
  },

  //个人信息里面的工作记录删除
  'people-job-delete': {
      url: '/api/krspace-erp-web/hrm/resource/delete/type/work-record?id={id}',
      method: 'delete'
  },




  /*=====树的接口======*/
  //部门树
  'get-department-tree': {
      url: '/api/krspace-erp-web/tree/dep?dimId={dimId}',
      method: 'get'
  },
  //人员树
  'get-personnel-tree': {
      url: '/api/krspace-erp-web/tree/hrm-person?dimId={dimId}',
      method: 'get'
  },

   //------------人员树
   //
  'get-personnel-tree-demo': {
      url: '/api/krspace-erp-web/tree/org-auth-resource',
      method: 'get'
  },


  //职务类型
  'get-position-type-list': {
      url: '/api/krspace-erp-web/hrm/job-type/select/type/info?orgType={orgType}&orgId={orgId}',
      method: 'get'
  },

  //职务
  'get-position-list': {
      url: '/api/krspace-erp-web/hrm/job/select/type/job-type?typeId={typeId}',
      method: 'get'
  },
    //职级
  'get-rank-list': {
      url: '/api/krspace-erp-web/hrm/job-level/select/type/job-type?typeId={typeId}',
      method: 'get'
  },
  //新建人员
  'submit-new-personnel':{
      url:'/api/krspace-erp-web/hrm/resource/add',
      method: 'post'
  },
  //在职解除帐号
   'remove-account':{
      url:'/api/krspace-erp-web/hrm/resource/delete/account',
      method: 'post'
  },
  //在职开通账号
  'open-account':{
      url:'/api/krspace-erp-web/hrm/resource/open/account',
      method: 'post'
  },


   /*流程*/
  //流程--获取我的常用
  'process-common':{
      url:'/api/krspace-erp-web/wf/my/common',
      method: 'get'
  },
  //流程--获取新办
  'process-new-request':{
      url:'/api/krspace-erp-web/wf/new/request/list',
      method: 'get'
  },
  //流程--添加新办至我的常用
  'office-new-add':{
      url:'/api/krspace-erp-web/wf/my/add',
      method: 'post'
  },
  //流程--删除新办
  'office-new-delete':{
      url:'/api/krspace-erp-web/wf/my/delete',
      method: 'post'
  },


  //流程--流程类型树
  'process-typetree':{
      url:'/api/krspace-erp-web/wf/type/list?name={name}',
      method: 'get'
  },
  //流程--流程类型列表
  'process-type-list':{
      url:'/api/krspace-erp-web/wf/type/page?name={name}&page={page}&pageSize={pageSize}',
      method: 'get'
  },
  //流程--新增流程类型
  'process-add-type':{
      url:'/api/krspace-erp-web/wf/type/add',
      method: 'post'
  },
  //流程--编辑流程类型
  'process-edit-type':{
      url:'/api/krspace-erp-web/wf/type/edit',
      method: 'post'
  },
  //流程--流程类型详情
  'process-type-detail':{
      url:'/api/krspace-erp-web/wf/type/detail?typeId={typeId}',
      method: 'get'
  },
  //流程--流程类型搜索下拉选
  'process-search-select':{
      url:'/api/krspace-erp-web/wf/type/select?name={name}',
      method: 'get'
  },


  //流程--分页获取流程列表
  'process-list':{
      url:'/api/krspace-erp-web/wf/base/page?allowRequest={allowRequest}&newRequestShow={newRequestShow}&wfName={wfName}&page={page}&pageSize={pageSize}&typeId={typeId}&wfCode={wfCode}',
      method: 'get'
  },
  //流程--新建流程
  'process-add':{
      url:'/api/krspace-erp-web/wf/base/add',
      method: 'post'
  },
  //流程--编辑流程
  'process-edit':{
      url:'/api/krspace-erp-web/wf/base/edit',
      method: 'post'
  },
  //流程--查看流程
  'process-detail':{
      url:'/api/krspace-erp-web/wf/base/detail?wfId={wfId}',
      method: 'get'
  },

  


  //流程--权限--列表
  'process-authority-list':{
      url:'/api/krspace-erp-web/wf/base/auth/list?wfId={wfId}',
      method: 'get'
  },
  //流程--权限--新建
  'process-authority-add':{
      url:'/api/krspace-erp-web/wf/base/auth/add',
      method: 'post'
  },
  //流程--权限--编辑
  'process-authority-edit':{
      url:'/api/krspace-erp-web/wf/base/auth/edit',
      method: 'post'
  },
  //流程--权限--查看
  'process-authority-detail':{
      url:'/api/krspace-erp-web/wf/base/auth/detail?limitId={limitId}',
      method: 'get'
  },
  //流程--权限--删除
  'process-authority-delete':{
      url:'/api/krspace-erp-web/wf/base/auth/delete',
      method: 'post'
  },



  //角色管理－列表
  'role-list':{
      url:'/api/krspace-erp-web/hrm/role/list?name={name}&page={page}&pageSize={pageSize}',
      method: 'get'
  },
   //角色管理－新增
  'role-add':{
      url:'/api/krspace-erp-web/hrm/role/add',
      method: 'post'
  },
   //角色管理-编辑
  'role-edit':{
      url:'/api/krspace-erp-web/hrm/role/edit',
      method: 'post'
  },
   //角色管理-删除
  'role-delete':{
      url:'/api/krspace-erp-web/hrm/role/delete',
      method: 'post'
  },
   //角色管理-查看
  'role-watch':{
      url:'/api/krspace-erp-web/hrm/role/detail?id={id}',
      method: 'get'
  },
   //机构分权－列表
  'org-power-list':{
      url:'/api/krspace-erp-web/hrm/org/list?name={name}&page={page}&pageSize={pageSize}',
      method: 'get'
  },
   //机构分权－新增
  'org-power-add':{
      url:'/api/krspace-erp-web/hrm/org/add',
      method: 'post'
  },
   //机构分权－查看
  'org-power-watch':{
      url:'/api/krspace-erp-web/hrm/org/detail?id={id}',
      method: 'get'
  },
   //机构分权－编辑
  'org-power-edit':{
      url:'/api/krspace-erp-web/hrm/org/edit',
      method: 'post'
  },
   //机构分权－分配角色列表
  'role-power-list':{
      url:'/api/krspace-erp-web/hrm/org/allot-role-list?id={id}',
      method: 'get'
  },
   //机构分权－分配角色列表删除
  'role-power-delete':{
      url:'/api/krspace-erp-web/hrm/org/delete-org-role',
      method: 'post'
  },
   //机构分权－分配角色列表新增
  'role-power-add':{
      url:'/api/krspace-erp-web/hrm/org/add-org-role',
      method: 'post'
  },
   //机构分权－分配角色列表查看
  'role-power-watch':{
      url:'/api/krspace-erp-web/hrm/org/detail-org-role?orgDetailId={orgDetailId}',
      method: 'get'
  },
   //机构分权－分配角色列表编辑
  'role-power-edit':{
      url:'/api/krspace-erp-web/hrm/org/edit-org-role',
      method: 'post'
  },
   //机构分权－获取所有角色
  'role-power-all':{
      url:'/api/krspace-erp-web/hrm/role/all',
      method: 'get'
  },
   //机构分权－部门树
  'role-dep-tree':{
      url:'/api/krspace-erp-web/tree/org-auth-dep',
      method: 'get'
  },
   //机构分权－分部树
  'role-sub-tree':{
      url:'/api/krspace-erp-web/tree/org-auth-sub',
      method: 'get'
  },
  //机构分权－新的人员树
  'role-new-tree':{
      url:'/api/krspace-erp-web/tree/org-auth-resource',
      method: 'get'
  },

  //首页管理
  //首页-轮播列表
  'home-swper-list':{
      url:'/mockjsdata/9/krspace-erp-web/sys/slider/list?name={name}&page={page}&pageSize={pageSize}',
      method: 'get'
  },
  //首页-轮播新建
  'home-swper-add':{
      url:'/api/krspace-erp-web/sys/slider/add',
      method: 'post'
  },
  //首页-轮播编辑
  'home-swper-edit':{
      url:'/mockjsdata/9/krspace-erp-web/sys/slider/edit',
      method: 'post'
  },
  //首页-轮播详情
  'home-swper-detail':{
      url:'/mockjsdata/9/krspace-erp-web/sys/slider/detail?id={id}',
      method: 'get'
  },
  //首页-轮播删除
  'home-swper-delete':{
      url:'/api/krspace-erp-web/sys/slider/delete',
      method: 'post'
  },
  //首页最新动态
  //首页-最新动态-列表
  'dynamics-list':{
      url:'/api/krspace-erp-web/sys/dynamic/list?page={page}&pageSize={pageSize}&title={title}',
      method: 'get'
  },
  //首页-最新动态-删除
  'dynamics-delete':{
      url:'/api/krspace-erp-web/sys/dynamic/delete',
      method: 'post'
  },
   //首页-最新动态-添加
  'dynamics-add':{
      url:'/api/krspace-erp-web/sys/dynamic/add',
      method: 'post'
  },
  //首页-最新动态-编辑
  'dynamics-edit':{
      url:'/api/krspace-erp-web/sys/dynamic/edit',
      method: 'post'
  },
  //首页-最新动态-详情
  'dynamics-detail':{
      url:'/api/krspace-erp-web/sys/dynamic/detail?id={id}',
      method: 'get'
  },


}

module.exports=OAApi;
