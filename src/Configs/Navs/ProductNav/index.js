
module.exports = [
	{
		primaryText: "产品商品",
		router: 'product',
		originUrl: '#/product/statistical/index',
		menuItems: [ 
			{
				primaryText: '产品商品',
				iconName: 'icon-donething',
				iconColor: '#79859a',
				router:'index',
				menuItems: [
					{

						primaryText: '社区',
						menuCode: 'oper_cmt_communityList_base',
						router: '/product/communityAllocation/communityList'
					},
					{
						primaryText: '社区平面图',
						menuCode: 'oper_cmt_graph_base',
						otherRouter:['/communityPlanMap'],
						router: '/product/communityAllocation/communityPlanList'
					},
					{
						primaryText: '空间',
						menuCode: 'oper_cmt_spaceList_base',
						otherRouter:['communityMeetingRoomDetail','/operation/communityAllocation/communityMeetingRoom'],
						router: '/product/communityAllocation/CommunityMeetingRoom'
					},
					{
						primaryText: '工位',
						menuCode: 'oper_cmt_stationList_base',
						otherRouter:['communityStationDetail'],

						router: '/product/communityAllocation/communityStation'
					},
					{
                        primaryText: "每日库存查询",
                        originUrl: '/inventory/daily-inventory',
                        type: 'vue',
                        menuCode: 'myCard',
					},
					{
                        primaryText: "可租商品查询",
                        originUrl: '/inventory/optional-inventory',
                        type: 'vue',
                        menuCode: 'myCard',
                    },
					{
						primaryText: '注册地址',
						menuCode: 'cmt_registerAddress_list',
						router: '/product/communityAllocation/registeredAddress'
					},
					{
						primaryText: "我方合同主体",
						menuCode: 'lessor_management_base',
						router: '/product/customerManage/lessorManage',
					},
					{
						primaryText: '库存平面图',
						menuCode: 'cmt_run',
						router: '/product/communityManage/detail',
					},
					{
						primaryText: '销控',
						menuCode: 'cmt_sell_control',
						router: '/product/communityManage/controlTable',
					},
					{
						primaryText: "招商数据",
						router: '/product/statistical/index',
						menuCode: 'stat_group',
					},
					{
						primaryText: '会议室设备配置',
		                menuCode: 'oper_cmt_deviceList_base',
		                router: '/product/communityAllocation/equipmentList'
					},
					
				]	
			}, 
		]
	}
]
