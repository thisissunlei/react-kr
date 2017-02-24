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
	var _this = this;
	Store.dispatch(Actions.callAPI('orders-names', customerId)).then(function(response) {
		_this.orderList=response.orderList;
		console.log(response.orderList);
	}).catch(function(err) {

		Notify.show([{
			message: err.message,
			type: 'danger',
		}]);

	});
});

module.exports = State;
