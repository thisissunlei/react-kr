
let initState = {

	companys: [
	],
	companys_fetch:{

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
				primaryText:"运营平台",
				router:'operation',
				menuItems:[
					{
						primaryText:"入驻订单",
						router:'joinOrder',
						menuItems:[
							{
								primaryText:'客户列表',
								router:'/operation/joinOrder/list',
							},
							{
								primaryText:'客户编辑',
								router:'/operation/joinOrder/customer/edit',
							},
							{
								primaryText:'客户详情',
								router:'/operation/joinOrder/customer/detail',
							},
							{
								primaryText:'订单详情',
								router:'/operation/joinOrder/customer/detail',
							},
							{
								primaryText:'订单编辑',
								router:'/operation/joinOrder/customer/detail',
							},
						]
					},
					{
						primaryText:"合同信息",
						menuItems:[
							{
								primaryText:"入驻协议书",
								router:'/operation/agreement/join/edit',
							},
							{
								primaryText:"承租意向书",
								router:'/operation/agreement/join/detail',
							},
							{
								primaryText:"增租协议书",
								router:'/operation/agreement/join/detail',
							},
							{
								primaryText:"减租协议书",
								router:'/operation/agreement/join',
							},
							{
								primaryText:"退租协议书",
								router:'/operation/agreement/join',
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
								rightIcon:"",
								leftIcon:"",
								insetChildren:true,
								router:'/operation/finance/orderbill',
							},
							{
								primaryText:"代码配置",
								rightIcon:"",
								leftIcon:"",
								insetChildren:true,
							},

						]
					},

				]
			},
			{
				primaryText:"权限管理",
				router:'permission',
			},
		]
	}

};


module.exports = initState;


