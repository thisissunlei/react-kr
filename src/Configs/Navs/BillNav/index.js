
module.exports = [
	{
		primaryText: "账单中心",
		menuCode:'bill',
		menuItems: [
			{
				primaryText: '账单中心',
				iconName: 'icon-newthing',
				iconColor: '#79859a',
				menuItems: [
					{
						primaryText: '已出账单管理',
						menuCode: 'order_seat_list',
						//menuCode: 'pay_created_bill_page',
						originUrl: '/bill/list',
                    },
                    {
						primaryText: '回款管理',
						menuCode: 'order_seat_list',
						//menuCode: 'pay_payment_page',
						originUrl: '/bill/payment',
                    },
                    {
						primaryText: '应收管理',
						menuCode: 'order_seat_list',
						//menuCode: 'pay_income_page',
						originUrl: '/bill/income',
                    },
                    {
						primaryText: '交易流水',
						menuCode: 'order_seat_list',
						//menuCode: 'pay_deal_flow_page',
						originUrl: '/bill/payrecord',
					},
				]	
			}, 
			 
		]
	}
]
