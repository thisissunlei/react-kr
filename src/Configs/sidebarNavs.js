var menu = [

	{
		primaryText:"点单",
		rightIcon:"",
		leftIcon:"",
		router:'order',
		menuItems:[],
	},
	{
		primaryText:"OA",
		rightIcon:"",
		leftIcon:"",
		menuItems:[],
		active:true,
	},
	{
		primaryText:"运营",
		rightIcon:"",
		leftIcon:"",
		menuItems:[]
	},

	{
		primaryText:"招商",
		rightIcon:"ArrowDropRight",
		leftIcon:"",
		menuItems:[

			{
				primaryText:"运营主页",
				rightIcon:"",
				leftIcon:"",
				insetChildren:true,
				menuItems:[
					{
						primaryText:"收入看板",
						rightIcon:"",
						leftIcon:"",
						insetChildren:true,
					},
					{
						primaryText:"项目看板",
						rightIcon:"",
						leftIcon:"",
						insetChildren:true,
					},
					{
						primaryText:"活动看板",
						rightIcon:"",
						leftIcon:"",
						insetChildren:true,
					},
					{
						primaryText:"会员看板",
						rightIcon:"",
						leftIcon:"",
						insetChildren:true,
					},
					{
						primaryText:"销售看板",
						rightIcon:"",
						leftIcon:"",
						insetChildren:true,
					},
					{
						primaryText:"社区看板",
						rightIcon:"",
						leftIcon:"",
						insetChildren:true,
					},
				]
			},
			{
				primaryText:"项目管理",
				rightIcon:"",
				leftIcon:"",
				insetChildren:true,
			},
			{
				primaryText:"客户管理",
				rightIcon:"",
				leftIcon:"",
				insetChildren:true,
			},

			{
				primaryText:"财务管理",
				rightIcon:"",
				leftIcon:"",
				insetChildren:true,
			},

			{
				primaryText:"活动管理",
				rightIcon:"",
				leftIcon:"",
				insetChildren:true,
			},

			{
				primaryText:"会员管理",
				rightIcon:"",
				leftIcon:"",
				insetChildren:true,
			},

			{
				primaryText:"社区管理",
				rightIcon:"",
				leftIcon:"",
				insetChildren:true,
			},

			{
				primaryText:"系统管理",
				rightIcon:"",
				leftIcon:"",
				insetChildren:true,
			},
		]
	},
	{
		primaryText:"文档",
		rightIcon:"",
		leftIcon:"",
		router:"docs",
		menuItems:[]
	},
	{
		primaryText:"营销",
		rightIcon:"",
		leftIcon:"",
		menuItems:[]
	},

]


module.exports = menu;








