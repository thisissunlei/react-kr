module.exports = [

	{
		primaryText: "基础管理",
		router: 'permission',
		menuItems: [
			{
				primaryText: "基础主页",
				iconName: 'icon-wendang',
				iconColor: '#79859a',
				router: '',
				menuItems: [
				]
			},
			{
				primaryText: "账户管理",
				iconName: 'icon-accountAdmin',
				iconColor: '#79859a',
				router: 'accountManage',
				menuItems: [{
					primaryText: '账户列表',
					router: '/permission/accountManage/accountList',
					menuCode: 'sso_userList_base',
				},
				]
			},
			
			{
				primaryText: "权限管理",
				iconName: 'icon-permissions',
				iconColor: '#79859a',
				router: 'permission/user',
				menuItems: [{
					primaryText: '角色列表',
					router: '/permission/user',
					menuCode: 'sso_roleList_base',
				},{
					primaryText: '操作项',
					router: '/permission/operations',
					menuCode: 'sso_resource_base',
				},
				{
					primaryText: '业务代码',
					router: '/permission/opCode',
					menuCode: 'sso_businessCode_base',
				},{
					primaryText: '菜单配置',
					router: '/permission/menuSetting',
					menuCode: 'sso_module_list',
				}]
			},
			{
				primaryText: "日志管理",
				iconName: 'icon-theLog',
				iconColor: '#79859a',
				router: 'permission/systemManage',
				menuItems: [
				{
					primaryText: '操作日志',
					router: '/permission/accountManage/operationsLogs',
					menuCode: 'sso_actionLog_base',
				},
				{
					primaryText: '消息日志',
					router: '/permission/systemManage/messageList',
					menuCode: 'sso_infoList_base',
				},{
					primaryText: '登录日志',
					router: '/permission/loginLog',
					menuCode: 'sso_loginLog_base',
				}]
			},
			{
				primaryText: "系统管理",
				iconName: 'icon-systems',
				iconColor: '#79859a',
				router: 'permission/systemManage',
				menuItems: [
					{
					primaryText: 'APP版本',
					router: '/permission/systemManage/appLoginLogs',
					menuCode: 'sso_appVersion_base',
				},
				{
					primaryText: 'PC版本',
					router: '/permission/systemManage/update-log',
					menuCode: 'op_ver',
				},
				]
			},
			{
				primaryText: "同步中心",
				iconName: 'icon-wendang',
				iconColor: '#79859a',
				router: 'permission/Synchronization',
				menuItems: [
					{
						primaryText: '同步主体',
						router: '/permission/Synchronization/main',
						menuCode: 'sync_main_part',
					},
					{
						primaryText: '同步系统',
						router: '/permission/Synchronization/system',
						menuCode: 'sync_system',
					},
					{
						primaryText: '系统订阅',
						router: '/permission/Synchronization/content',
						menuCode: 'sync_main_system',
					},
					{
						primaryText: '日志列表',
						router: '/permission/Synchronization/journal/main/system',
						menuCode: 'sync_log',
					},
				]
			},{
				primaryText: "流程管理",
				iconName: 'icon-process',
				menuCode: 'hrmresourceadmin',
				iconColor: '#79859a',
				menuItems: [
					{
						primaryText: '流程列表',
						menuCode: 'hrm_resourcesList_incumbency',
						router: '/permission/processManage/processSetting',
					},
					{
						primaryText: '慧正流程',
						menuCode: 'hrm_resourcesList_incumbency',
						originUrl:'/hz7rest/horizon/module/flash/flow/designer.wf',
						target:'_blank'
					},
					{
						primaryText: 'SQL模版',
						menuCode: 'hrm_resourcesList_incumbency',
						router: '/permission/processManage/sqlModel',
					},
				]
			},

			{
				primaryText: "知识中心",
				iconName: 'icon-knowledge',
				iconColor: '#79859a',
				router: '',
				menuItems: [
					{
						primaryText: '来源系统',
						menuCode: 'doc_source',
						router: 'docSourceServiceAdmin',
						originUrl: '/krspace_oa_web/doc/docSourceService/toDocSourceServiceList?mid=59'
					},
					{
						primaryText: '文件类型',
						menuCode: 'oa_docfile_type',
						router: 'docFiletypeAdmin',
						originUrl: '/krspace_oa_web/doc/docFiletype/toDocFiletypeList?mid=56'
					},
					{
						primaryText: '文件范围',
						menuCode: 'oa_docfilerange',
						router: 'docFileRangeAdmin',
						originUrl: '/krspace_oa_web/doc/docFileRange/toDocFileRangeList?mid=57'
					},
					{
						primaryText: '文档设置',
						menuCode: 'oa_doctype',
						router: 'docFileAdmin',
						originUrl: '/krspace_oa_web/doc/docFile/toDocTypeList?mid=67'
					},

				]
			},
			{
				primaryText: '首页配置',
				iconName: 'icon-home-setting',
				menuCode: 'hrmbasedataadmin',
				iconColor: '#79859a',
				menuItems: [
					{
						primaryText: '轮播图列表',
						menuCode: 'sys_dynamic_list',
						router: '/permission/homePageSetting/swperList',
					},
					{
						primaryText: '最新动态列表',
						menuCode: 'sys_slider_list',
						router: '/permission/homePageSetting/dynamicsList',
					}
				]
			},

		]
	}

]
