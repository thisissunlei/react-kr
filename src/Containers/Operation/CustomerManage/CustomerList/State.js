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
		searchSignParams:{},
		dataReady:{},
		orderReady:{}
});
//订单新建编辑的数据准备
State.orderReady= action(function() {
	
	var _this=this;
	Store.dispatch(Actions.callAPI('community-city-selected')).then(function(response) {
         _this.orderReady=response;
		}).catch(function(err) {
			Message.error(err.message);
		});
});
//新建编辑的数据准备
State.dataReady= action(function() {
	var _this=this;
	Store.dispatch(Actions.callAPI('customerDataAddList')).then(function(response) {
         _this.dataReady=response;
		}).catch(function(err) {
			Message.error(err.message);
		});
});
//招商和个人的高级查询的数据准备
State.searchPersonalReady= action(function() {
	  var _this=this;
       Store.dispatch(Actions.callAPI('search-conditions')).then(function(response) {
			_this.searchParams=response;	
			 }).catch(function(err){
				 Message.error(err.message);
			});
});
//签约的高级查询的数据准备
State.searchSignReady= action(function() {
	  var _this=this;
       Store.dispatch(Actions.callAPI('sign-search-conditions')).then(function(response) {
			_this.searchSignParams=response;	
			 }).catch(function(err){
				 Message.error(err.message);
			});
});
module.exports = State;
