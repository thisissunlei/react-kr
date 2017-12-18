
module.exports = [
	{
		primaryText: "订单中心",
        originUrl: 'order',
        menuItems: [
            {
                primaryText: "订单管理",
                originUrl: '',
                iconName: 'icon-money',
                iconColor: '#79859a',
                menuItems: [
                    {
                        primaryText: "订单列表",
                        originUrl: '/orderCenter/orderManage',
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
                menuItems: [
                    {
                        primaryText: "合同列表",
                        originUrl: '/contractCenter/list',
                        menuCode: 'iot_door_open_log',
                        //menuCode: 'fina_meeting_order_page'
                    },
                ]
            },
        ]
	}
]
