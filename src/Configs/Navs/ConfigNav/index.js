module.exports = [

	{
		primaryText: "系统配置",
		router: 'permission',
		menuItems: [
			{
				primaryText: 'APP',
				iconName: 'icon-app',
				iconColor: '#79859a',
				menuItems: [
					{
						primaryText: '产品运营主页',
						menuCode: 'mobile_app_operate_home',
						type: 'vue',
						originUrl: '/app-manage/home'
					},
					{
						primaryText: '公告',
						menuCode: 'oper_notice_base',
						router: '/operation/communityAllocation/noticemanage'
					},
					{
						primaryText: '活动',
						menuCode: 'oper_activity_base',
						router: '/operation/communityAllocation/activity'
					},
					{
						primaryText: '会员福利',
						menuCode: 'op_member_coupon_external',
						type: 'vue',
						originUrl: '/app-manage/member-welfare'
					},
					{
						primaryText: '广告',
						menuCode: 'oper_advert_base',
						router: '/operation/communityAllocation/advert'
					},
					{
						primaryText: '管家',
						menuCode: 'oper_steward_base',
						type:'vue',
						originUrl: '/app-manage/steward-setting',
					},
					{
						primaryText: '通知',
						menuCode: 'app_console_notification',
						type: 'vue',
						originUrl: '/app-manage/notification-manage'
					},
					{
						primaryText: '图标',
						menuCode: 'app_console_common_icon',
						type: 'vue',
						originUrl: '/app-manage/icon-manage'
					},
					{
						primaryText: '推送',
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
						primaryText: '登录日志',
						router: '/permission/loginLogApp',
						menuCode: 'sso_loginLog_base',
					},
					{
						primaryText: '版本更新通知',
						router: '/permission/systemManage/appLoginLogs',
						menuCode: 'sso_appVersion_base',
					},
				]
			},
			{
				primaryText: '官网',
				iconName: 'icon-website',
				iconColor: '#79859a',
				router: 'activity',
				menuItems: [

					{
						primaryText: '社区信息',
						menuCode: 'krspace_cmt',
						router: '/WebBackstage/communityAllocation',
					},
					{
						primaryText: '新闻动态',
						menuCode: 'main_news',
						router: '/WebBackstage/news/list',
					},
					{
						primaryText: '服务及设施配置',
						menuCode: 'brightpoint_label_list',
						type:'vue',
						originUrl: '/facility-tags/',
					},
                    {
                        primaryText: '关键词配置',
                        menuCode: 'sem_list',
                        router: '/WebBackstage/keyword',
                    },
                    {
                        primaryText: '计算器配置',
                        menuCode: 'cbd_list',
                        type:'vue',
                        originUrl: '/official-website/calculator',
                    },
				]
			},
			{
				primaryText: 'OP配置',
				iconName: 'icon-website',
				iconColor: '#79859a',
				menuItems: [

					{
						primaryText: "客户来源配置",
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
						primaryText: '首页轮播图配置',
						menuCode: 'sys_dynamic_list',
						router: '/permission/homePageSetting/swperList',
					},
					{
						primaryText: '首页动态配置',
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

					{
						primaryText: '角色权限',
						router: '/permission/user',
						menuCode: 'sso_roleList_base',
					},
					{
						primaryText: '其他合同角色权限',
						menuCode: 'hrm_role_list',
						router: '/oa/organizationPower/role',
					},
					{
						primaryText: '账号权限',
						router: '/permission/accountManage/accountList',
						menuCode: 'sso_userList_base',
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
					},
					{
						primaryText: '运维工具',
						menuCode: 'ops_tool_management',
						type: 'vue',
						originUrl: '/ops'
					},

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
						primaryText: '登录日志',
						router: '/permission/loginLog',
						menuCode: 'sso_loginLog_base',
					},
					{
						primaryText: '消息日志',
						router: '/permission/systemManage/messageList',
						menuCode: 'sso_infoList_base',
					},
				]
			},
			{
				primaryText: "OP合同配置",
				iconName: 'icon-theLog',
				iconColor: '#79859a',
				menuItems: [
					{
						primaryText: '表单配置',
						menuCode: 'sys_form_list',
						router: '/permission/processManage/form',
					},
					{
						primaryText: '类型配置',
						menuCode: 'wf_base_list',
						router: '/permission/processManage/processSetting',
					},
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
						primaryText: '同步日志',
						router: '/permission/Synchronization/journal/main/system',
						menuCode: 'sync_log',
					},
				]
			},
		]
	}

]
