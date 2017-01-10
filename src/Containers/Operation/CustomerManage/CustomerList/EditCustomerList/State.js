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
		detail:{}


});
//select下拉数组的初始化
State.selectDataInit=action(function(params) {
	this.detail=params;
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

module.exports = State;
