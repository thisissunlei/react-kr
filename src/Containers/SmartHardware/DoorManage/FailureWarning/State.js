

import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({
	LogTypeOptions:[],
	warnSearchParams:{
		page:1,
		pageSize:15,
		stime :  '',
		etime: '',
		deviceId:'',
		logType: ''
	}

});







module.exports = State;













