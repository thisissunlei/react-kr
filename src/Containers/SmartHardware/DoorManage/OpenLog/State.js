

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


// // 获取列表数据
// State.getDetailList= action(function() {

// 	var searchParams={

// 		endDate : State.endDate,
// 		customerId :  State.customerId,
// 		corporationId : State.corporationId,
// 		communityId : State.communityId,
// 		dayType : State.dayType,
// 		end : State.end

// 	}
	
// 	Http.request('getDetailList', searchParams).then(function(response) {
		
// 		State.items = response;
		
		
// 	}).catch(function(err) {
// 		Message.error(err.message);
// 	});

// });




module.exports = State;













