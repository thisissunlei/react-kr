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
	values: false,
	fields: {},
	initialValues: {},
	syncErrors: {},
	validations: {},
	data: [],
	installmentPlans: [],
	baseInfo: {},
	stationVOs: [],
	installmentPlansList: []
});

//action
State.getBasicInfo = action(function(params) {
	this.name="nihao";
});
State.witchs = action(function(params) {
	this.values=!this.values;
	console.log(this,"------");
});
module.exports = State;
