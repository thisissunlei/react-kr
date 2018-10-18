
//官网后台

module.exports = {
	


   // 门禁授权列表
   'impowerList':{
      url: '/api/krspace-finance-web/permission/door-customer-list?communityId={communityId}&customerName={customerName}&page={page}&pageSize={pageSize}',
      method: 'get'
   },

   // 新增／编辑门禁授权
   'newCreateOrEditImpower':{
      url: '/api/krspace-finance-web/permission/door-customer',
      method: 'post'
   },

   // 删除客户门禁授权
   'doorCustomerDelete':{
      url: '/api/krspace-finance-web/permission/door-customer-delete?id={id}',
      method: 'get'
   },

   // 授权该客户在指定社区下的设备列表
   'doorCustomerDevice':{
      url: '/api/krspace-finance-web/permission/door-customer-device?id={id}&communityId={communityId}&floor={floor}&doorCode={doorCode}&roomName={roomName}',
      method: 'get'
   },

   // 授权为客户授权
   'doorCustomerGrant':{
      url: '/api/krspace-finance-web/permission/door-customer-grant',
      method: 'post'
   },
   //会员卡列表
   'memberCardList': {
      url: '/api/krspace-finance-web/member/card/card-list?page={page}&pageSize={pageSize}&type={type}&value={value}',
      method: 'get'
   },
   //会员卡批量入库
   'memberCardImport': {
      url: '/api/krspace-finance-web/member/card/actions/storage?startOuterCode={startOuterCode}&endOuterCode={endOuterCode}',
      method: 'put'
   },
   
   //会员卡删除
   'memberCardDelete': {
      url: '/api/iot-platform/card/actions/delete?id={id}',
      method: 'delete'
   },
   
   // 会员卡原领用人列表
   'memberRecvList':{
      url: '/api/krspace-finance-web/member/card/recv-list',
      method: 'get'
   },


   //跳到下一张会员卡
   'jumpToNextCardApi':{
    url: '/api/iot-platform/card/next-code?outerCode={outerCode}',
    method: 'get'
 },
//    
   
  
   //会员中心-会员详细信息－个人资料
    'getMemberDetailData': {
        url: '/api/krspace-finance-web/member/detail?id={id}',
        method: 'get'
    },
    // 会员中心-会员详细信息－个人行为
    'getPersonalBehavior': {
        url: '/api/krspace-finance-web/member/mbr-device-log?page={page}&pageSize={pageSize}&memberId={memberId}&startTime={startTime}&endTime={endTime}',
        method: 'get'
    },
    // 会员中心-会员详细信息－组织架构
    'getOrganizationChart': {
        url: '/api/krspace-finance-web/member/company-team?page={page}&pageSize={pageSize}&companyId={companyId}',
        method: 'get'
    },
    // 会员中心－会员详细信息－更新日志
    'getUpdateLog': {
        url: '/api/krspace-finance-web/member/log/mbr-log?page={page}&pageSize={pageSize}&memberId={memberId}&startTime={startTime}&endTime={endTime}',
        method: 'get'
    },
    //会议室预定列表
    'meeting-reservation':{
        url:'/api/krspace-finance-web/cmt-appointment/boardroom/manage-list?pageSize={pageSize}&communityId={communityId}&date={date}&floor={floor}&page={page}',
        method:'get'
    },
    'meeting-reservation-delete':{
        url:'/api/krspace-finance-web/cmt-appointment/actions/cancel?id={id}',
        method:'post'
    },
    //录入会员卡
    'inputCardUrl':{
        url:'/api/iot-platform/card/actions/active',
        method:'post'
    },
    //会员列表-离职
    'member-leave':{
        url:'/api/krspace-sso-web/member/leave?id={id}',
        method:'get'
    },
    //会员列表-获取会员卡信息
    'get-member-code':{
        url:'/api/iot-platform/card/holder-cards?id={id}',
        method:'get'
    },
    //会员列表-解绑会员卡
    'unbind-member-code':{
        url:'/api/iot-platform/card/actions/unbind',
        method:'post'
    },
    //会员列表-绑定会员卡
    'bind-member-code':{
        url:'/api/iot-platform/card/actions/bind',
        method:'post'
    },
    //获取会员模糊查询列表
    'getMemberList':{
        url:'/api/krspace-finance-web/member/select-options?name={name}',
        method:'get'
    },
    //获取会员公司
    'getCompanyInfo':{
        url:'/api/krspace-finance-web/member/csr-list?companyName={companyName}',
        method:'get'
    },
    //获取会员公司
    'get-member-company':{
        url:'/api/krspace-sso-web/member/customer/csr-list?companyName={companyName}',
        method:'get'
    },
    //会员列表-恢复
    'cancle-leave':{
        url:'/api/krspace-sso-web/member/cancle-leave?id={id}',
        method:'get'
    },
     //会员列表-会员详情
     'get-member-detail':{
        url:'/api/krspace-sso-web/member/detail?uid={uid}',
        method:'get'
    },
    //会员列表-会员-社交业务统计信息
    'get-user-business-info':{
        url:'/api/krspace-finance-web/user/business/info?uid={uid}',
        method:'get'
    },
    //会员列表-会员入驻历史记录
    'get-member-enter-history':{
        url:'/api/krspace-sso-web/member/enter/history?uid={uid}',
        method:'get'
    },
    //会员列表-会员编辑详情信息
    'get-member-base-info':{
        url:'/api/krspace-sso-web/member/base/info?uid={uid}',
        method:'get'
    },
     //会员列表-会员详情-入驻历史
     'get-member-enter-log-page':{
        url:'/api/krspace-sso-web/member/enter-log-page?uid={uid}&page={page}&pageSize={pageSize}',
        method:'get'
    },
    

}
