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

let State = observable({
		searchParams:{},
		openNewMerchants:false,
		openLookMerchants:false,
		openSearchUpper:false,
		openEditCustomerList:false,
		openNewCustomerIndent:false,
		listId:"",
});

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

//编辑页面的开关
State.switchEditCustomerList = action(function() {
	this.openEditCustomerList=!this.openEditCustomerList;
})
//新增排放记录的开关
State.switchCustomerIndent = action(function() {
	this.openNewCustomerIndent=!this.openNewCustomerIndent;
})
//高级查询的提交
State.searchUpperSubmit= action(function(value) {
	console.log('nnnmmmmm',value);
});
State.closeAllMerchants = action(function() {
	this.openLookMerchants=false;
	this.openNewMerchants=false;
	this.openSearchUpper=false;
	this.openEditCustomerList=false;
	this.NewCustomerIndent=false;
});
State.MerchantsListId = action(function(params) {
	this.listId=params;
	
});

module.exports = State;
