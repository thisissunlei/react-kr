module.exports = [

	{
		primaryText: "社区运营",
		menuCode: 'bill',
		menuItems: [
			{
				primaryText: "社区运营",
				iconName: 'icon-operation-home',
				iconColor: '#79859a',
				type: 'vue',
				menuItems: [
					// {
                    //     primaryText: '社区主页',
                    //     originUrl: '/operation/community',
                    //     type:'vue',
                    //     menuCode: 'op_home',
                    // },
					 {
                        primaryText: '即将到期',
                        originUrl: '/inventory/over-date',
                        type:'vue',
                        menuCode: 'vueList',
                    },
                    {
                        primaryText: '即将进场',
                        originUrl: '/inventory/enter-field',
                        type:'vue',
                        menuCode: 'imt_putaway_list',
					},
					{
                        primaryText: '已起租未付',
                        router: 'inventory/rented-unpaid',
                        type:'vue',
                        menuCode: 'rent_no_pay',
                    },
                    {
                        primaryText: '逾期未付',
                        router: 'inventory/over-date-unpaid',
                        type:'vue',
                        menuCode: 'overdate_no_pay',
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
					{
						primaryText: '电视图库管理',
						menuCode: 'tv_ad_storage',
						type: 'vue',
						originUrl: '/smart-hardware/map-depot'
					},
				]
			},
			



		]
	}

]
