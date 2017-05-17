module.exports = [

	{
		primaryText: "权限管理",
		menuCode: 'rightadmin',
		router: '/permission',
		originUrl: '/sys/sysParam/toSysParamList?mid=8',
		menuItems: [
			{
				primaryText: '系统管理',
				iconName: 'icon-administrator',
				iconColor: '79859a',
				menuCode: 'sysadmin',
				router: 'sysadmin',
				menuItems: [
					{
						primaryText: '参数配置',
						menuCode: 'sysparamadmin',
						router: 'sysparamadmin',
						originUrl: '/sys/sysParam/toSysParamList?mid=8'
					}, 
					{
						primaryText: '系统新闻',
						menuCode: 'sysnotice',
						router: 'sysnotice',
						originUrl: '/sys/sysNews/toSysNewsList?mid=21'
					}, 
					{
						primaryText: '系统缓存',
						menuCode: 'syschache_admin',
						router: 'syschache_admin',
						originUrl: '/sys/sysCache/showAllCache?mid=34'
					}, 
					{
						primaryText: '验证码列表',
						menuCode: 'sysverifycode',
						router: 'sysverifycode',
						originUrl: '/sys/sysVerifyCode/toVerifyCodeList?mid=25'
					}, 
					{
						primaryText: '待办事项',
						menuCode: 'sysundo',
						router: 'sysundo',
						originUrl: '/sys/sysUndo/toSysUndoList?mid=33'
					},

					{
						primaryText: '常用列表',
						menuCode: 'sysMyusual',
						router: 'sysMyusual',
						originUrl: '/sys/sysMyusual/toSysMyusualList?mid=97'
					}, 
					{
						primaryText: '系统日程',
						menuCode: 'sysschedule',
						router: 'sysschedule',
						originUrl: '/sys/sysSchedule/toSysScheduleList?mid=91'
					},

				]

			}, 
			{
				primaryText: '权限管理',
				menuCode: 'rightadmin',
				iconName: 'icon-wendang',
				iconColor: '#79859a',
				router: 'rightadmin',
				menuItems: [
					{
						primaryText: '未注册列表',
						menuCode: 'sysFunRightsNoRegisterAdmin',
						router: 'sysFunRightsNoRegisterAdmin',
						originUrl: '/sys/sysfunrights/sysFunRightsNoRegister/toSysFunRightsNoRegisterList?mid=35'
					}, 
					{
						primaryText: '注册管理',
						menuCode: 'sysFunRightsRegisterAdmin',
						router: 'sysFunRightsRegisterAdmin',
						originUrl: '/sys/sysfunrights/sysFunRightsRegister/toSysFunRightsRegisterList?mid=36'
					}, 
					{
						primaryText: '权限类型',
						menuCode: 'righttypeadmin',
						router: 'righttypeadmin',
						originUrl: '/sys/sysfunrights/sysRightType/toSysFunrighttypeList?mid=14'
					}, 
					{
						primaryText: '权限项列表',
						menuCode: 'sysfunrightsadmin',
						router: 'sysfunrightsadmin',
						originUrl: '/sys/sysfunrights/sysFunrights/toSysFunRightsList?mid=17'
					},
					{
						primaryText: '角色类型',
						menuCode: 'sysroletypeadmin',
						router: 'sysroletypeadmin',
						originUrl: '/sys/sysfunrights/sysRoletype/toSysRoletypeList?mid=18'
					}, 
					{
						primaryText: '功能角色',
						menuCode: 'sysfunroleadmin',
						router: 'sysfunroleadmin',
						originUrl: '/sys/sysfunrights/sysFunrole/toSysFunroleList?mid=19'
					}, 
					{
						primaryText: '菜单管理',
						menuCode: 'sysmenuadmin',
						router: 'sysmenuadmin',
						originUrl: '/sys/sysfunrights/sysMenu/toSysMenuList?mid=9'
					}, 
					{
						primaryText: '数据模板管理',
						menuCode: 'groupManage',
						router: '/statistical/groupSetting'
					},

				]
			}, 
			{
				primaryText: '账户管理',
				menuCode: 'sysloginadmin',
				iconName: 'icon-account',
				iconColor: '#79859a',
				router: 'sysloginadmin',
				menuItems: [
					{
						primaryText: '账户列表',
						menuCode: 'sysloginadmin',
						router: 'sysloginadmin',
						originUrl: '/sys/sysLogin/sysLogin/toSysLoginList?mid=12'
					}, 
					{
						primaryText: '变更日志',
						menuCode: 'sysloginchangelog',
						router: 'sysloginchangelog',
						originUrl: '/sys/sysLogin/sysLoginChangelog/toSysLoginChangelogList?mid=13'
					}, 
					{
						primaryText: '登录日志',
						menuCode: 'sysloginlog',
						router: 'sysloginlog',
						originUrl: '/sys/sysLogin/sysLoginLog/toSysLoginLogList?mid=15'
					},

				]
			}, 
			{
				primaryText: '单点管理',
				menuCode: 'issoadmin',
				iconName: 'icon-dandian_nor',
				iconColor: '#79859a',
				router: 'issoadmin',
				menuItems: [
					{
						primaryText: '单点服务',
						menuCode: 'issoserviceadmin',
						router: 'issoserviceadmin',
						originUrl: '/isso/issoService/toIssoServiceList?mid=10'
					}, 
					{
						primaryText: '单点日志',
						menuCode: 'issolog',
						router: 'issolog',
						originUrl: '/isso/issoLog/toIssoLogList?mid=24'
					}, ]
			}, 
			{
				primaryText: '系统监控',
				iconName: 'icon-control',
				iconColor: '#79859a',
				menuCode: 'sysmonitor',
				router: 'sysmonitor',
				menuItems: [
					{
						primaryText: '用户监测',
						menuCode: 'onlineuser',
						router: 'onlineuser',
						originUrl: '/sys/onLineUser/onLineUserList?mid=42'
					}, ]
			}, ]
	}
]
