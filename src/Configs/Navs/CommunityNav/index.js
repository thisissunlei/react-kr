
module.exports = [
	{
		primaryText: "社区经营",
		router: '/community',
		originUrl: '#/community/communityManage/detail',
		menuItems: [{
			primaryText: "社区管理",
			iconName: 'icon-com',
			iconColor: '#79859a',
			menuItems: [{
				primaryText: '销控表',
				menuCode: 'cmt_run',
				router: '/community/communityManage/detail',
			},
			{
						primaryText: '预约列表',
						menuCode: 'appointment_manage_list',
						router: '/community/communityManage/allAppointment'
					},
				{
					primaryText: '访客记录',
					menuCode: 'sysVisitRecord',
					router: '/community/communityManage/visitorsToRecord'
				},
				{
					primaryText: '访客列表',
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
