
module.exports = [
	{
		primaryText: "综合办公",
		router: 'office',
		menuItems: [
			{
				primaryText: "办公主页",
				router: 'office',
				iconName: 'icon-money',
				iconColor: '#79859a',
				menuItems: [
					
				]
			},
			{
				primaryText: '新办事宜',
				iconName: 'icon-schema',
				router: 'office',
				iconColor: '#79859a',
				menuCode: 'hrm_resourcesList_incumbency',
				menuItems: [
					{
						primaryText: '新办事宜',
						menuCode: 'hrm_resourcesList_incumbency',
						router: '/permission/processManage/dealNewThings',
					},
				]	
			}, 
			{
				primaryText: '待办事宜',
				iconName: 'icon-schema',
				router: 'office',
				iconColor: '#79859a',
				menuCode: 'hrm_resourcesList_incumbency',
				menuItems: [
					{
						primaryText: '待办列表',
						menuCode: 'hrm_resourcesList_incumbency',
						router: '/office/officeBackground/todo',
					},
				]	
			}, 
			{
				primaryText: '已办事宜',
				iconName: 'icon-schema',
				router: 'office',
				iconColor: '#79859a',
				menuCode: 'hrm_resourcesList_incumbency',
				menuItems: [
					{
						primaryText: '已办列表',
						menuCode: 'hrm_resourcesList_incumbency',
						router: '/office/officeBackground/downOffice',
					},
					{
						primaryText: '我发起的',
						menuCode: 'hrm_resourcesList_incumbency',
						router: '/office/officeBackground/newOffice',
					},
				]	
			}, 
		]
	}
]
