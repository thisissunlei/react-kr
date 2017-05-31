module.exports = [

	{
		primaryText: "知识中心",
		menuCode: 'krspace_knowledge',
		router: 'document',
		originUrl: '/krspace_knowledge_web/doc/docFile/toDocTypeList?mid=67',
		menuItems: [
			{
				primaryText: '系统管理',
				iconName: 'icon-system',
				iconColor: '#79859a',
				menuCode: 'sysadmin',
				router: 'sysadmin',
				menuItems: [
					{
						primaryText: '参数配置',
						menuCode: 'sysparamadmin',
						router: 'sysparamadmin',
						originUrl: '/krspace_knowledge_web/sys/sysParam/toSysParamList?mid=50'
					}, 
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
					}, ]
			}, 
			{
				primaryText: '文档管理',
				iconName: 'icon-file',
				iconColor: '#79859a',
				menuCode: 'docadmin',
				router: 'docadmin',
				menuItems: [
					{
						primaryText: '来源系统',
						menuCode: 'docSourceServiceAdmin',
						router: 'docSourceServiceAdmin',
						originUrl: '/krspace_knowledge_web/doc/docSourceService/toDocSourceServiceList?mid=59'
					}, 
					{
						primaryText: '文档设置',
						menuCode: 'docFileAdmin',
						router: 'docFileAdmin',
						originUrl: '/krspace_knowledge_web/doc/docFile/toDocTypeList?mid=67'
					},

				]
			}, ]
	}
]
