import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable
} from 'mobx';
import {Http} from 'kr/Utils';
let State = observable({
		matureTime:"",
		detail:{},
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
		sourceCustomer:false,
		treeAll:'',
		isPermissions:false,
		noEditIntroduce:false,
		selecting:false


});
//
State.isMatureTime = action(function(hasOffice) {
	if(hasOffice=="HAS"){
		this.matureTime=true;
	}else if(hasOffice=="NOHAS"){
		this.matureTime=true;
	}
});
//显示到期时间
State.showMatureTime = action(function() {
		this.matureTime=true;
});

//不显示到期时间
State.noShowMatureTime = action(function() {
	this.matureTime=false;
});
State.editListId= action(function(params) {

	var _this=this;
	Http.request('get-edit-info',{id:params}).then(function(response) {
		_this.detail=response;
	}).catch(function(err) {
		
	});
});

//公司名称检验
State.corpNameCheck = action(function(params){
	var _this=this;
	let data={};
	data.id="";
	data.companyName=params;
	Http.request('corpNameCheck',data).then(function(response) {
		 _this.isCorpName=false;
	}).catch(function(err) {
		if(err.message.indexOf("该名称已存在")!=-1){
			 _this.isCorpName=true;
		}else{
			_this.isCorpName=false;
		}

		
	});	
})

//获取树状图的数据
State.treeAllData = action(function(){
	var _this=this;
	Http.request('get-project-types').then(function(response) {
		 _this.treeAll=response.items;
	}).catch(function(err) {
		
	});	
})

module.exports = State;
