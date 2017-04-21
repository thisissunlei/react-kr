

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

}
