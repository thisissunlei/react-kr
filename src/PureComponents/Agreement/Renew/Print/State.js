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
	Http.request('checkinagreement-print-info', {
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

		_this.installmentPlans = response.installmentPlans;
		response.cachetUrl =  "http://krspace-upload-test.oss-cn-beijing.aliyuncs.com/activity_unzip/201706/O/115010082_546.png";
		let canCachet = location.hash.split('?')[1];
		if(canCachet==='print=true'){
			response.withCachet = true;
		}else{
			response.withCachet = false;
		}
		_this.baseInfo = response;


	}).catch(function(err) {

	});



});

module.exports = State;
