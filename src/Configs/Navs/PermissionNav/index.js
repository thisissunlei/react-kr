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
				},{
					primaryText: '操作日志',
					router: '/permission/accountManage/operationsLogs',
					menuCode: 'sso_actionLog_base',
				},{
					primaryText: '登录日志',
					router: '/permission/loginlog',
					menuCode: 'sso_loginLog_base',

				},
				]
			},
			{
				primaryText: "权限管理",
				iconName: 'icon-wendang',
				iconColor: '#79859a',
				router: 'permission/user',
				menuCode: 'coustomerInfoList',
				menuItems: [{
					primaryText: '角色列表',
					router: '/permission/user',
					menuCode: 'sso_roleList_base',
				},{
					primaryText: '操作项',
					router: '/permission/operations',
					menuCode: 'sso_resource_base',
				},]
			},{
				primaryText: "系统管理",
				iconName: 'icon-wendang',
				iconColor: '#79859a',
				router: 'permission/systemManage',
				menuCode: 'coustomerInfoList',
				menuItems: [{
					primaryText: '版本管理',
					router: '/permission/systemManage/appLoginLogs',
					menuCode: 'sso_appVersion_base',
				},{
					primaryText: '信息列表',
					router: '/permission/systemManage/messageList',
					menuCode: 'sso_infoList_base',
				},{
					primaryText: 'APP登录日志',
					router: '/permission/systemManage/versionManage',
					menuCode: 'sso_appLog_base',
				},]
			}
		]
	}

]
