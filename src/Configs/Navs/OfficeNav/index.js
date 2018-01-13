
module.exports = [
	{
		primaryText: "综合办公",
		router: 'office',
		originUrl: '#/office/officeBackground/newOffice',
		menuItems: [
			{
				primaryText: "办公主页",
				router: 'office',
				iconName: 'icon-money',
				iconColor: '#79859a',
				menuItems: [
					
				]
			},
			{
				primaryText: '新办事宜',
				iconName: 'icon-newthing',
				router: 'office',
				iconColor: '#79859a',
				menuCode: 'myCard',
				menuItems: [
					{
						primaryText: '发起合同',
						menuCode: 'myCard',
						router: '/office/officeBackground/newOffice',
					},
				]	
			}, 
			{
				primaryText: '已办事宜',
				iconName: 'icon-donething',
				router: 'office',
				iconColor: '#79859a',
				menuCode: 'myCard',
				menuItems: [
					// {
					// 	primaryText: '已办列表',
					// 	menuCode: 'hrm_resourcesList_incumbency',
					// 	router: '/office/officeBackground/downOffice',
					// },
					{
						primaryText: '我发起的',
						menuCode: 'myCard',
						router: '/office/officeBackground/ownAdd',
					},
				]	
			}, 
			{
				primaryText: '合同监控',
				iconName: 'icon-donething',
				router: 'office',
				iconColor: '#79859a',
				menuCode: 'wf_contract_list',
				menuItems: [
					// {
					// 	primaryText: '已办列表',
					// 	menuCode: 'hrm_resourcesList_incumbency',
					// 	router: '/office/officeBackground/downOffice',
					// },
					{
						primaryText: '合同列表',
						menuCode: 'wf_contract_list',
						router: '/office/officeBackground/contractMonitor',
					},
					{
						primaryText: '合同扫码',
						menuCode: 'wf_contract_list',
						originUrl: '/order-center/contract-manage/contract-yard',
					}
				]	
			}, 
		]
	}
]
