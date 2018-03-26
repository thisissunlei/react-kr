module.exports = [

	{
		primaryText: "系统配置",
		router: 'permission',
		menuItems: [
			{
				primaryText: 'APP管理',
				iconName: 'icon-app',
				iconColor: '#79859a',
				menuItems: [
					{
						primaryText: '公告管理',
						menuCode: 'oper_notice_base',
						router: '/operation/communityAllocation/noticemanage'
					},
					{
						primaryText: '活动管理',
						menuCode: 'oper_activity_base',
						router: '/operation/communityAllocation/activity'
					},
					{
						primaryText: '广告管理',
						menuCode: 'oper_advert_base',
						router: '/operation/communityAllocation/advert'
					},
					{
						primaryText: '管家设置',
						menuCode: 'oper_steward_base',
						type:'vue',
						originUrl: '/app-manage/steward-setting',
					},
					{
						primaryText: '通知管理',
						menuCode: 'app_console_notification',
						type: 'vue',
						originUrl: '/app-manage/notification-manage'
					},
					{
						primaryText: 'Icon管理',
						menuCode: 'app_console_common_icon',
						type: 'vue',
						originUrl: '/app-manage/icon-manage'
					},
					{
						primaryText: '推送管理',
						menuCode: 'app_console_push',
						type: 'vue',
						originUrl: '/app-manage/push-manage'
					},
					{
						primaryText: '意见反馈',
						menuCode: 'oper_opinion_base',
						router: '/operation/communityAllocation/opinion'
					},
					{
						primaryText: '版本更新通知',
						router: '/permission/systemManage/appLoginLogs',
						menuCode: 'sso_appVersion_base',
					},
					//少登陆日志，





					// {
					// 	primaryText: '我的地点',
					// 	menuCode: 'communityNotice',
					// 	router: '/operation/communityAllocation/myaddress'
					// },
					// {
					// 	primaryText: '社群管理',
					// 	menuCode: 'oper_cluster_base',
					// 	router: '/operation/communityAllocation/appmanage'
					// },
					
					// {
					// 	primaryText: '积分管理',
					// 	menuCode: 'oper_integration_base',
					// 	router: '/operation/communityAllocation/integration'
					// },	
				]
			},
			{
				primaryText: '官网管理',
				iconName: 'icon-website',
				iconColor: '#79859a',
				router: 'activity',
				menuItems: [
					// {
					// 	primaryText: '活动列表',
					// 	menuCode: 'main_acitvity',
					// 	router: '/WebBackstage/activity/list',
					// },
					{
						primaryText: '新闻动态',
						menuCode: 'main_news',
						router: '/WebBackstage/news/list',
					},
					{
						primaryText: '社区信息',
						menuCode: 'krspace_cmt',
						router: '/WebBackstage/communityAllocation',
					},
					// 服务及设施配置
					// {
					// 	primaryText: '轮播图列表',
					// 	menuCode: 'por_mobilepic_list',
					// 	router: '/WebBackstage/picList',
					// },
					{
						primaryText: '社区设施标签',
						menuCode: 'brightpoint_label_list',
						type:'vue',
						originUrl: '/facility-tags/',
					},
				]
			},
			{
				primaryText: 'OP配置',
				iconName: 'icon-website',
				iconColor: '#79859a',
				// router: 'activity',
				menuItems: [
					{
						primaryText: "客户来源",
						menuCode: 'oper_csr_sourceList_base',
						router: '/operation/customerManage/customerSource',
					},
					{
						primaryText: '菜单配置',
						router: '/permission/menuSetting',
						menuCode: 'sso_module_list',
					},
					{
                        primaryText: '参数配置',
                        originUrl: '/basic/parameter',
                        type: 'vue',
                        menuCode: 'system_param',
                    },
                    {
						primaryText: '首页轮播图列表',
						menuCode: 'sys_dynamic_list',
						router: '/permission/homePageSetting/swperList',
					},
					{
						primaryText: '首页动态列表',
						menuCode: 'sys_slider_list',
						router: '/permission/homePageSetting/dynamicsList',
					},
					{
						primaryText: '版本更新通知',
						router: '/permission/systemManage/update-log',
						menuCode: 'op_ver',
					},
				]
			},
			{
				primaryText: 'OP权限',
				iconName: 'icon-website',
				iconColor: '#79859a',
				// router: 'activity',
				menuItems: [
					// 少其他合同角色，账号权限
					{
						primaryText: '角色权限',
						router: '/permission/user',
						menuCode: 'sso_roleList_base',
					},
					{
						primaryText: '操作项权限',
						router: '/permission/operations',
						menuCode: 'sso_resource_base',
					},
					{
						primaryText: '业务代码配置',
						router: '/permission/opCode',
						menuCode: 'sso_businessCode_base',
					}
				]
			},
			{
				primaryText: "OP日志",
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
					},
					{
						primaryText: '登录日志',
						router: '/permission/loginLog',
						menuCode: 'sso_loginLog_base',
					}
				]
			},
			{
				primaryText: "OP合同配置",
				iconName: 'icon-theLog',
				iconColor: '#79859a',
				menuItems: [
				// 少表单配置，类型配置
					{
						primaryText: '公共字典',
						menuCode: 'sys_publicDict_list',
						router:'/permission/processManage/dictionary',
					},
					{
						primaryText: 'SQL模版',
						menuCode: 'sys_sqlTemplate_list',
						router: '/permission/processManage/sqlModel',
					},
				]
			},
			{
				primaryText: "同步财务",
				iconName: 'icon-wendang',
				iconColor: '#79859a',
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
						primaryText: '日志列表',
						router: '/permission/Synchronization/journal/main/system',
						menuCode: 'sync_log',
					},
				]
			},
		]
	}

]
