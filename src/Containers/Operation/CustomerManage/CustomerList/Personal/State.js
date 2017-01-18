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
import {
    Message
} from 'kr-ui';

let State = observable({
		searchParams:{},
		openNewMerchants:false,
		openLookMerchants:false,
		openSearchUpper:false,
		openEditCustomerList:false,
		openSwitch:false,
		openQuit:false,
		openPersonDialog:false,
		openNewCustomerIndent:false,
		openNewIndent:false,
		openEditIndent:false,
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
//编辑页面的开关
State.switchEditCustomerList = action(function() {
	this.openEditCustomerList=!this.openEditCustomerList;
})
//新增排放记录的开关
State.switchCustomerIndent = action(function() {
	this.openNewCustomerIndent=!this.openNewCustomerIndent;
})
//新建订单的开关
State.switchNewIndent = action(function() {
	this.openNewIndent=!this.openNewIndent;
})
//编辑订单的开关
State.switchEditIndent=action(function() {
	this.openEditIndent=!this.openEditIndent;
})
//高级查询的开关
State.searchUpperCustomer = action(function() {
	this.openSearchUpper=!this.openSearchUpper;
});
//转移开关
State.openSwitchGoDialog= action(function() {
	this.openSwitch=!this.openSwitch;
});
//取消客户跟进
State.openQuitContinue= action(function() {
	this.openQuit=!this.openQuit;
});
//导出
State.exportData = action(function(value) {
		let customerIds = [];
		if (value.length != 0) {
			value.map((item, value) => {
				customerIds.push(item.id)
			});
		}
		var url = `/api/krspace-finance-web/customer/personal-customers-export?customerIds=${customerIds}`
		window.location.href = url;
});

//转移提交
State.switchSureSubmit= action(function(value) {
	var _this=this;
	Store.dispatch(Actions.callAPI('customerTransfer',{},{value})).then(function(response) {
		 _this.openSwitch=false;
         Message.success('转移成功');
         _this.openPersonDialog=false;
	}).catch(function(err) {
		 Message.error(err.message);
	});		
});
//取消客户跟进提交
State.quitSubmit= action(function(arrItem) {
	var ids=arrItem;
	var _this=this;
	Store.dispatch(Actions.callAPI('customerGiveBack',{},{ids})).then(function(response) {
		 _this.openQuit=false;
         Message.success('取消成功');
         _this.openPersonDialog=false;
	}).catch(function(err) {
		 Message.error(err.message);
	});		
});

State.closeAllMerchants = action(function() {
	this.openLookMerchants=false;
	this.openNewMerchants=false;
	this.openSearchUpper=false;
	this.openEditCustomerList=false;
	this.openNewCustomerIndent=false;
	this.openNewIndent=false;
	this.openEditIndent=false;
});
State.MerchantsListId = action(function(params) {
	this.listId=params;
	
});
module.exports = State;
