module.exports = [

	{
		primaryText: "运营管理",
		router: 'operation',
		originUrl: '#/operation/customerManage/customerList',
		menuItems: [
			{
				primaryText: "运营主页",
				iconName: 'icon-user',
				iconColor: '#79859a',
				router: '',
				menuItems: [
					
				]
			},
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
				primaryText: '会员管理',
				iconName: 'icon-vip',
				iconColor: '#79859a',
				router: '/member/memberManage/list',
				menuItems: [
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
				]
			},
			{
				primaryText: '社区经营',
				iconName: 'icon-com',
				iconColor: '#79859a',
				router: 'community',
				menuItems: [
					{
						primaryText: '计划表',
						menuCode: 'cmt_run',
						router: '/community/communityManage/detail',
					},
					{
						primaryText: '销控表',
						menuCode: 'cmt_sell_control',
						router: '/community/communityManage/controlTable',
					},
					{
						primaryText: '催款表',
						menuCode: 'payment_reminder',
						router: '/community/paymentremindtable',
					},
					{
						primaryText: '预约参观',
						menuCode: 'com_sys_visitList_base',
						router: '/community/communityManage/visitorsToRecord'
					},
					{
						primaryText: '访客登记',
						menuCode: 'visitRecord',
						router: '/community/visitor/list'
						
					},
					{
						primaryText: '支持列表',
						menuCode: 'mobile_question_base',
						router: '/community/communityManage/holdList'
					},
					{
						primaryText: '空间预订',
						menuCode: 'oper_appointment_base',
						router: '/community/communityManage/allAppointment'
					},
				]
			},
			{
				primaryText: '数据统计',
				iconName: 'icon-com',
				iconColor: '#79859a',
				router: 'statistical',
				menuItems: [
					{
						primaryText: "集团经营",
						router: '/statistical/index',
						menuCode: 'stat_group',
					},
					{
						primaryText: "账龄统计",
						router: '/statistical/agingaccount',
						menuCode: 'finance_explan',
					},
					{
						primaryText: "客户分析",
						router: '/statistical/dataReport',
						menuCode: 'stat_csr_sourceStat_base',
					},
				]
			},
			{
				primaryText: 'APP管理',
				iconName: 'icon-com',
				iconColor: '#79859a',
				menuItems: [
					{
						primaryText: '我的地点',
						menuCode: 'communityNotice',
						router: '/operation/communityAllocation/myaddress'
					},
					{
						primaryText: '社群管理',
						menuCode: 'oper_cluster_base',
						router: '/operation/communityAllocation/appmanage'
					},
					{
						primaryText: '公告管理',
						menuCode: 'oper_notice_base',
						router: '/operation/communityAllocation/noticemanage'
					},
					{
						primaryText: '积分管理',
						menuCode: 'oper_integration_base',
						router: '/operation/communityAllocation/integration'
					},
				]
			},
			{
				primaryText: '官网管理',
				iconName: 'icon-com',
				iconColor: '#79859a',
				router: 'activity',
				menuItems: [
					{
						primaryText: '活动列表',
						menuCode: 'main_acitvity',
						router: '/WebBackstage/activity/list',
					},{
						primaryText: '新闻列表',
						menuCode: 'main_news',
						router: '/WebBackstage/news/list',
					},
					{
						primaryText: '社区配置',
						menuCode: 'krspace_cmt',
						router: '/WebBackstage/communityAllocation',
					}
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
					
				]
			},
			{
				primaryText: '硬件平台',
				iconName: 'icon-com',
				iconColor: '#79859a',
				menuItems: [
					{
						primaryText: "门禁授权",
						router: '/member/memberManage/doormanage',
						menuCode: 'door_base',
					},
					{
						primaryText: '设备定义',
						menuCode: 'sysDeviceDefinitionList',
						router: '/operation/basicconfig/equipmentdefinition'
					},
					
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
						primaryText: "客户来源",
						menuCode: 'oper_csr_sourceList_base',
						router: '/operation/customerManage/customerSource',
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
					
				]
			},
			
		]
	}

]
