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
		isInit:false,


});

//显示到期时间
State.showMatureTime = action(function() {
	this.matureTime=true;
});

//不显示到期时间
State.noShowMatureTime = action(function() {
	this.matureTime=false;
});

//下拉框的数据初始化
State.orderReady = action(function(params) {
	// console.log(params,"?????")
	// if(this.isInit){
	// 	return;
	// }
	// let communityArr=[];
	// let cityArr=[];
	// let communityObject={};
	// let cityObject={};
	// for (var i =0 ; i < params.communityCity.length; i++) {
	// 	communityObject.value=params.communityCity[i].communityId;
	// 	communityObject.label=params.communityCity[i].communityName;
	// 	cityObject.value=params.communityCity[i].cityId;
	// 	cityObject.label=params.communityCity[i].cityName;
	// 	communityArr.push(communityObject);
	// 	cityArr.push(cityObject);
	// }
	// this.community=communityArr;
	// this.city=cityArr;
	// this.isInit=true;
	// this.orderReady=params;
});


module.exports = State;
