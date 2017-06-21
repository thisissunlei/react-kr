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
import {Http} from "kr/Utils";
import {Actions,Store} from 'kr/Redux';
//全局store
let State = observable({
	name: 'dd',
	orderDetail:{},
	loading:true,
	orderLeading:true,

	operType:"",
	searchParams:{},
	detail:{},

	deleteIndentId:"",
	presentShow:false,
	isEditCustomer:true,

});

State.getBasicInfo = action(function(params) {
});
//订单列表刷洗
State.orderList=action(function(params) {
	if(!params){
	 return ;
	}
    var _this=this;
    this.orderLeading = true;
	Http.request('customerOrdersList',{customerId:params}).then(function(response) {
        _this.orderDetail = response;
        _this.orderLeading = false;
	}).catch(function(err) {

	});
})
//客户详情
State.lookListId=action(function(params,operType) {

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
    _this.loading=true;
	Http.request('get-detail-info',data).then(function(response) {
         _this.detail=response;
         _this.loading=false;
				 if(response.sourceName && response.sourceName.indexOf('推荐') != -1){

 				 	 _this.presentShow = true;
 				}else{
 				 _this.presentShow = false;
 				}
		}).catch(function(err) {
			Message.error(err.message);
	});
})
// 获取删除的订单的id
State.deleteIndent = action(function(id){
	this.deleteIndentId = id;
})

module.exports = State;
