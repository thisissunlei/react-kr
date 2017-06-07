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
import {Http} from "kr/Utils";
let State = observable({
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
		orderReady:[],
		community:[],
		city:[],
		cityLable:"",
		cityId:"",
		orderFound:[],
		isInit:false,
		orderName:"",

	 //打开新建订单第一层
	 openContract:false,

   //个人客户
	 searchParams:{
		 page:1,
	 },
	//转移
	 openSwitch:false,

	 openPersonDialog:false,

	 openQuit:false
});

//显示到期时间
State.showMatureTime = action(function() {
	this.matureTime=true;
});

//不显示到期时间
State.noShowMatureTime = action(function() {
	this.matureTime=false;
});
//所在城市
State.cityLableChange = action(function(params){
	this.cityLable=params;
})

//下拉框的数据初始化
State.orderReady = action(function(params) {
	if(this.isInit){
		return;
	}
	if(!params){
		return;
	}
	let communityArr=[];
	let cityArr=[];
	let isCity={}

	if( !params.communityCity){
		return;
	}
	if(!params.sysDicPayments){
		return;
	}
	for (var i =0 ; i < params.communityCity.length; i++) {
		let communityObject={};
		let cityObject={};
		communityObject.value=params.communityCity[i].communityId;
		communityObject.label=params.communityCity[i].communityName;
		this.community.push(communityObject);
		if(!isCity[params.communityCity[i].cityName]){
			cityObject.value=params.communityCity[i].cityId;
			cityObject.label=params.communityCity[i].cityName;
			this.city.push(cityObject);
			isCity[params.communityCity[i].cityName]=true;
		}


	}
	for(var i=0;i<params.sysDicPayments.length;i++){
		let orderFoundOb={};
		orderFoundOb.value=params.sysDicPayments[i].id;
		orderFoundOb.label=params.sysDicPayments[i].dicName;
		this.orderFound.push(orderFoundOb);

	}
	this.orderReady=params;
	this.isInit=true;

});
//新建订单打开第一层
State.openFirstContract=action(function(){
    this.openContract=!this.openContract;
})

//个人客户导出
State.exportData = action(function(value) {
	    var search={};
	    search.company= this.searchParams.company;
	    search.createEndDate=this.searchParams.createEndDate;
	    search.createStartDate=this.searchParams.createStartDate;
	    search.intentionCityId=this.searchParams.intentionCityId;
	    search.intentionCommunityId=this.searchParams.intentionCommunityId;
	    search.levelId=this.searchParams.levelId;
	    search.sourceId=this.searchParams.sourceId;
	    if(!search.company){
	    	search.company='';
	    }
	    if(!search.createEndDate){
	    	search.createEndDate='';
	    }
	    if(!search.createStartDate){
	    	search.createStartDate='';
	    }
	    if(!search.intentionCityId){
	    	search.intentionCityId='';
	    }
	    if(!search.intentionCommunityId){
	    	search.intentionCommunityId='';
	    }
	    if(!search.levelId){
	    	search.levelId='';
	    }
	    if(!search.sourceId){
	    	search.sourceId='';
	    }
		let customerIds = [];
		if (value.length != 0) {
			value.map((item, value) => {
				customerIds.push(item.id)
			});
		}
		var url = `/api/krspace-finance-web/customer/personal-customers-export?customerIds=${customerIds}&company=${search.company}&createEndDate=${search.createEndDate}&createStartDate=${search.createStartDate}&intentionCityId=${search.intentionCityId}&intentionCommunityId=${search.intentionCommunityId}&levelId=${search.levelId}&sourceId=${search.sourceId}`
		window.location.href = url;
});
//个人客户转移提交
State.switchSureSubmit= action(function(value) {
	var _this=this;
	Http.request('customerTransfer',{},value).then(function(response) {
		     _this.openSwitch=false;
         Message.success('转移成功');
         _this.openPersonDialog=false;
         _this.searchParams={
         	page:1,
			    time:+new Date()
         }
	}).catch(function(err) {
		 Message.error(err.message);
	});
});
	//个人客户转移开关
	State.openSwitchGoDialog= action(function() {
		this.openSwitch=!this.openSwitch;
	});

	//个人客户取消客户跟进提交
	State.quitSubmit= action(function(arrItem) {
		var ids=arrItem;
		var _this=this;
		Http.request('customerGiveBack',{},{ids}).then(function(response) {
			 _this.openQuit=false;
	         Message.success('取消成功');
	         _this.openPersonDialog=false;
	         _this.searchParams={
	         	page:1,
				    time:+new Date()
	         }
		}).catch(function(err) {
			 Message.error(err.message);
		});
	});
	//取消客户跟进
	State.openQuitContinue= action(function() {
		this.openQuit=!this.openQuit;
	});
module.exports = State;
