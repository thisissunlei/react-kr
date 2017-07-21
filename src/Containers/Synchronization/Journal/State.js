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
	openSearch:false,
	selecedList:[],
	itemsList:[],
	loading:true,
	pageInfo:{
		items:[],
		page:1,
		totalCount:0
	},
	searchParams:{
		page:1,
		pageSize:15,
		beginDate:'',
		status:'0',
		content:'',
		endDate:'',
		mainpartId:'',
		mode:'',
		systemId:'',
		time:+new Date()
	},
	tab:'fail'
});

State.getJournalList = action(function(value) {
	var _this = this;
	Http.request('sync-log-list', value).then(function(response) {
		_this.itemsList = response.items;
		_this.loading = false;
		_this.pageInfo = response;
	}).catch(function(err) {
		Message.error('获取失败');
	});

});

State.reload = action(function(ids) {
	var _this = this;
	Http.request('re-sync','',{ids:ids+''}).then(function(response) {
		Message.success('同步成功');
		_this.searchParams =  Object.assign({},_this.searchParams,{time:+new Date()})
	}).catch(function(err) {
		Message.error(err.message);
	});

});


module.exports = State;
