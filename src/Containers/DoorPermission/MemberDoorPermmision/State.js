

import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({
	doorTypeOptions : [],
	groupLevelOptions: [{
		label:"普通组",
		value: "NORMAL"
	},{
		label:"全国通开组",
		value: "COUNTRYWIDE"
	},{
		label:"社区通开组",
		value: "COMMUNITYWIDE"
	},{
		label:"客户社区组",
		value: "CUSTOMER_COMMUNITYWIDE"
	}],


});


//获取字典数据
State.getDicOptions= action(function() {
	Http.request('getWarningType',{}).then(function(response) {
		var arrNew = [],doorTypeArrNew=[];
		if(response.UpgradePkgType){
			for (var i=0;i<response.UpgradePkgType.length;i++){

			arrNew[i] = {
						label:response.UpgradePkgType[i].desc,
						value:response.UpgradePkgType[i].value
					}
			}
		}
		if(response.DoorType){
			for (var i=0;i<response.DoorType.length;i++){
				
				doorTypeArrNew[i] = {
					label:response.DoorType[i].desc,
					value:response.DoorType[i].value
				}
			}
		}

		State.doorTypeOptions = doorTypeArrNew;
		State.upgradeTypeOptions = arrNew;
	}).catch(function(err) {
		Message.error(err.message);
	});

});


module.exports = State;
















