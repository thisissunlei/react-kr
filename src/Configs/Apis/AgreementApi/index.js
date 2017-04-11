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
}
