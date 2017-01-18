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
	openEditCustomerList:false,
	comeFrom:"Merchants",
	orderDetail:[],
	searchParams:{},
	isDevelop:true,
	listId:"",
	detail:{},
	recordDevelop:true,
});
State.initComeFrom = action(function(comeFrom) {
	this.comeFrom=comeFrom||this.comeFrom;
});
State.recordDevelopChange = action(function(comeFrom) {
	this.recordDevelop=!this.recordDevelop;
	this.isDevelop=!this.isDevelop;
});

State.switchEditCustomerList = action(function(comeFrom) {
	this.openEditCustomerList=!this.openEditCustomerList;
	
});
State.switchEditCustomerList = action(function(comeFrom) {
	this.openEditCustomerList=!this.openEditCustomerList;
	
});
//获取订单数据列表
State.orderList=action(function(params) {
    var _this=this;
	Store.dispatch(Actions.callAPI('customerOrdersList',{id:params})).then(function(response) {
         _this.orderDetail=response;
         console.log(response,"333333")
		}).catch(function(err) {
			Message.error(err.message);
		});
})
//获取详情页数据
State.lookListId=action(function(params) {
    var _this=this;
	Store.dispatch(Actions.callAPI('get-detail-info',{id:params})).then(function(response) {
         _this.detail=response;
		}).catch(function(err) {
			Message.error(err.message);
		});
})

module.exports = State;
