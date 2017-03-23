import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable
} from 'mobx';
import {
	Message
} from "kr-ui";
import {Actions,Store} from 'kr/Redux';
//全局store
let State = observable({
	name: 'dd',
	orderDetail:{},


	operType:"",
	searchParams:{},
	detail:{},

	deleteIndentId:"",

});

State.getBasicInfo = action(function(params) {
});
//订单列表刷洗
State.orderList=action(function(params) {
	if(!params){
	 return ;
	}
    var _this=this;
	Store.dispatch(Actions.callAPI('customerOrdersList',{customerId:params})).then(function(response) {
        _this.orderDetail=response;
	}).catch(function(err) {
			
	});
})
//客户详情
State.lookListId=action(function(params,operType) {
    console.log("=====================",params,operType)
	
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
// 获取删除的订单的id
State.deleteIndent = action(function(id){
	this.deleteIndentId = id;
})

module.exports = State;
