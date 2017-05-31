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
	openEditCustomerList:false,
	comeFrom:"Merchants",
	orderDetail:{},
	searchParams:{},
	isDevelop:true,
	listId:"",
	detail:{},
	recordDevelop:true,
	operType:"",
	visitLen:5,
	presentShow:false
});
State.initComeFrom = action(function(comeFroms,operTypes) {
	this.comeFrom=comeFroms||this.comeFrom;
	this.operType=operTypes;
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

State.initListId=action(function(params){
	this.listId=params;
})


module.exports = State;
