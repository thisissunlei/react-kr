import mobx, {
	observable,
	action,
} from 'mobx';


import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';
let State = observable({
	searchParams:{
		typeId:'',
		wfId:'',
		page:1,
		pageSize:15,
		time:+new Date()
	},
	liucheng:[{     
	   "fullname": "人力资源部",       
	   "list": [     
	      {"name": "请假", "value": "11"},     
	      {"name": "调休","value": "2"}     
	   ]},{ 
	   "fullname": "行政资源部",     
	   "list": [     
	      {"name": "办公用品办公dasda", "value": "113"},     
	      {"name": "报销","value": "0"}   
	   ]}],
	request:[]
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
//流程树获取
State.requestTree = action(function(url) {
	var _this = this;
	Http.request(url, '').then(function(response) {

		State.request = response;
		// Message.success('下线成功');
	}).catch(function(err) {
		Message.error(err.message);
	});

});


module.exports = State;
