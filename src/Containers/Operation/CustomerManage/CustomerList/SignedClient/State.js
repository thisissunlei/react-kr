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
		openSwitch:false,
		openPersonDialog:false,
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
//转移开关
State.openSwitchGoDialog= action(function() {
	this.openSwitch=!this.openSwitch;
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
//导出
State.exportData = action(function(value) {
		let customerIds = [];
		if (value.length != 0) {
			value.map((item, value) => {
				customerIds.push(item.id)
			});
		}
		var url = `http://optest.krspace.cn/api/krspace-finance-web/customer/sign-customers-export?customerIds=${customerIds}`
		window.location.href = url;
});

State.closeAllMerchants = action(function() {
	this.openLookMerchants=false;
	this.openNewMerchants=false;
	this.openSearchUpper=false;
});
module.exports = State;
