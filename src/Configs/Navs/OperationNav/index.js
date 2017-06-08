module.exports = [

	{
		primaryText: "运营平台",
		router: 'operation',
		originUrl: '#/operation/customerManage/customerList',
		menuItems: [
			{
				primaryText: "客户管理",
				iconName: 'icon-user',
				iconColor: '#79859a',
				router: 'communityManage',
				menuItems: [
					{
						primaryText: '客户线索',
						router: '/operation/customerManage/customerList',
						menuCode: 'oper_csr_base',
					},
					{
						primaryText: '合同列表',
						router: '/operation/customerManage/agreementList',
						menuCode: 'contract_list_base',
					},
					{
						primaryText: '客户公海',
						router: '/operation/customerManage/customerHighSea',
						menuCode: 'oper_csr_marketList_base',
					},
				]
			},
			{
				primaryText: "社区配置",
				iconName: 'icon-community',
				iconColor: '#79859a',
				router: 'communityManage',
				menuCode: 'communityBaseAdmin',
				menuItems: [
					{

						primaryText: '社区列表',
						menuCode: 'oper_cmt_communityList_base',
						router: '/operation/communityAllocation/communityList'
					},
					{
						primaryText: '空间列表',
						menuCode: 'oper_cmt_spaceList_base',
						router: '/operation/communityAllocation/CommunityMeetingRoom'
					},
					{
						primaryText: '设备列表',
		                menuCode: 'oper_cmt_deviceList_base',
		                router: '/operation/communityAllocation/equipmentList'
					},
					{
						primaryText: '工位列表',
						menuCode: 'oper_cmt_stationList_base',
						router: '/operation/communityAllocation/communityStation'
					},
					
					{
						primaryText: '平面图配置',
						menuCode: 'oper_cmt_graph_base',
						router: '/operation/communityAllocation/communityPlanList'

					},
					
					{
						primaryText: '我的地点',
						menuCode: 'communityNotice',
						router: '/operation/communityAllocation/myaddress'
					}


				]
			},

			{
				primaryText: "基础配置",
				iconName: 'icon-basis',
				iconColor: '#79859a',
				router: 'BaseManage',
				menuCode: 'basic_config',
				menuItems: [
					{
						primaryText: "参数配置",
						menuCode: 'operate_sysparamadmin',
						originUrl: '/krspace_operate_web/sys/sysParam/toSysParamList?mid=60',
					},
					{
						primaryText: "合同配置",
						menuCode: 'contract_setting_base',
						router: '/operation/customerManage/agreement/setting/list',
					},
					{
						primaryText: '代码分类',
						menuCode: 'oper_cmt_codeList_base',
						router: '/operation/communityAllocation/codeClassification'
					},

					{
						primaryText: '商圈列表',
		                menuCode: 'oper_cmt_businessAreaList_base',
		                router: '/operation/basicconfig/businessList'
		            },
					{
						primaryText: "出租方管理",
						menuCode: 'lessor_management_base',
						router: '/operation/customerManage/agreement/lessorManage/list',
					},
					{
						primaryText: '设备定义',
						menuCode: 'sysDeviceDefinitionList',

						// originUrl: '/krspace_operate_web/community/sysDeviceDefinition/toSysDeviceDefinitionList?mid=105'
						router: '/operation/basicconfig/equipmentdefinition'
					},
					{

						primaryText: '分组管理',
						menuCode: 'oper_cmt_statList_base',
						router: '/operation/groupSetting'
					}
				]
			},
			{
			  primaryText: "凭证管理",
	          iconName: 'icon-wendang',
	          iconColor: '#79859a',
	          router: 'voucherManage',
	          menuCode: 'evidenceAdmin',
	          menuItems: [{
	            primaryText: '凭证列表',
	            router: '/operation/voucherManage/voucherList',
	            menuCode: 'upload_evidence_base',
	          }
	          ]
			},
		]
	}

]
