
module.exports = [
	{
		primaryText: "客户会员",
		router: 'operation',
		originUrl: '#/operation/customerManage/customerList',
		menuCode:'order',
		menuItems: [
			{
				primaryText: '客户',
				iconName: 'icon-donething',
				iconColor: '#79859a',
				menuItems: [
					{
						primaryText: '客户线索',
						router: '/operation/customerManage/customerList',
						menuCode: 'oper_csr_base',
					},
					{
                        primaryText: '客户账户',
                        originUrl: 'bill/customerAssets',
                        type:'vue',
                        menuCode: 'customer_assets'
                    },
                    {
						primaryText: "客户管理员",
						originUrl: '/member/setting-manager',
						type:'vue',
						menuCode: 'fina_manager_setting_page'
					},
                    {
						primaryText: "客户门禁权限",
						router: '/member/memberManage/doormanage',
						menuCode: 'door_base',
					},
				]	
			}, 
			{
				primaryText: '会员',
				iconName: 'icon-donething',
				iconColor: '#79859a',
				menuItems: [
					{
						primaryText: '工作人员',
						menuCode: 'hrm_resourcesList_incumbency',
						router: '/oa/personalManage/peopleState',

					},
					{
						primaryText: "会员",
						router: '/member/memberManage/list',
						menuCode: 'mbr_list_base',
					},
					{
						primaryText: "会员卡",
						router: '/member/membermanage/cardmanage',
						menuCode: 'mbr_card_base',
					},
					{
						primaryText: '会员APP禁言',
						menuCode: 'oper_cluster_base',
						router: '/operation/communityAllocation/appmanage'
					},
				]	
			}, 
		]
	}
]
