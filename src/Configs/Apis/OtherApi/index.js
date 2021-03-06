const APIS = {

    //获取文件token－－－－－－－>名字没用到，上传文件组件里面用到此地址

   'version-log-list': {
        url: '/api/krspace-sso-web/sso/show-all-ver?page={page}&pageSize={pageSize}&time={time}',
        method: 'get'
    },

     'version-log-create-or-edit': {
        url: '/api/krspace-sso-web/sso/save-update-ver',
        method: 'post'
    },

    'version-log-publish': {
        url: '/api/krspace-sso-web/sso/publish-ver',
        method: 'post'
    },

     'version-log-close': {
        url: '/api/krspace-sso-web/sso/record-sso-ver',
        method: 'post'
    },
    'get-version-log': {
        url: '/api/krspace-sso-web/sso/show-sso-ver',
        method: 'get'
    },

    //获取文件token－－－－－－－>名字没用到，上传文件组件里面用到此地址
    'getSourceServiceToken': {
        url: '/api/krspace-finance-web/finacontractdetail/getSourceServiceToken',
        method: 'get'
    },
    //获取文件列表－－－－－－－－－－－－－－－>没用到
    'findFileList': {
        url: '/krspace_knowledge_wap/doc/docFile/findFileList?sourceservicetoken={sourceservicetoken}&fileIds={fileIds}&jsoncallback={jsoncallback}&operater={operater}',
        method: 'get'
    },

    //文件预览－－－－－－－－－－－－－－－>没用到
    'viewFile': {
        url: '/krspace_knowledge_wap/doc/docFile/viewFile?operater={operater}&sourceservicetoken={sourceservicetoken}&fileId={fileId}',
        method: 'get'
    },

    // 上传文件－－－－－－－>名字没用到，上传文件组件里面用到此地址
    'uploadSingleFile': {
        url: '/api-old/krspace_knowledge_wap/doc/docFile/uploadSingleFile',
        method: 'post'
    },


    //根据人员姓名获取人员基本信息---------------->组件
    'getHrmResourceExtListByLastname': {
        url: '/api-old/krspace_oa_web/interface/hrm/hrmResource/getHrmResourceExtListByLastname?lastname={lastname}',
        method: 'get'
    },

    //运营平台-下拉菜单
    'community-city-selected': {
        url: '/api/krspace-finance-web/action/community-city-selected',
        method: 'get'
    },

    //获取附件列表---------------->UploadList组件
    'getFileList': {
        url: '/api/krspace-finance-web/finacontractdetail/fileList-show?detailId={detailId}',
        method: 'get'
    },
    //附件列表保存附件---------------->UploadList组件
    'saveFileList': {
        url: '/api/krspace-finance-web/finacontractdetail/fileList-save?detailId={detailId}&fileId={fileId}',
        method: 'post'
    },
    //附件列表删除附件---------------->UploadList组件
    'deleteFileList': {
        url: '/api/krspace-finance-web/finacontractdetail/fileList-delete?detailId={detailId}&fileId={fileId}',
        method: 'delete'
    },
    //会员中心-新增会员－公司模糊查询－－－－－－－－>companyCmponent组件
    'getCompanyByCompanyText': {
        url: '/api/krspace-finance-web/member/work/company-list?companyText={companyText}',
        method: 'get'
    },
    // 会员中心－新增会员－电话号码校验是否存在---------->Operation和Memeber共用
    'isPhoneRegistered': {
        url: '/api/krspace-sso-web/member/member-phone?phone={phone}',
        method: 'get'
    },
    // 会员中心－新增会员－邮箱校验是否存在---------->Operation和Memeber共用
    'isEmailRegistered': {
        url: '/api/krspace-sso-web/member/member-mail?email={email}',
        method: 'get'
    },
    // 会员中心-会员-获取-(查询)高级搜索---------->Operation和Memeber共用
    'membersList': {
        url: '/api/krspace-sso-web/member/member-list?value={value}&type={type}&pageSize={pageSize}&page={page}&cmtId={cmtId}&teamId={teamId}',
        method: 'get'
    },
    //获取指定公司会员列表－－－－－－－－－－－>这个接口居然没有用到
    'getCompanyMemberList': {
        url: '/api/krspace-finance-web/member/company-team?companyId={companyId}&page={page}&pageSize={pageSize}',
        method: 'get'
    },
    //运营平台－设置Leader
    'setLeader': {
        url: '/api/krspace-finance-web/member/work/leader?companyId={companyId}&isLeader={isLeader}&memberIds={memberIds}',
        method: 'put'
    },
    //新建编辑会员的准备数据---------->Operation和Memeber共用
    'getMemberBasicData': {
        url: '/api/krspace-sso-web/member/member-add-edit?companyId={companyId}&memberId={memberId}&communityId={communityId}',
        method: 'get'
    },
    //新建会员
    'add-members': {
        url: '/api/krspace-sso-web/member/add',
        method: 'post'
    },
    //编辑会员 
    'edit-members': {
        url: '/api/krspace-sso-web/member/edit',
        method: 'post'
    },
    //删除会员 
    'delete-members': {
        url: '/api/krspace-sso-web/member/delete?id={id}',
        method: 'get'
    },
    //编辑会员前的数据 
    'members-basic-date': {
        url: '/api/krspace-sso-web/member/detail?id={id}',
        method: 'get'
    },
    
    //指定公司下的会员数据导出－－－－－－－－－－－>这个接口居然没有用到
    'companyMemberExcel': {
        url: '/api/krspace-finance-web/member/member-company-excel?ids={ids}&companyId={companyId}',
        method: 'get'
    },
    //根据邮箱判断是否存在－－－－－－－－－－－>这个接口居然没有用到
    'membersByEmail': {
        url: '/api/krspace-finance-web/member/member-mail?email={email}',
        method: 'get'
    },
    //根据会员卡号判断是否存在－－－－－－－－－－－>Member和Operation共用
    'membersByForeignCode': {
        url: '/api/krspace-sso-web/member/member-foreigncode?code={code}&codeType=foreign',
        method: 'get'
    },
    //下载导入模板－－－－－－－－－－－>这个接口居然没有用到
    'importExcelDemo': {
        url: '/api/krspace-finance-web/member/member-templet-excel?companyId={companyId}',
        method: 'get'
    },
    //上传会员数据－－－－－－－－－－－>这个接口居然没有用到
    'importMemberExcel': {
        url: '/api/krspace-finance-web/member/member-excel',
        method: 'post'
    },


    // 获取社区数据-------------------->searchForm组件和Operation共用
    'getCommunity': {
        url: '/api-old/sys/sysdatarights/sysDatarights/getSelfDatarights',
        method: 'get'
    },

    //权限管理-权限管理-数据模板管理数据－－－－－－－－－－－>这个接口居然没有用到
    'getDataGrouplis': {
        url: '/mockjsdata/13/krspace-finance-web/stat/group/group-list',
        method: 'get'
    },
    //运营平台－客户管理－招商和个人高级查询准备---------------->组件和Opertation共用
    'search-conditions': {
        url: '/api/krspace-finance-web/customer/personal-customers/search-conditions',
        method: 'get'
    },
    //运营平台－客户管理－签约高级查询准备---------------->组件和Opertation共用
    'sign-search-conditions': {
        url: '/api/krspace-finance-web/customer/sign-customers/search-conditions',
        method: 'get'
    },
    // ---------------------->PlanMap组件接口
     'planMap': {
       url:'/api/krspace-finance-web/cmt/floor-graph/select-info?communityId={communityId}&floor={floor}&mainBillId={mainBillId}&startDate={startDate}&endDate={endDate}&contractId={contractId}',
       method:'get'
    },
     //客户管理－获取招商人员列表---------------------->组件接口
     'get-receive-list': {
       url:'/api/krspace-finance-web/customer/actions/get-receive-list?searchKey={searchKey}',
       method:'get'
     },
    //客户公海列表－客户公海列表数据准备-------组件接口
   'highSeaDataReday':{
      url: '/api/krspace-finance-web/csr/market/list-param-data',
      method: 'get'
   },

   //客户公海列表－客户公海导入数据准备-------组件接口
   'highSourceName':{
      url: '/api/krspace-finance-web/csr/market/upload-param-data?sourceName={sourceName}',
      method: 'get'
   },

   'getCommunityList':{
         url: '/api/krspace-finance-web/cmt/community/select-list',
         method: 'get'
      },
    //我发起的--流程列表
    'my-request-list':{
      url: '/api/krspace-erp-web/wf/request/list/type/my-request?page={page}&typeId={typeId}&wfId={wfId}&pageSize={pageSize}',
      method: 'get'
    },
    //我发起的--流程树列表
    'my-request-tree':{
      url: '/api/krspace-erp-web/wf/base/tree/type/my-request',
      method: 'get'
    },
    'get-sql-list':{
       url: '/api/krspace-erp-web/sys/form-sql/search?executed={executed}&name={name}&page={page}&pageSize={pageSize}&typeId={typeId}',
       method: 'get'
    },
    'form-sql-execute':{
       url: '/api/krspace-erp-web/sys/form-sql/execute',
       method: 'post'
    },
    'form-sql-invalid':{
       url: '/api/krspace-erp-web/sys/form-sql/invalid',
       method: 'post'
    },

     //合同监控--流程树列表
     'contract-monitor-tree':{
        url: '/api/krspace-erp-web/wf/base/tree/type/requestMonitoring',
        method: 'get'
      },
    
    //合同监控--流程列表
    'contract-monitor-list':{
        url: '/api/krspace-erp-web/wf/request/list/type/monitoring?page={page}&typeId={typeId}&wfId={wfId}&pageSize={pageSize}',
        method: 'get'
    },
    




}

module.exports = APIS;
