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
	searchParams:{},
	isDevelop:true,
	listId:"",
	detail:{},
});
State.initComeFrom = action(function(comeFrom) {
	this.comeFrom=comeFrom||this.comeFrom;
});
State.switchDevelop = action(function(comeFrom) {
	this.isDevelop=!this.isDevelop;
	
});

State.switchEditCustomerList = action(function(comeFrom) {
	this.openEditCustomerList=!this.openEditCustomerList;
	
});

State.lookListId=action(function(params) {
    var _this=this;
	Store.dispatch(Actions.callAPI('get-detail-info',{id:params})).then(function(response) {
         _this.detail=response;
		}).catch(function(err) {

			Message.error(err.message);
		});
})

module.exports = State;
