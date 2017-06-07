
//消息提醒

module.exports = {
	//消息提醒-客户转移列表
   'messageRemindCustomerSwitching':{
      url: '/api/krspace-finance-web/msg/customer-transfer/list?createDateEnd={createDateEnd}&createDateStart={createDateStart}&page={page}&pageSize={pageSize}',
      method: 'get'
   },
   //消息提醒-预约参观列表
   'messageAppointmentVisit':{
      url: '/api/krspace-finance-web/msg/order-visit/list?createDateEnd={createDateEnd}&createDateStart={createDateStart}&msgCommunity={msgCommunity}&page={page}&pageSize={pageSize}',
      method: 'get'
   },
    //消息提醒-获取消息查看权限及
   'messageLookJurisdiction':{
      url: '/api/krspace-finance-web/msg/msg-right-count',
      method: 'get'
   },
   //消息提醒-消息设为全部已读
  'messageAllReade':{
     url: '/api/krspace-finance-web/msg/msg-all-read?msgType={msgType}',
     method: 'put'
  },
   //获取消息列表---------------------->PureComponents和Global组件接口
   'getInfoList': {
      url:'/api/krspace-finance-web/msg/msg-info?page={page}&pageSize={pageSize}&endTime={endTime}&startTime={startTime}&communityId={communityId}',
      method:'get'
   },

   //消息提醒-催款---------------------->PureComponents组件接口
   'getAlertList': {
      url:'/api/krspace-finance-web/msg/msg-alert?page={page}&pageSize={pageSize}&endTime={endTime}&startTime={startTime}&communityId={communityId}',
      method:'get'
   },
   //消息设为已读---------------------->PureComponents组件接口
   'setInfoReaded': {
      url:'/api/krspace-finance-web/msg/msg-read?id={id}',
      method:'put'
   },
   //获取未读消息数---------------------->Gloabal组件接口
   'getUnReadInfo': {
      url:'/api/krspace-finance-web/msg/msg-count?&endTime={endTime}&startTime={startTime}',
      method:'get'
   },

}
