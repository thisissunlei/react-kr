
//智能硬件

module.exports = {
	

	//二代们近列表
   'getDecondeEquipmentList':{
      url: '/api/iot-platform/door-device/list?communityId={communityId}&deviceId={deviceId}&doorCode={doorCode}&doorType={doorType}&floor={floor}&page={page}&pageSize={pageSize}&maker={maker}&title={title}&logined={logined}',
      method: 'get'
   },
   //新增编辑设备实时校验编号
   'getDeviceIDRepeat':{
      url: '/api/iot-platform/door-device/deviceid-check?deviceId={deviceId}&id={id}',
      method: 'get'
   },
   //新增编辑设备
   'addOrEditEquipment':{
      url: '/api/iot-platform/door-device/edit?communityId={communityId}&deviceId={deviceId}&doorCode={doorCode}&doorType={doorType}&floor={floor}&maker={maker}&memo={memo}&roomId={roomId}&title={title}&id={id}',
      method: 'put'
   },
   //批量删除设备
   'deleteEquipmentBatch':{
      url: '/api/iot-platform/door-device/delete-batch',
      method: 'post'
   },

   //单个删除
   'deleteEquipmentSingleURL':{
      url: '/api/iot-platform/door-device/delete?id={id}',
      method: 'delete'
   },
    
    //获取为使用设备list
   'getUnusedEquipment':{
      url: '/api/iot-platform/door-device/unused-list',
      method: 'get'
   },
   //将没有用过的设备添加到列表中
   'changeUnusedToList':{
      url: '/api/iot-platform/door-device/enable',
      method: 'post'
   },

    //开门记录；列表
   'getOpenLogList':{
      url: '/api/iot-platform/door-open-log/list?communityId={communityId}&deviceId={deviceId}&edate={edate}&memberName={memberName}&page={page}&pageSize={pageSize}&phone={phone}&sdate={sdate}',
      method: 'get'
   },

   //报警日志列表
   'getWarningLog':{
      url: '/api/iot-platform/device-log/list?deviceId={deviceId}&etime={etime}&logType={logType}&page={page}&pageSize={pageSize}&stime={stime}',
      method: 'get'
   },

   //获取字典（报警日志）
   'getWarningType':{
      url: '/api/iot-platform/dict/common',
      method: 'get'
   },

   //升级设备
   'upgradeEquipment':{
      url: '/api/iot-platform/door-device/admin/upgrade',
      method: 'post'
   },

   //清空设备缓存
   'clearEquipmentCacheURL':{
      url: '/api/iot-platform/door-card-burn/clear',
      method: 'post'
   },

   //断开重连
   'disconnnetEquipmentURL':{
      url: '/api/iot-platform/door-device/admin/disconnect',
      method: 'post'
   },

   //获取口令
   'getPasswordURL':{
      url: '/api/iot-platform/door-device/admin/totp-code?deviceId={deviceId}',
      method: 'get'
   },


   //远程开门
   'openDoorOnlineURL':{
      url: '/api/iot-platform/door-device/admin/open-door',
      method: 'post'
   },

   //查看设备缓存
   'getEquipmentCacheURL':{
      url: '/api/iot-platform/door-device/admin/card-rule/list?deviceId={deviceId}&lastCardNo={lastCardNo}&limit={limit}',
      method: 'get'
   },

   //获取发现设备开关的状态
   'getSwitchStatusUrl':{
      url: '/api/iot-platform/door-device/init-on-off',
      method: 'get'
   },

   //设置设备自动连接入库
   'changeSwitchStatusUrl':{
      url: '/api/iot-platform/door-device/init-on-off/switch',
      method: 'post'
   },


   //设置重启设备系统
   'restartSystemsUrl':{
      url: '/api/iot-platform/door-device/admin/actions/reboot-os?deviceId={deviceId}',
      method: 'put'
   },

    //设置APP
   'restartAPPUrl':{
      url: '/api/iot-platform/door-device/admin/actions/reboot-app?deviceId={deviceId}',
      method: 'put'
   },


    //获取管理员密码
   'getManagerPsdUrl':{
      url: '/api/iot-platform/door-device/admin/admin-pwd?deviceId={deviceId}',
      method: 'get'
   },

   //恢复出厂设置
   'resetEquipmentUrl':{
      url: '/api/iot-platform/door-device/admin/actions/reset-config?deviceId={deviceId}',
      method: 'put'
   },

   //刷新H5
   'freshHTMLUrl':{
      url: '/api/iot-platform/door-device/admin/actions/refresh-screen?deviceId={deviceId}',
      method: 'put'
   },


   //更新设备上报信息
   'freshReporteInfoUrl':{
      url: '/api/iot-platform/door-device/admin/actions/refresh-reported-info?deviceId={deviceId}',
      method: 'get'
   },


   //获取升级包管理地址
   'upgradeInfoListUrl':{
      url: '/api/iot-platform/device-upgrade/list?page={page}&pageSize={pageSize}',
      method: 'get'
   },

   //添加升级版本信息
   'newCreateUpgradeUrl':{
      url: '/api/iot-platform/device-upgrade/actions/add',
      method: 'post'
   },

   //确认删除升级信息
   'deleteUpgradeInfo':{
      url: '/api/iot-platform/device-upgrade/actions/delete?id={id}',
      method: 'delete'
   },

   //获取升级信息下拉列表
   'getUpgradeInfoUrl':{
      url: '/api/iot-platform/device-upgrade/select',
      method: 'get'
   },

   //获取升级信息下拉列表
   'SynchronizingUrl':{
      url: '/api/iot-platform/door-device/admin/actions/refresh-totpkey',
      method: 'post'
   },

   //发现设备强制删除
   'deleteFindEquipmentUrl':{
      url: '/api/iot-platform/door-device/unused/actions/delete',
      method: 'post'
   },


   //获取设备详情
   'getSecEquipmentDetailUrl':{
      url: '/api/iot-platform/door-device/detail?id={id}',
      method: 'get'
   },

   //获取编辑准备数据
   'getEditEquipmentUrl':{
      
      url: '/api/iot-platform/door-device/view?id={id}',
      method: 'get'
   },

   //一代门禁获取设备详情
   'getFirstEquipmentDetailUrl':{
      url: '/api/iot-platform/door-device/v1/detail?id={id}',
      method: 'get'
   },


   //一代门禁重置
   'resetFirstEquipmentUrl':{
      url: '/api/iot-platform/door-device/v1/admin/actions/reset-to-php?deviceId={deviceId}',
      method: 'put'
   },

   //一代门禁生成二维码
   'productQRCodeUrl':{
      url: '/api/iot-platform/door-device/actions/generate-qr-code?deviceId={deviceId}',
      method: 'put'
   },

   //getHttpTokenURL
   'getHttpTokenURL':{

      url: '/api/iot-platform/door-device/admin/http-token?deviceId={deviceId}',
      method: 'get'
   },

   //批量上传
   'batchUpgradeUrl':{
      
      url: '/api/iot-platform/door-device/admin/batch-upgrade',
      method: 'post'
   },

   //上传之前获取签名
   'getSignatureUrl' : {
      url: '/api/krspace-sso-web/common/upload-policy?isPublic={isPublic}&category={category}',
      method: 'get'
   },

   //打印机列表数据
   'printerManageList': {
      url: '/api/iot-platform/printer/list?serialNo={serialNo}&communityId={communityId}&alias={alias}&readerName={readerName}&printerName={printerName}&pageSize={pageSize}&page={page}',
      method: 'get'
   },

     //新增打印机数据
   'newCreatePrinter': {
      url: '/api/iot-platform/printer/actions/add',
      method: 'post'
   },


     //删除打印机数据
   'deletePrinter': {
      url: '/api/iot-platform/printer/actions/delete?id={id}',
      method: 'delete'
   },


     //编辑和详情回显
   'printerDetailInfo': {
      url: '/api/iot-platform/printer/detail?id={id}',
      method: 'get'
   },


     //编辑提交
   'editPrinter': {
      url: '/api/iot-platform/printer/actions/edit?alias={alias}&communityId={communityId}&id={id}&location={location}&printerName={printerName}&readerName={readerName}&serialNo={serialNo}',
      method: 'put'
   },


   //打印配置列表
   'PrinterConifigList': {
      url: '/api/iot-platform/print-community/list?communityId={communityId}&page={page}&pageSize={pageSize}',
      method: 'get'
   },

   //新增打印配置
   'addPrinterConfig': {
      url: '/api/iot-platform/print-community/actions/add',
      method: 'post'
   },


   //删除打印配置
   'deletePrinterConfig': {
      url: '/api/iot-platform/print-community/actions/delete?id={id}',
      method: 'delete'
   },


   //编辑打印配置
   'editPrinterConfig' : {
      url: '/api/iot-platform/print-community/actions/edit?communityId={communityId}&id={id}&nodeIp={nodeIp}&priceId={priceId}',
      method: 'put'
   },


   //打印记录列表
   'printLogUrl': {
      url: '/api/iot-platform/print-record/list?communityId={communityId}&customerId={customerId}&endDate={endDate}&jobType={jobType}&page={page}&pageSize={pageSize}&printerName={printerName}&startDate={startDate}&accountNo={accountNo}',
      method: 'get'
   },


   //新增价格策略
   'newCreatePriceUrl':{
      url: '/api/iot-platform/print-price/actions/add',
      method: 'post'
   },
 

   //获取价格配置列表数据
   'getPriceConfigListUrl' :{
      url: '/api/iot-platform/print-price/list?name={name}&page={page}&pageSize={pageSize}',
      method: 'get'
   },

   //打印机价格策略
   'getPrintPriceList':{
      url: '/api/iot-platform/print-price/select-option?name={name}',
      method: 'get'
   },


   //费用配置编辑回显
   'getDetailPriceUrl':{
      url: '/api/iot-platform/print-price/detail?id={id}',
      method: 'get'
   },


   //费用配置编辑
   'editPriceUrl':{
      url: '/api/iot-platform/print-price/actions/edit?id={id}&colorPrice={colorPrice}&monoPrice={monoPrice}&name={name}&paperPrice={paperPrice}&scanPrice={scanPrice}',
      method: 'put'
   },

   

   //删除费用配置
   'deleteConfigListUrl':{
      url : '/api/iot-platform/print-price/actions/delete?id={id}',
      method : 'delete'
   },
   
   
}
