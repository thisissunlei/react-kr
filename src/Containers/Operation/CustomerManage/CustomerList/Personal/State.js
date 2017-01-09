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
		openLookPersonal:false,
});

//action
State.switchLookPersonal = action(function(params) {
		this.openLookPersonal=!this.openLookPersonal;
});

module.exports = State;
