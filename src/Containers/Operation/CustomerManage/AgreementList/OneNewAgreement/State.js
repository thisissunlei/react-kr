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
		ordersNames:[],
		orderList:[]
});

//客户名称下拉
State.ordersNames = action(function(customerId) {

});


module.exports = State;
