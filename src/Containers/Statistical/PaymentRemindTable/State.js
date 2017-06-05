import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';
let State = observable({
	items:[],

	searchParams:{
		communityId:'',
		startTime:'',
		endTime:'',
		page:1,
		pageSize:10
	}

});

// State.itemDownPublish = action(function(id) {
// 	var _this = this;
// 	var searchParams = Object.assign({},mobx.toJS(_this.searchParams));
// 	searchParams.time = +new Date();
// 	Http.request('activityPublish', {
// 		id: id,
// 		type:0
// 	}).then(function(response) {
// 		Message.success('下线成功');
// 		_this.searchParams = searchParams;
// 	}).catch(function(err) {
// 		Message.error('下线失败');
// 	});

// });

module.exports = State;
