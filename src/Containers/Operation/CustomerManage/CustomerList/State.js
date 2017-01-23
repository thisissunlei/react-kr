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
import {
	Message
} from 'kr-ui';

let State = observable({
		searchParams:{},
		searchSignParams:{},
		dataReady:{},
		orderReady:{}
});

module.exports = State;
