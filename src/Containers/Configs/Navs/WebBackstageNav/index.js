module.exports = [

	{
		primaryText: "官网后台",
		router: 'WebBackstage',
		menuCode: 'krspace_main_manage',
		originUrl: '#/WebBackstage/activity/list',
		menuItems: [
			{
				primaryText: "活动管理",
				iconName: 'icon-com',
				iconColor: '#79859a',
				menuCode: 'activityManage',
				router :'activity',
				menuItems: [
					{
						primaryText: '活动列表',
						menuCode: 'activityList',
						router: '/WebBackstage/activity/list',
					},]
			}, ],
	}
]
