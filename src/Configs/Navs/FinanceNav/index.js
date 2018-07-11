module.exports = [

	{
		primaryText: "账单财务",
        menuCode: 'bill',
		menuItems: [
			{
                primaryText: "账单财务",
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
                        primaryText: "审核列表(老数据)",
                        router: '/finance/manage/audit/auditlist',
                        menuCode: 'fina_verify_page'
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
                    {
                        primaryText: "财务端",
                        originUrl: '/bill/make-invoice',
                        type: 'vue',
                        menuCode: 'invoice_finance'
                    },
                    {
                        primaryText: "运营端",
                        originUrl: '/inventory/make-invoice',
                        type: 'vue',
                        menuCode: 'invoice_operation'
                    },
                    {
                        primaryText: "增票资质",
                        originUrl: '/bill/financial-invoice',
                        type: 'vue',
                        menuCode: 'qualification'
                    },
                    {
                        primaryText: "客户资金转移",
                        type: 'vue',
                        originUrl: '/order-center/apply-manage/_transferOperate',
                        menuCode: 'wallet_transfer',
                    }
                    ]
                },
		]
	}

]
