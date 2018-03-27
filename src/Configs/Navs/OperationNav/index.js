module.exports = [

	{
		primaryText: "社区运营",
		router: 'community',
		originUrl: '#/community/operation/index',
		menuItems: [
			{
				primaryText: "社区运营",
				iconName: 'icon-operation-home',
				iconColor: '#79859a',
				router: 'index',
				menuItems: [
					{
						primaryText: '社区主页',
						router: '/community/operation/index',
						menuCode: 'operation_home',
					},
					{
						primaryText: '预约参观',
						menuCode: 'com_sys_visitList_base',
						router: '/community/communityManage/visitorsToRecord'
					},
					{
						primaryText: '访客',
						menuCode: 'visitRecord',
						router: '/community/visitor/list'

					},
					{
						primaryText: '会议室',
						menuCode: 'oper_appointment_base',
						router: '/community/communityManage/allAppointment'
					},
					{
                        primaryText: '撤场',
                        originUrl: '/operations-center/from-field',
                        type: 'vue',
                        menuCode: 'checklist_list',
                    },
				]
			},
			



		]
	}

]
