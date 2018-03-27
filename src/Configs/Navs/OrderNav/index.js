
module.exports = [
	{
		primaryText: "订单合同",
		router:'order',
		menuItems: [
			{
				primaryText: '订单',
				iconName: 'icon-donething',
				router: 'office',
				iconColor: '#79859a',
				menuCode: 'myCard',
				menuItems: [
					{
                        primaryText: "工位订单",
                        router: 'order-center/order-manage/station-order-manage',
                        type: 'vue',
                        menuCode: 'seat_order_list',
                    },
                    {
                        primaryText: "会议室订单",
                        router: 'order/list',
                        type: 'vue',
                        menuCode: 'fina_meeting_order_page'
                    },
                    {
                        primaryText: "通用订单",
                        router: 'order-center/order-manage/general-order-manage',
                        type: 'vue',
                        menuCode: 'orderCurrency_list',
                    },
				]	
			}, 
			{
				primaryText: '合同',
				iconName: 'icon-donething',
				router: 'office',
				iconColor: '#79859a',
				menuCode: 'wf_contract_list',
				menuItems: [
					{
                        primaryText: "工位合同",
                        router: 'order-center/contract-manage/contract-list/list',
                        type: 'vue',
                        menuCode: 'stationContract_list',
                    },
                    {
						primaryText: '其他合同',
						menuCode: 'myCard',
						router: '/office/officeBackground/newOffice',
					},
					{
						primaryText: '我发起的合同',
						menuCode: 'myCard',
						router: '/office/officeBackground/ownAdd',
					},
					{
						primaryText: '合同库',
						menuCode: 'wf_contract_list',
						router: '/office/officeBackground/contractMonitor',
					},
					{
						primaryText: '合同扫码',
						menuCode: 'pigeonhole',
						originUrl: '/order-center/contract-manage/contract-yard',
					}
				]	
			}, 
		]
	}
]
