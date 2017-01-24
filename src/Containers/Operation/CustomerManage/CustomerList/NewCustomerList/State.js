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
		detail:[],
		matureTime:false,
		selectData:{
			communityBaselist:[],
			customerSourceList:[],
			giveupList:[],
			levelList:[],
			roundList:[],
			stationTypeList:[],
			visitTypeList:[]
		},
		isCorpName:false,
		sourceCustomer:false


});
//select下拉数组的初始化
State.selectDataInit=action(function(params,come) {
	this.selectData=params;
});
//显示到期时间
State.showMatureTime = action(function() {
	this.matureTime=true;
});

//不显示到期时间
State.noShowMatureTime = action(function() {
	this.matureTime=false;
});
//公司名称检验
State.corpNameCheck = action(function(params){
	var _this=this;
	
	let data={};
	data.id="";
	data.companyName=params;
	Store.dispatch(Actions.callAPI('corpNameCheck',data)).then(function(response) {
		 _this.isCorpName=false;
	}).catch(function(err) {
		 if(err.message.indexOf("该名称已存在")==0){
			 _this.isCorpName=true;
		}

		
	});	
})
module.exports = State;
