import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable
} from 'mobx';
import {
	Actions,
	Store
} from 'kr/Redux';
import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {
    Message
} from 'kr-ui';

let State = observable({
	   	//第二次打开的新建
		openTowAgreement:false,
		//第一次打开的新建
		openOneAgreement:false,
		agreementList:[],
		otherFunction:false,
		//查看
		openAgreementDetail:false,
		loading:false,
		contractList:[],
		//新建订单
		openNewIndent:false,
		//编辑合同
		openEditAgreement:false,
		//公司名称
		companyName:"",
		//客户id
		listId:"",
		//订单名
		orderReady:[],
		//订单号
		orderCount:"",
		//合同类型
		argumentType:'',
		//订单id
		mainBillId:'',
		//合同id
		agreementId:'',

		//入驻合同是否可创建	
		enter:true,
		//增租合同是否可创建	
		increase:true,
		//减租合同是否可创建
		reduce:true,
		//续租合同是否可创建
		relet:true,
		//退组合同是否可创建
		returnRent:true,

		totalPaper:'',
		page:'',
		pageSize:'',

		//权限
		editRight:''

});
State.hasOfficeChange=action(function(params){
	this.ishasOffice=params;
})
//查看开关
State.agreementDetail=action(function(){
	this.openAgreementDetail=!this.openAgreementDetail;
})
//列表数据请求
State.ajaxListData=action(function(ajaxData){
	    //错误到了这一层要深究
		ajaxData = Object.assign({},ajaxData);
	    var _this = this;
		Store.dispatch(Actions.callAPI('contract-list', ajaxData)).then(function(response) {
			_this.contractList=response.items;
			_this.totalPaper=response.totalCount;
			_this.page=response.page;
			_this.pageSize=response.pageSize;
			setTimeout(function() {
					loading: false
			}, 0);
		}).catch(function(err) {
			Message.error(err.message);
		});
		Store.dispatch(Actions.switchSidebarNav(false));
})

//获取登录人是否有创建合同的权限
State.createContract=action(function(){
	    var _this = this;
		Store.dispatch(Actions.callAPI('edit-right')).then(function(response) {
		  _this.editRight=response.hasEditRight
		}).catch(function(err) {
			Message.error(err.message);
		});
})







module.exports = State;
