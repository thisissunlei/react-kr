
module.exports = [

	{
		primaryText: "会员中心",
		router: 'member',
		originUrl: './#/member/memberManage/list?mid=94',
		menuItems: [
			{
				primaryText: '会员管理',
				iconName: 'icon-vip',
				iconColor: '#79859a',
				router: '/member/memberManage/list',
				menuItems: [
					{
						primaryText: "会员看板",
						router: '/member/memberManage/board',
						menuCode: 'index',
					}, 
					{
						primaryText: "会员列表",
						router: '/member/memberManage/list',
						menuCode: 'mbr_list_base',
					}, 
					{
						primaryText: "会员卡管理",
						router: '/member/memberManage/card',
						menuCode: 'mbr_card_base',
					}, 
					{
						primaryText: "会员配置",
						router: '/member/memberManage/setting',
						menuCode: 'mbr_define',
					}, 
					{
						primaryText: "门禁授权管理",
						router: '/member/memberManage/doormanage',
						menuCode: 'door_base',
					},
					

				]
			}

		],

	}

]
