const APIS  = {

//合同－工位信息
	'addFnaContractWithdrawal':{
		url:'/api/krspace-finance-web/finacontractdetail/contract-detail-station?contractId={contractId}',
		method:'get'
	},
	//退租协议-新增-编辑
	'addFnaContractWithdrawal':{
		url:'/api/krspace-finance-web/fnaContractWithdrawalController/addFnaContractWithdrawal',
		method:'post'
	},

	//获取文件token
	'getSourceServiceToken':{
		url:'/api/krspace-finance-web/finacontractdetail/getSourceServiceToken',
		method:'get'
	},
	//获取文件列表
	'findFileList':{
		url:'/krspace_knowledge_wap/doc/docFile/findFileList?sourceservicetoken={sourceservicetoken}&fileIds={fileIds}&jsoncallback={jsoncallback}&operater={operater}',
		method:'get'
	},

	//文件预览
	'viewFile':{
		url:' /krspace_knowledge_wap/doc/docFile/viewFile?operater={operater}&sourceservicetoken={sourceservicetoken}&fileId={fileId}',
		method:'get'
	},

	// 上传文件
	'uploadSingleFile':{
		url:'/api-old/krspace_knowledge_wap/doc/docFile/uploadSingleFile?operater={operater}&sourceservicetoken={sourceservicetoken}&docTypeCode={docTypeCode}',
		method:'post'
	},

	//增租协议-创建-编辑
	'addOrEditIncreaseContract':{
		url:'/api/krspace-finance-web/checkinagreement/addOrEditIncreaseContract',
		method:'post'
	},

	//入驻协议-新增-编辑
	'addOrEditEnterContract':{
		url:'/api/krspace-finance-web/checkinagreement/addOrEditEnterContract',
		method:'post'
	},

	//创建合同时初始化数据
	'fina-contract-intention':{
		url:'/api/krspace-finance-web/finacontractdetail/fina-contract-intention?customerId={customerId}&mainBillId={mainBillId}',
		method:'get'
	},

	//根据人员姓名获取人员基本信息
	'getHrmResourceExtListByLastname':{
		url:'/api-old/krspace_oa_web/interface/hrm/hrmResource/getHrmResourceExtListByLastname?lastname={lastname}',
		rap:'/mockjsdata/9/krspace_oa_web/interface/hrm/hrmResource/getHrmResourceExtListByLastname?lastname={lastname}',
		method:'get'
	},

	//合同－退租合同－查看
	'getFnaContractWithdrawalById':{
		url:'/api/krspace-finance-web/fnaContractWithdrawalController/getFnaContractWithdrawalById?id={id}',
		method:'get'
	},

	//合同－承租合同－查看
	'show-fina-contract-intentletter':{
		url:'/api/3/krspace-finance-web/finacontractdetail/fina-contract-intentletter/acitions/show',
		method:'get'
	},

	//合同－承租合同－查看
	'showFinaContractIntentletter':{
		url:'/api/krspace-finance-web/finacontractdetail/fina-contract-intentletter/acitions/show?id={id}',
		method:'get'
	},

	//合同－减租合同－查看
	'showFnaContractRentController':{
		url:'/api/krspace-finance-web/fnaContractRentController/getFnaContractRentById?communityId={communityId}&customerId={customerId}&id={id}',
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
		url:'/api/krspace-finance-web/addSysDicPayment',
		method:'post'
	},
	//合同-基础配置-编辑
	'editSysDicPayment':{
		url:'/api/krspace-finance-web/editSysDicPayment',
		method:'post'
	},
	//合同-基础配置-查看
	'getSysDicPayment':{
		url:'/api/krspace-finance-web/getSysDicPayment?id={id}',
		method:'get'
	},
	//合同-基础配置-获取基本信息
	'sysDicPaymentList':{
		url:'/api/krspace-finance-web/sysDicPaymentList',
		method:'get'
	},

	//合同－属性配置－搜索（list）
	'findFinaFinaflowPropertyList':{
		url:'/api/krspace-finance-web/finaccount/property/findFinaFinaflowPropertyList?page={currentPage}&pageSize={pageSize}&searchParam={searchParam}',
		method:'get'
	},
	//合同－属性配置－新建
	'addFinaFinaflowProperty':{
		url:'/api/krspace-finance-web/finaccount/property/addFinaFinaflowProperty',
		method:'post'
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

	//财务管理－属性配置-查看
	'viewFinaFinaflowProperty':{
		url:'/krspace-finance-web/finaccount/property/viewFinaFinaflowProperty',
		method:'get'
	},

	//财务管理－订单账单列表-分页获取订单
	'getFinaDataByList':{
		url:'/api/krspace-finance-web/finaccount/data/getFinaDataByAjax?page={page}&pageSize={pageSize}&customername={customername}&endDate={endDate}&mainbilltype={mainbilltype}&communityid={communityid}',
		method:'get'
	},
    //财务管理－订单账单列表-生成对账单
	'getFinaDataDetailAdd':{
		url:'/mockjsdata/3/krspace-finance-web/finaccount/data/getFinaDataDetailById?id={id}&startDate={startDate}&endDate={endDate}',
		method:'get'
	},
	//财务管理－订单账单列表-高级查询
	'getFinaDataCommunityAndMainBillType':{
		url:'/mockjsdata/3/krspace-finance-web/finaccount/data/getFinaDataCommunityAndMainBillType',
		method:'get'
	},
	//财务管理－科目配置－新建(修改)
	'saveFinaFinaflowAccountModel':{
		url:'/api/krspace-finance-web/finaccount/finaFinaflowAccountModel/saveFinaFinaflowAccountModel',
		method:'post'
	},
	//财务管理－科目配置－搜索(list)
	'getFinaFinaflowAccountModelByAjax':{
		url:'/api/krspace-finance-web/finaccount/finaFinaflowAccountModel/getFinaFinaflowAccountModelByAjax?accountname={accountname}&currentPage={currentPage}&pageSize={pageSize}',
		method:'get'
	},
	//财务管理－订单明细账-分页获得财务流水
	'getPageAccountFlow':{
		url:'/mockjsdata/3/krspace-finance-web/finaccount/data/getAccountFlow?accountId={accountId}&accountType={accountType}&orderId={orderId}&endTime={endTime}&pageNum={pageNum}&pageSize={pageSize}&propertyId={propertyId}&startTime={startTime}',
		method:'get'
	},
	//财务管理－订单明细账-订单明细页首次加载
	'getAccountFlow':{
		url:'/api/krspace-finance-web/finaccount/data/getFinaContractBillDataById?accountType={accountType}&mainbillid={mainbillid}&pageNum={pageNum}&pageSize={pageSize}',
		method:'get'
	},
	//财务管理－订单明细账-回款
	'receiveMoney':{
		url:'/api/krspace-finance-web/finaccount/opt/receiveMoney',
		method:'post'
	},
	//财务管理－订单明细账-退款
	'payBack':{
		url:'/api/krspace-finance-web/finaccount/opt/payBack',
		method:'post'
	},
	//财务管理－订单明细账-查询代码列表
	'findAccountList':{
		url:'/api/krspace-finance-web/finaccount/data/findAccountList?accountType={accountType}',
		method:'get'
	},
	//财务管理－订单明细账-转押金
	'transToDeposit':{
		url:'/api/krspace-finance-web/finaccount/opt/transToDeposit',
		method:'post'
	},
	//财务管理－订单明细账-转押金按钮查询合同编号
	'findContractListById':{
		url:'/api/krspace-finance-web/finaccount/opt/findContractListById?id={id}',
		method:'get'
	},
	//财务管理－订单明细账-转营收
	'transToOperateIncome':{
		url:'/api/krspace-finance-web//finaccount/opt/transToOperateIncome',
		method:'post'
	},
	//财务管理－订单明细账-添加挂账
	'supplementIncome':{
		url:'/mockjsdata/3/krspace-finance-web//finaccount/opt/supplementIncome',
		method:'post'
	},
	//财务管理－开票列表-list
	'getFnaInvoiceModelListByAjax':{
		url:'/mockjsdata/3/krspace-finance-web/finaccount/fnaInvoiceModel/getFnaInvoiceModelListByAjax?pageSize={pageSize}&operatedate={operatedate}&page={page}&operateName={operateName}&invoiceType={invoiceType}&creater={creater}',
		method:'get'
	},

}

module.exports =  APIS;
