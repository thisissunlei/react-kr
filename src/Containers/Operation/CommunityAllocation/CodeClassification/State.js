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
  openCode:false
});
//参数修改
State.addCodeOpen = action(function(params) {
	this.openCode=!this.openCode;
});
module.exports = State;
