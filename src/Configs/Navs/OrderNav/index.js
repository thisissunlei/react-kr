
module.exports = [
	{
		primaryText: "订单中心",
		router: 'office',
		menuItems: [
			{
				primaryText: '订单合同',
				iconName: 'icon-newthing',
				router: 'office',
				iconColor: '#79859a',
				menuItems: [
					{
						primaryText: '会议室订单管理',
						menuCode: 'fina_meeting_order_page',
						router: 'http://optest01.krspace.cn/order/list',
                    },
                    
				]	
			}, 
			 
		]
	}
]
