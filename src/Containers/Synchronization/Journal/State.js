import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';
let State = observable({
	createSystem:false,
	openEditSystem:false,
	openSynchro:false,
	synchroList:[],
	pages:{page:0},
	openSearch:true,
});

State.itemDownPublish = action(function(id) {
	var _this = this;
	var searchParams = Object.assign({},mobx.toJS(_this.searchParams));
	searchParams.time = +new Date();
	Http.request('activityPublish', {
		id: id,
		type:0
	}).then(function(response) {
		Message.success('下线成功');
		_this.searchParams = searchParams;
	}).catch(function(err) {
		Message.error('下线失败');
	});

});


module.exports = State;
