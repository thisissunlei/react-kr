
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
}
