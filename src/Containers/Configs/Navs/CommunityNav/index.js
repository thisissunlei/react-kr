
module.exports = [
	{
		primaryText: "社区经营",
		router: 'community',
		menuCode: 'op_manage',
		originUrl: '#/community/communityManage/detail',
		menuItems: [{
			primaryText: "社区管理",
			iconName: 'icon-com',
			iconColor: '#79859a',
			menuCode: 'community_manage',
			menuItems: [{
				primaryText: '销控表',
				menuCode: 'plan_table',
				router: '/community/communityManage/detail',
			},
				{
					primaryText: '访客记录',
					menuCode: 'sysVisitRecord',
					originUrl: '/krspace_operate_web/community/sysVisitRecord/toSysVisitrecordList?mid=112'
				}, 
			]
		}, 
		],
	}

]