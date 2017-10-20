import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable
} from 'mobx';
import {Http} from 'kr/Utils';
import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {
    Message
} from 'kr-ui';

let State = observable({
		searchParams:{
			page:1,
			pageSize:15,
		},
		//新建社区
		openNewCommunity:false,
		openEditCommunity:false,
		//高级查询
		openSearchUpper:false,
		openWatchCommunity:false,
		//分期
		openStaging:false,
		//高级查询数据准备
		searchData:'',
		//编辑获取数据
		getData:{},
		//详情
		detailData:{},

		isFlag:'',

		//编辑区县
		cityData:'',
		isCorpName:false,
		isCorpCode:false,
		isCorpRank:false,

		//分期回血数据
		stageData:''

});
//参数修改
State.setSearchParams = action(function(params) {
	this.searchParams=params;
});
//新建社区的开关
State.switchNewCommunityList = action(function() {
	this.openNewCommunity=!this.openNewCommunity;
});
//新建社区的提交
State.onNewCommunitySubmit= action(function(data) {
	 var _this=this;
	 var page=''
	 if(!data.id){
		 page=1;
	 }
	 Http.request('actions-edit',{},data).then(function(response) {
		 var data = Object.assign({},_this.searchParams);
		 data.page = page==1?1:_this.searchParams.page;
		 data.pageSize = 15;
		 data.time=+new Date();
		_this.openNewCommunity=false;
		_this.openEditCommunity=false;
		_this.searchParams=data;
	}).catch(function(err) {
		 Message.error(err.message);
	});
});
//高级查询的开关
State.searchUpperCustomer = action(function() {
	this.openSearchUpper=!this.openSearchUpper;
});
//关闭所有
State.closeAllDialog = action(function() {
	    this.openNewCommunity=false;
        this.openEditCommunity=false;
		this.openWatchCommunity=false;
		this.openStaging=false;
});
//社区列表数据准备
State.searchDataHere = action(function() {
	 var _this=this;
	 Http.request('list-param-data').then(function(response) {
		_this.searchData=response.businessAreas;
		_this.isFlag=response.showEdit;
	}).catch(function(err) {
		 Message.error(err.message);
	});
});
//编辑页面的开关
State.switchEditList = action(function() {
	this.openEditCommunity=!this.openEditCommunity;
})
//查看页面的开关
State.switchWatchList = action(function() {
	this.openWatchCommunity=!this.openWatchCommunity;
})

//分期页面的开关
State.openStagingFun = action(function() {
	this.openStaging=!this.openStaging;
})


//获取详情信息
State.getEditList = action(function(id) {
	var _this=this;
	 Http.request('communityGetEdit',{id:id}).then(function(response) {
	    _this.detailData=response;
	}).catch(function(err) {
		 Message.error(err.message);
	});
})

//校验社区名称
State.communityName = action(function(params,id) {
	 var _this=this;
	 let data={};
	 data.id=id;
	 data.name=params;
	 Http.request('check-name',data).then(function(response) {
	    _this.isCorpName=false;
	}).catch(function(err) {
		if(err.message.indexOf("该名称已存在")!=-1){
			 _this.isCorpName=true;
		}else{
			 _this.isCorpName=false;
		}
	});
});
//校验社区编码
State.communityCode = action(function(params,id) {
	 var _this=this;
	 let data={};
	 data.id=id;
	 data.code=params;
	 Http.request('check-code',data).then(function(response) {
	   _this.isCorpCode=false;
	}).catch(function(err) {
		 if(err.message.indexOf("该编码已存在")!=-1){
			 _this.isCorpCode=true;
		}else{
			 _this.isCorpCode=false;
		}
	});
});

//校验社区排序
State.communityRank = action(function(params,id,communityId) {
	 var _this=this;
	 let data={};
	 data.cityId=id;
	 data.orderNum=params;
	 data.id=communityId;
	 Http.request('check-rank',data).then(function(response) {
	     _this.isCorpRank=false;
	}).catch(function(err) {
		 if(err.message.indexOf("该序号已存在")!=-1){
			 _this.isCorpRank=true;
		}else{
			 _this.isCorpRank=false;
		}
	});
});

module.exports = State;
