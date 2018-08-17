//OA首页
var HomeApi = {
    //维度列表
    'global-get-up-files-url': {
        url: '/api/op/sys/upload-policy?category={category}&isPublic={isPublic}',
        method: 'get'
    },
  }
  
  module.exports=HomeApi;