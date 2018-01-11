

import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({
	openLogSearchParams:{
		communityId: '',
		endDate: '',
		page:1,
		pageSize:15,
		serialNo: '',
		spaceId: '',
		startDate : '',
	},
	

});


module.exports = State;













