
module.exports = [
	{
		primaryText: "账单中心",
		router: 'office',
		menuItems: [
			{
				primaryText: '账单中心',
				iconName: 'icon-newthing',
				router: 'office',
				iconColor: '#79859a',
				menuItems: [
					{
						primaryText: '已出账单管理',
						menuCode: 'pay_created_bill_page',
						router: 'http://optest01.krspace.cn/bill/list',
                    },
                    {
						primaryText: '回款管理',
						menuCode: 'pay_payment_page',
						router: 'http://optest01.krspace.cn/bill/payment',
                    },
                    {
						primaryText: '收入管理',
						menuCode: 'pay_income_page',
						router: 'http://optest01.krspace.cn/bill/income',
                    },
                    {
						primaryText: '交易流水',
						menuCode: 'pay_deal_flow_page',
						router: 'http://optest01.krspace.cn/bill/payrecord',
					},
				]	
			}, 
			 
		]
	}
]
