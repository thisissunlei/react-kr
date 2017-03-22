import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable
} from 'mobx';

//全局store
let State = observable({
	name: 'dd',
});

State.getBasicInfo = action(function(params) {
});

module.exports = State;
