module.exports = [

	{
		primaryText: "单点系统",
		router: 'permission',
		menuCode: 'operate',
		originUrl: '#/permission/accountList',
		menuItems: [
			{
				primaryText: "账户管理",
				iconName: 'icon-wendang',
				iconColor: '#79859a',
				router: 'permission/accountList',
				menuCode: 'coustomerInfoList',
				menuItems: [{
					primaryText: '账户列表',
					router: 'permission/accountList',
					menuCode: 'contractList',
				},]
			},
			{
				primaryText: "权限管理",
				iconName: 'icon-wendang',
				iconColor: '#79859a',
				router: 'permission/user',
				menuCode: 'coustomerInfoList',
				menuItems: [{
					primaryText: '角色列表',
					router: 'permission/user',
					menuCode: 'contractList',
				},{
					primaryText: '操作项',
					router: 'permission/operations',
					menuCode: 'contractList',
				},]
			}
		]
	}

]
