/*
 *
 * 导航字典
 *
 */

module.exports = {

	current_parent:'',
	current_child:'',
	current_router:'',
	current_items:[
		{
			primaryText:"权限管理",
			router:'order',
			menuItems:[],
		},
	],
	items:[
		{
			primaryText:"首页",
			router:'index',
			menuCode:'index',
		},
		{
			primaryText:"运营平台",
			router:'operation',
			menuItems:[
				{
					primaryText:"社区管理",
					router:'communityManage',
					menuItems:[
						{
							primaryText:'基本信息',
							router:'/operation/communityManage/detail',
						},
					]
				},
				
				
				{
					primaryText:"客户管理",
					router:'customerManage',
					menuItems:[
						{
							primaryText:'查看客户订单',
							router:'/operation/customerManage/108/order/3/detail',
						},
						{
							primaryText:'新增客户订单',
							router:'/operation/customerManage/108/order/create',
						},
						{
							primaryText:'编辑客户订单',
							router:'/operation/customerManage/108/order/49/edit',
						},


					]
				},
				
				
				{
					primaryText:"社区配置",
					router:'',
					menuItems:[
						{
							primaryText:'社区列表',
							router:'',
						},
						{
							primaryText:'会议室列表',
							router:'',
						},
						{
							primaryText:'设备列表',
							router:'',
						},
						{
							primaryText:'工位列表',
							router:'',
						},
						{
							primaryText:'平面图配置',
							router:'',
						}


					]
				},

				{
					primaryText:"基础配置",
					router:'',
					menuItems:[
						{
							primaryText:'参数配置',
							router:'',
						},
						{
							primaryText:'代码分类',
							router:'',
						},
						{
							primaryText:'商圈列表',
							router:'',
						},
						{
							primaryText:'设备定义',
							router:'',
						}


					]
				},
				{
					primaryText:"合同信息",
					menuItems:[
						{
							primaryText:"出租方管理",
							router:'/operation/customerManage/agreement/lessorManage/list',
						},
						{
							primaryText:"基础配置",
							router:'/operation/customerManage/agreement/setting/list',
						},
					]
				},
				{
					primaryText:"财务管理",
					rightIcon:"",
					leftIcon:"",
					insetChildren:true,
					router:'finance',
					menuItems:[
						{
							primaryText:"订单账单",
							router:'/operation/finance/orderbill/orderList',
						},
						/*
						
						{
							primaryText:"订单明细账",
							router:'/operation/finance/orderbill/detail',
						},
						*/
						{
							primaryText:"科目配置",
							router:'/operation/finance/codeSetting/subject',
						},
						{
							primaryText:"属性配置",
							router:'/operation/finance/codeSetting/attribute',
						},
						/*
						{
							primaryText:"开票列表",
							router:'/operation/finance/invoice/list',
						}
						*/
					]
				},

			]
		},
		{
			primaryText:"会员中心",
			router:'member',
			menuItems:[
				{
					primaryText:'会员管理',
					router:'',
				}
			]
		},
		{
			primaryText:"商品零售",
			router:'retail',
			menuItems:[
				{
					primaryText:'零售看板',
					router:'',
				},
				{
					primaryText:'商品管理',
					router:'',
					menuItems:[
						{
							primaryText:'商品品牌',
							router:'',	
						},
						{
							primaryText:'商品类别',
							router:'',	
						},
						{
							primaryText:'中心商品',
							router:'',	
						},
						{
							primaryText:'社区商品',
							router:'',	
						},

					]
				},
				{
					primaryText:'订单管理',
					router:'',
					menuItems:[
						{
							primaryText:'全部订单',
							router:'',	
						},
						{
							primaryText:'社区订单',
							router:'',	
						}

					]
				},
				{
					primaryText:'系统信息',
					router:'',
					menuItems:[
						{
							primaryText:'反馈信息',
							router:'',	
						},
						{
							primaryText:'推送人员',
							router:'',	
						},
						{
							primaryText:'系统社区',
							router:'',	
						},
						{
							primaryText:'参数配置',
							router:'',	
						},

					]
				}
			]
		},
		{
			primaryText:"OA办公",
			router:'oa',
			menuItems:[
				{
					primaryText:'组织架构',
					router:'',	
				},
				{
					primaryText:'基础配置',
					router:'',	
					menuItems:[
						{
							primaryText:'参数配置',
							router:'',	
						},
						{
							primaryText:'职务类型',
							router:'',	
						},
						{
							primaryText:'职务管理',
							router:'',	
						},
						{
							primaryText:'职级管理',
							router:'',	
						},

					]
				},
				{
					primaryText:'人员管理',
					router:'',
					menuItems:[
						{
							primaryText:'在职列表',
							router:'',	
						},
						{
							primaryText:'离职列表',
							router:'',	
						},
					]	
				},
			]
		},
		{
			primaryText:"知识中心",
			router:'document',
			menuItems:[
				{
					primaryText:'系统管理',
					router:'',	
				},
				{
					primaryText:'文档管理',
					router:'',	
				},
			]	
		},
		{
			primaryText:"权限管理",
			router:'permission',
			menuItems:[
				{
					primaryText:'系统管理',
					router:'',
					menuItems:[
						{
							primaryText:'参数配置',
							router:'',	
						},
						{
							primaryText:'系统新闻',
							router:'',	
						},
						{
							primaryText:'系统缓存',
							router:'',	
						},
						{
							primaryText:'待办事项',
							router:'',	
						},
						,
						{
							primaryText:'常用列表',
							router:'',	
						},
						{
							primaryText:'系统日常',
							router:'',	
						},

					]

				},
				{
					primaryText:'权限管理',
					router:'',
					menuItems:[
						{
							primaryText:'未注册列表',
							router:'',	
						},
						{
							primaryText:'注册管理',
							router:'',	
						},
						{
							primaryText:'权限类型',
							router:'',	
						},
						{
							primaryText:'权限项列表',
							router:'',	
						},
						,
						{
							primaryText:'角色类型',
							router:'',	
						},
						{
							primaryText:'功能角色',
							router:'',	
						},
						{
							primaryText:'菜单管理',
							router:'',	
						},

					]	
				},
				{
					primaryText:'账户管理',
					router:'',
					menuItems:[
						{
							primaryText:'账户列表',
							router:'',	
						},
						{
							primaryText:'变更日志',
							router:'',	
						},
						{
							primaryText:'登录日志',
							router:'',	
						},

					]	
				},
				{
					primaryText:'单点管理',
					router:'',	
					menuItems:[
						{
							primaryText:'单点服务',
							router:'',	
						},
						{
							primaryText:'单点日志',
							router:'',	
						},
					]
				},
				{
					primaryText:'系统监控',
					router:'',
					menuItems:[
						{
							primaryText:'用户监测',
							router:'',	
						},
					]	
				},
			]	
		},
	]
}
