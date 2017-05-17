


module.exports = {

    //个人中心-获取个人信息
    'PersonalCenterData': {
        url: '/api-old/sys/sysOwn/getPersonalInfo',
        method: 'get'
    },
    //个人中心-身份验证手机
    'PersonalCenterVerifyIdByMobile': {
        url: '/api-old/sys/sysOwn/verifyMobile?verifyCode={verifyCode}',
        method: 'get'
    },
    //个人中心-身份验证邮箱
    'PersonalCenterVerifyIdByMail': {
        url: '/api-old/sys/sysOwn/verifyEmail?verifyCode={verifyCode}',
        method: 'get'
    },
    //个人中心-获取手机验证码
    'PersonalCenterGetMobileVerificationCode': {
        url: '/api-old/sys/sysOwn/getVerifyCodeByMobile',
        method: 'get'
    },
    //个人中心-获取邮箱验证码
    'PersonalCenterGetMailVerificationCode': {
        url: '/api-old/sys/sysOwn/getVerifyCodeByEmail',
        method: 'get'
    },
    //个人中心-修改手机号时新手机号获取验证码
    'PersonalCenterGetNewMobileVerificationCode': {
        url: '/api-old/sys/sysOwn/getVerifyCodeByNewMobile?mobile={mobile}',
        method: 'get'
    },
    //个人中心-验证修改手机号验证码
    'PersonalCenterVerifyReviseMobileVerificationCode': {
        url: '/api-old/sys/sysOwn/editMobile',
        method: 'post'
    },
    //个人中心-修改密码
    'PersonalCenterVerifyRevisePwd': {
        url: '/api-old/sys/sysOwn/editPassword',
        method: 'post'
    },
    //权限--登录
    'loginSubmit': {
      url: '/api/krspace-sso-web/sso/login/loginSubmit',
      method: 'post'
    },
    //权限--手机获取验证码
    'getVcodeByPhone': {
      url: '/api/krspace-sso-web/sso/login/getVcodeByPhone?mobile={mobile}',
      method: 'get'
    },
    //权限--邮箱获取验证码
    'getVcodeByMail': {
      url: '/api/krspace-sso-web/sso/login/getVcodeByMail?email={email}',
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
      url: '/api/krspace-sso-web/sso/ssoUser/getSsoUserList?accountName={accountName}&email={email}&mobilePhone={mobilePhone}&realName={realName}&page={page}&pageSize={pageSize}&accountStatus={accountStatus}',
      method: 'get'
    },
    //权限--账户列表--获取数据权限
    'findRoleData': {
      url: '/api/krspace-sso-web/sso/ssoUser/findRoleData?id={id}',
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
      url: '/api/krspace-sso-web/sso/role/findPage?page={page}&pageSize={pageSize}&name={name}&code={code}',
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
    //权限--角色--新建--获取操作项列表
    'getModuleData': {
      url: '/api/krspace-sso-web/sso/role/getModuleData',
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
      url: '/api/krspace-sso-web/msg/get-log-list?msgType={msgType}&receviers={receviers}&sendStatus={sendStatus}&page={page}&pageSize={pageSize}&startTime={startTime}&endTime={endTime}&remark={remark}',
      method: 'get'
    },
    //权限--版本管理--分页
    'get-version-list': {
      url: '/api/krspace-sso-web/mobile/version/get-version-list?enableFlag={enableFlag}&forcedStatus={forcedStatus}&osType={osType}&page={page}&pageSize={pageSize}&version={version}',
      method: 'get'
    },
    //权限--版本管理--新建/编辑
    'save-version': {
      url: '/api/krspace-sso-web/mobile/version/save-version',
      method: 'post'
    },
    //权限--版本管理--查看
    'get-version-detail': {
      url: '/api/krspace-sso-web/mobile/version/get-version-detail?id={id}',
      method: 'get'
    },
    //权限--APP登录日志--分页
    'mobile-login-log': {
      url: '/api/krspace-sso-web/mobile/log/mobile-login-log?phone={phone}&sendStatus={sendStatus}&osType={osType}&page={page}&pageSize={pageSize}&version={version}&remark={remark}',
      method: 'get'
    },
    //权限--获取菜单
    'findUserData': {
      url: '/api/krspace-sso-web/sso/sysOwn/findUserData?forceUpdate={forceUpdate}',
      method: 'get'
    },

}
