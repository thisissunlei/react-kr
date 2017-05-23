module.exports = [

	{
		primaryText: "官网后台",
		router: 'WebBackstage',
		originUrl: './#/WebBackstage/activity/list',
		menuItems: [
			{
				primaryText: "活动管理",
				iconName: 'icon-com',
				iconColor: '#79859a',
				router :'activity',
				menuItems: [
					{
						primaryText: '活动列表',
						menuCode: 'main_acitvity',
						router: '/WebBackstage/activity/list',
					},{
						primaryText: '新闻列表',
						menuCode: 'main_news',
						router: '/WebBackstage/news/list',
					},
					]
			}, ],
	}
]
