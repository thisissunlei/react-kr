import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable
} from 'mobx';
import {reduxForm} from 'redux-form';
import {
    Message
} from 'kr-ui';
let State = observable({
		searchParams:{
			page:1,
			pageSize:15,
		},
});
//参数修改
State.setSearchParams = action(function(params) {
	this.searchParams=params;
});
module.exports = State;
