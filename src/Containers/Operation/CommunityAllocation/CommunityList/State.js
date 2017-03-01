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
		searchParams:{
			page:1,	
			pageSize:15	
		},
		//新建社区
		openNewCommunity:false,
		//高级查询
		openSearchUpper:false,
		//高级查询数据准备
		searchData:''

});
//新建社区的开关
State.switchNewCommunityList = action(function() {	
	this.openNewCommunity=!this.openNewCommunity;
});
//新建社区的提交
State.onCommunitySubmit= action(function() {
	this.openNewCommunity=!this.openNewCommunity;
});
//高级查询的开关
State.searchUpperCustomer = action(function() {
	this.openSearchUpper=!this.openSearchUpper;
});
//社区列表数据准备
State.searchDataHere = action(function() {
	 var _this=this;
	 Store.dispatch(Actions.callAPI('list-param-data')).then(function(response) {
		_this.searchData=response.businessAreas
	}).catch(function(err) {
		 Message.error(err.message);
	});	
});
//编辑页面的开关
State.switchEditCustomerList = action(function() {
	this.openEditCustomerList=!this.openEditCustomerList;
})


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
