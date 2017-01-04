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
	installmentPlansList: []
});

//action
State.getBasicInfo = action(function(params) {
	var _this = this;
	Store.dispatch(Actions.callAPI('fnaContractRentController', {
		contractId: params.id
	})).then(function(response) {
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

		}



	}).catch(function(err) {

	});



});

module.exports = State;