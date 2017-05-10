
module.exports = [

	{
		primaryText: "会员中心",
		router: 'member',
		menuCode: 'member',
		originUrl: '#/member/memberManage/list?mid=94',
		menuItems: [
			{
				primaryText: '会员管理',
				iconName: 'icon-vip',
				iconColor: '#79859a',
				menuCode: 'memberAdmin',
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
						menuCode: 'memberList',
					}, 
					{
						primaryText: "会员卡管理",
						router: '/member/memberManage/card',
						menuCode: 'backAdmin',
					}, 
					{
						primaryText: "会员配置",
						router: '/member/memberManage/setting',
						menuCode: 'memberSetting',
					}, 
					{
						primaryText: "门禁授权管理",
						router: '/member/memberManage/doormanage',
						menuCode: 'doorPermission',
					},
					{
						primaryText: "会议室预定",
						router: '/member/memberManage/meetingReservation',
						menuCode: 'doorPermission',
					},

				]
			}

		],

	}

]
