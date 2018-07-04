
module.exports = [
	{
		primaryText: "客户会员",
		menuCode: 'bill',
		menuItems: [
			{
				primaryText: '客户',
				iconName: 'icon-customers',
				iconColor: '#79859a',
				type: 'vue',
				menuItems: [
					{
                        primaryText: '客户账户',
                        originUrl: '/bill/customerAssets',
                        type: 'vue',
                        menuCode: 'customer_assets'
					},
					{
                        primaryText: '客户管理',
                        originUrl: '/customer-manage/manage',
                        type: 'vue',
                        menuCode: 'customer_center'
                    },
                    {
						primaryText: "客户管理员",
						originUrl: '/member/setting-manager',
						type:'vue',
						menuCode: 'fina_manager_setting_page'
					},
                    {
						primaryText: "客户门禁权限",
						router: '/user/memberManage/doormanage',
						menuCode: 'door_base',
					},
					{
						primaryText: '客户线索',
						router: '/user/customerManage/customerList',
						menuCode: 'oper_csr_base',
					},
					{
						primaryText: '协助客户授权',
						router: 'accredit',
						type:'member',
						menuCode: 'op_admin_auth'
                    },
				]	
			}, 
			{
				primaryText: '会员',
				iconName: 'icon-members',
				iconColor: '#79859a',
				menuItems: [
					
					{
						primaryText: "会员",
						router: '/user/memberManage/list',
						otherRouter : ['/user/memberdoormanage/'],
						menuCode: 'mbr_list_base',
					},
					{
						primaryText: "会员卡",
						router: '/user/membermanage/cardmanage',
						menuCode: 'mbr_card_base',
					},
					{
						primaryText: '会员门禁权限组',
						menuCode: 'auth_user_group_list',
						router: '/doorpermission/doorgroupmanage',
					},
					{
						primaryText: '会员APP禁言',
						menuCode: 'oper_cluster_base',
						router: '/user/communityAllocation/appmanage'
					},
					{
						primaryText: '工作人员',
						menuCode: 'hrm_resourcesList_incumbency',
						router: '/user/personalManage/peopleState',

					},
					{
						primaryText: '工作人员职务',
						menuCode: 'hrm_job_list',
						router: '/user/basicConfig/postList',
					},
				]	
			}, 
		]
	}
]
