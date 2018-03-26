
module.exports = [
	{
		primaryText: "产品商品",
		menuCode:'order',
		menuItems: [ 
			{
				primaryText: '产品商品',
				iconName: 'icon-donething',
				iconColor: '#79859a',
				menuItems: [
					{
						primaryText: "招商数据",
						router: '/statistical/index',
						menuCode: 'stat_group',
					},
					{

						primaryText: '社区',
						menuCode: 'oper_cmt_communityList_base',
						router: '/operation/communityAllocation/communityList'
					},
					{
						primaryText: '空间',
						menuCode: 'oper_cmt_spaceList_base',
						router: '/operation/communityAllocation/CommunityMeetingRoom'
					},
					{
						primaryText: '会议室设备配置',
		                menuCode: 'oper_cmt_deviceList_base',
		                router: '/operation/communityAllocation/equipmentList'
					},
					{
						primaryText: '工位',
						menuCode: 'oper_cmt_stationList_base',
						router: '/operation/communityAllocation/communityStation'
					},
					{
						primaryText: '注册地址',
						menuCode: 'cmt_registerAddress_list',
						router: '/operation/communityAllocation/registeredAddress'
					},
					{
						primaryText: '社区平面图',
						menuCode: 'oper_cmt_graph_base',
						router: '/operation/communityAllocation/communityPlanList'
					},
					{
						primaryText: "客户门禁权限",
						router: '/member/memberManage/doormanage',
						menuCode: 'door_base',
					},
					{
						primaryText: "我方合同主体",
						menuCode: 'lessor_management_base',
						router: '/operation/customerManage/agreement/lessorManage/list',
					},
				]	
			}, 
		]
	}
]
