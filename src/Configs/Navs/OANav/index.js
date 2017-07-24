
module.exports = [

	{
		primaryText: "OA办公",
		//menuCode: 'oa',
		router: 'oa',
		//originUrl: '/krspace_oa_web/hrm/hrmResource/toHrmResourceListActive?mid=45',
		originUrl: '#/oa/organization/home',
		menuItems: [
			{
				primaryText: '组织架构',
				iconName: 'icon-schema',
				iconColor: '#79859a',
				menuCode: 'hrmOrganization',
				menuItems: [
					{
						primaryText: '机构维度',
						menuCode: 'oa_hrm_organization',
						router: '/oa/organization/home',
					}
				]	
			}, 
			{
				primaryText: '人员管理',
				iconName: 'icon-administrator',
				menuCode: 'hrmresourceadmin',
				iconColor: '#79859a',
				menuItems: [
					{
						primaryText: '在职列表',
						menuCode: 'oa_hrm_resourceActive_base',
						router: 'oa/personalManage/peopleState',
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
						primaryText: '职务类型',
						menuCode: 'oa_dictjob_type',
						router: 'oa/basicConfig/postType',
					},
					{
						primaryText: '职务列表',
						menuCode: 'oa_dictjob_list',
						router: 'oa/basicConfig/postList',
					},
					{
						primaryText: '职级列表',
						menuCode: 'oa_dictjoblevellist',
						router: 'oa/basicConfig/rankList',
					}
				]
			}, 

			/*{
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
			}*/]

	}
]
