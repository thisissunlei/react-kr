
//同步系统

module.exports = {
	//同步主体列表
   'sync-list':{
      url: '/api/krspace-finance-web/sso/mobsync/sync-mainpart-lis?name={name}&systemId={systemId}&page={page}&pageSize={pageSize}',
      method: 'get'
   },
   //同步系统下拉选择
   'system-select-list':{
      url: '/api/krspace-finance-web/sso/mobsync/system-select-list',
      method: 'get'
   },
   //同步主体下拉选择
   'system-select-list':{
      url: '/api/krspace-finance-web/sso/mobsync/main-select-list',
      method: 'get'
   },
   //
   //同步系统列表
   'system-list':{
      url: '/api/krspace-finance-web/sso/mobsync/sync-system-list?name={name}',
      method: 'get'
   },
   //手动同步
   'system-list':{
      url: '/api/krspace-finance-web/sso/mobsync/manual-sync',
      method: 'post'
   },
   //新增编辑同步系统
   'sync-system':{
      url: '/api/krspace-finance-web/sso/mobsync/sync-system',
      method: 'post'
   },
   //新增编辑同步主体
   'sync-main-part':{
      url: '/api/krspace-finance-web/sso/mobsync/sync-main-part',
      method: 'post'
   },
   // 新建编辑订阅
   'new-sync-main-system':{
      url: '/api/krspace-finance-web/sso/mobsync/sync-main-system',
      method: 'post'
   },
   //日志列表
   'sync-log-list':{
      url: '/api/krspace-finance-web/sso/mobsync/sync-log-list?page={page}&pageSize={pageSize}&beginDate={beginDate}&content={content}&endDate={endDate}&mainpartId={mainpartId}&mode={mode}&status={Status}',
      method: 'get'
   },
   //日志列表重新同步
   're-sync':{
      url: '/api/krspace-finance-web/sso/mobsync/re-sync',
      method: 'post'
   },
   //订阅列表
   'sync-main-system-list':{
      url: '/api/krspace-finance-web/sso/mobsync/sync-main-system-list?page={page}&pageSize={pageSize}&mainId={mainId}&systemId={systemId}',
      method: 'get'
   },
   
}
