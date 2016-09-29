let initState = {
	navs:{
		current_route:'',
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
			},
			{
				primaryText:"运营平台",
				router:'operation',
				menuItems:[
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
								primaryText:"订单账号",
								router:'/operation/finance/orderbill/receiptList',
							},
							{
								primaryText:"科目配置",
								router:'/operation/finance/codeSetting/subject',
							},
							{
								primaryText:"属性配置",
								router:'/operation/finance/codeSetting/attribute',
							},

						]
					},

				]
			},
			/*
			{
				primaryText:"权限管理",
				router:'permission',
			},
			*/
		]
	},
	header_nav:{
		switch_value:true,
	},
	sidebar_nav:{
		switch_value:true,
	},
	bottom_nav:{
		switch_value:false,
		anchor_el:undefined
	},
	memo:{
		items:[
			{
				createAt:'2015-10-11',
				title:'出差办事',
				author:'张屈',
			},
			{
				createAt:'2016-10-01',
				title:'国庆回家',
				author:'张屈',
			},
			{
				createAt:'2015-10-01',
				title:'laal回家',
				author:'张屈',
			},
			{
				createAt:'2016-08-01',
				title:'ahahal回家',
				author:'张屈',
			},
			{
				createAt:'2016-08-27',
				title:'ahahal回家',
				author:'张屈',
			},
			{
				createAt:'2016-08-25',
				title:'氪空间重构',
				author:'张屈',
			},
			{
				createAt:'2016-08-25',
				title:'融资小伙伴',
				author:'张屈',
			},
			{
				createAt:'2016-08-25',
				title:'回家',
				author:'张屈',
			},
			{
				createAt:'2016-08-28',
				title:'ahahal回家',
				author:'张屈',
			},
		],
	},
	plan:{
		items:[
			{
				createAt:'2015-10-11',
				title:'出差办事'
			},
			{
				createAt:'2016-10-01',
				title:'国庆回家'
			},
			{
				createAt:'2015-10-01',
				title:'laal回家'
			},
			{
				createAt:'2016-08-01',
				title:'ahahal回家'
			},
			{
				createAt:'2016-08-27',
				title:'ahahal回家'
			},
			{
				createAt:'2016-08-25',
				title:'氪空间重构'
			},
			{
				createAt:'2016-08-25',
				title:'融资小伙伴'
			},
			{
				createAt:'2016-08-25',
				title:'回家'
			},
			{
				createAt:'2016-08-28',
				title:'ahahal回家'
			},
		],
		now_date:+new Date(),
		now_trip:[
			{
				createAt:'2015-10-11',
				title:'出差办事'
			},
			{
				createAt:'2016-10-01',
				title:'国庆回家'
			},
			{
				createAt:'2016-10-01',
				title:'laal回家'
			}
		],
	},
	notify:{
		items:[
			{
				content:'请注意，那里有人',
				createAt:'',
				author:'张屈',
			},
			{
				content:'请注意，那里有人',
				createAt:'',
				author:'张屈',
			},
			{
				content:'请注意，那里有人',
				createAt:'',
				author:'张屈',
			},
			{
				content:'请注意，那里有人',
				createAt:'',
				author:'张屈',
			},
			{
				content:'注意啦',
				createAt:'',
				author:'张屈',
			}
		],
	},


};


module.exports = initState;


