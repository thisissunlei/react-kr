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
					menuCode: 'sso_businessCode_base',
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
			},
			{
				primaryText: "系统管理",
				iconName: 'icon-wendang',
				iconColor: '#79859a',
				router: 'permission/systemManage',
				menuItems: [
					{
					primaryText: 'APP版本管理',
					router: '/permission/systemManage/appLoginLogs',
					menuCode: 'sso_appVersion_base',
				},
				{
					primaryText: 'PC版本管理',
					router: '/permission/systemManage/update-log',
					menuCode: 'op_ver',
				},
				]
			},
			{
				primaryText: "同步中心",
				iconName: 'icon-wendang',
				iconColor: '#79859a',
				router: 'permission/Synchronization',
				menuItems: [
					{
						primaryText: '同步主体',
						router: '/permission/Synchronization/main',
						menuCode: 'oper_csr_base',
					},
					{
						primaryText: '同步系统',
						router: '/permission/Synchronization/system',
						menuCode: 'contract_list_base',
					},
					{
						primaryText: '系统订阅',
						router: '/permission/Synchronization/content',
						menuCode: 'oper_csr_marketList_base',
					},
					{
						primaryText: '日志列表',
						router: '/permission/Synchronization/journal/main/system',
						menuCode: 'oper_csr_marketList_base',
					},
				]
			},



		]
	}

]
