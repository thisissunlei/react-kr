
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
      url: '/api/krspace-finance-web/permission/door-customer-device?id={id}&communityId={communityId}',
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
      url: '/api/krspace-finance-web/member/card/actions/storage?startForeignCode={startForeignCode}&endForeignCode={endForeignCode}',
      method: 'put'
   },
   //会员卡领用
   'memberCardUse': {
      url: '/api/krspace-finance-web/member/card/actions/receive',
      method: 'post'
   },
   //会员卡删除
   'memberCardDelete': {
      url: '/api/krspace-finance-web/member/card/actions/delete?id={id}',
      method: 'delete'
   },
   //会员卡查看
   'memberCardView': {
      url: '/api/krspace-finance-web/member/card/bound-detail?id={id}',
      method: 'get'
   },
   // 会员卡原领用人列表
   'memberRecvList':{
      url: '/api/krspace-finance-web/member/card/recv-list',
      method: 'get'
   },
   //查询领用人的会员卡数
   'memberCardNum':{
      url: '/api/krspace-finance-web/member/card/actions/count-recvcard?receiveId={receiveId}',
      method: 'get'
   },
   //会员卡转移
   'transferMemberCard':{
      url: '/api/krspace-finance-web/member/card/actions/transfer?fromId={fromId}&toId={toId}',
      method: 'put'
   },
   //会员中心-会员详细信息－个人资料
    'getMemberDetailData': {
        url: '/api/krspace-finance-web/member/member?id={id}',
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

}
