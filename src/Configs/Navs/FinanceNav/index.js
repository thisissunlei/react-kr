module.exports = [

	{
		primaryText: "账单财务",
		router: 'finance',
		menuItems: [
			{
                primaryText: "账单中心",
                iconName: 'icon-money',
                iconColor: '#79859a',
                type: 'vue',
                menuItems: [
                // 少账单老数据,账款数据
                    {
                        primaryText: "已出账单管理",
                        router: 'bill/list',
                        type: 'vue',
                        menuCode: 'pay_created_bill_page',
                    },
                    {
                        primaryText: "回款管理",
                        router: 'bill/payment',
                        type: 'vue',
                        menuCode: 'pay_payment_page',
                    },
                    {
                        primaryText: "应收管理",
                        router: 'bill/income',
                        type: 'vue',
                        menuCode: 'pay_income_page',
                    },
                    {
                        primaryText: "结算单管理",
                        router: 'bill/settlement-list',
                        type: 'vue',
                        menuCode: 'checklist_list',
                    },
                    {
                        primaryText: "交易流水",
                        router: 'bill/payrecord',
                        type: 'vue',
                        menuCode: 'pay_deal_flow_page'
                    },
                    {
                        primaryText: '客户账户中心',
                        router: 'bill/customerAssets',
                        type:'vue',
                        menuCode: 'customer_assets'
                    }
                    ]
                },
			// {
			// 	primaryText: "财务管理",
			// 	router: 'manage',
			// 	iconName: 'icon-money',
			// 	iconColor: '#79859a',
			// 	menuItems: [
			// 		{
			// 			primaryText: "审核列表",
			// 			router: '/finance/manage/audit/auditlist',
			// 			menuCode: 'fina_verify_page'
			// 		},
			// 		{
			// 			primaryText: "账单列表",
			// 			router: '/finance/manage/orderbill/orderList',
			// 			menuCode: 'fina_account_list'
			// 		},
			// 		{
			// 			primaryText: '凭证列表',
			// 			router: '/finance/voucherManage/voucherList',
			// 			menuCode: 'upload_evidence_base',
			// 		},
			// 		{
			// 			primaryText: "同步中心",
			// 			router: '/finance/manage/sync/list',
			// 			menuCode: 'sync_cmt_ctrl'
			// 		},

			// 	]
			// },
			// {
			// 	primaryText: "基础配置",
			// 	router: 'manage',
			// 	iconName: 'icon-basis',
			// 	iconColor: '#79859a',
			// 	menuItems: [
			// 		{
			// 			primaryText: "款项配置",
			// 			router: '/finance/manage/fundSetting/totalFund',
			// 			menuCode: 'fina_category_1stPage'
			// 		},

			// 	]
			// },
		]
	}

]
