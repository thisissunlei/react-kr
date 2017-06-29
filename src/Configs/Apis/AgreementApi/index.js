module.exports = {

  'delete-enter-contract': {
    url: '/api/krspace-finance-web/checkinagreement/delete-enter-contract?contractId={contractId}',
    method: 'delete'
  },

  //合同－工位信息
  'getStationOrSettingList': {
    url: '/api/krspace-finance-web/finacontractdetail/contract-detail-station?mainBillId={mainBillid}&page={page}&pageSize={pageSize}&contractId={contractId}',
    method: 'get'
  },
  //退租协议-新增-编辑
  'addFnaContractWithdrawal': {
    // url: '/api/krspace-finance-web/rent/addFnaContractWithdrawal',
        url: '/api/krspace-finance-web/fnaContractWithdrawalController/addFnaContractWithdrawal',

    method: 'post'
  },
  //续租协议-新增-编辑
  'addOrEditContinueContract': {
    url: '/api/krspace-finance-web/checkinagreement/addOrEditContinueContract',
    method: 'post'
  },
  //续租协议-查看
  'renewshow': {
    url: '/api/krspace-finance-web/checkinagreement/checkin-agreement/actions/show?id={id}',
    method: 'get'
  },
  //增租协议-创建-编辑
  'addOrEditIncreaseContract': {
    url: '/api/krspace-finance-web/checkinagreement/addOrEditIncreaseContract',
    method: 'post'
  },

  //入驻协议-新增-编辑
  'addOrEditEnterContract': {
    url: '/api/krspace-finance-web/checkinagreement/addOrEditEnterContract',
    method: 'post'
  },
  //创建合同时初始化数据
  'fina-contract-intention': {
    url: '/api/krspace-finance-web/finacontractdetail/fina-contract-intention?customerId={customerId}&mainBillId={mainBillId}&type={type}',
    method: 'get'
  },
  //合同－退租合同－查看
  'getFnaContractWithdrawalById': {
    // url: '/api/krspace-finance-web/rent/getFnaContractWithdrawalById?id={id}',
        url: '/api/krspace-finance-web/fnaContractWithdrawalController/getFnaContractWithdrawalById?id={id}',
    
    method: 'get'
  },

  //合同－承租合同－查看
  'show-fina-contract-intentletter': {
    url: '/api/3/krspace-finance-web/finacontractdetail/fina-contract-intentletter/acitions/show',
    method: 'get'
  },

  //合同－承租合同－查看
  'showFinaContractIntentletter': {
    url: '/api/krspace-finance-web/finacontractdetail/fina-contract-intentletter/acitions/show?id={id}',
    method: 'get'
  },

  //合同－减租合同－查看
  'showFnaContractRentController': {
    url: '/api/krspace-finance-web/fnaContractRentController/getFnaContractRentById?id={id}',
    method: 'get'
  },
  //合同－减租合同－新建或编辑
  'getFnaContractRentController': {
    url: '/api/krspace-finance-web/fnaContractRentController/saveFnaContractRent',
    method: 'post'
  },
  //合同－(入驻合同、增租、续租)－查看
  'show-checkin-agreement': {
    url: '/api/krspace-finance-web/checkinagreement/checkin-agreement/actions/show?id={id}',
    method: 'get'
  },

  //合同－承租合同－新建
  'addFinaContractIntentletter': {
    url: '/api/krspace-finance-web/finacontractdetail/fina-contract-intentletter/actions/save',
    method: 'post'
  },
  //合同－承租合同－编辑
  'updateFinaContractIntentletter': {
    url: '/api/krspace-finance-web/finacontractdetail/fina-contract-intentletter/actions/update',
    method: 'put'
  },
  //合同－创建基础数据
  'finaContractIntention': {
    url: '/mockjsdata/3/krspace-finance-web/finacontractdetail/fina-contract-intention?communityId={communityId}&customerId={customerId}',
    method: 'get'
  },

  //合同-出租方管理-新增
  'addFnaCorporation': {
    url: '/api/krspace-finance-web/addFnaCorporation',
    method: 'post'
  },
  //合同-出租方管理-list
  'fnaCorporationList': {
    url: '/api/krspace-finance-web/fnaCorporationList?corporationName={corporationName}&page={page}&pageSize={pageSize}',
    method: 'get'
  },
  //合同-基础配置-新增
  'addSysDicPayment': {
    url: '/api/krspace-finance-web/addSysDicPayment',
    method: 'post'
  },
  //合同-基础配置-编辑
  'editSysDicPayment': {
    url: '/api/krspace-finance-web/editSysDicPayment',
    method: 'post'
  },
  //合同-基础配置-查看
  'getSysDicPayment': {
    url: '/api/krspace-finance-web/getSysDicPayment?id={id}',
    method: 'get'
  },
  //合同-基础配置-获取基本信息
  'sysDicPaymentList': {
    url: '/api/krspace-finance-web/sysDicPaymentList',
    method: 'get'
  },

  //合同－属性配置－搜索（list）
  'findFinaFinaflowPropertyList': {
    url: '/api/krspace-finance-web/finaccount/property/findFinaFinaflowPropertyList?page={currentPage}&pageSize={pageSize}&searchParam={searchParam}',
    method: 'get'
  },
  //合同－属性配置－新建
  'addFinaFinaflowProperty': {
    url: '/api/krspace-finance-web/finaccount/property/addFinaFinaflowProperty',
    method: 'post'
  },

  //合同-出租方管理-编辑
  'editFnaCorporation': {
    url: '/api/krspace-finance-web/editFnaCorporation',
    method: 'post'
  },

  //合同-出租方管理-基本信息
  'getFnaCorporation': {
    url: '/api/krspace-finance-web/getFnaCorporation?id={id}',
    method: 'get'
  },

  //电子合同-入驻协议(入驻，增租，续租)
  'checkinagreement-print-info': {
      url: '/api/krspace-finance-web/checkinagreement/print-info?contractId={contractId}',
      method: 'get'
  },
  //电子合同-承租意向
  'intentletter-print-info': {
      url: '/api/krspace-finance-web/intentletter/print-info?contractId={contractId}',
      method: 'get'
  },
  //电子合同-减租
  'fnaContractRentController': {
      url: '/api/krspace-finance-web/fnaContractRentController/print-info?contractId={contractId}',
      method: 'get'
  },
  //计算工位总价
 'getAllRent':{
   url:'/api/krspace-finance-web/finacontractdetail/fina-contract-all/line-total',
   method:'post'
 },
 //减租计算工位总价
 'reduceGetAllRent':{
   url:'/api/krspace-finance-web/finacontractdetail/fina-contract-all/reduc-line-total',
   method:'post'
 },
 //合同列表-列表接口
   'contract-list':{
   url:'/api/krspace-finance-web/finacontractdetail/contract-list?createDateBegin={createDateBegin}&createDateEnd={createDateEnd}&page={page}&pageSize={pageSize}&cityName={cityName}&communityName={communityName}&createrName={createrName}&customerName={customerName}&salerName={salerName}&contractType={contractType}&hasAgreement={hasAgreement}',
   method:'get'
   },
 //合同列表-客户名称下拉接口
   'customers-names':{
      url:'/api/krspace-finance-web/customer/my-customers?company={company}',
      method:'get'
   },

   //合同列表-获取登录人是否有创建合同的权限
   'edit-right':{
      url:'/api/krspace-finance-web/finacontractdetail/contract-list/edit-right',
      method:'get'
   },

}
