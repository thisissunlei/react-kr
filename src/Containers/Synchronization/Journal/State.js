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
		content:'',
		endDate:'',
		mainpartId:'',
		mode:'',
		systemId:''
	},
	tab:'fail'
});

State.getJournalList = action(function(value) {
	var _this = this;
	Http.request('get-news-list', value).then(function(response) {
		_this.itemsList = response.items;
		_this.loading = false;
		_this.pageInfo = response;
	}).catch(function(err) {
		Message.error('下线失败');
	});

});

State.reload = action(function(ids) {
	var _this = this;
	let searchParams = Object.assign(_this.searchParams,{time:+new Date()})
	Http.request('re-sync','',ids+'').then(function(response) {
		Message.success('同步成功');
		_this.searchParams = searchParams;
	}).catch(function(err) {
		Message.error('同步成功');
	});

});


module.exports = State;
