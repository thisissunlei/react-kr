import mobx, {
	observable,
	action,
} from 'mobx';
import {
	Actions,
	Store
} from 'kr/Redux';
import {Http} from 'kr/Utils';

let State = observable({
	installmentPlans: [],
	baseInfo: {},
	stationVOs: [],
	installmentPlansList: []
});

//action
State.getBasicInfo = action(function(params) {
	var _this = this;
	Http.request('fnaContractRentController', {
		contractId: params.id
	}).then(function(response) {


		if (response.stationVOs.length >= 7) {
			_this.stationVOs = response.stationVOs;
		} else {
			var stationVOs = response.stationVOs;
			for (var i = 0, len = 7 - stationVOs.length; i < len; i++) {
				var obj = {
					leaseDate: ' ',
					lineTotal: ' ',
					num: ' ',
					stationName: ' ',
					stationTypeName: ' ',
					unitPrice: ' '
				}
				stationVOs.push(obj)
			}
			_this.stationVOs = stationVOs;

		}
		_this.baseInfo = response;


	}).catch(function(err) {

	});



});

module.exports = State;
