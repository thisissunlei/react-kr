module.exports = [

	{
		primaryText: "运营平台",
		router: 'operation',
		menuCode: 'operate',
		originUrl: '#/operation/customerManage/customerList',
		menuItems: [
			{
				primaryText: "客户管理",
				iconName: 'icon-user',
				iconColor: '#79859a',
				router: 'communityManage',
				menuCode: 'coustomerInfoList',
				menuItems: [
					{
						primaryText: '客户线索',
						router: '/operation/customerManage/customerList',
						menuCode: 'coustomerInfoList',
					},
					{
						primaryText: '合同列表',
						router: '/operation/customerManage/agreementList',
						menuCode: 'contractList',
					},
					{
						primaryText: '客户公海',
						router: '/operation/customerManage/customerHighSea',
						menuCode: 'marketList',
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
						menuCode: 'communityBaseList',
						router: '/operation/communityAllocation/communityList'
					}, 
					{
						primaryText: '会议室列表',
						menuCode: 'communityBoardroomList',
						originUrl: '/operation/communityAllocation/communityMeetingRoom'
					}, 
					{
						primaryText: '设备列表',
						menuCode: 'communityDeviceList',
						originUrl: '/krspace_operate_web/community/device/toDeviceList?mid=75'

					}, 
					{
						primaryText: '工位列表',
						menuCode: 'communityStationList',
						originUrl: '/krspace_operate_web/commnuity/communityBase/toCityCommunityList?jumpType=toCommunityStation&mid=83'
					}, 
					{
						primaryText: '平面图配置',
						menuCode: 'communityFloorPlanList',
						originUrl: '/krspace_operate_web/commnuity/communityBase/toCityCommunityList?jumpType=toCommunityFloorPlan&mid=90'
					}, 
					{
						primaryText: '访客记录',
						menuCode: 'sysVisitRecordList',
						originUrl: '/krspace_operate_web/community/sysVisitRecord/toSysVisitrecordList?mid=102'
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
						menuCode: 'agreement_setting',
						router: '/operation/customerManage/agreement/setting/list',
					}, 
					{
						primaryText: '代码分类',
						menuCode: 'codeCategoryList',
						originUrl: '/krspace_operate_web/codecategory/toCodeCategoryList?mid=85'
					}, 

					{
						primaryText: '商圈列表',
						menuCode: 'businessAreaList',
						originUrl: '/krspace_operate_web/businessArea/toBusinessAreaList?mid=87'
					}, 
					{
						primaryText: "出租方管理",
						menuCode: 'lessorManage',
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
						menuCode: 'groupManage',
						router: '/operation/groupSetting'
					}
				]
			}, 
		]
	}

]
