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
	name: 'dd',
	values: {},
	fields: {},
	initialValues: {},
	syncErrors: {},
	validations: {},
	data: [],
	installmentPlans: [],
	Baseinfo: {},
});

//action
State.getBasicInfo = action(function(params) {
	var _this = this;
	Store.dispatch(Actions.callAPI('intentletter-print-info', {
		contractId: params.id
	})).then(function(response) {
		console.log('response----', response)
		_this.Baseinfo = response.data;
		_this.installmentPlans = response.data.installmentPlans;
		_this.stationVOs = response.data.stationVOs;

	}).catch(function(err) {

	});


	this.name = 'haa'

});

module.exports = State;