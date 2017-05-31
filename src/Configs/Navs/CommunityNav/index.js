
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
						primaryText: '空间预订',
						menuCode: 'appointment_manage_list',
						router: '/community/communityManage/allAppointment'
					},
				{
					primaryText: '预约参观',
					menuCode: 'sysVisitRecord',
					router: '/community/communityManage/visitorsToRecord'
				},
				{
					primaryText: '访客登记',
					menuCode: 'visitRecord',
					router: '/community/visitor/list'
				},
				{
					primaryText: '支持列表',
					menuCode: 'visitRecord',
					router: '/community/communityManage/holdList'
				},
			]
		},
		],
	}

]
