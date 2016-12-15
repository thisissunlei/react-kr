 const APIS = {

	'delete-enter-contract': {
		url: '/mockjsdata/4/checkinagreement/delete-enter-contract?contractId={contractId}',
		method: 'delete'
	},
	//获取全局导航
	'getSelfMenuInfo': {
		url: '/api-old/sys/sysfunrights/sysMenu/getSelfMenuInfo',
		method: 'get'
	},
	//合同－工位信息
	'getStationOrSettingList': {
		url: '/mockjsdata/4/finacontractdetail/contract-detail-station?mainBillId={mainBillid}&page={page}&pageSize={pageSize}&contractId={contractId}',
		method: 'get'
	},
	//退租协议-新增-编辑
	'addFnaContractWithdrawal': {
		url: '/mockjsdata/4/fnaContractWithdrawalController/addFnaContractWithdrawal',
		method: 'post'
	},
	//续租协议-新增-编辑
	'addOrEditContinueContract': {
		url: '/mockjsdata/4/checkinagreement/addOrEditContinueContract',
		method: 'post'
	},
	//续租协议-查看
	'renewshow': {
		url: '/mockjsdata/4/checkinagreement/checkin-agreement/actions/show?id={id}',
		method: 'get'
	},


	//获取文件token
	'getSourceServiceToken': {
		url: '/mockjsdata/4/finacontractdetail/getSourceServiceToken',
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

	// 上传文件
	'uploadSingleFile': {
		url: '/api-old/krspace_knowledge_wap/doc/docFile/uploadSingleFile',
		method: 'post'
	},

	//增租协议-创建-编辑
	'addOrEditIncreaseContract': {
		url: '/mockjsdata/4/checkinagreement/addOrEditIncreaseContract',
		method: 'post'
	},

	//入驻协议-新增-编辑
	'addOrEditEnterContract': {
		url: '/mockjsdata/4/checkinagreement/addOrEditEnterContract',
		method: 'post'
	},

	//创建合同时初始化数据
	'fina-contract-intention': {
		url: '/mockjsdata/4/finacontractdetail/fina-contract-intention?customerId={customerId}&mainBillId={mainBillId}',
		method: 'get'
	},

	//根据人员姓名获取人员基本信息
	'getHrmResourceExtListByLastname': {
		url: '/api-old/krspace_oa_web/interface/hrm/hrmResource/getHrmResourceExtListByLastname?lastname={lastname}',
		rap: '/mockjsdatadata/9/krspace_oa_web/interface/hrm/hrmResource/getHrmResourceExtListByLastname?lastname={lastname}',
		method: 'get'
	},

	//合同－退租合同－查看
	'getFnaContractWithdrawalById': {
		url: '/mockjsdata/4/fnaContractWithdrawalController/getFnaContractWithdrawalById?id={id}',
		method: 'get'
	},

	//合同－承租合同－查看
	'show-fina-contract-intentletter': {
		url: '/api/3/krspace-finance-web/finacontractdetail/fina-contract-intentletter/acitions/show',
		method: 'get'
	},

	//合同－承租合同－查看
	'showFinaContractIntentletter': {
		url: '/mockjsdata/4/finacontractdetail/fina-contract-intentletter/acitions/show?id={id}',
		method: 'get'
	},

	//合同－减租合同－查看
	'showFnaContractRentController': {
		url: '/mockjsdata/4/fnaContractRentController/getFnaContractRentById?id={id}',
		method: 'get'
	},
	//合同－减租合同－新建或编辑
	'getFnaContractRentController': {
		url: '/mockjsdata/4/fnaContractRentController/saveFnaContractRent',
		method: 'post'
	},
	//合同－(入驻合同、增租、续租)－查看
	'show-checkin-agreement': {
		url: '/mockjsdata/4/checkinagreement/checkin-agreement/actions/show?id={id}',
		method: 'get'
	},

	//合同－承租合同－新建
	'addFinaContractIntentletter': {
		url: '/mockjsdata/4/finacontractdetail/fina-contract-intentletter/actions/save',
		method: 'post'
	},
	//合同－承租合同－编辑
	'updateFinaContractIntentletter': {
		url: '/mockjsdata/4/finacontractdetail/fina-contract-intentletter/actions/update',
		method: 'put'
	},
	//合同－创建基础数据
	'finaContractIntention': {
		url: '/mockjsdatadata/3/krspace-finance-web/finacontractdetail/fina-contract-intention?communityId={communityId}&customerId={customerId}',
		method: 'get'
	},
	//合同-出租方管理-基本信息
	'getFnaCorporation': {
		url: '/mockjsdata/4/getFnaCorporation?id={id}',
		method: 'get'
	},

	//合同-出租方管理-编辑
	'editFnaCorporation': {
		url: '/mockjsdata/4/editFnaCorporation',
		method: 'post'
	},

	//合同-出租方管理-新增
	'addFnaCorporation': {
		url: '/mockjsdata/4/addFnaCorporation',
		method: 'post'
	},
	//合同-出租方管理-list
	'fnaCorporationList': {
		url: '/mockjsdata/4/fnaCorporationList?corporationName={corporationName}&page={page}&pageSize={pageSize}',
		method: 'get'
	},
	//合同-基础配置-新增
	'addSysDicPayment': {
		url: '/mockjsdata/4/addSysDicPayment',
		method: 'post'
	},
	//合同-基础配置-编辑
	'editSysDicPayment': {
		url: '/mockjsdata/4/editSysDicPayment',
		method: 'post'
	},
	//合同-基础配置-查看
	'getSysDicPayment': {
		url: '/mockjsdata/4/getSysDicPayment?id={id}',
		method: 'get'
	},
	//合同-基础配置-获取基本信息
	'sysDicPaymentList': {
		url: '/mockjsdata/4/sysDicPaymentList',
		method: 'get'
	},

	//合同－属性配置－搜索（list）
	'findFinaFinaflowPropertyList': {
		url: '/mockjsdata/4/finaccount/property/findFinaFinaflowPropertyList?page={currentPage}&pageSize={pageSize}&searchParam={searchParam}',
		method: 'get'
	},
	//合同－属性配置－新建
	'addFinaFinaflowProperty': {
		url: '/mockjsdata/4/finaccount/property/addFinaFinaflowProperty',
		method: 'post'
	},
	//demo
	'demo': {
		url: '/mockjsdata/4/action/community-city-selected',
		method: 'get'
	},

	'community-city-selected': {
		url: '/mockjsdata/4/action/community-city-selected',
		method: 'get'
	},
	//订单基本信息
	'get-customName-orderName': {
		url: '/mockjsdata/4/action/get-customName-orderName?customerId={customerId}',
		method: 'get'
	},
	//创建新的订单
	'enter-order': {
		url: '/mockjsdata/4/action/enter-order',
		method: 'post'
	},
	'edit-order': {
		url: '/mockjsdata/4/action/edit-order',
		method: 'put'
	},
	//订单基本信息
	'get-simple-order': {
		url: '/mockjsdata/4/action/get-simple-order?mainBillId={mainBillId}',
		method: 'get'
	},
	//订单详细信息
	'get-order-detail': {
		url: '/mockjsdata/4/action/get-order-detail?mainBillId={mainBillId}',
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
	//财务管理－订单账单列表-生成对账单
	'getFinaDataDetailAdd': {
		url: '/mockjsdata/4/finaccount/data/getFinaDataDetailById?id={id}&startDate={startDate}&endDate={endDate}',
		method: 'get'
	},
	//财务管理－订单账单列表-高级查询
	'getFinaDataCommunityAndMainBillType': {
		url: '/mockjsdata/4/finaccount/data/getFinaDataCommunityAndMainBillType',
		method: 'get'
	},
	//财务管理－订单账单列表-高级查询-订单类型
	'getMainBillTypeList': {
		url:'/api/krspace-finance-web/finaccount/data/getMainBillTypeList',
		method: 'get'
	},
	//财务管理－订单账单列表-高级查询-社区类型
	'getCommunityListByParams': {
		url:'/api/krspace-finance-web/finaccount/data/getCommunityListByParams?communityName={communityName}',
		method: 'get'
	},
	//财务管理－订单账单列表-导出
	'finaExportExcel': {
		url: '/mockjsdata/4/finaccount/data/exportExcel?communityid={communityid}&customername={customername}&endDate={endDate}&mainbilltype={mainbilltype}&startDate={startDate}&idList={idList}',
		method: 'get'
	},
	//财务管理－科目配置－新建(修改)
	'saveFinaFinaflowAccountModel': {
		url: '/mockjsdata/4/finaccount/finaFinaflowAccountModel/saveFinaFinaflowAccountModel',
		method: 'post'
	},
	//财务管理－科目配置－搜索(list)
	'getFinaFinaflowAccountModelByAjax': {
		url: '/mockjsdata/4/finaccount/finaFinaflowAccountModel/getFinaFinaflowAccountModelByAjax?accountname={accountname}&currentPage={currentPage}&pageSize={pageSize}',
		method: 'get'
	},
	//财务管理－科目配置－导出
	'getfinancExportExcel': {
		url: '/mockjsdata/4/finaccount/finaFinaflowAccountModel/exportExcel?idList={idList}',
		method: 'get'
	},

	//财务管理－订单明细账-分页获得财务流水
	'getPageAccountFlow': {
		url: '/mockjsdata/4/finaccount/data/getAccountFlow?accountId={accountId}&accountType={accountType}&orderId={orderId}&endTime={endTime}&page={page}&pageSize={pageSize}&propertyId={propertyId}&startTime={startTime}',
		method: 'get'
	},
	//财务管理－订单明细账-订单明细页首次加载
	'getAccountFlow': {
		url: '/mockjsdata/4/finaccount/data/getFinaContractBillDataById?accountType={accountType}&mainbillid={mainbillid}&page={page}&pageSize={pageSize}',
		method: 'get'
	},
	//财务管理－订单明细账-回款
	'receiveMoney': {
		url: '/mockjsdata/4/finaccount/opt/receiveMoney',
		method: 'post'
	},
	//财务管理－订单明细账-退款
	'payBack': {
		url: '/mockjsdata/4/finaccount/opt/payBack',
		method: 'post'
	},
	//财务管理－订单明细账-查询代码列表
	'findAccountList': {
		url: '/mockjsdata/4/finaccount/data/findAccountList?accountType={accountType}',
		method: 'get'
	},
	//财务管理－订单明细账-转押金
	'transToDeposit': {
		url: '/mockjsdata/4/finaccount/opt/transToDeposit',
		method: 'post'
	},
	//财务管理－订单明细账-转押金按钮查询合同编号
	'findContractListById': {
		url: '/mockjsdata/4/finaccount/data/findContractListById?id={id}',
		method: 'get'
	},
	//财务管理－订单明细账-转营收
	'transToOperateIncome': {
		url: '/mockjsdata/4//finaccount/opt/transToOperateIncome',
		method: 'post'
	},
	//财务管理－订单明细账-添加挂账
	'supplementIncome': {
		url: '/mockjsdata/4//finaccount/opt/onAccount',
		method: 'post'
	},
	//财务管理－订单明细账-补收入
	'addIncome': {
		url: '/mockjsdata/4/finaccount/opt/supplementIncome?mainbillid={mainbillid}',
		method: 'get'
	},
	//财务管理－开票列表-list
	'getFnaInvoiceModelListByAjax': {
		url: '/mockjsdata/4/finaccount/fnaInvoiceModel/getFnaInvoiceModelListByAjax?pageSize={pageSize}&operatedate={operatedate}&page={page}&operateName={operateName}&invoiceType={invoiceType}&creater={creater}',
		method: 'get'
	},
	//财务管理-订单明细账-款项查询
	'getPropList': {
		url: '/mockjsdata/4/finaccount/data/getPropList?accountType={accountType}',
		method: 'get'
	},
	//财务管理-订单明细账-款项和代码列表
	'findAccountAndPropList': {
		url: '/mockjsdata/4/finaccount/data/findAccountAndPropList?accountType={accountType}',
		method: 'get'
	},
	//财务管理-订单明细账-查看流水
	'getAccountFlowDetail': {
		url: '/mockjsdata/4/finaccount/data/getAccountFlowDetail?id={id}',
		method: 'get'
	},
	//客户管理-计划表-分配工位-list
	'getStation': {
		url: '/mockjsdata/4/find-contract-station/station?communityIds={communityIds}&mainBillId={mainBillId}',
		method: 'get'
	},
	//客户管理-计划表-撤场日期修改
	'updateLeaveDate': {
		url: '/mockjsdata/4/fina-contract-mainbill/action/update-leaveDate',
		method: 'post'
	},
	//客户管理-计划表-分配员工-获取所有客户
	'getmembers': {
		url: '/mockjsdata/4/fina-contract-mainbill/members?customerId={customerId}',
		method: 'get'
	},
	//客户管理-计划表-分配员工-保存更改信息
	'changeStation': {
		url: '/mockjsdata/4/find-contract-station/action/change-station',
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
		url: '/mockjsdata/4/finacontractdetail/getInstallmentplan?year={year}&communityids={communityids}&page={page}&pageSize={pageSize}&type={type}&value={value}',
		method: 'get'
	},
	//权限管理-权限管理-数据模板管理数据
	'getDataGrouplis': {
		url: '/mockjsdatadata/13/krspace-finance-web/stat/group/group-list',
		method: 'get'
	},
	//数据统计-集团经营-招商数据已开业
	'openCompanyData': {
		url: '/mockjsdata/4/stat/merchant/actions/open?groupId={groupId}&endDate={endDate}&startDate={startDate}',
		method: 'get'
	},
	//数据统计-集团经营-获取当前登陆人的组合模块
	'get-my-groups': {
		url: '/mockjsdata/4/stat/group/actions/get-my-groups',
		method: 'get'
	},
	//数据统计-集团经营-招商数据未开业
	'notOpenCompanyData': {
		url: '/mockjsdata/4/stat/merchant/actions/notopen?groupId={groupId}&endDate={endDate}&startDate={startDate}',
		method: 'get'
	},
	//数据统计-模板分组-模板列表
	'MouldGroupList': {
		url: '/mockjsdata/4/stat/group/group-list?page={page}&pageSize={pageSize}&groupName={groupName}&enable={enable}',
		method: 'get'
	},
	//数据统计-模板分组-分组详情
	'MouldGroupDetails': {
		url: '/mockjsdata/4/stat/group/actions/view?id={id}',
		method: 'get'
	},
	//数据统计-模板分组-修改与新建
	'GroupNewAndEidt': {
		url: '/mockjsdata/4/stat/group/actions/add-or-update',
		method: 'post'
	},
	//数据统计-模板分组-新建时获取所有模板的数据
	'GroupNewModule': {
		url: '/mockjsdata/4/stat/template/list',
		method: 'get'
	},
	'groupNameCheck': {
		url: '/mockjsdata/4/stat/group/name/actions/check?groupName={groupName}&id={id}',
		method: 'get'
	},
	'sortCheck': {
		url: '/mockjsdata/4/stat/group/sort/actions/check?sort={sort}&id={id}',
		method: 'get'
	},
	//会员中心-会员列表-获取所有会员信息
	// 'membersList': {
	// 	url: '/mockjsdata/4/member/member-list?page={page}&pageSize={pageSize}',
	// 	method: 'get'
	// },
	//会员中心-会员详细信息－个人资料
	'getMemberDetailData': {
		url: '/mockjsdata/4/member/member?id={id}',
		method: 'get'
	},
	// 会员中心-会员详细信息－个人行为
	'getPersonalBehavior': {
		url: '/mockjsdata/4/member/mbr-device-log?page={page}&pageSize={pageSize}&memberId={memberId}&startTime={startTime}&endTime={endTime}',
		method: 'get'
	},
  // 会员中心-会员详细信息－组织架构
	'getOrganizationChart': {
		url: '/mockjsdata/4/member/company-team?page={page}&pageSize={pageSize}&memberId={memberId}',
		method: 'get'
	},
  // 会员中心－会员详细信息－更新日志
  'getUpdateLog': {
		url: '/mockjsdata/4/member/mbr-log?page={page}&pageSize={pageSize}&memberId={memberId}&startTime={startTime}&endTime={endTime}',
		method: 'get'
	},
	//会员中心-新增会员－社区模糊查询
	'searchCommunityByCommunityText': {
		url: '/mockjsdata/4/member/work/community-list?communityText={communityText}',
		method: 'get'
	},
  //会员中心-新增会员－公司模糊查询
  'getCompanyByCompanyText': {
		url: '/mockjsdata/4/member/work/company-list?companyText={companyText}',
		method: 'get'
	},
  //会员中心-新增会员－职位准备数据
  'getMemberPosition': {
		url: '/mockjsdata/4/member/member-add-edit?companyId={companyId}&memberId={memberId}&communityId={communityId}',
		method: 'get'
	},
  // 会员中心－新增会员－电话号码校验是否存在
  'isPhoneRegistered':{
    url:'/mockjsdata/4/member/member-phone?phone={phone}',
    method:'get'
  },
  // 会员中心-会员-获取-高级搜索
  'membersList':{
    url:'/mockjsdata/4/member/member-list?value={value}&type={type}&startTime={startTime}&endTime={endTime}&registerSourceId={registerSourceId}&jobId={jobId}&pageSize={pageSize}&page={page}&companyId={companyId}&cityId={cityId}',
    method:'get'
  },

  //个人中心-获取个人信息
  'PersonalCenterData': {
    url:' /mockjsdata/15/krspace_isso_web/sys/sysOwn/getPersonalInfo',
    method: 'get'
  },
  //个人中心-身份验证
  'PersonalCenterVerifyId': {
    url:' /mockjsdata/15/krspace_isso_web/sys/sysOwn/verifyIdentity',
    method: 'get'
  },
  //获取指定公司会员列表
  'getCompanyMemberList':{
  	url:'/mockjsdata/4/member/company-team?companyId={companyId}&page={page}&pageSize={pageSize}',
  	method:'get'
  },
  //设置Leader
  'setLeader':{
  	url:'/mockjsdata/4/member/work/leader?companyId={companyId}&isLeader={isLeader}&memberId={memberId}',
  	method:'put'
  },
  //新建编辑会员的准备数据
  'getMemberBasicData':{
  	url:'/mockjsdata/4/member/member-add-edit?companyId={companyId}&memberId={memberId}&communityId={communityId}',
  	method:'get'
  },
  //新建编辑会员
  'membersChange':{
  	url:'/mockjsdata/4/member/member',
  	method:'post'
  },
  //验证成员
  'validMember':{
  	url:'/mockjsdata/4/member/actions/set-as-valid?memberIds={memberIds}',
  	method:'post'
  },
  //指定公司下的会员数据导出
  'companyMemberExcel':{
  	url:'/mockjsdata/4/member/member-company-excel?ids={ids}&companyId={companyId}',
  	method:'get'
  },
  //根据邮箱判断手否存在
  'membersByEmail':{
  	url:'/mockjsdata/4/member/member-email?email={email}',
  	method:'get'
  },
  //根据会员卡号判断手否存在
  'membersByForeignCode':{
  	url:'/mockjsdata/4/member/getCardInfoByForeignCode?foreignCode={foreignCode}&interCode={interCode}',
  	method:'get'
  },
  //下载导入模板
  'importExcelDemo':{
  	url:'/mockjsdata/4/member/member-templet-excel?companyId={companyId}',
  	method:'get'
  },
  //上传会员数据
  'importMemberExcel':{
  	url:'/mockjsdata/4/member/member-excel',
  	method:'post'
  },
  //批量删除
  'deleteMembers':{
  	url:'/mockjsdata/4/member/actions/unbind-from-company?memberIds={memberIds}',
  	method:'delete'
  },
  //订单明细账－补历史收入
  'runStationIncome': {
    url:'/api/krspace-finance-web/finaccount/opt/runStationIncome?mainbillId={mainbillId}',
    method: 'get'
  },
   //订单明细账－补充完成之后
  'removeRunningTag': {
    url:'/api/krspace-finance-web/finaccount/opt/removeRunningTag',
    method: 'post'
  },

  //个人中心-获取验证码
  'PersonalCenterGetVerificationCode': {
    url:'/mockjsdata/15/krspace_isso_web/sys/sysOwn/getVerifyCode',
    method:'get'
  }




}

module.exports = APIS;
