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
	comeFrom:"Merchants2",
	searchParams:{},
	isDevelop:true,
});
State.initComeFrom = action(function(comeFrom) {
	this.comeFrom=comeFrom||this.comeFrom;
});
State.switchDevelop = action(function(comeFrom) {
	this.isDevelop=!this.isDevelop;
});


module.exports = State;
