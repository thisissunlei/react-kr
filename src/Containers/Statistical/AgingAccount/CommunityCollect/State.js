

import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({

	// isLeft: true,
	items : [],
	endTime:"",
	communityId:'',

});



State.getCollectList = action(function() {
	let searchParams = {
		end :State.endTime,
		communityId : State.communityId
	}
	console.log("searchParams",searchParams);

	Http.request('activityList',searchParams).then(function(response) {

		console.log("response获取列表",response);
		// State.items=response.items;
		
	}).catch(function(err) {
		Message.error(err.message);
	});

});

module.exports = State;
