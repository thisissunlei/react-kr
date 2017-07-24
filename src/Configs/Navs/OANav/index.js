
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
						menuCode: 'dim_list',
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
						primaryText: '人员列表',
						menuCode: 'hrm_resources_list',
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
						primaryText: '参数配置',
						menuCode: 'sysparamadmin',
						router: 'sysparamadmin',
						originUrl: '/krspace_knowledge_web/sys/sysParam/toSysParamList?mid=50'
					},
					{
						primaryText: '职务类型',
						menuCode: 'hrm_job_type_lis',
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
						primaryText: '来源系统',
						menuCode: 'docSourceServiceAdmin',
						router: 'docSourceServiceAdmin',
						originUrl: '/krspace_knowledge_web/doc/docSourceService/toDocSourceServiceList?mid=59'
					}
				]
			},
			{
				primaryText: '文档管理',
				iconName: 'icon-file',
				iconColor: '#79859a',
				menuCode: 'docadmin',
				router: 'docadmin',
				menuItems: [	 
					{
						primaryText: '文件类型',
						menuCode: 'docFiletypeAdmin',
						router: 'docFiletypeAdmin',
						originUrl: '/krspace_knowledge_web/doc/docFiletype/toDocFiletypeList?mid=56'
					}, 
					{
						primaryText: '文件范围',
						menuCode: 'docFileRangeAdmin',
						router: 'docFileRangeAdmin',
						originUrl: '/krspace_knowledge_web/doc/docFileRange/toDocFileRangeList?mid=57'
					},
					{
						primaryText: '文档设置',
						menuCode: 'docFileAdmin',
						router: 'docFileAdmin',
						originUrl: '/krspace_knowledge_web/doc/docFile/toDocTypeList?mid=67'
					},

				]
			  } 
			]
	}
]
