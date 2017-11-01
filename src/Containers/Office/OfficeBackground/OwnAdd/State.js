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
		pageSize:10,
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
	request:[{
		msgChildren:[{
			count:11,
			orgId:11,
			orgName:'调休',
			treeType:"WF_BASE"
		}],
		orgId:1,
		orgName:'人力资源部',
		treeType:"WF_TYPE"
	}]
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
State.requestTree = action(function() {
	var _this = this;
	Http.request('my-request-tree', {}).then(function(response) {
		console.log('-------->',response);

		_this.request = response
		// Message.success('下线成功');
	}).catch(function(err) {
		Message.error('获取失败');
	});

});


module.exports = State;
