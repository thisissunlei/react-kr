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
		detail:[],
		


});

//新建页的开关
State.switchNewMerchants = action(function() {
	this.openNewMerchants=!this.openNewMerchants;
});
//编辑页的开关
State.switchEditMerchants = action(function() {
	this.openEditMerchants=!this.openEditMerchants;
});
//查看页面的开关
State.switchLookMerchants = action(function() {
	this.openLookMerchants=!this.openLookMerchants;
});
State.closeAllMerchants = action(function() {
	this.openLookMerchants=false;
	this.openNewMerchants=false;
	this.openEditMerchants=false;
});
module.exports = State;
