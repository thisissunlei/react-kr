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
}
