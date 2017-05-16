

import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({
	items : [],

});



State.getStatical = action(function(searchParams) {

	Http.request('activityList', 
		searchParams
	).then(function(response) {
		console.log("response",response);
		State.items=response.items;
	}).catch(function(err) {
		Message.error(err.message);
	});

});

module.exports = State;
