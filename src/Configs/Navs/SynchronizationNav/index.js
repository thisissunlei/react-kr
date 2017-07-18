module.exports = [

	{
		primaryText: "同步中心",
		router: 'Synchronization',
		originUrl: '#/Synchronization/system',
		menuItems: [
			{
				primaryText: "同步中心",
				iconName: 'icon-user',
				iconColor: '#79859a',
				router: 'Synchronization',
				menuItems: [
					{
						primaryText: '同步主体',
						router: '/Synchronization/main',
						menuCode: 'oper_csr_base',
					},
					{
						primaryText: '同步系统',
						router: '/Synchronization/system',
						menuCode: 'contract_list_base',
					},
					{
						primaryText: '系统订阅',
						router: '/Synchronization/content',
						menuCode: 'oper_csr_marketList_base',
					},
					{
						primaryText: '日志列表',
						router: '/Synchronization/journal/main/system',
						menuCode: 'oper_csr_marketList_base',
					},
				]
			},
		]
	}		

]
