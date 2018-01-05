
module.exports = [
	{
		primaryText: "订单中心",
		menuCode:'order',
		menuItems: [
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
