
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
						primaryText: '空间预定',
						menuCode: 'oper_msg_visit_base',
						router: '/community/communityManage/allAppointment'
					},
				{
					primaryText: '访客登记',
					menuCode: 'com_sys_visitList_base',
					router: '/community/communityManage/visitorsToRecord'
				},
				{
					primaryText: '预约参观',
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
