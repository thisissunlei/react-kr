
module.exports = [

	{
		primaryText: "综合办公",
		router: 'oa',
		originUrl: '#/oa/organization/home',
		menuItems: [
			{
				primaryText: '人事主页',
				iconName: 'icon-schema',
				iconColor: '#79859a',
				menuCode: '',
				menuItems: [
					
				]	
			}, 
			{
				primaryText: '人事资料',
				iconName: 'icon-schema',
				iconColor: '#79859a',
				menuCode: '',
				menuItems: [
					{
						primaryText: '我的卡片',
						menuCode: '',
						router: '',
					},
					{
						primaryText: '我的同事',
						menuCode: '',
						router: '',
					},
				]	
			}, 
			{
				primaryText: '人员管理',
				iconName: 'icon-administrator',
				menuCode: 'hrmresourceadmin',
				iconColor: '#79859a',
				menuItems: [
					{
						primaryText: '人员列表',
						menuCode: 'hrm_resourcesList_incumbency',
						router: '/oa/personalManage/peopleState',
						
					}
				]
			}, 	
		]
	}
]
