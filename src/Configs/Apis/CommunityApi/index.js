
//社区经营

module.exports = {

    //社区管理－校验社区名称
    'check-name': {
        url: '/z/bs/cmt/community/check/name',
        //url: '/api/krspace-finance-web/cmt/community/check/name?id={id}&name={name}',
        method: 'get'
    },
    //社区管理－校验社区code
    'check-code': {
        url: '/z/bs/cmt/community/check/code',
       // url: '/api/krspace-finance-web/cmt/community/check/code?id={id}&code={code}',
        method: 'get'
    },
    //社区管理－社区新增或编辑
    'actions-edit': {
        url: '/api/krspace-finance-web/cmt/community/actions/edit',
        method: 'post'
    },
    //社区管理－获取社区编辑信息

   'communityGetEdit':{
      url: '/api/krspace-finance-web/cmt/community/info/type/edit?id={id}',
      method: 'get'
   },
     //社区管理－校验社区排序
   'check-rank':{
    url: '/z/bs/cmt/community/check/order',
     // url: '/api/krspace-finance-web/cmt/community/check/order?id={id}&cityId={cityId}&orderNum={orderNum}',
      method: 'get'
   },

	 //社区管理－访客记录-列表
 'visit-record-list':{
		url: '/api/krspace-finance-web/sys/visit-record/list?page={page}&pageSize={pageSize}&searchKey={searchKey}&searchType={searchType}&visitType={visitType}&visitStatus={visitStatus}&communityId={communityId}&vtime={vtime}',
		method: 'get'
 },
 //社区管理－访客记录-准备数据
  'visit-record-ready':{
    url: '/api/krspace-finance-web/sys/visit-record/edit-param-data',
    method: 'get'
  },
  //社区管理－访客记录-查看页面
  'visit-record-detail':{
    url: '/api/krspace-finance-web/sys/visit-record/info/type/view?id={id}',
    method: 'get'
  },
  //社区管理－访客记录-新增访客
  'visit-record-edit':{
    url: '/api/krspace-finance-web/sys/visit-record/actions/edit',
    method: 'post'
  },
  //社区管理－访客记录-编辑页数据
  'visit-record-edit-deatil':{
    url: '/api/krspace-finance-web/sys/visit-record/info/type/edit?id={id}',
    method: 'get'
  },


   //访客列表--分页
   'get-visit-list':{
      url: '/api/krspace-finance-web/cmt/visit/get-visit-list?communityId={communityId}&company={company}&endTime={endTime}&name={name}&startTime={startTime}&visitName={visitName}&page={page}&pageSize={pageSize}',
      method: 'get'
   },
    //支持列表--分页
   'get-question-list':{
      url: '/api/krspace-finance-web/op/community/question/get-question-list?typeName={typeName}&communityName={communityName}&page={page}&pageSize={pageSize}',
      method: 'get'
   },
    //社区经营新销控表
   'control-table':{
      url: '/api/krspace-finance-web/cmt/sell-control/list?communityId={communityId}&customerName={customerName}&page={page}&pageSize={pageSize}&rentalStatus={rentalStatus}',
      method: 'get'
   },



   //催款表
   'getPaymentRemind':{
      url: '/api/krspace-finance-web/finance/payment-reminder?endDate={endDate}&companyName={companyName}&beginDate={beginDate}&communityId={communityId}&page={page}&pageSize={pageSize}',
      method: 'get'
   },

   //预约参观删除
   'delete-record':{
    url: '/api/krspace-finance-web/sys/visit-record/delete?id={id}',
    method: 'get'
  },

  // 关闭社区 设置停业  
  'close-comunity-time':{
    url: '/z/bs/cmt/setCloseDate',
    method: 'get'
  },
  // 关闭社区 系统关闭 
  'close-comunity-system':{
    url: '/z/bs/cmt/sysClose',
    method: 'get'
  }

}
