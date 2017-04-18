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
		]
	}

]
