
module.exports = [
	{
		primaryText: "账单中心",
		router: 'office',
		menuItems: [
			{
				primaryText: '账单中心',
				iconName: 'icon-newthing',
				iconColor: '#79859a',
				menuItems: [
					{
						primaryText: '已出账单管理',
						menuCode: 'pay_created_bill_page',
						originUrl: 'http://optest01.krspace.cn/bill/list',
                    },
                    {
						primaryText: '回款管理',
						menuCode: 'pay_payment_page',
						originUrl: 'http://optest01.krspace.cn/bill/payment',
                    },
                    {
						primaryText: '收入管理',
						menuCode: 'pay_income_page',
						originUrl: 'http://optest01.krspace.cn/bill/income',
                    },
                    {
						primaryText: '交易流水',
						menuCode: 'pay_deal_flow_page',
						originUrl: 'http://optest01.krspace.cn/bill/payrecord',
					},
				]	
			}, 
			 
		]
	}
]
