

import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({

	// isLeft: true,
	items : [],
	endDate:'',
	communityId:'',
	loading: true,

});



State.getCollectList = action(function() {
	let searchParams = {
		endDate :State.endDate,
		communityId : State.communityId
	}
	console.log("searchParams",searchParams);

	Http.request('communityListAging',searchParams).then(function(response) {

		// console.log("response获取列表---汇总",response);
		State.items=response;
		
		
	}).catch(function(err) {
		Message.error(err.message);
	});

});

module.exports = State;
