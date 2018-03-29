module.exports = [

	{
		primaryText: "账单财务",
        menuCode: 'bill',
		menuItems: [
			{
                primaryText: "账单中心",
                iconName: 'icon-money',
                iconColor: '#79859a',
                type: 'vue',
                menuItems: [
                    
                    {
                        primaryText: "账单",
                        originUrl: '/bill/list',
                        type: 'vue',
                        menuCode: 'pay_created_bill_page',
                    },
                    {
                        primaryText: "账单(老数据)",
                        router: '/finance/manage/orderbill/orderList',
                        menuCode: 'fina_account_list'
                    },
                    {
                        primaryText: "回款",
                        originUrl: '/bill/payment',
                        type: 'vue',
                        menuCode: 'pay_payment_page',
                    },
                    {
                        primaryText: "应收",
                        originUrl: '/bill/income',
                        type: 'vue',
                        menuCode: 'pay_income_page',
                    },
                    {
                        primaryText: "结算单",
                        originUrl: '/bill/settlement-list',
                        type: 'vue',
                        menuCode: 'checklist_list',
                    },
                    {
                        primaryText: "交易流水",
                        originUrl: '/bill/payrecord',
                        type: 'vue',
                        menuCode: 'pay_deal_flow_page'
                    },
                    {
						primaryText: "账款数据",
						router: '/statistical/agingaccount',
						menuCode: 'finance_explan',
					},
                    ]
                },
		]
	}

]
