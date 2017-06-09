//导航
module.exports = {
  //获取全局导航
  'getSelfMenuInfo': {
      url: '/api-old/sys/sysfunrights/sysMenu/getSelfMenuInfo',
      method: 'get'
  },

  'newMenuInfo': {
      url: '/api/krspace-sso-web/sso/sysOwn/findUserData?forceUpdate=1',
      method: 'get'
  },
}
