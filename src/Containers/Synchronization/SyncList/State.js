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
	result:{
		success:0,
		fail:0,
		load:false
	},
	searchParams:{
		page:1,
		pageSize:15,
		mainId:'',
		systemId:''
	},
	searchSync:{
		page:1,
		pageSize:10,
		interfaceAddL:'',
		remark:''
	},
	systemList:[],
	mainpartList:[],

});
State.setEditSystem = action(function(data){
	this.editData = data;
	this.openEditSystem = true;
})

State.getSyncList = action(function(value) {
	var _this = this;
	this.searchSync = Object.assign({},this.searchSync,value);
	Http.request('system-list-manual','', _this.searchSync).then(function(response) {
		_this.synchroList = response.items;
		response.load=true;
		_this.result = response;
	}).catch(function(err) {
		Message.error('失败');
	});

});
State.postSync = action(function(value) {
	var _this = this;
	let reload = {
		time:+new Date()
	}
	
	this.createSystem = false;
	this.openEditSystem = false;
	Http.request('new-sync-main-system', '',value).then(function(response) {
		Message.success('提交成功');
		_this.searchParams = Object.assign({},_this.searchParams,reload);
	}).catch(function(err) {
		Message.error(err.message);
	});

});



module.exports = State;
