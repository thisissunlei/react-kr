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
	
});

//高级查询提交
State.searchUpperSubmit = action(function() {
	
});
//高级查询取消
State.searchUpperCancel = action(function() {
  	
});

State.closeAllMerchants = action(function() {
	
});
module.exports = State;
