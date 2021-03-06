

module.exports = {

    'user-logout': {
        url: '/api/krspace-sso-web/sso/sysOwn/logout',
        method: 'get'
    },
    //个人中心-获取个人信息
    'PersonalCenterData': {
        url: '/api/krspace-sso-web/sso/sysOwn/getPersonalInfo',
        method: 'get'
    },
    //个人中心-身份验证手机
    'PersonalCenterVerifyIdByMobile': {
        url: '/api/krspace-sso-web/sso/sysOwn/verifyMobile?verifyCode={verifyCode}',
        method: 'get'
    },
    //个人中心-身份验证邮箱
    'PersonalCenterVerifyIdByMail': {
        url: '/api/krspace-sso-web/sso/sysOwn/verifyEmail?verifyCode={verifyCode}',
        method: 'get'
    },
    //个人中心-获取手机验证码
    'PersonalCenterGetMobileVerificationCode': {
        url: '/api/krspace-sso-web/sso/sysOwn/getVerifyCodeByMobile',
        method: 'get'
    },
    //个人中心-获取邮箱验证码
    'PersonalCenterGetMailVerificationCode': {
        url: '/api/krspace-sso-web/sso/sysOwn/getVerifyCodeByEmail',
        method: 'get'
    },
    //个人中心-修改手机号时新手机号获取验证码
    'PersonalCenterGetNewMobileVerificationCode': {
        url: '/api/krspace-sso-web/sso/sysOwn/getVerifyCodeByNewMobile?mobile={mobile}',
        method: 'get'
    },
    //个人中心-验证修改手机号验证码
    'PersonalCenterVerifyReviseMobileVerificationCode': {
        url: '/api/krspace-sso-web/sso/sysOwn/editMobile',
        method: 'post'
    },
    //个人中心-修改密码
    'PersonalCenterVerifyRevisePwd': {
        url: '/api/krspace-sso-web/sso/sysOwn/editPassword',
        method: 'post'
    },
    //权限--登录
    'loginSubmit': {
      url: '/api/krspace-sso-web/sso/login/validateCodeLogin',
     // url: '/api/krspace-sso-web/sso/login/loginSubmit',
      method: 'post'
    },
    //权限--手机获取验证码
    'getVcodeByPhone': {
      url: '/api/krspace-sso-web/sso/login/getVcodeByPhone?mobile={mobile}',
      method: 'get'
    },
    // 权限--获取滑块验证
    'startCaptcha':{
      url: '/api/krspace-sso-web/sso/login/startCaptcha?loginName={loginName}&loginPwd={loginPwd}',
      method: 'get'
    },
    // 权限--获取手机验证码 
    'get-verifyCode':{
      url: '/api/krspace-sso-web/sso/login/getVcodeByPhone?geetest_challenge={geetest_challenge}&geetest_seccode={geetest_seccode}&geetest_validate={geetest_validate}&mobile={mobile}',
      method: 'get'
    },
    //权限--邮箱获取验证码
    'getVcodeByMail': {
      url: '/api/krspace-sso-web/sso/login/getVcodeByMail?email={email}&geetest_seccode={geetest_seccode}&geetest_validate={geetest_validate}&geetest_challenge={geetest_challenge}',
      method: 'get'
    },
    //权限--提交手机验证码
    'validPhoneCode': {
      url: '/api/krspace-sso-web/sso/login/validPhoneCode',
      method: 'post'
    },
    //权限--提交邮箱验证码
    'validEmailCode': {
      url: '/api/krspace-sso-web/sso/login/validEmailCode',
      method: 'post'
    },
    //权限--提交新密码
    'setNewPwd': {
      url: '/api/krspace-sso-web/sso/login/setNewPwd',
      method: 'post'
    },
    //权限--账户列表--获取账户列表
    'getSsoUserList': {
      url: '/api/krspace-erp-web/erp/ssoUser/list?accountName={accountName}&email={email}&mobilePhone={mobilePhone}&realName={realName}&page={page}&pageSize={pageSize}&accountStatus={accountStatus}',
      method: 'get'
    },
    //权限--账户列表--获取数据权限
    'findRoleData': {
      url: '/api/krspace-sso-web/sso/ssoUser/findUserGroupRoles?userSsoId={userSsoId}',
      method: 'get'
    },
    //权限--账户列表--删除
    'delSsoUser': {
      url: '/api/krspace-sso-web/sso/ssoUser/delSsoUser?id={id}',
      method: 'delete'
    },
    //权限--账户列表--加锁
    'lockAccount': {
      url: '/api/krspace-sso-web/sso/ssoUser/lockAccount',
      method: 'post'
    },
    //权限--账户列表--解锁
    'unlockAccount': {
      url: '/api/krspace-sso-web/sso/ssoUser/unlockAccount',
      method: 'post'
    },
    //权限--账户列表--重置密码
    'resetPassword': {
      url: '/api/krspace-sso-web/sso/ssoUser/resetPassword',
      method: 'post'
    },
    //权限--账户列表--编辑登录账户
    'editSsoUser': {
      url: '/api/krspace-sso-web/sso/ssoUser/editSsoUser',
      method: 'post'
    },
    //权限--账户列表--新建
    'createSsoUser': {
      url: '/api/krspace-sso-web/sso/ssoUser/createSsoUser',
      method: 'post'
    },
    //权限--账户列表--角色编辑
    'editUserRole': {
      url: '/api/krspace-sso-web/sso/ssoUser/editUserRole',
      method: 'post'
    },
    //权限--角色列表--获取角色列表
    'UserfindPage': {
      url: '/api/krspace-sso-web/sso/role/findPage?page={page}&pageSize={pageSize}&name={name}&code={code}&groupName={groupName}', 
      method: 'get'
    },
    //权限--角色分组列表--获取角色分组列表
    'UserGroupList': {
      url: '/api/krspace-sso-web/sso/group/list', 
      method: 'get'
    },
    //权限--角色分组列表--获取角色反查列表
    'BusinessRoleList': {
      url: '/api/krspace-sso-web/sso/business/roleList?businessCodeId={businessCodeId}', 
      method: 'get'
    },
    //权限--角色分组列表--获取角色项角色列表
    'ResourceRoleList': {
      url: '/api/krspace-sso-web/sso/resource/roleList?resourceId={resourceId}', 
      method: 'get'
    },
    //权限--角色分组列表--删除角色分组
    'delRoleList': {
      url: '/api/krspace-sso-web/sso/group/delete?id={id}', 
      method: 'get'
    },
     //权限--角色分组列表--删除业务代码角色关联关系
     'delRoleDetail': {
      url: '/api/krspace-sso-web/sso/business/role/delete?id={id}', 
      method: 'get'
    },
     //权限--角色分组列表--删除操作项关联关系
     'delRoleResourceDetail': {
      url: '/api/krspace-sso-web/sso/resource/role/delete?id={id}', 
      method: 'get'
    },
    //权限--角色分组列表--编辑单个角色分组
    'editRoleGroup': {
      url: '/api/krspace-sso-web/sso/role/editRoleGroup?groupId={groupId}&roleId={roleId}',  
      method: 'get'
    },
    //权限--角色分组列表--授予角色分组列表
    'giveRoleGroup': {
      url: '/api/krspace-sso-web/sso/ssoUser/findUserGroupRoles?id={id}', 
      method: 'get'
    },
    //权限--角色分组列表--授予角色分组列表
    'giveGroup': {
      url: '/api/krspace-sso-web/sso/role/getRoleGroups?roleId={roleId}', 
      method: 'get'
    },
    //权限--操作项列表--获取操作项列表
    'RosfindPage': {
      url: '/api/krspace-sso-web/sso/resource/findPage?page={page}&pageSize={pageSize}&name={name}&code={code}&type={type}&moduleName={moduleName}',
      method: 'get'
    },
    //权限--数据--获取社区列表
    'findCommunities': {
      url: '/api/krspace-sso-web/sso/ssoUser/findCommunities?userId={userId}',
      method: 'get'
    },
    //权限--数据--编辑保存社区权限
    'editUserCommunity': {
      url: '/api/krspace-sso-web/sso/ssoUser/editUserCommunity',
      method: 'post'
    },
    //权限--操作项--删除
    'delResources': {
      url: '/api/krspace-sso-web/sso/resource/delResources?id={id}',
      method: 'delete'
    },
    //权限--角色--删除
    'delRole': {
      url: '/api/krspace-sso-web/sso/role/delRole?id={id}',
      method: 'delete'
    },
    //权限--角色--查看人员
    'findUserByRoleId': {
      url: '/api/krspace-sso-web/sso/role/findUserByRoleId?page={page}&pageSize={pageSize}&roleId={roleId}&userName={userName}',
      method: 'get'
    },
    //权限--角色--查看人员--移除
    'deleteUser': {
      url: '/api/krspace-sso-web/sso/role/deleteUser?roleId={roleId}&userId={userId}',
      method: 'get'
    },
    //权限--角色--新建--保存
    'createRole': {
      url: '/api/krspace-sso-web/sso/role/createRole',
      method: 'post'
    },
    // 权限--角色分组--新建--保存
    'createRoleGroup':{
      url: '/api/krspace-sso-web/sso/group/add?name={name}&descr={descr}',
      method: 'get'
    },
    //权限--角色--新建--获取操作项列表
    'getModuleData': {
      url: '/api/krspace-sso-web/sso/role/getModuleData',
      method: 'get'
    },
    // 权限--角色--获取角色列表
    'getRoleListData': {
      url: '/api/krspace-sso-web/sso/role/list',
      method: 'get'
    },
    //权限--角色--获取编辑数据
    'getRoleData': {
      url: '/api/krspace-sso-web/sso/role/getRoleData?id={id}',
      method: 'get'
    },
    //权限--角色--获取编辑数据--保存
    'editRole': {
      url: '/api/krspace-sso-web/sso/role/editRole',
      method: 'post'
    },
    //权限--操作项--新建--获取模块
    'getModule': {
      url: '/api/krspace-sso-web/sso/resource/getModule?parentId={parentId}',
      method: 'get'
    },
    //权限--操作项--新建--获取所有controller
    'getAllController': {
      url: '/api/krspace-sso-web/sso/method/getAllController',
      method: 'get'
    },
    //权限--操作项--新建--根据类Id查询下面所有方法
    'getMethodByControllerId': {
      url: '/api/krspace-sso-web/sso/method/getMethodByControllerId?controllerId={controllerId}',
      method: 'get'
    },
    //权限--操作项--新建--保存
    'createResources': {
      url: '/api/krspace-sso-web/sso/resource/createResources',
      method: 'post'
    },
    //权限--操作项--编辑--获取编辑需要的数据
    'getResourcesData': {
      url: '/api/krspace-sso-web/sso/resource/getResourcesData?id={id}',
      method: 'get'
    },
    //权限--操作项--新建--查询方法
    'getMethodByName': {
      url: '/api/krspace-sso-web/sso/method/getMethodByName?name={name}',
      method: 'get'
    },
    //权限--操作项--编辑--保存
    'editResources': {
      url: '/api/krspace-sso-web/sso/resource/editResources',
      method: 'post'
    },
    //权限--操作日志--获取分页
    'getOpLogs': {
      url: '/api/krspace-sso-web/sso/log/find-page?endDate={endDate}&operaterName={operaterName}&page={page}&pageSize={pageSize}&sourceId={sourceId}&startDate={startDate}&systemType={systemType}&operateRecord={operateRecord}&batchNum={batchNum}&entityId={entityId}',
      method: 'get'
    },
    //权限--操作日志--高级查询获取
    'getOpSource': {
      url: '/api/krspace-sso-web/sso/log/find-sourceList?sourceName={sourceName}',
      method: 'get'
    },
    //权限--操作日志--高级查询获取sourceList
    'getOpSer': {
      url: '/api/krspace-sso-web/sso/log/find-searchData',
      method: 'get'
    },
    //权限--操作日志--查看
    'getOpDet': {
      url: '/api/krspace-sso-web/sso/log/find-detail?id={id}',
      method: 'get'
    },
    //权限--登录日志--分页
    'get-login-log': {
      url: '/api/krspace-sso-web/sso/loginLog/find-page?loginAccount={loginAccount}&loginId={loginId}&successful={successful}&page={page}&pageSize={pageSize}',
      method: 'get'
    },
    //权限--信息列表--分页
    'get-log-list': {
      url: '/api/krspace-sso-web/sso/msg/get-log-list?msgType={msgType}&receviers={receviers}&sendStatus={sendStatus}&page={page}&pageSize={pageSize}&startTime={startTime}&endTime={endTime}&remark={remark}',
      method: 'get'
    },
    //权限--版本管理--分页
    'get-version-list': {
      url: '/api/krspace-sso-web/sso/mobile/version/get-version-list?enableFlag={enableFlag}&forcedStatus={forcedStatus}&osType={osType}&page={page}&pageSize={pageSize}&version={version}',
      method: 'get'
    },
    //权限--版本管理--新建/编辑
    'save-version': {
      url: '/api/krspace-sso-web/sso/mobile/version/save-version',
      method: 'post'
    },
    //权限--版本管理--查看
    'get-version-detail': {
      url: '/api/krspace-sso-web/sso/mobile/version/get-version-detail?id={id}',
      method: 'get'
    },
    //权限--APP登录日志--分页
    'mobile-login-log': {
      url: '/api/krspace-sso-web/sso/mobile/log/mobile-login-log?phone={phone}&sendStatus={sendStatus}&osType={osType}&page={page}&pageSize={pageSize}&version={version}&remark={remark}',
      method: 'get'
    },

    //权限--获取菜单
    'findUserData': {
      url: '/api/krspace-sso-web/sso/sysOwn/findUserData?forceUpdate={forceUpdate}',
      method: 'get'
    },

    //退出登录
    'logout':{
            url: '/api/krspace-sso-web/sso/sysOwn/logout',
            method: 'get'
    },
     //权限--操作来源--分页
    'operation-source-list':{
            url: '/api/krspace-sso-web/sso/operateSource/findPage?page={page}&pageSize={pageSize}&sourceCode={sourceCode}&sourceDesc={sourceDesc}&systemType={systemType}',
            method: 'get'
    },
    //
    'source-search-data':{
            url: '/api/krspace-sso-web/sso/log/find-searchData',
            method: 'get'
    },
     //权限--业务代码--分页
    'op-code-list':{
            url: '/api/krspace-sso-web/sso/business/list/?page={page}&pageSize={pageSize}&codeName={codeName}&createDate={createDate}&creater={creater}&id={id}&name={name}',
            method: 'get'
    },
    //权限--业务代码--编辑
    'op-code-edit':{
            url: '/api/krspace-sso-web/sso/business/update',
            method: 'post'
    },
    //权限--业务代码--新建
    'op-code-insert':{
            url: '/api/krspace-sso-web/sso/business/insert',
            method: 'post'
    },
    //权限--业务代码--详情
    'op-code-detail':{
            url: '/api/krspace-sso-web/sso/business/detail?id={id}',
            method: 'get'
    },
    //角色列表--业务代码
    'user-code':{
            url: '/api/krspace-sso-web/sso/business/all?roleId={roleId}',
            method: 'get'
    },
    //角色列表--业务代码--提交
    'user-code-submit':{
            url: '/api/krspace-sso-web/sso/business/bound',
            method: 'post'
    },
    //菜单配置--列表
    'get-menu-list':{
            url: '/api/krspace-sso-web/sso/module/menu-list',
            method: 'get'
    },
    //菜单配置--新建导航
    'first-level-save':{
            url: '/api/krspace-sso-web/sso/module/first-level-save',
            method: 'post'
    },
    //菜单配置--新建分类
    'sub-level-save':{
            url: '/api/krspace-sso-web/sso/module/sub-level-save',
            method: 'post'
    },
    //菜单配置--新建子模块
    'three-level-save':{
            url: '/api/krspace-sso-web/sso/module/three-level-save',
            method: 'post'
    },
    //菜单配置--编辑子模块
    'three-level-update':{
            url: '/api/krspace-sso-web/sso/module/three-level-update',
            method: 'post'
    },
    //菜单配置--编辑分类
    'sub-level-update':{
            url: '/api/krspace-sso-web/sso/module/sub-level-update',
            method: 'post'
    },
    //菜单配置--编辑导航
    'first-level-update':{
            url: '/api/krspace-sso-web/sso/module/first-level-update',
            method: 'post'
    },
    //菜单配置--删除导航、分类
    'first-second-delete':{
            url: '/api/krspace-sso-web/sso/module/delete',
            method: 'post'
    },
    //菜单配置--删除子模块
    'third-delete':{
            url: '/api/krspace-sso-web/sso/module/delete-three-level',
            method: 'post'
    },
    //菜单配置--一级详情
    'first-level-detail':{
            url: '/api/krspace-sso-web/sso/module/first-leve-detail?firstLevelId={firstLevelId}',
            method: 'get'
    },
    //菜单配置--二级详情
    'sub-level-detail':{
            url: '/api/krspace-sso-web/sso/module/sub-leve-detail?subLevelId={subLevelId}',
            method: 'get'
    },
    //菜单配置--三级详情
    'three-level-detail':{
            url: '/api/krspace-sso-web/sso/module/three-leve-detail?threeLevelId={threeLevelId}',
            method: 'get'
    },
    //菜单配置--一级列表
    'first-level-list':{
            url: '/api/krspace-sso-web/sso/module/first-leve-list',
            method: 'get'
    },
    //菜单配置--一级查询二级
    'sub-level-info':{
            url: '/api/krspace-sso-web/sso/module/sub-level-info?firstLevelId={firstLevelId}',
            method: 'get'
    },
    //表单管理--表单类型导航
      'get-from-navigation':{
            url: '/api/krspace-erp-web/sys/form-type/list/type/navigation?nameKey={nameKey}',
            method: 'get'
    },
    //表单管理--表单类型列表
     'get-from-list':{
          url: '/api/krspace-erp-web/sys/form-type/list/type/search?page={page}&pageSize={pageSize}&nameKey={nameKey}',
          method: 'get'
    },
    //表单管理--表单类型编辑信息
    'get-form-data':{
      url: '/api/krspace-erp-web/sys/form-type/info/type/edit?id={id}',
      method: 'get'
    },
    //表单管理--表单类型新增
    'add-form-type':{
      url: '/api/krspace-erp-web/sys/form-type/add',
      method: 'post'
    },
    //表单管理--表单类型编辑
    'edit-form-type':{
      url: '/api/krspace-erp-web/sys/form-type/edit',
      method: 'post'
    },
    //表单管理--查询表单列表
    'form-list-search':{
      url: '/api/krspace-erp-web/sys/form/list/type/search?enabled={enabled}&nameKey={nameKey}&page={page}&pageSize={pageSize}&tableName={tableName}&typeId={typeId}&purpose={purpose}',
      method: 'get'
    },
    //表单管理--新增表单
    'form-add-list':{
      url: '/api/krspace-erp-web/sys/form/add',
      method: 'post'
    },
    //表单管理--编辑表单
    'form-edit-list':{
      url: '/api/krspace-erp-web/sys/form/edit',
      method: 'post'
    },
    //表单管理--生成表
    'form-create-table':{
      url: '/api/krspace-erp-web/sys/form/create-table',
      method: 'post'
    },
    //表单管理--表单类型下拉列表
    'form-type-select':{
      url: '/api/krspace-erp-web/sys/form-type/select/type/list',
      method: 'get'
    },
    //表单管理--获取表单编辑信息
    'form-get-edit':{
      url: '/api/krspace-erp-web/sys/form/info/type/edit?id={id}',
      method: 'get'
    },
    //表单管理--批量删除表单字段
    'form-all-batch':{
      url: '/api/krspace-erp-web/sys/form-field/delete/type/batch',
      method: 'post'
    },
    //表单管理--表单字段列表接口
    'form-group-table':{
      url: '/api/krspace-erp-web/sys/form-field/list/type/group-by-table?formId={formId}',
      method: 'get'
    },
    //表单管理--新增表单字段
    'form-field-add':{
      url: '/api/krspace-erp-web/sys/form-field/add',
      method: 'post'
    },
    //表单管理--编辑表单字段
    'form-field-edit':{
      url: '/api/krspace-erp-web/sys/form-field/edit',
      method: 'post'
    },
     //表单管理--编辑表单字段-已创建
     'create-field-edit':{
      url: '/api/krspace-erp-web/sys/form-field/edit/type/label',
      method: 'post'
    },
     //表单管理--表单字段排序
     'form-field-order':{
      url: '/api/krspace-erp-web/sys/form-field/order/type/table',
      method: 'post'
    },
     //表单管理--获取表单字段编辑信息
     'get-field-edit':{
      url: '/api/krspace-erp-web/sys/form-field/info/type/edit?id={id}',
      method: 'get'
    },

    //表单管理--新增明细表
    'form-table-add':{
      url: '/api/krspace-erp-web/sys/form-table/add',
      method: 'post'
    },
    //表单管理--编辑明细表
    'form-table-edit':{
      url: '/api/krspace-erp-web/sys/form-table/edit',
      method: 'post'
    },
    //表单管理--删除明细表
    'form-table-delete':{
      url: '/api/krspace-erp-web/sys/form-table/delete?id={id}',
      method: 'delete'
    },
     //表单管理--获取公共字典下拉列表
     'get-common-dic':{
      url: '/api/krspace-erp-web/sys/public-dict/select/type/enabled',
      method: 'get'
    },
    //公共字典列表
    'get-dict-list':{
            url: '/api/krspace-erp-web/sys/public-dict/list/type/search?codeKey={codeKey}&nameKey={nameKey}&page={page}&pageSize={pageSize}',
            method: 'get'
    },
    //公共字典新建
    'new-dict-submit':{
            url: '/api/krspace-erp-web/sys/public-dict/add',
            method: 'post'
    },
    //字典编辑提交
    'edit-dict-submit':{
            url: '/api/krspace-erp-web/sys/public-dict/edit',
            method: 'post'
    },
    //字典编辑信息
    'get-dict-edit-data':{
            url: '/api/krspace-erp-web/sys/public-dict/info/type/edit?id={id}',
            method: 'get'
    },
    //校验字典名称
    'check-dict-name':{
      url: '/api/krspace-erp-web/sys/public-dict/check/name?dictName={dictName}&id={id}',
      method: 'get'
    },
    //校验字典编码
    'check-dict-code':{
      url: '/api/krspace-erp-web/sys/public-dict/check/code?dictCode={dictCode}&id={id}',
      method: 'get'
    },
    //PC端模板--新建
    'create-form-template':{
      url: '/api/krspace-erp-web/sys/form-template',
      method: 'post'
    },
    //PC端模板--新建--获取表单字段
    'get-form-template-field':{
      url: '/api/krspace-erp-web/sys/form-template-field/list?formId={formId}',
      method: 'get'
    },
    //PC端模板--选择
    'get-form-template-list':{
      url: '/api/krspace-erp-web/sys/form-template/list?formId={formId}&type={type}',
      method: 'get'
    },
    //合同模板保存
    'save-template':{
      url: '/api/krspace-erp-web/sys/contract-template',
      method: 'post'
    },
    //打印模板--保存
    'save-print-template':{
      url: '/api/krspace-erp-web/sys/print-template',
      method: 'post'
    },
    //打印模板--选择
    'get-print-template-list':{
      url: '/api/krspace-erp-web/sys/print-template/list?formId={formId}',
      method: 'get'
    },
    //获取合同模板数据
    'get-form-template-data':{
      url: '/api/krspace-erp-web/sys/form-template/node?id={id}',
      method: 'get'
    },
    //合同搜索下拉
    'template-search-list':{
      url: '/api/krspace-erp-web/sys/public-dict/data/type/source?sourceType={sourceType}&sourceOrgin={sourceOrgin}&searchKey={searchKey}&fieldId={fieldId}',
      method: 'get'
    },

    //sql模版列表
    'sql-list':{
      url: '/api/krspace-erp-web/sys/sql-template/search?page={page}&pageSize={pageSize}&name={name}',
      method: 'get'
   },
     //sql模版新增
     'sql-add':{
      url: '/api/krspace-erp-web/sys/sql-template/insert',
      method: 'post'
   },
     //sql模版编辑
     'sql-edit':{
      url: '/api/krspace-erp-web/sys/sql-template/update',
      method: 'post'
   },
    //sql模版删除
    'sql-delete':{
      url: '/api/krspace-erp-web/sys/sql-template/delete',
      method: 'post'
   },
   //获取打印模版配置信息
   'get-sql-print':{
    url: '/api/krspace-erp-web/sys/print/template/list/type/field?formId={formId}',
    method: 'get'
   },
   //获取PC端合同模板数据
    'get-form-template-detail-data':{
      url: '/api/krspace-erp-web/sys/form-template?id={id}',
      method: 'get'
    },

   //创建表单回血
   'sql-table-get':{
    url: '/api/krspace-erp-web/sys/form/sqlTable/search?id={id}',
    method: 'get'
   },
   //公共字典下拉
   'common-dictionary-list':{
    url: '/api/krspace-erp-web/sys/public-dict/source/select/type/list',
    method: 'get'
   },

   //公章列表下拉
   'get-seal-list':{
    url: '/api/krspace-erp-web/sys/contract-template/list/type/rent-field?formId={formId}',
    method: 'get'
  },

   //查询节点列表
   'search-node-list':{
    url: '/api/krspace-erp-web/wf/wf-node/listSearch?page={page}&pageSize={pageSize}&wfId={wfId}',
    method: 'get'
   },

   //新建节点信息
   'add-node-intro':{
    url: '/api/krspace-erp-web/wf/wf-node/add',
    method: 'post'
   },

   //编辑节点信息
   'edit-node-intro':{
    url: '/api/krspace-erp-web/wf/wf-node/edit',
    method: 'post'
   },

   //查询节点对象
   'get-node-edit':{
    url: '/api/krspace-erp-web/wf/wf-node/wfNodeVOSearch?id={id}',
    method: 'get'
   },
   //账户列表-解除绑定
   'remove-member':{
    url: '/api/krspace-sso-web/sso/ssoUser/remove-member?ssoId={ssoId}',
    method: 'get'
   },
   //账户列表-绑定
   'connect-member':{
    url: '/api/krspace-sso-web/sso/ssoUser/connect-member?ssoId={ssoId}&uid={uid}',
    method: 'get'
   },
   //账户列表-绑定-获取会员信息
   'get-mobile-phone-info':{
    url: '/api/krspace-sso-web/member/mobile-phone?phone={phone}',
    method: 'get'
   },
   // 获取二维码 
  'getQrCode':{
    // url: 'http://sun.krspace.cn/api/krspace-sso-web/sso/login/getQrCode',
    url: '/api/krspace-sso-web/sso/login/getQrCode',
    method: 'get'
  },
  // 登录状态查询  
  'getQrLoginStatus':{
    url: '/api/krspace-sso-web/sso/login/getQrLoginStatus?uuid={uuid}',
  //  url: 'http://sun.krspace.cn/api/krspace-sso-web/sso/login/getQrLoginStatus?uuid={uuid}',
  // 获取菜单目录
  },
  'get-menu-catalog': {
    url: '/api/krspace-sso-web/sso/sysOwn/getUserMenu',
    method: 'get'
  },
   //账户列表-人员获取id
   'get-bill-person-id':{
    url: '/api/krspace-erp-web/erp/ssoUser/resource-id?ssoId={ssoId}',
    method: 'get'
   },
}
