//官网后台

module.exports = {
    //活动列表及筛选
 'activityList':{
    url: '/api/krspace-finance-web/activity/activity-list?beginDate={beginDate}&cityId={cityId}&countyId={countyId}&endDate={endDate}&name={name}&page={page}&pageSize={pageSize}&type={type}',
    method: 'get'
 },
 //查看活动
 'activityDetail':{
    url: '/api/krspace-finance-web/activity/activity?id={id}',
    method: 'get'
 },
 //活动上下线
 'activityPublish':{
    url: '/api/krspace-finance-web/activity/activity-publish?id={id}&type={type}',
    method: 'get'
 },
 //新建活动上传轮播图
 'activityUploadpic':{
    url: '/api/krspace-finance-web/activity/upload-pic',
    method: 'post'
 },
 //新建---编辑活动提交
 'newCreateActivity':{
    url: '/api/krspace-finance-web/activity/activity',
    method: 'post'
 },
 //活动置顶
 'activityUpPosition':{
    url: '/api/krspace-finance-web/activity/activity-top?id={id}&top={top}',
    method: 'put'
 },
 //获取活动报名信息
 'activityGetInfo':{
    url: '/api/krspace-finance-web/activity/activity-field?id={id}',
    method: 'get'
 },
 //活动报名项目列表
 'activityGetList':{
    url: '/api/krspace-finance-web/activity/enroll-list?id={id}',
    method: 'get'
 },
 //活动详细信息
 'getActivityDetail':{
    url: '/api/krspace-finance-web/activity/activity?id={id}',
    method: 'get'
 },
 //活动序号是否重复
 'getActivitySerialNumRepeat':{
    url: '/api/krspace-finance-web/activity/sort-filter?sort={sort}&id={id}',
    method: 'get'
 },
 //新闻列表--分页
 'get-news-list':{
    url: '/api/krspace-finance-web/news/get-news-list?createUser={createUser}&publishedStatus={publishedStatus}&stickStatus={stickStatus}&title={title}&page={page}&pageSize={pageSize}',
    method: 'get'
 },
 //新闻列表--新建、编辑保存
 'save-news':{
    url: '/api/krspace-finance-web/news/save-news',
    method: 'post'
 },
 //新闻列表--编辑/查看
 'get-news-detail':{
    url: '/api/krspace-finance-web/news/get-news-detail?id={id}',
    method: 'get'
 },
  //官网社区配置列表
 'web-community-list':{
    url: '/api/krspace-finance-web/cmt/list?appoint={appoint}&cmtName={cmtName}&customed={customed}&page={page}&pageSize={pageSize}&show={show}',
    method: 'get'
 },
  //官网社区配置编辑
 'web-community-edit':{
    url: '/api/krspace-finance-web/cmt/edit',
    method: 'post'
 },
 //官网社区配置详情
 'web-community-detail':{
    url: '/api/krspace-finance-web/cmt/detail?id={id}',
    method: 'get'
 },
 //人员组件
 'web-user-select':{
    url: '/api/krspace-sso-web/sso/ssoUser/select?phoneOrEmail={phoneOrEmail}',
    method: 'get'
 },

 //轮播列表显示
 'web-piclist-listshow':{
  url: '/api/krspace-finance-web/por-mobile-pic/list?page={page}&pageSize={pageSize}',
  method: 'get'
 },
 //轮播列表根据id查看详情
 'web-pclist-listdetall':{
  url: '/api/krspace-finance-web/por-mobile-pic/show?id={id}',
  method: 'get'
},
//轮播列表增加与修改
'web-pclist-listadd-editor':{
  url: '/api/krspace-finance-web/por-mobile-pic/saveOrUpdate',
  method: 'post'
},
//轮播列表删除
'web-pclist-listadd-delete':{
  url: '/api/krspace-finance-web/por-mobile-pic/delete',
  method: 'post'
},
//轮播列表上线下线
'web-pclist-listadd-up-down':{
  url: '/api/krspace-finance-web/por-mobile-pic/publish',
  method: 'post'
},
  //新社区配置--详情
  'get-cmt-newdetail':{
      url: '/api/krspace-finance-web/cmt/newdetail?id={id}',
      method: 'get'
  },
//新社区配置--编辑
'newedit-cmt':{
  url: '/api/krspace-finance-web/cmt/newedit',
  method: 'post'
},

//官网-关键词配置列表
'keyword-setting':{
  url: '/api/krspace-finance-web/por-sem/list?page={page}&pageSize={pageSize}&semCode={semCode}&semName={semName}',
  method: 'get'
},

//官网-关键词配置-详情
'keyword-setting-detail':{
  url: '/api/krspace-finance-web/por-sem/show?id={id}',
  method: 'get'
},

//官网-关键词配置-编辑
'keyword-setting-edit':{
  url: '/api/krspace-finance-web/por-sem/saveoredit',
  method: 'post'
},

//官网-关键词配置-删除
'keyword-setting-delete':{
  url: '/api/krspace-finance-web/por-sem/delete?id={id}',
  method: 'get'
},

//官网-关键词配置-批量删除
'keyword-setting-deleteall':{
  url: '/api/krspace-finance-web/por-sem/batchdelete?ids={ids}',
  method: 'get'
},

//官网-轮播图列表-获取城市
'get-city':{
  url: '/api/op/por-mobile-pic/getallcity',
  method: 'get'
}


}
