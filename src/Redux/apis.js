const APIS  = {

	//根据人员姓名获取人员基本信息
	'getHrmResourceExtListByLastname':{
		url:'/api-old/krspace_oa_web/interface/hrm/hrmResource/getHrmResourceExtListByLastname?lastname={lastname}',
		rap:'/mockjsdata/9/krspace_oa_web/interface/hrm/hrmResource/getHrmResourceExtListByLastname?lastname={lastname}',
		method:'get'
	},

	//合同－退租合同－查看
	'getFnaContractWithdrawalById':{
		url:'/mockjsdata/3/krspace-finance-web/fnaContractWithdrawalController/getFnaContractWithdrawalById',
		method:'get'
	},
	//合同－承租合同－查看
	'show-fina-contract-intentletter':{
		url:'/mockjsdata/3/krspace-finance-web/finacontractdetail/fina-contract-intentletter/acitions/show',
		method:'get'
	},

	//合同－承租合同－查看
	'showFinaContractIntentletter':{
		url:'/mockjsdata/3/krspace-finance-web/finacontractdetail/fina-contract-intentletter/acitions/show',
		method:'get'
	},


	//合同－减租合同－查看
	'showFnaContractRentController':{
		url:'/mockjsdata/3/krspace-finance-web/fnaContractRentController/getFnaContractRentById',
		method:'get'
	},
	//合同－(入驻合同、增租、续租)－查看
	'show-checkin-agreement':{
		url:'/api/krspace-finance-web/checkinagreement/checkin-agreement/actions/show?id={id}',
		method:'get'
	},

	//合同－承租合同－新建
	'addFinaContractIntentletter':{
		url:'/mockjsdata/3/krspace-finance-web/finacontractdetail/fina-contract-intentletter/actions/save',
		method:'post'
	},
	//合同－承租合同－编辑
	'updateFinaContractIntentletter':{
		url:'/mockjsdata/3/krspace-finance-web/finacontractdetail/fina-contract-intentletter/actions/update',
		method:'put'
	},
	//合同－创建基础数据
	'finaContractIntention':{
		url:'/mockjsdata/3/krspace-finance-web/finacontractdetail/fina-contract-intention?communityId={communityId}&customerId={customerId}',
		method:'get'
	},
	//合同-出租方管理-基本信息
	'getFnaCorporation':{
		url:'/api/krspace-finance-web/getFnaCorporation?id={id}',
		method:'get'
	},

	//合同-出租方管理-编辑
	'editFnaCorporation':{
		url:'/api/krspace-finance-web/editFnaCorporation',
		method:'post'
	},

	//合同-出租方管理-新增
	'addFnaCorporation':{
		url:'/api/krspace-finance-web/addFnaCorporation',
		method:'post'
	},
	//合同-出租方管理-list
	'fnaCorporationList':{
		url:'/api/krspace-finance-web/fnaCorporationList?corporationName={corporationName}&page={page}&pageSize={pageSize}',
		method:'get'
	},
	//合同-基础配置-新增
	'addSysDicPayment':{
		url:'/mockjsdata/3/krspace-finance-web/addSysDicPayment',
		method:'post'
	},
	//合同-基础配置-编辑
	'editSysDicPayment':{
		url:'/mockjsdata/3/krspace-finance-web/editSysDicPayment',
		method:'post'
	},
	//合同-基础配置-获取基本信息
	'getSysDicPayment':{
		url:'/mockjsdata/3/krspace-finance-web/getSysDicPayment?id={id}',
		method:'get'
	},
	//合同－属性配置－搜索（list）
	'findFinaFinaflowPropertyList':{
		url:'/mockjsdata/3/krspace-finance-web/finaccount/property/findFinaFinaflowPropertyList?currentPage={currentPage}&pageSize={pageSize}&searchParam={searchParam}',
		method:'get'
	},
	//合同－属性配置－新建
	'addFinaFinaflowProperty':{
		url:'/mockjsdata/3/krspace-finance-web/finaccount/property/addFinaFinaflowProperty?ordernum={ordernum}&propcode={propcode}&id={id}&enableflag={enableflag}&propname={propname}&propdesc={propdesc}&proptype={proptype}',
		method:'get'
	},
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
	//财务管理－订单账单列表-分页获取订单
	'getFinaDataByList':{
		url:'/mockjsdata/3/krspace-finance-web/finaccount/data/getFinaDataByAjax?page={page}&pageSize={pageSize}',		
		method:'get'
	},
    //财务管理－订单账单列表-生成对账单
	'getFinaDataDetailAdd':{
		url:'/mockjsdata/3/krspace-finance-web/finaccount/data/getFinaDataDetailById',		
		method:'get'
	},
}

module.exports =  APIS;




