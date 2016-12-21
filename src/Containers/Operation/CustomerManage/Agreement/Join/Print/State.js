import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable
} from 'mobx';

let State = observable({
	name: 'dd',
	values: {},
	fields: {},
	initialValues: {},
	syncErrors: {},
	validations: {}
});

//action
State.getBasicInfo = action(function() {



	this.name = 'haa'

});

module.exports = State;