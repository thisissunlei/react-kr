import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';
let State = observable({
	openDialog : false,
	items:[],
	searchParams:{
		communityId:'',
		customerName:'',
		startTime:'',
		endTime:'',
		page:1,
		pageSize:10
	}

});

State.getList = action(function(id) {

	var _this = this;
	var searchParams = State.searchParams;
	Http.request('getPaymentRemind', searchParams).then(function(response) {
		State.items = response.items;
	}).catch(function(err) {
		Message.error(err.message);
	});

});

module.exports = State;
