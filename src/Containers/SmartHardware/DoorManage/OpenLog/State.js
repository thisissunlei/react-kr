

import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({
	openLogSearchParams:{
		page:1,
		pageSize:15,
		sdate : '',
		edate: '',
		communityId: '',
		deviceId: '',
		memberName: '',
		phone : ''
	}

});


module.exports = State;













