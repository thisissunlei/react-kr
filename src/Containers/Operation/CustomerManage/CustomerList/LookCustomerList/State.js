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
	comeFrom:"Merchants"
});
State.initComeFrom = action(function(comeFrom) {
	this.comeFrom=comeFrom||this.comeFrom;
});


module.exports = State;
