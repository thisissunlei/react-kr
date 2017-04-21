
module.exports = [

	{
		primaryText: "OA办公",
		menuCode: 'oa',
		router: 'oa',
		originUrl: '/krspace_oa_web/hrm/hrmResource/toHrmResourceListActive?mid=45',
		menuItems: [
			{
				primaryText: '组织架构',
				iconName: 'icon-schema',
				iconColor: '#79859a',

				menuCode: 'hrmOrganization',
				router: 'hrmOrganization',
				originUrl: '/krspace_oa_web/hrm/hrmOrganization/main?mid=40'
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
						menuCode: 'oa_sysparamadmin',
						router: 'oa_sysparamadmin',
						originUrl: '/krspace_oa_web/sys/sysParam/toSysParamList?mid=30'
					}, 
					{
						primaryText: '职务类型',
						menuCode: 'dictJobType',
						router: 'dictJobType',
						originUrl: '/krspace_oa_web/dict/dictJobType/toDictJobTypeList?mid=38'
					}, 
					{
						primaryText: '职务管理',
						menuCode: 'dictJob',
						router: 'dictJob',
						originUrl: '/krspace_oa_web/dict/dictJob/toDictJobList?mid=37'
					}, 
					{
						primaryText: '职级管理',
						menuCode: 'dictJobLevel',
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
						menuCode: 'hrmresourcelistactive',
						router: 'hrmresourcelistactive',
						originUrl: '/krspace_oa_web/hrm/hrmResource/toHrmResourceListActive?mid=45'
					}, 
					{
						primaryText: '离职列表',
						menuCode: 'hrmresourcelistleave',
						router: 'hrmresourcelistleave',
						originUrl: '/krspace_oa_web/hrm/hrmResource/toHrmResourceListLeave?mid=55'
					}, ]
			}, ]
	}
]
