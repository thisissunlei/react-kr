
module.exports = [

	{
		primaryText: "OA办公",
		//menuCode: 'oa',
		router: 'oa',
		//originUrl: '/krspace_oa_web/hrm/hrmResource/toHrmResourceListActive?mid=45',
		menuItems: [
			{
				primaryText: '机构维度',
				iconName: 'icon-schema',
				iconColor: '#79859a',
				menuItems: [
					{
						primaryText: '机构维度',
						menuCode: 'sso_userList_base',
						router: '/oa/home',
					}
				]
				
			}, 
			{
				primaryText: '组织架构',
				menuCode: 'hrmOrganization',
				iconName: 'icon-schema',
				iconColor: '#79859a',
				router: 'hrmOrganization',
				menuItems: [
					{
						primaryText: '架构列表',
						menuCode: 'oa_hrm_organization',
						router: 'oa_sysparamadmin',
						originUrl: '/krspace_oa_web/hrm/hrmOrganization/main?mid=40'
					}
				]
				
			}, 
			{
				primaryText: '基础配置',
				menuCode: 'hrmbasedataadmin',
				iconName: 'icon-basis',
				iconColor: '#79859a',
				iconColor: '#79859a',
				router: 'hrmbasedataadmin',
				menuItems: [
					{
						primaryText: '参数配置',
						menuCode: 'oa_param_set',
						router: 'oa_sysparamadmin',
						originUrl: '/krspace_oa_web/sys/sysParam/toSysParamList?mid=30'
					}, 
					{
						primaryText: '职务类型',
						menuCode: 'oa_dictjob_type',
						router: 'dictJobType',
						originUrl: '/krspace_oa_web/dict/dictJobType/toDictJobTypeList?mid=38'
					}, 
					{
						primaryText: '职务管理',
						menuCode: 'oa_dictjob_list',
						router: 'dictJob',
						originUrl: '/krspace_oa_web/dict/dictJob/toDictJobList?mid=37'
					}, 
					{
						primaryText: '职级管理',
						menuCode: 'oa_dictjoblevellist',
						router: 'dictJobLevel',
						originUrl: '/krspace_oa_web/dict/dictJobLevel/toEDictJobLevelList?mid=39'
					},

				]
			}, 
			{
				primaryText: '人员管理',
				iconName: 'icon-administrator',
				iconColor: '#79859a',

				iconColor: '#79859a',
				menuCode: 'hrmresourceadmin',
				router: 'hrmresourceadmin',
				menuItems: [
					{
						primaryText: '在职列表',
<<<<<<< HEAD
						menuCode: 'hrmOrganization',
						router: 'oa/personalManage',
					},]
			},]
=======
						menuCode: 'oa_hrm_resourceActive_base',
						router: 'hrmresourcelistactive',
						originUrl: '/krspace_oa_web/hrm/hrmResource/toHrmResourceListActive?mid=45'
					}, 
					{
						primaryText: '离职列表',
						menuCode: 'oa_hrm_resourceLeave_base',
						router: 'hrmresourcelistleave',
						originUrl: '/krspace_oa_web/hrm/hrmResource/toHrmResourceListLeave?mid=55'
					}, ]
			}, 
			
			]
>>>>>>> 189333e464bbe548416f57bda2ba5c09dba7bf1b
	}
]
