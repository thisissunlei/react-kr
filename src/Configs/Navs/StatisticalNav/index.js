module.exports = [

	{
		primaryText: "数据统计",
		menuCode: 'stat',
		router: 'statistical',
		menuItems: [{
			primaryText: "数据统计",
			router: 'statistical',
			iconName: 'icon-com',
			iconColor: '#79859a',
			menuCode: 'dataStat',
			menuItems: [
				{
					primaryText: "集团经营",
					router: '/statistical/index',
					menuCode: 'stat_group',
				},
			]
		},
		]
	}
]
