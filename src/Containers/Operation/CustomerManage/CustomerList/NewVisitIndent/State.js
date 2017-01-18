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
     	otherContinue:false

});

//显示取消跟进
State.showMatureTime = action(function() {
	this.matureTime=true;
});
//不显示取消跟进
State.noShowMatureTime = action(function() {
	this.matureTime=false;
});
//显示其他
State.showOtherContinue = action(function() {
	this.otherContinue=true;
});
//不显示其他
State.noShowOtherContinue = action(function() {
	this.otherContinue=false;
});


module.exports = State;
