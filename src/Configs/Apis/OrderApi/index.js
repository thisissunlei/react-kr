//订单
module.exports = {
  //订单基本信息名字
  'get-customName-orderName': {
      url: '/api/krspace-finance-web/action/get-customName-orderName?customerId={customerId}',
      method: 'get'
  },
  //创建新的订单
  'enter-order': {
      url: '/api/krspace-finance-web/action/enter-order',
      method: 'post'
  },
  'edit-order': {
      url: '/api/krspace-finance-web/action/edit-order',
      method: 'put'
  },
  //订单基本信息编辑信息获取
  'get-simple-order': {
      url: '/api/krspace-finance-web/action/get-simple-order?mainBillId={mainBillId}',
      method: 'get'
  },
  //订单详细信息
  'get-order-detail': {
      url: '/api/krspace-finance-web/action/get-order-detail?mainBillId={mainBillId}',
      method: 'get'
  },
  //2签约客户列表-新建订单
  'sign-customers-names': {
      url: '/api/krspace-finance-web/customer/sign-customers-names?company={company}',
      method: 'get'
  },
}
