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
import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {
    Message
} from 'kr-ui';

let State = observable({
		searchParams:{
			page:1,	
			pageSize:15	
		},
		//新建社区
		openNewCommunity:false,
		openEditCommunity:false,
		//高级查询
		openSearchUpper:false,
		//高级查询数据准备
		searchData:'',
		//编辑获取数据
		getData:{}

});
//新建社区的开关
State.switchNewCommunityList = action(function() {	
	this.openNewCommunity=!this.openNewCommunity;
});
//新建社区的提交
State.onNewCommunitySubmit= action(function(data) {	
	 var _this=this;
	 Store.dispatch(Actions.callAPI('actions-edit',{},data)).then(function(response) {
		_this.openNewCommunity=!_this.openNewCommunity;		
	}).catch(function(err) {
		 Message.error(err.message);
	});	
});
//高级查询的开关
State.searchUpperCustomer = action(function() {
	this.openSearchUpper=!this.openSearchUpper;
});
//社区列表数据准备
State.searchDataHere = action(function() {
	 var _this=this;
	 Store.dispatch(Actions.callAPI('list-param-data')).then(function(response) {
		_this.searchData=response.businessAreas
	}).catch(function(err) {
		 Message.error(err.message);
	});	
});
//编辑页面的开关
State.switchEditList = action(function() {
	this.openEditCommunity=!this.openEditCommunity;
})
//获取社区编辑信息
State.getEditCustomerList = action(function(id) {
	 var _this=this;
	 Store.dispatch(Actions.callAPI('communityGetEdit',{id:id})).then(function(response) {
	   _this.getData=response;
	}).catch(function(err) {
		 Message.error(err.message);
	});	
})
//校验社区名称
State.communityName = action(function(params) {
	 var _this=this;
	 let data={};
	 data.id="";
	 data.name=params;
	 Store.dispatch(Actions.callAPI('check-name',data)).then(function(response) {
	}).catch(function(err) {
		 Message.error(err.message);
	});	
});
//校验社区编码
State.communityCode = action(function(params) {
	 var _this=this;
	 let data={};
	 data.id="";
	 data.code=params;
	 Store.dispatch(Actions.callAPI('check-code',data)).then(function(response) {
	}).catch(function(err) {
		 Message.error(err.message);
	});	
});

//校验社区排序
State.communityRank = action(function(params,id) {
	 var _this=this;
	 let data={};
	 data.cityId=id;
	 data.orderNum=params;
	 data.id='';
	 Store.dispatch(Actions.callAPI('check-rank',data)).then(function(response) {
	}).catch(function(err) {
		 Message.error(err.message);
	});	
});


State.closeAllMerchants = action(function() {
	this.openLookMerchants=false;
	this.openNewMerchants=false;
	this.openSearchUpper=false;
	this.openEditCustomerList=false;
	this.NewCustomerIndent=false;
});
State.MerchantsListId = action(function(params) {
	this.listId=params;
});

module.exports = State;
