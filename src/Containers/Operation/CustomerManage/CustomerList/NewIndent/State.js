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
		orderReady:[],
		community:[],
		city:[],
		cityLable:"",
		cityId:"",
		orderFound:[],
		isInit:false,
		orderName:"",



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
	console.log(params,"??????")
	this.isInit=true;
	
});


module.exports = State;
