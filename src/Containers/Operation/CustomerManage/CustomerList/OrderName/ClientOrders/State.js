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
		openNewOrders:false,
});

//action
State.switchNewOrders = action(function(params) {
		this.openNewOrders=!this.openNewOrders;
});

module.exports = State;
