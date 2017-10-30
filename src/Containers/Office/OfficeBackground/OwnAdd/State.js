import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';
let State = observable({
	searchParams:{

	},
	liucheng:[{     
	   "fullname": "人力资源部",       
	   "list": [     
	      {"name": "请假", "value": "11"},     
	      {"name": "调休","value": "2"}     
	   ]},{ 
	   "fullname": "行政资源部",     
	   "list": [     
	      {"name": "办公用品", "value": "113"},     
	      {"name": "报销","value": "0"}   
	   ]}]
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
