module.exports = [

	{
		primaryText: "单点系统",
		router: 'permission',
		menuItems: [
			{
				primaryText: "账户管理",
				iconName: 'icon-wendang',
				iconColor: '#79859a',
				router: 'accountManage',
				menuItems: [{
					primaryText: '账户列表',
					router: '/permission/accountManage/accountList',
					menuCode: 'sso_userList_base',
				},
				]
			},
			{
				primaryText: "权限管理",
				iconName: 'icon-wendang',
				iconColor: '#79859a',
				router: 'permission/user',
				menuItems: [{
					primaryText: '角色列表',
					router: '/permission/user',
					menuCode: 'sso_roleList_base',
				},{
					primaryText: '操作项',
					router: '/permission/operations',
					menuCode: 'sso_resource_base',
				},
				{
					primaryText: '业务代码',
					router: '/permission/opCode',
					menuCode: 'sso_resource_base',
				}]
			},
			{
				primaryText: "日志管理",
				iconName: 'icon-wendang',
				iconColor: '#79859a',
				router: 'permission/systemManage',
				menuItems: [
				{
					primaryText: '操作日志',
					router: '/permission/accountManage/operationsLogs',
					menuCode: 'sso_actionLog_base',
				},
				{
					primaryText: '消息日志',
					router: '/permission/systemManage/messageList',
					menuCode: 'sso_infoList_base',
				},{
					primaryText: '登录日志',
					router: '/permission/loginLog',
					menuCode: 'sso_loginLog_base',
				}]
			},{
				primaryText: "系统管理",
				iconName: 'icon-wendang',
				iconColor: '#79859a',
				router: 'permission/systemManage',
				menuItems: [{
					primaryText: '版本管理',
					router: '/permission/systemManage/appLoginLogs',
					menuCode: 'sso_appVersion_base',
				},]
			}
		]
	}

]
