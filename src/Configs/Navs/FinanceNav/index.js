module.exports = [
	
	{
		primaryText: "财务系统",
		router: 'finance',
		menuItems: [
			{
				primaryText: "财务管理",
				router: 'manage',
				iconName: 'icon-money',
				iconColor: '#79859a',
				menuItems: [
					{
						primaryText: "账单列表",
						router: '/finance/manage/orderbill/orderList',
						menuCode: 'billList'
					},
					{
						primaryText: "款项配置",
						router: '/finance/manage/fundSetting/totalFund',
						menuCode: 'fina_category_1stPage'
					}, 
					{
						primaryText: "审核列表",
						router: '/finance/manage/audit/auditlist',
						menuCode: 'fina_verify_page'
					}
				]
			}
		]
	}

]
