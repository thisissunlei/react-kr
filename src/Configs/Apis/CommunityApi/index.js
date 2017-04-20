
//社区经营

module.exports = {

    //社区管理－校验社区名称
    'check-name': {
        url: '/api/krspace-finance-web/cmt/community/check/name?id={id}&name={name}',
        method: 'get'
    },
    //社区管理－校验社区名称
    'check-code': {
        url: '/api/krspace-finance-web/cmt/community/check/code?id={id}&code={code}',
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
      url: '/api/krspace-finance-web/cmt/community/check/order?id={id}&cityId={cityId}&orderNum={orderNum}',
      method: 'get'
   },
	 //社区管理－访客记录-列表
 'visit-record-list':{
		url: '/api/krspace-finance-web/sys/visit-record/list?page={page}&pageSize={pageSize}&searchKey={searchKey}&searchType={searchType}&visitType={visitType}',
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
    url: '/api/krspace-finance-web/sys/visit-record/actions/edit?activityTypeId={activityTypeId}&communityId={communityId}&company={company}&email={email}&id={id}&interviewRoundId={interviewRoundId}&interviewTypeId={interviewTypeId}&meetedMan={meetedMan}&name={name}&num={num}&purposeId={purposeId}&tel={tel}&typeId={typeId}&vtime={vtime}&wechat={wechat}',
    method: 'post'
  },
  //社区管理－访客记录-编辑页数据
  'visit-record-edit-deatil':{
    url: '/api/krspace-finance-web/sys/visit-record/info/type/edit?id={id}',
    method: 'get'
  },

  

 

}
