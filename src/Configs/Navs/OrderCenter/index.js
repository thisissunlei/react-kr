
module.exports = [
	{
		primaryText: "订单中心",
        router: 'order',
        type:'vue',
        menuItems: [
            {
                primaryText: "订单管理",
                router: '',
                iconName: 'icon-money',
                iconColor: '#79859a',
                type:'vue',
                menuItems: [
                    {
                        primaryText: "订单列表",
                        router: 'orderCenter/orderManage',
                        type:'vue',
                        menuCode: 'iot_door_open_log',
                        //menuCode: 'fina_meeting_order_page'
                    },
                ]
            },
            {
                primaryText: "合同管理",
                router: '',
                iconName: 'icon-money',
                iconColor: '#79859a',
                type:'vue',
                menuItems: [
                    {
                        primaryText: "合同列表",
                        router: 'contractCenter/list',
                        type:'vue',
                        menuCode: 'iot_door_open_log',
                        //menuCode: 'fina_meeting_order_page'
                    },
                ]
            },
        ]
	}
]
