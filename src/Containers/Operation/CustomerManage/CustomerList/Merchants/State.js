import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable
} from 'mobx';
import {Http} from 'kr/Utils';
import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {
    Message
} from 'kr-ui';

let State = observable({
		searchParams:{
			page:1,		
		},
		todayDate:'',
		openNewMerchants:false,
		openLookMerchants:false,
		openSearchUpper:false,
		openCatch:false,		
		openEditCustomerList:false,
		openNewCustomerIndent:false,
		openDialog:false,
		listId:"",
		companyName:'',
		ishasOffice:false,
		editCity:'',
		editprojectName:'',
		allData:'',
		recommendName:''

});
State.hasOfficeChange=action(function(params){
	this.ishasOffice=params;
})
//新建页的开关
State.switchNewCustomerList = action(function() {
	this.openNewMerchants=!this.openNewMerchants;
});

//查看页面的开关
State.switchLookCustomerList = action(function() {
	this.openLookMerchants=!this.openLookMerchants;
});
//高级查询的开关
State.searchUpperCustomer = action(function() {
	this.openSearchUpper=!this.openSearchUpper;
});
//领取的开关
State.openCatchGoDialog= action(function() {
	this.openCatch=!this.openCatch;
});
//领取确定提交
State.catchSubmit= action(function(arrItem){
	var ids=arrItem;
    var _this=this;
    
	Http.request('receive-customer',{},{ids}).then(function(response) {
		 _this.openCatch=!_this.openCatch;
         Message.success('领取成功');
         _this.openDialog=false;
         _this.searchParams={
         	page:1,
			time:+new Date()
         }
	}).catch(function(err) {
		 Message.error(err.message);
	});	
});
//编辑页面的开关
State.switchEditCustomerList = action(function() {
	this.openEditCustomerList=!this.openEditCustomerList;
})
//新增拜访记录的开关
State.switchCustomerIndent = action(function() {
	this.openNewCustomerIndent=!this.openNewCustomerIndent;
})

State.closeAllMerchants = action(function() {
	this.openLookMerchants=false;
	this.openNewMerchants=false;
	this.openSearchUpper=false;
	this.openEditCustomerList=false;
	this.NewCustomerIndent=false;
	this.openNewCustomerIndent=false;
});
State.MerchantsListId = action(function(params) {
	this.listId=params;
});

module.exports = State;
