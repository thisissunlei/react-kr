
module.exports = [
	{
		primaryText: "订单中心",
        menuCode:'order',
        menuItems: [
            {
                primaryText: "订单管理",
                originUrl: '',
                iconName: 'icon-money',
                iconColor: '#79859a',
                menuItems: [
                    {
                        primaryText: "工位订单列表",
                        originUrl: '/order-center/order-manage/station-order-manage',
                        type:'vue',
                        menuCode: 'seat_order_list',
                    },
                    {
						primaryText: '会议室订单管理',
						menuCode: 'fina_meeting_order_page',
						originUrl: '/order/list',
                    },
                    {
                        primaryText: "通用订单列表",
                        originUrl: '/order-center/order-manage/general-order-manage',
                        type:'vue',
                        menuCode: 'order_seat_list',
                    },
                    {
						primaryText: '撤场记录管理',
						type: 'vue',
						originUrl: '/operations-center/from-field',
						menuCode: 'csr_withdrawal_list',
					}                             
                ]
            },
            {
                primaryText: "合同管理",
                router: '',
                iconName: 'icon-money',
                iconColor: '#79859a',
                menuItems: [
                    {
                        primaryText: "合同列表",
                        originUrl: '/order-center/contract-manage/contract-list/list',
                        menuCode: 'iot_door_open_log',
                        //menuCode: 'fina_meeting_order_page'
                    },
                ]
            },
            {
                primaryText: '订单合同',
                iconName: 'icon-newthing',
                iconColor: '#79859a',
                menuItems: [
                    {
                        primaryText: '会议室订单管理',
                        menuCode: 'fina_meeting_order_page',
                        originUrl: '/order/list',
                    },

                ]
            }, 
        ]
	}
]
