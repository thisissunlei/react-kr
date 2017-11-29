

import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({
	LogTypeOptions:[],
	openContent: false,
	printLogParams:{
		page:1,
		pageSize:15,
		communityId :  '',
		customerId: '',
		endDate:'',
		jobType: '',
		memberId : '',
		printerName :'',
		startDate :''
	}

});


module.exports = State;













