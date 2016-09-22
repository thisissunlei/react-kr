const APIS  = {
	

	//demo
	'demo':{
		url:'/api/krspace-finance-web/action/community-city-selected',
		method:'get'
	},

	'community-city-selected':{
		url:'/api/krspace-finance-web/action/community-city-selected',
		method:'get'
	},
	//订单基本信息
	'get-customName-orderName':{
		url:'/api/krspace-finance-web/action/get-customName-orderName?customerId={customerId}',
		method:'get'
	},
	//创建新的订单
	'enter-order':{
		url:'/api/krspace-finance-web/action/enter-order',
		method:'post'
	},
	'edit-order':{
		url:'/api/krspace-finance-web/action/edit-order',
		method:'put'
	},
	//订单基本信息
	'get-simple-order':{
		url:'/api/krspace-finance-web/action/get-simple-order?mainBillId={mainBillId}',
		method:'get'
	},
	//订单详细信息
	'get-order-detail':{
		url:'/api/krspace-finance-web/action/get-order-detail?mainBillId={mainBillId}',
		method:'get'
	},

	//财务管理－属性配置－列表
	'viewFinaFinaflowProperty':{
		url:'/krspace-finance-web/finaccount/property/viewFinaFinaflowProperty',
		method:'get'
	},

	//财务管理－属性配置-新增(编辑)
	'addFinaFinaflowProperty':{
		url:'/krspace-finance-web/finaccount/property/addFinaFinaflowProperty',
		method:'get'
	},

	//财务管理－属性配置-查看
	'viewFinaFinaflowProperty':{
		url:'/krspace-finance-web/finaccount/property/viewFinaFinaflowProperty',
		method:'get'
	},

}

module.exports =  APIS;




