

import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({
	showCancleAuthorization : false,
	showAuthorizationEquipmentDialog : false,
	openNewCreateAuthoriazation : false,
	doorTypeOptions : [],
	groupLevelOptions: [{
		label:"普通组",
		value: "NORMAL"
	},{
		label:"全国通开组",
		value: "ROOT"
	},{
		label:"社区通开组",
		value: "COMMUNITY"
	},{
		label:"客户默认组",
		value: "CUSTOMER"
	}],


});




module.exports = State;
















