


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
}
