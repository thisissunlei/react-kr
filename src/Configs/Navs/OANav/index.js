
module.exports = [

	{
		primaryText: "人事管理",
		router: 'oa',
		originUrl: '#/oa/organization/home',
		menuItems: [
			{
				primaryText: '人事主页',
				iconName: 'icon-schema',
				iconColor: '#79859a',
				menuCode: '',
				menuItems: [
					
				]	
			}, 
			{
				primaryText: '人事资料',
				iconName: 'icon-schema',
				iconColor: '#79859a',
				menuCode: '',
				menuItems: [
					{
						primaryText: '我的卡片',
						menuCode: '',
						router: '',
					},
					{
						primaryText: '我的同事',
						menuCode: '',
						router: '',
					},
				]	
			}, 
			{
				primaryText: '人员管理',
				iconName: 'icon-administrator',
				menuCode: 'hrmresourceadmin',
				iconColor: '#79859a',
				menuItems: [
					{
						primaryText: '人员列表',
						menuCode: 'hrm_resourcesList_incumbency',
						router: '/oa/personalManage/peopleState',
						
					}
				]
			}, 
			
			{
				primaryText: '基础配置',
				iconName: 'icon-basis',
				menuCode: 'hrmbasedataadmin',
				iconColor: '#79859a',
				menuItems: [
					{
						primaryText: '机构设置',
						menuCode: 'hrm_dim_list',
						router: '/oa/organization/home',
					},
					{
						primaryText: '职务类型',
						menuCode: 'hrm_job_type_list',
						router: '/oa/basicConfig/postType',
					},
					{
						primaryText: '职务列表',
						menuCode: 'hrm_job_list',
						router: '/oa/basicConfig/postList',
					},
					{
						primaryText: '职级列表',
						menuCode: 'hrm_job_level_list',
						router: '/oa/basicConfig/rankList',
					},
					{
						primaryText: '角色列表',
						menuCode: 'hrm_role_list',
						router: '/oa/organizationPower/role',
					},
					{
						primaryText: '机构分权',
						menuCode: 'hrm_org_auth_list',
						router: '/oa/organizationPower/orgList',
					},
				]
			},
			{
				primaryText: '流程管理',
				iconName: 'icon-administrator',
				menuCode: 'hrmresourceadmin',
				iconColor: '#79859a',
				menuItems: [
					{
						primaryText: '新办事宜',
						menuCode: 'hrm_resourcesList_incumbency',
						router: '/oa/processManage/dealNewThings',
					},
					{
						primaryText: '流程配置',
						menuCode: 'hrm_resourcesList_incumbency',
						router: '/oa/processManage/processSetting',
					},
				]
			}, 
			
			]
	}
]
