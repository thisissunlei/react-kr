import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable
} from 'mobx';
import {
	Message
} from "kr-ui";
import {Actions,Store} from 'kr/Redux';
//全局store
let State = observable({
    searchParams:{
			page:1,
			pageSize:15,
			endTime:"",
			startTime:"",
			communityId:""
    }
});

State.setSearchParams = action(function(params) {
    this.searchParams = params;
});

module.exports = State;
