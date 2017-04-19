module.exports = [
	
	{
		primaryText: "财务系统",
		router: 'finance',
		menuCode: 'finance',
		menuItems: [
			{
				primaryText: "财务管理",
				router: 'manage',
				iconName: 'icon-money',
				iconColor: '#79859a',
				menuCode: 'financeManage',
				menuItems: [
					{
						primaryText: "账单列表",
						router: '/finance/manage/orderbill/orderList',
						menuCode: 'billList'
					}, 
					{
						primaryText: "科目配置",
						router: '/finance/manage/codeSetting/subject',
						menuCode: 'finaflowAccount'
					}, 
					{
						primaryText: "属性配置",
						router: '/finance/manage/codeSetting/attribute',
						menuCode: 'propManage'
					}, 
					{
						primaryText: "款项配置",
						router: '/finance/manage/fundSetting/totalFund',
						menuCode: 'categorycode'
					}, 
					{
						primaryText: "审核列表",
						router: '/finance/manage/audit/auditlist',
						menuCode: 'verfiycode'
					}
				]
			}
		]
	}

]
