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
		}


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
//新建编辑的数据准备
State.onSubmitData= action(function(params) {
	Store.dispatch(Actions.callAPI('customerDataEdit',{},{params})).then(function(response) {
         
		}).catch(function(err) {
			//Message.error(err.message);
		});
});
module.exports = State;
