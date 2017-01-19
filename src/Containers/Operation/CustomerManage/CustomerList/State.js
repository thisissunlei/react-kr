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
		dataRead:{}
});

//新建编辑的数据准备
State.dataReady= action(function() {
	var _this=this;
	Store.dispatch(Actions.callAPI('customerDataAddList')).then(function(response) {
         _this.dataRead=response;
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
