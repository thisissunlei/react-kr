module.exports = [
	
	{
		primaryText: "财法管理",
		router: 'finance',
		menuItems: [
			{
				primaryText: "财法主页",
				router: 'manage',
				iconName: 'icon-money',
				iconColor: '#79859a',
				menuItems: [
					
				]
			},
			{
				primaryText: "财务管理",
				router: 'manage',
				iconName: 'icon-money',
				iconColor: '#79859a',
				menuItems: [
					{
						primaryText: "审核列表",
						router: '/finance/manage/audit/auditlist',
						menuCode: 'fina_verify_page'
					},
					{
						primaryText: "账单列表",
						router: '/finance/manage/orderbill/orderList',
						menuCode: 'fina_account_list'
					},
					{
						primaryText: '凭证列表',
			            router: '/operation/voucherManage/voucherList',
			            menuCode: 'upload_evidence_base',
					},
					
				]
			},
			{
				primaryText: "基础配置",
				router: 'manage',
				iconName: 'icon-money',
				iconColor: '#79859a',
				menuItems: [
					{
						primaryText: "款项配置",
						router: '/finance/manage/fundSetting/totalFund',
						menuCode: 'fina_category_1stPage'
					}, 
				]
			},
		]
	}

]
