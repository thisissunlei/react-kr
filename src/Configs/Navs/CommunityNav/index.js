module.exports = [
	{
		primaryText: "社区经营",
		router: 'community',
		originUrl: '#/community/communityManage/detail',
		menuItems: [{
			primaryText: "社区管理",
			iconName: 'icon-com',
			iconColor: '#79859a',
			menuItems: [{
				primaryText: '计划表',
				menuCode: 'cmt_run',
				router: '/community/communityManage/detail',
			},
			{
				primaryText: '销控表',
				menuCode: 'cmt_sell_control',
				router: '/community/communityManage/controlTable',
			},
			{
				primaryText: '空间预订',
				menuCode: 'oper_appointment_base',
				router: '/community/communityManage/allAppointment'
			},

			{
				primaryText: '预约参观',
				menuCode: 'com_sys_visitList_base',
				router: '/community/communityManage/visitorsToRecord'
			},
			{
				primaryText: '访客登记',
				menuCode: 'visitRecord',
				router: '/community/visitor/list'
			},
			{
				primaryText: '支持列表',
				menuCode: 'mobile_question_base',
				router: '/community/communityManage/holdList'
			},
			]
		},
		],
	}

]
