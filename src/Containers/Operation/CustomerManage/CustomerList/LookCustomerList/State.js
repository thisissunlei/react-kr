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
	orderDetail:[],
	searchParams:{},
	isDevelop:true,
	listId:"",
	detail:{},
	recordDevelop:true,
	operType:"",
});
State.initComeFrom = action(function(comeFroms,operTypes) {
	this.comeFrom=comeFroms||this.comeFrom;
	this.operType=operTypes;
	console.log(this.operType,"++++++++")
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
	if(!params){
	 return ;
	}

    var _this=this;
	Store.dispatch(Actions.callAPI('customerOrdersList',{customerId:params})).then(function(response) {
         _this.orderDetail=response.items;
		}).catch(function(err) {
			Message.error(err.message);
		});
})
State.initListId=action(function(params){
	this.listId=params;
})
//获取详情页数据
State.lookListId=action(function(params,operType) {
	console.log(params,operType,">>>>>>>")
	this.operType=operType;
	if(!params){
	 return ;
	}
	if(!operType){
		return;
	}
	let data={}
	operType=this.operType||operType;
    var _this=this;
    _this.searchParams={
    	id:params,
    	operType:operType,
    }
    data.id=params;
    data.operType=operType;
	

	Store.dispatch(Actions.callAPI('get-detail-info',data)).then(function(response) {
         _this.detail=response;
		}).catch(function(err) {
			Message.error(err.message);
		});
})

module.exports = State;
