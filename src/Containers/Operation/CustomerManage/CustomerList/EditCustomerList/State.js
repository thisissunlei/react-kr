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
		matureTime:false,
		detail:{},
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
	console.log("sdff",params)
	var _this=this;
	Store.dispatch(Actions.callAPI('get-edit-info',{id:params})).then(function(response) {
		_this.detail=response;
		console.log(response,"999999999999");

	}).catch(function(err) {
		console.log(err,"999999999999");

		//Message.error(err.message);
	});
});

module.exports = State;
