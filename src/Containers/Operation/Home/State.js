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
	openChangeCommunity:false,
	info:{
		communityName:'酒仙桥社区',
		communityId:''
	}

});
//select下拉数组的初始化
State.selectDataInit=action(function(params) {
	this.selectData=params;
});
State.ChangeCommunity = action(function(value) {
	this.info = value;
	this.openChangeCommunity = false;
});
//显示到期时间
State.showMatureTime = action(function() {
	this.matureTime=true;
});

//不显示到期时间
State.noShowMatureTime = action(function() {
	this.matureTime=false;
});


module.exports = State;
