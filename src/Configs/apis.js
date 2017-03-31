const APIS = {

   'delete-enter-contract': {
      url: '/api/krspace-finance-web/checkinagreement/delete-enter-contract?contractId={contractId}',
      method: 'delete'
   },
   //获取全局导航
   'getSelfMenuInfo': {
      url: '/api-old/sys/sysfunrights/sysMenu/getSelfMenuInfo',
      method: 'get'
   },
   //合同－工位信息
   'getStationOrSettingList': {
      url: '/api/krspace-finance-web/finacontractdetail/contract-detail-station?mainBillId={mainBillid}&page={page}&pageSize={pageSize}&contractId={contractId}',
      method: 'get'
   },
   //退租协议-新增-编辑
   'addFnaContractWithdrawal': {
      url: '/api/krspace-finance-web/fnaContractWithdrawalController/addFnaContractWithdrawal',
      method: 'post'
   },
   //续租协议-新增-编辑
   'addOrEditContinueContract': {
      url: '/api/krspace-finance-web/checkinagreement/addOrEditContinueContract',
      method: 'post'
   },
   //续租协议-查看
   'renewshow': {
      url: '/api/krspace-finance-web/checkinagreement/checkin-agreement/actions/show?id={id}',
      method: 'get'
   },
   //获取文件token
   'getSourceServiceToken': {
      url: '/api/krspace-finance-web/finacontractdetail/getSourceServiceToken',
      method: 'get'
   },
   //获取文件列表
   'findFileList': {
      url: '/krspace_knowledge_wap/doc/docFile/findFileList?sourceservicetoken={sourceservicetoken}&fileIds={fileIds}&jsoncallback={jsoncallback}&operater={operater}',
      method: 'get'
   },

   //文件预览
   'viewFile': {
      url: '/krspace_knowledge_wap/doc/docFile/viewFile?operater={operater}&sourceservicetoken={sourceservicetoken}&fileId={fileId}',
      method: 'get'
   },

   // 上传文件
   'uploadSingleFile': {
      url: '/api-old/krspace_knowledge_wap/doc/docFile/uploadSingleFile',
      method: 'post'
   },

   //增租协议-创建-编辑
   'addOrEditIncreaseContract': {
      url: '/api/krspace-finance-web/checkinagreement/addOrEditIncreaseContract',
      method: 'post'
   },

   //入驻协议-新增-编辑
   'addOrEditEnterContract': {
      url: '/api/krspace-finance-web/checkinagreement/addOrEditEnterContract',
      method: 'post'
   },

   //创建合同时初始化数据
   'fina-contract-intention': {
      url: '/api/krspace-finance-web/finacontractdetail/fina-contract-intention?customerId={customerId}&mainBillId={mainBillId}&type={type}',
      method: 'get'
   },
   //根据人员姓名获取人员基本信息
   'getHrmResourceExtListByLastname': {
      url: '/api-old/krspace_oa_web/interface/hrm/hrmResource/getHrmResourceExtListByLastname?lastname={lastname}',
      rap:'/mockjsdata/9/krspace_oa_web/interface/hrm/hrmResource/getHrmResourceExtListByLastname?lastname={lastname}',
      method: 'get'
   },

   //合同－退租合同－查看
   'getFnaContractWithdrawalById': {
      url: '/api/krspace-finance-web/fnaContractWithdrawalController/getFnaContractWithdrawalById?id={id}',
      method: 'get'
   },

   //合同－承租合同－查看
   'show-fina-contract-intentletter': {
      url: '/api/3/krspace-finance-web/finacontractdetail/fina-contract-intentletter/acitions/show',
      method: 'get'
   },

   //合同－承租合同－查看
   'showFinaContractIntentletter': {
      url: '/api/krspace-finance-web/finacontractdetail/fina-contract-intentletter/acitions/show?id={id}',
      method: 'get'
   },

   //合同－减租合同－查看
   'showFnaContractRentController': {
      url: '/api/krspace-finance-web/fnaContractRentController/getFnaContractRentById?id={id}',
      method: 'get'
   },
   //合同－减租合同－新建或编辑
   'getFnaContractRentController': {
      url: '/api/krspace-finance-web/fnaContractRentController/saveFnaContractRent',
      method: 'post'
   },
   //合同－(入驻合同、增租、续租)－查看
   'show-checkin-agreement': {
      url: '/api/krspace-finance-web/checkinagreement/checkin-agreement/actions/show?id={id}',
      method: 'get'
   },

   //合同－承租合同－新建
   'addFinaContractIntentletter': {
      url: '/api/krspace-finance-web/finacontractdetail/fina-contract-intentletter/actions/save',
      method: 'post'
   },
   //合同－承租合同－编辑
   'updateFinaContractIntentletter': {
      url: '/api/krspace-finance-web/finacontractdetail/fina-contract-intentletter/actions/update',
      method: 'put'
   },
   //合同－创建基础数据
   'finaContractIntention': {
      url: '/mockjsdata/3/krspace-finance-web/finacontractdetail/fina-contract-intention?communityId={communityId}&customerId={customerId}',
      method: 'get'
   },
   //合同-出租方管理-基本信息
   'getFnaCorporation': {
      url: '/api/krspace-finance-web/getFnaCorporation?id={id}',
      method: 'get'
   },

   //合同-出租方管理-编辑
   'editFnaCorporation': {
      url: '/api/krspace-finance-web/editFnaCorporation',
      method: 'post'
   },

   //合同-出租方管理-新增
   'addFnaCorporation': {
      url: '/api/krspace-finance-web/addFnaCorporation',
      method: 'post'
   },
   //合同-出租方管理-list
   'fnaCorporationList': {
      url: '/api/krspace-finance-web/fnaCorporationList?corporationName={corporationName}&page={page}&pageSize={pageSize}',
      method: 'get'
   },
   //合同-基础配置-新增
   'addSysDicPayment': {
      url: '/api/krspace-finance-web/addSysDicPayment',
      method: 'post'
   },
   //合同-基础配置-编辑
   'editSysDicPayment': {
      url: '/api/krspace-finance-web/editSysDicPayment',
      method: 'post'
   },
   //合同-基础配置-查看
   'getSysDicPayment': {
      url: '/api/krspace-finance-web/getSysDicPayment?id={id}',
      method: 'get'
   },
   //合同-基础配置-获取基本信息
   'sysDicPaymentList': {
      url: '/api/krspace-finance-web/sysDicPaymentList',
      method: 'get'
   },

   //合同－属性配置－搜索（list）
   'findFinaFinaflowPropertyList': {
      url: '/api/krspace-finance-web/finaccount/property/findFinaFinaflowPropertyList?page={currentPage}&pageSize={pageSize}&searchParam={searchParam}',
      method: 'get'
   },
   //合同－属性配置－新建
   'addFinaFinaflowProperty': {
      url: '/api/krspace-finance-web/finaccount/property/addFinaFinaflowProperty',
      method: 'post'
   },
   //demo
   'demo': {
      url: '/api/krspace-finance-web/action/community-city-selected',
      method: 'get'
   },
   //下拉菜单
   'community-city-selected': {
      url: '/api/krspace-finance-web/action/community-city-selected',
      method: 'get'
   },
   //订单基本信息名字
   'get-customName-orderName': {
      url: '/api/krspace-finance-web/action/get-customName-orderName?customerId={customerId}',
      method: 'get'
   },
   //创建新的订单
   'enter-order': {
      url: '/api/krspace-finance-web/action/enter-order',
      method: 'post'
   },
   'edit-order': {
      url: '/api/krspace-finance-web/action/edit-order',
      method: 'put'
   },
   //订单基本信息编辑信息获取
   'get-simple-order': {
      url: '/api/krspace-finance-web/action/get-simple-order?mainBillId={mainBillId}',
      method: 'get'
   },
   //订单详细信息
   'get-order-detail': {
      url: '/api/krspace-finance-web/action/get-order-detail?mainBillId={mainBillId}',
      method: 'get'
   },

   //财务管理－属性配置－列表
   'viewFinaFinaflowProperty': {
      url: '/krspace-finance-web/finaccount/property/viewFinaFinaflowProperty',
      method: 'get'
   },

   //财务管理－属性配置-查看
   'viewFinaFinaflowProperty': {
      url: '/krspace-finance-web/finaccount/property/viewFinaFinaflowProperty',
      method: 'get'
   },
   //财务管理－订单账单列表-分页获取订单
   'getFinaDataByList': {
      url: '/api/krspace-finance-web/finaccount/data/getFinaDataByAjax?page={page}&pageSize={pageSize}&mainbillname={mainbillname}&startDate={startDate}&endDate={endDate}&mainbilltype={mainbilltype}&communityid={communityid}',
      method: 'get'
   },
   //财务管理－订单账单列表-高级查询
   'getFinaDataCommunityAndMainBillType': {
      url: '/api/krspace-finance-web/finaccount/data/getFinaDataCommunityAndMainBillType',
      method: 'get'
   },
   //财务管理－订单账单列表-高级查询-订单类型
   'getMainBillTypeList': {
      url: '/api/krspace-finance-web/finaccount/data/getMainBillTypeList',
      method: 'get'
   },
   //财务管理－订单账单列表-高级查询-社区类型
   'getCommunityListByParams': {
      url: '/api/krspace-finance-web/finaccount/data/getCommunityListByParams?communityName={communityName}',
      method: 'get'
   },
   //财务管理－订单账单列表-导出
   'finaExportExcel': {
      url: '/api/krspace-finance-web/finaccount/data/exportExcel?communityid={communityid}&customername={customername}&endDate={endDate}&mainbilltype={mainbilltype}&startDate={startDate}&idList={idList}',
      method: 'get'
   },
   //财务管理－科目配置－新建(修改)
   'saveFinaFinaflowAccountModel': {
      url: '/api/krspace-finance-web/finaccount/finaFinaflowAccountModel/saveFinaFinaflowAccountModel',
      method: 'post'
   },
   //财务管理－科目配置－搜索(list)
   'getFinaFinaflowAccountModelByAjax': {
      url: '/api/krspace-finance-web/finaccount/finaFinaflowAccountModel/getFinaFinaflowAccountModelByAjax?accountname={accountname}&currentPage={currentPage}&pageSize={pageSize}',
      method: 'get'
   },
   //财务管理－科目配置－导出
   'getfinancExportExcel': {
      url: '/api/krspace-finance-web/finaccount/finaFinaflowAccountModel/exportExcel?idList={idList}',
      method: 'get'
   },
   //获取附件列表
   'getFileList': {
      url: '/api/krspace-finance-web/finacontractdetail/fileList-show?detailId={detailId}',
      method: 'get'
   },
   //附件列表保存附件
   'saveFileList': {
      url: '/api/krspace-finance-web/finacontractdetail/fileList-save?detailId={detailId}&fileId={fileId}',
      method: 'post'
   },
   //附件列表删除附件
   'deleteFileList': {
      url: '/api/krspace-finance-web/finacontractdetail/fileList-delete?detailId={detailId}&fileId={fileId}',
      method: 'delete'
   },
   //电子合同-入驻协议(入驻，增租，续租)
   'checkinagreement-print-info': {
      url: '/api/krspace-finance-web/checkinagreement/print-info?contractId={contractId}',
      method: 'get'
   },
   //电子合同-承租意向
   'intentletter-print-info': {
      url: '/api/krspace-finance-web/intentletter/print-info?contractId={contractId}',
      method: 'get'
   },
   //电子合同-减租
   'fnaContractRentController': {
      url: '/api/krspace-finance-web/fnaContractRentController/print-info?contractId={contractId}',
      method: 'get'
   },
   //个人中心-获取个人信息
   'PersonalCenterData': {
      url: '/api-old/sys/sysOwn/getPersonalInfo',
      method: 'get'
   },
   //个人中心-身份验证手机
   'PersonalCenterVerifyIdByMobile': {
      url: '/api-old/sys/sysOwn/verifyMobile?verifyCode={verifyCode}',
      method: 'get'
   },
   //个人中心-身份验证邮箱
   'PersonalCenterVerifyIdByMail': {
      url: '/api-old/sys/sysOwn/verifyEmail?verifyCode={verifyCode}',
      method: 'get'
   },
   //个人中心-获取手机验证码
   'PersonalCenterGetMobileVerificationCode': {
      url: '/api-old/sys/sysOwn/getVerifyCodeByMobile',
      method: 'get'
   },
   //个人中心-获取邮箱验证码
   'PersonalCenterGetMailVerificationCode': {
      url: '/api-old/sys/sysOwn/getVerifyCodeByEmail',
      method: 'get'
   },
   //个人中心-修改手机号时新手机号获取验证码
   'PersonalCenterGetNewMobileVerificationCode': {
      url: '/api-old/sys/sysOwn/getVerifyCodeByNewMobile?mobile={mobile}',
      method: 'get'
   },
   //个人中心-验证修改手机号验证码
   'PersonalCenterVerifyReviseMobileVerificationCode': {
      url: '/api-old/sys/sysOwn/editMobile',
      method: 'post'
   },
   //个人中心-修改密码
   'PersonalCenterVerifyRevisePwd': {
      url: '/api-old/sys/sysOwn/editPassword',
      method: 'post'
   },
   // 计划表获取合同数据
   'getRedPoint': {
      url: '/api/krspace-finance-web/finacontractdetail/plan-table/redPoint?billId={billId}&remindDate={remindDate}',
      method: 'get'
   },
   // 计划表获取合同数据
   'getBluePoint': {
      url: '/api/krspace-finance-web/finacontractdetail/plan-table/bluePoint?billId={billId}&detailId={detailId}',
      method: 'get'
   },
   //车场接口
   'getLeaveDate': {
      url: '/api/krspace-finance-web/finacontractdetail/plan-table/leaveDate?billId={billId}',
      method: 'get'
   },
   //获取出租率
   'getRate': {
      url: '/api/krspace-finance-web/finacontractdetail/plan-table/rate?year={year}&communityids={communityids}',
      method: 'get'
   },
   //数据统计-模板分组-修改与新建
   'GroupNewAndEidt': {
      url: '/api/krspace-finance-web/stat/group/actions/add-or-update',
      method: 'post'
   },
   // 计划表获取合同数据
   'getBillContract': {
      url: '/api/krspace-finance-web/finacontractdetail/plan-table/bill-contract?billId={billId}',
      method: 'get'
   },
   //会员中心-新增会员-根据邮箱查询会员是否存在
   // 'isMemberHasByEmail': {
   // 	url: '/api/krspace-finance-web/member/member-mail?email={email}',
   // 	method: 'get'
   // },
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
   //会员中心-新增会员－社区模糊查询
   'searchCommunityByCommunityText': {
      url: '/api/krspace-finance-web/member/work/community-list?communityText={communityText}',
      method: 'get'
   },
   //会员中心-新增会员－公司模糊查询
   'getCompanyByCompanyText': {
      url: '/api/krspace-finance-web/member/work/company-list?companyText={companyText}',
      method: 'get'
   },
   //会员中心-新增会员－准备数据
   // 'getMemberPosition': {
   // 	url: '/api/krspace-finance-web/member/member-add-edit?companyId={companyId}&memberId={memberId}&communityId={communityId}',
   // 	method: 'get'
   // },
   // 会员中心－新增会员－电话号码校验是否存在
   'isPhoneRegistered': {
      url: '/api/krspace-finance-web/member/member-phone?phone={phone}',
      method: 'get'
   },
   'isEmailRegistered': {
      url: '/api/krspace-finance-web/member/member-mail?email={email}',
      method: 'get'
   },
   // 会员中心-会员-获取-(查询)高级搜索
   'membersList': {
      url: '/api/krspace-finance-web/member/member-list?value={value}&type={type}&startTime={startTime}&endTime={endTime}&registerSourceId={registerSourceId}&jobId={jobId}&pageSize={pageSize}&page={page}&companyId={companyId}&cityId={cityId}',
      method: 'get'
   },
   //获取指定公司会员列表
   'getCompanyMemberList': {
      url: '/api/krspace-finance-web/member/company-team?companyId={companyId}&page={page}&pageSize={pageSize}',
      method: 'get'
   },
   //设置Leader
   'setLeader': {
      url: '/api/krspace-finance-web/member/work/leader?companyId={companyId}&isLeader={isLeader}&memberIds={memberIds}',
      method: 'put'
   },
   //新建编辑会员的准备数据
   'getMemberBasicData': {
      url: '/api/krspace-finance-web/member/member-add-edit?companyId={companyId}&memberId={memberId}&communityId={communityId}',
      method: 'get'
   },
   //新建编辑会员
   'membersChange': {
      url: '/api/krspace-finance-web/member/member',
      method: 'post'
   },
   'editMembersChange': {
      url: '/api/krspace-finance-web/member/member?companyId={companyId}&email={email}&communityId={communityId}&foreignCode={foreignCode}&jobId={jobId}&name={name}&phone={phone}&sendMsg={sendMsg}',
      method: 'put'
   },
   //验证成员
   'validMember': {
      url: '/api/krspace-finance-web/member/actions/set-as-valid?memberIds={memberIds}&companyId={companyId}',
      method: 'post'
   },
   //指定公司下的会员数据导出
   'companyMemberExcel': {
      url: '/api/krspace-finance-web/member/member-company-excel?ids={ids}&companyId={companyId}',
      method: 'get'
   },
   //根据邮箱判断手否存在
   'membersByEmail': {
      url: '/api/krspace-finance-web/member/member-mail?email={email}',
      method: 'get'
   },
   //根据会员卡号判断手否存在
   'membersByForeignCode': {
      url: '/api/krspace-finance-web/member/member-foreigncode?code={code}&codeType=foreign',
      method: 'get'
   },
   //下载导入模板
   'importExcelDemo': {
      url: '/api/krspace-finance-web/member/member-templet-excel?companyId={companyId}',
      method: 'get'
   },
   //上传会员数据
   'importMemberExcel': {
      url: '/api/krspace-finance-web/member/member-excel',
      method: 'post'
   },
   //批量删除
   'deleteMembers': {
      url: '/api/krspace-finance-web/member/actions/unbind-from-company?memberIds={memberIds}',
      method: 'delete'
   },
   //订单明细账－补历史收入
   'runStationIncome': {
      url: '/api/krspace-finance-web/finaccount/opt/runStationIncome?mainbillId={mainbillId}',
      method: 'get'
   },
   //订单明细账－补充完成之后
  'removeRunningTag': {
    url:'/api/krspace-finance-web/finaccount/opt/removeRunningTag',
    method: 'post'
  },
 	//财务管理－订单明细账-分页获得财务流水
 	'getPageAccountFlow': {
 		url: '/api/krspace-finance-web/finaccount/data/getAccountFlow?accountId={accountId}&accountType={accountType}&orderId={orderId}&endTime={endTime}&page={page}&pageSize={pageSize}&propertyId={propertyId}&startTime={startTime}',
 		method: 'get'
 	},
 	//财务管理－订单明细账-订单明细页首次加载
 	'getAccountFlow': {
 		url: '/api/krspace-finance-web/finaccount/data/getFinaContractBillDataById?accountType={accountType}&mainbillid={mainbillid}&page={page}&pageSize={pageSize}',
 		method: 'get'
 	},
 	//财务管理－订单明细账-回款
 	'receiveMoney': {
 		url: '/api/krspace-finance-web/finaccount/opt/receiveMoney',
 		method: 'post'
 	},
 	//财务管理－订单明细账-退款
 	'payBack': {
 		url: '/api/krspace-finance-web/finaccount/opt/payBack',
 		method: 'post'
 	},
 	//财务管理－订单明细账-查询代码列表
 	'findAccountList': {
 		url: '/api/krspace-finance-web/finaccount/data/findAccountList?accountType={accountType}',
 		method: 'get'
 	},
 	//财务管理－订单明细账-转押金
 	'transToDeposit': {
 		url: '/api/krspace-finance-web/finaccount/opt/transToDeposit',
 		method: 'post'
 	},
 	//财务管理－订单明细账-转押金按钮查询合同编号
 	'findContractListById': {
 		url: '/api/krspace-finance-web/finaccount/data/findContractListById?mainbillId={mainbillId}',
 		method: 'get'
 	},
 	//财务管理－订单明细账-转营收
 	'transToOperateIncome': {
 		url: '/api/krspace-finance-web//finaccount/opt/transToOperateIncome',
 		method: 'post'
 	},
 	//财务管理－订单明细账-添加挂账
 	'supplementIncome': {
 		url: '/api/krspace-finance-web//finaccount/opt/onAccount',
 		method: 'post'
 	},
 	//财务管理－订单明细账-补收入
 	'addIncome': {
 		url: '/api/krspace-finance-web/finaccount/opt/supplementIncome?mainbillid={mainbillid}',
 		method: 'get'
 	},
 	//财务管理－开票列表-list
 	'getFnaInvoiceModelListByAjax': {
 		url: '/api/krspace-finance-web/finaccount/fnaInvoiceModel/getFnaInvoiceModelListByAjax?pageSize={pageSize}&operatedate={operatedate}&page={page}&operateName={operateName}&invoiceType={invoiceType}&creater={creater}',
 		method: 'get'
 	},
 	//财务管理-订单明细账-款项查询
 	'getPropList': {
 		url: '/api/krspace-finance-web/finaccount/data/getPropList?accountType={accountType}',
 		method: 'get'
 	},
 	//财务管理-订单明细账-款项和代码列表
 	'findAccountAndPropList': {
 		url: '/api/krspace-finance-web/finaccount/data/findAccountAndPropList?accountType={accountType}',
 		method: 'get'
 	},
 	//财务管理-订单明细账-查看流水
 	'getAccountFlowDetail': {
 		url: '/api/krspace-finance-web/finaccount/data/getAccountFlowDetail?id={id}',
 		method: 'get'
 	},
 	//客户管理-计划表-分配工位-list
 	'getStation': {
 		url: '/api/krspace-finance-web/find-contract-station/station?communityIds={communityIds}&mainBillId={mainBillId}',
 		method: 'get'
 	},
 	//客户管理-计划表-撤场日期修改
 	'updateLeaveDate': {
 		url: '/api/krspace-finance-web/fina-contract-mainbill/action/update-leaveDate',
 		method: 'post'
 	},
 	//客户管理-计划表-分配员工-获取所有客户
 	'getmembers': {
 		url: '/api/krspace-finance-web/fina-contract-mainbill/members?customerId={customerId}',
 		method: 'get'
 	},
 	//客户管理-计划表-分配员工-保存更改信息
 	'changeStation': {
 		url: '/api/krspace-finance-web/find-contract-station/action/change-station',
 		method: 'post'
 	},
 	// 获取社区数据
 	'getCommunity': {
 		url: '/api-old/sys/sysdatarights/sysDatarights/getSelfDatarights',
 		method: 'get'
 	},
 	// 获取社区楼层数据
 	'getCommunityFloors': {
 		url: '/api-old/krspace_operate_web/commnuity/communityBase/getCommunityFloors?communityId={communityId}',
 		method: 'get'
 	},
 	// 计划表获取数据
 	'getInstallmentplan': {
 		url: '/api/krspace-finance-web/finacontractdetail/getInstallmentplan?year={year}&communityids={communityids}&page={page}&pageSize={pageSize}&type={type}&value={value}',
 		method: 'get'
 	},
 	//权限管理-权限管理-数据模板管理数据
 	'getDataGrouplis': {
 		url: '/mockjsdata/13/krspace-finance-web/stat/group/group-list',
 		method: 'get'
 	},
 	//数据统计-集团经营-招商数据已开业
 	'openCompanyData': {
 		url: '/api/krspace-finance-web/stat/merchant/actions/open?groupId={groupId}&endDate={endDate}&startDate={startDate}',
 		method: 'get'
 	},
 	//数据统计-集团经营-获取当前登陆人的组合模块
 	'get-my-groups': {
 		url: '/api/krspace-finance-web/stat/group/actions/get-my-groups',
 		method: 'get'
 	},
 	//数据统计-集团经营-招商数据未开业
 	'notOpenCompanyData': {
 		url: '/api/krspace-finance-web/stat/merchant/actions/notopen?groupId={groupId}&endDate={endDate}&startDate={startDate}',
 		method: 'get'
 	},
 	//数据统计-模板分组-模板列表
 	'MouldGroupList': {
 		url: '/api/krspace-finance-web/stat/group/group-list?page={page}&pageSize={pageSize}&groupName={groupName}&enable={enable}',
 		method: 'get'
 	},
 	//数据统计-模板分组-分组详情
 	'MouldGroupDetails': {
 		url: '/api/krspace-finance-web/stat/group/actions/view?id={id}',
 		method: 'get'
 	},
 	//数据统计-模板分组-新建时获取所有模板的数据
 	'GroupNewModule': {
 		url: '/api/krspace-finance-web/stat/template/list',
 		method: 'get'
 	},
 	'groupNameCheck': {
 		url: '/api/krspace-finance-web/stat/group/name/actions/check?groupName={groupName}&id={id}',
 		method: 'get'
 	},
 	'sortCheck': {
 		url: '/api/krspace-finance-web/stat/group/sort/actions/check?sort={sort}&id={id}',
 		method: 'get'
 	},
 	//合同详情-修改订单名字
 	'edit-order-name': {
 		url: ' /api/krspace-finance-web/edit-order-name',
 		method: 'put'
 	},
 	//合同详情-订单工位
 	'get-order-station': {
 		url: ' /api/krspace-finance-web/action/get-order-station?mainBillId={mainBillId}',
 		method: 'get'
 	},

  //运营平台-会员管理-会员配置-会员卡激活-会卡列表
  'CardActivationList': {
   url:'/api/krspace-finance-web/member/card/mbr-card?foreignCode={foreignCode}&page={page}&pageSize={pageSize}',
   method:'get'
 },
  //运营平台-会员管理-会员配置-列表
 'memberCardList':{
   url:'/api/krspace-finance-web/member/card/mbr-card?foreignCode={foreignCode}&page={page}&pageSize={pageSize}',
   method:'get'
 },
 //运营平台-会员管理-会员配置-会员卡激活-会卡批量激活&&运营平台-会员管理-会员配置-会员卡激活-会卡新建激活
 'CardActivation': {
   url:'/api/krspace-finance-web/member/card/mbr-card',
   method:'post'
 },
 //运营平台-会员管理-会员配置-会员卡激活-会卡编辑
 'CardEdit': {
   url:'/api/krspace-finance-web/member/card/mbr-card',
   method:'put'
 },
  //客户管理－招商线索列表
 'shareCustomers': {
   url:'/api/krspace-finance-web/customer/share-customers?page={page}&pageSize={pageSize}&company={company}&createEndDate={createEndDate}&createStartDate={createStartDate}&intentionCityId={intentionCityId}&intentionCommunityId={intentionCommunityId}&levelId={levelId}&sourceId={sourceId}',
   method:'get'
 },
  //客户管理－个人客户列表
 'personalCustomers': {
   url:'/api/krspace-finance-web/customer/personal-customers?page={page}&pageSize={pageSize}&company={company}&createEndDate={createEndDate}&createStartDate={createStartDate}&intentionCityId={intentionCityId}&intentionCommunityId={intentionCommunityId}&levelId={levelId}&sourceId={sourceId}',
   method:'get'
 },
  //客户管理－个人客户列表－导出
 'personalCustomersExport': {
   url:'/api/krspace-finance-web/customer/personal-customers-export',
   method:'get'
 },
 //客户管理－取消客户跟进
 'customerGiveBack': {
   url:'/api/krspace-finance-web/customer/actions/give-back',
   method:'post'
 },
 //客户管理－客户转移
 'customerTransfer': {
   url:'/api/krspace-finance-web/customer/actions/transfer',
   method:'post'
 },
 //客户管理－新增与编辑数据准备
 'customerDataAddList': {
   url:'/api/krspace-finance-web/customer/actions/data-list',
   method:'get'
 },
 //客户管理－新增或编辑客户
 'customerDataEdit': {
   url:'/api/krspace-finance-web/customer/actions/edit',
   method:'post'
 },
 //客户管理-公司名称实时校验
 'corpNameCheck':{
   url:'/api/krspace-finance-web/customer/check/company?id={id}&companyName={companyName}',
   method:'get'
 },
 //客户管理－新增拜访记录
 'customerVisitRecord': {
   url:'/api/krspace-finance-web/customer/visit-log/actions/add',
   method:'post'
 },
  //客户管理－根据客户获取订单列表
 'customerOrdersList': {
   url:'/api/krspace-finance-web/customer/orders?customerId={customerId}',
   method:'get'
 },
  //客户管理－签约客户列表
 'signCustomers': {
   url:'/api/krspace-finance-web/customer/sign-customers?page={page}&pageSize={pageSize}&cityId={cityId}&communityId={communityId}&company={company}&signEndDate={signEndDate}&signStartDate={signStartDate}',
   method:'get'
 },
 //客户管理－签约客户列表－导出
 'signCustomersExport': {
   url:'/api/krspace-finance-web/customer/sign-customers-export',
   method:'get'
 },
 //客户管理－获取客户编辑信息
 'get-edit-info': {
   url:'/api/krspace-finance-web/customer/actions/get-edit-info?id={id}',
   method:'get'
 },
 //客户管理－获取客户详情
 'get-detail-info': {
   url:'/api/krspace-finance-web/customer/actions/get-detail-info?id={id}&operType={operType}',
   method:'get'
 },
 //客户管理－获取项目类型树
 'get-project-types': {
   url:'/api-old/krspace_operate_web/codecategory/actions/get-project-types',
   method:'get'
 },
 //客户管理－订单删除
 'order-delete': {
   url:'/api/krspace-finance-web/fina-contract-mainbill/actions/delete?id={id}',
   method:'delete'
 },
 //客户管理－领取客户
 'receive-customer': {
   url:'/api/krspace-finance-web/customer/actions/receive',
   method:'post'
 },
 //客户管理－招商和个人高级查询准备
 'search-conditions': {
   url:'/api/krspace-finance-web/customer/personal-customers/search-conditions',
   method:'get'
 },
  //客户管理－签约高级查询准备
 'sign-search-conditions': {
   url:'/api/krspace-finance-web/customer/sign-customers/search-conditions',
   method:'get'
 },
  //订单明细账－二期－添加挂帐
  'onNewAccountg': {
    url:'/api/krspace-finance-web/finaccount/opt/onAccount',
    method: 'post'
  },
  //订单明细账－二期－点击挂帐所需数据
  'getOnNewAccountData': {
    url:'/api/krspace-finance-web/finaccount/data/getOnAccountData?mainbillId={mainbillId}',
    method: 'get'
  },
  //订单明细账－二期－根据选中id来获取金额
   'getFlowRemainMoney': {
      url: '/api/krspace-finance-web/finaccount/data/getFlowRemainMoney?flowId={flowId}',
      method: 'get'
   },
   //订单明细账－二期－点击转移加载数据
   'getTransferData': {
      url: '/api/krspace-finance-web/finaccount/data/getTransferData?flowId={flowId}&mainbillId={mainbillId}',
      method: 'get'
   },
   //订单明细账－二期－转移确定
   'transferPayment': {
      url: '/api/krspace-finance-web/finaccount/opt/transferPayment',
      method: 'post'
   },
   //订单明细账－二期－分页加载流水数据
   'getAccountNewFlow': {
      url: '/api/krspace-finance-web/finaccount/data/getAccountFlow?accountId={accountId}&accountType={accountType}&orderId={orderId}&endTime={endTime}&page={page}&pageSize={pageSize}&propertyId={propertyId}&startTime={startTime}&tradingCode={tradingCode}',
      method: 'get'
   },
   //订单明细账－二期－支付方式
   'findAccountListTwo': {
      url: '/api/krspace-finance-web/finaccount/data/findAccountList',
      method: 'get'
   },
   //订单明细账－二期－点击回款加载数据
   'getPaymentActData': {
      url: '/api/krspace-finance-web/finaccount/data/getPaymentActData?mainbillId={mainbillId}',
      method: 'get'
   },
   //订单明细账－二期－点击确定进行回款操作
   'returnMoneyNew': {
      url: '/api/krspace-finance-web/finaccount/opt/returnMoney',
      method: 'post'
   },

 'planMap': {
   url:'/api-old/krspace_operate_web/commnuity/communityFloorPlan/getCommunityFloorPlanSelData?communityId={communityId}&wherefloor={wherefloor}&mainBillId={mainBillId}&startDate={startDate}&endDate={endDate}&contractId={contractId}',
   method:'get'
 },
 //获取消息列表
 'getInfoList': {
   url:'/api/krspace-finance-web/msg/msg-info?page={page}&pageSize={pageSize}&endTime={endTime}&startTime={startTime}',
   method:'get'
 },
 //消息设为已读
 'setInfoReaded': {
   url:'/api/krspace-finance-web/msg/msg-read?id={id}',
   method:'put'
 },
 //获取未读消息数
 'getUnReadInfo': {
   url:'/api/krspace-finance-web/msg/msg-count?&endTime={endTime}&startTime={startTime}',
   method:'get'
 },
 //客户管理－获取招商人员列表
 'get-receive-list': {
   url:'/api/krspace-finance-web/customer/actions/get-receive-list?searchKey={searchKey}',
   method:'get'
 },
 //计算工位总价
 'getAllRent':{
   url:'/api/krspace-finance-web/finacontractdetail/fina-contract-all/line-total',
   method:'post'
 },
 //减租计算工位总价
 'reduceGetAllRent':{
   url:'/api/krspace-finance-web/finacontractdetail/fina-contract-all/reduc-line-total',
   method:'post'
 },
 //合同列表-列表接口
   'contract-list':{
   url:'/api/krspace-finance-web/finacontractdetail/contract-list?createDateBegin={createDateBegin}&createDateEnd={createDateEnd}&page={page}&pageSize={pageSize}&cityName={cityName}&communityName={communityName}&createrName={createrName}&customerName={customerName}&salerName={salerName}',
   method:'get'
   },
 //合同列表-客户订单下拉接口
   'orders-names':{
   url:'/api/krspace-finance-web/customer/orders-names?customerId={customerId}',
   method:'get'
   },
 //合同列表-客户名称下拉接口
   'customers-names':{
      url:'/api/krspace-finance-web/customer/my-customers?company={company}',
      method:'get'
   },
 //合同列表-获取合同是否可创建
   'contracts-creation':{
      url:'/api/krspace-finance-web/fina-contract-mainbill/contracts-creation?mainBillId={mainBillId}',
      method:'get'
   },
   //合同列表-获取登录人是否有创建合同的权限
   'edit-right':{
      url:'/api/krspace-finance-web/finacontractdetail/contract-list/edit-right',
      method:'get'
   },

//运营平台-基础配置-设备定义-设备列表
 'equipmentList': {
   url:'/api/krspace-finance-web/community/sysDeviceDefinition/device-list?communityId={communityId}&deviceCode={deviceCode}&floor={floor}&functionId={functionId}&hardwareId={hardwareId}&page={page}&pageSize={pageSize}&propertyId={propertyId}&typeId={typeId}',
   method:'get'
 },
  //运营平台-基础配置-设备定义-新增或编辑
 'equipmentNewCreateOrEdit': {
   url:'/api/krspace-finance-web/community/sysDeviceDefinition/device-definition',
   method:'post'
 },
  //运营平台-基础配置-设备定义-门编号、智能硬件ID判重
 'doorNumberAndHardwareId': {
   url:'/api/krspace-finance-web/community/sysDeviceDefinition/door-hardware-repetition?type={type}&code={code}&id={id}',
   method:'get'
 },
 //运营平台-基础配置-设备定义-获取楼层
 'getFloorByComunity': {
   url:'/api/krspace-finance-web/community/sysDeviceDefinition/getWherefloor?communityId={communityId}',
   method:'get'
 },
 //运营平台-基础配置-设备定义-根据属性获取对应位置
 'getLocationByProperty': {
   url:'/api/krspace-finance-web/community/community-boardroom?communityId={communityId}&whereFloor={whereFloor}',
   method:'get'
 },
 //运营平台-基础配置-设备定义-传图片
 'postEquipmentImg': {
   url:'/api/krspace-finance-web/community/sysDeviceDefinition/upload-pic',
   method:'post'
 },
 //运营平台-基础配置-设备定义-根据设备上下线
 'onlineOrOffline': {
   url:'/api/krspace-finance-web/community/sysDeviceDefinition/editOnlineForSysDeviceDefinition',
   method:'post'
 },
 //运营平台-基础配置-设备定义-向指定社区推送图片(单张)
  'uploadImgToEquipmentSingle': {
   url:'/api/krspace-finance-web/community/sysDeviceDefinition/single-push-device',
   method:'post'
 },
 //运营平台-基础配置-设备定义-向指定社区推送图片（多张）
 'oploadImgToEquipment': {
   url:'/api/krspace-finance-web/community/sysDeviceDefinition/push-device',
   method:'post'
 },
 //运营平台-基础配置-设备定义-获取真实设备ID
 'getEquipmentNum': {
   url:'/api/krspace-finance-web/community/sysDeviceDefinition/device-filter',
   method:'post'
 },
  //运营平台-基础配置-设备定义-获取社区机器之下设备
  'getCommunityEquipment': {
   url:'/api/krspace-finance-web/community/sysDeviceDefinition/community-hardware',
   method:'get'
 },
  //运营平台-基础配置-设备定义-轮询获取推送结果
  'getPushImgRes': {
   url:'/api/krspace-finance-web/community/sysDeviceDefinition/getPollingResult',
   method:'get'
 },
 //运营平台-基础配置-设备定义-获取上传图片成功／失败数据
  'getSuccedOrErrData': {
   url:'/api/krspace-finance-web/community/sysDeviceDefinition/getSendResult',
   method:'get'
 },
 //社区配置－社区列表
  'communitySearch':{
   url:'/api/krspace-finance-web/cmt/community/list/type/search?businessAreaId={businessAreaId}&openDateBegin={openDateBegin}&openDateEnd={openDateEnd}&cityId={cityId}&countyId={countyId}&opened={opened}&searchKey={searchKey}&searchType={searchType}&pageSize={pageSize}&page={page}&portalShow={portalShow}',
   method:'get'
 },
  //社区配置－社区列表数据准备
  'list-param-data':{
   url:'/api/krspace-finance-web/cmt/community/list-param-data',
   method:'get'
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
    //社区管理－校验社区名称
   'check-name':{
      url: '/api/krspace-finance-web/cmt/community/check/name?id={id}&name={name}',
      method: 'get'
   },
    //社区管理－校验社区名称
   'check-code':{
      url: '/api/krspace-finance-web/cmt/community/check/code?id={id}&code={code}',
      method: 'get'
   },
    //社区管理－社区新增或编辑
   'actions-edit':{
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
   //客户公海列表－查询
   'highSeaSearch':{
      url: '/api/krspace-finance-web/csr/market/list/type/search?cityId={cityId}&page={page}&pageSize={pageSize}&sourceId={sourceId}',
      method: 'get'
   },
    //客户公海列表－客户公海列表数据准备
   'highSeaDataReday':{
      url: '/api/krspace-finance-web/csr/market/list-param-data',
      method: 'get'
   },
   //客户公海列表－获取导入结果接口
   'highSeaDataGet':{
      url: '/api/krspace-finance-web/csr/market/import/actions/get-result?batchId={batchId}',
      method: 'get'
   },
   //客户公海列表－客户公海导入数据准备
   'highSourceName':{
      url: '/api/krspace-finance-web/csr/market/upload-param-data?sourceName={sourceName}',
      method: 'get'
   },
 }

 module.exports = APIS;
