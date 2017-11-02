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
		city:"请选择"
});
State.setCity = action(function(city) {
	this.city=city;
});

module.exports = State;
