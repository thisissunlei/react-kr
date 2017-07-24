module.exports = [

	{
		primaryText: "数据统计",
		router: 'statistical',
		menuItems: [{
			primaryText: "数据统计",
			router: 'statistical',
			iconName: 'icon-com',
			iconColor: '#79859a',
			menuItems: [
				{
					primaryText: "集团经营",
					router: '/statistical/index',
					menuCode: 'stat_group',
				},
				{
					primaryText: "账龄统计",
					router: '/statistical/agingaccount',
					menuCode: 'finance_explan',
				},
				{
					primaryText: "客户分析",
					router: '/statistical/dataReport',
					menuCode: 'stat_csr_sourceStat_base',
				},
			]
		},
		]
	}
]
