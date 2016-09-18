const APIS  = {
	
	'community-city-select':{
		url:'/mockjsdata/3/krspace-admin-web/community-city-selected',
		method:'get'
	},
	//创建新的订单
	'enter-order':{
		url:'/mockjsdata/3/krspace-finance-web/action/enter-order',
		method:'post'
	},
	//订单基本信息
	'get-simple-order':{
		url:'/mockjsdata/3/krspace-finance-web/action/get-simple-order',
		method:'get'
	},
	//订单详细信息
	'get-order-detail':{
		url:'/prod/krspace-finance-web/action/get-order-detail?mainBillId={mainBillId}',
		method:'get'
	},

	'demo':{
		url:'/mockjsdata/3/krspace-admin-web/community-city-selected',
		method:'get'
	}


	 

}

module.exports =  APIS;




