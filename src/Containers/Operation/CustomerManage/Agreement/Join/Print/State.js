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
	stationVOs: [],
});

//action
State.getBasicInfo = action(function(params) {
	var _this = this;
	Store.dispatch(Actions.callAPI('checkinagreement-print-info', {
		contractId: params.id
	})).then(function(response) {
		console.log('response----', response.installmentPlans)
		_this.Baseinfo = response;
		if (response.stationVOs.length >= 7) {
			_this.stationVOs = response.stationVOs;
		} else {
			var stationVOs = response.stationVOs;
			for (var i = 0, len = 7 - stationVOs.length; i < len; i++) {
				var obj = {
					leaseDate: " ",
					lineTotal: " ",
					num: " ",
					stationName: " ",
					stationTypeName: " ",
					unitPrice: " "
				}
				stationVOs.push(obj)
			}
			_this.stationVOs = stationVOs;
			console.log('_this.stationVOs', _this.stationVOs)
		}

		_this.installmentPlans = response.installmentPlans;
	}).catch(function(err) {

	});



});

module.exports = State;