//公共的api
module.exports = {
  //获取社区借口
  'getTheCommunity': {
      url: '/mockjsdata/31/krspace-finance-web/cmt/community/select/use/type/list',
      method: 'get'
  },
  //获取楼层接口
  'getFloorByComunity': {
        url: '/mockjsdata/31/krspace-finance-web/cmt/community/select/use/floor?communityId={communityId}',
        method: 'get'
    },
}
