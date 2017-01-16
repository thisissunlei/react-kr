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
		searchParams:{},
		dataRead:{}
});

//新建编辑的数据准备
State.dataReady= action(function() {
	var _this=this;
	Store.dispatch(Actions.callAPI('customerDataAddList')).then(function(response) {
         _this.dataRead=response;
		}).catch(function(err) {
			//Message.error(err.message);
		});
});

module.exports = State;
