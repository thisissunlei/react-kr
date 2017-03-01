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
let StateIn = observable({
		detail:[],
     	matureTime:false,
     	otherContinue:false

});

//显示取消跟进
StateIn.showMatureTime = action(function() {
	this.matureTime=true;
});
//不显示取消跟进
StateIn.noShowMatureTime = action(function() {
	this.matureTime=false;
});
//显示其他
StateIn.showOtherContinue = action(function() {
	this.otherContinue=true;
});
//不显示其他
StateIn.noShowOtherContinue = action(function() {
	this.otherContinue=false;
});


module.exports = StateIn;
