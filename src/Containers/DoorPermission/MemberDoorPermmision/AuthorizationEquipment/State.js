

import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({
	showCancleAuthorization : false,
	showAuthorizationEquipmentDialog : false,
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




module.exports = State;
















