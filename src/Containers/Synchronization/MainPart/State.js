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
	searchParams:{
		page:1,
		pageSize:15,
		name:'',
		systemId:'',
		title:''
	}
});
State.setEditSystem = action(function(data){
	this.editData = data;
	this.openEditSystem = true;
})

State.syncMainPart = action(function(value) {
	var _this = this;
	let reload = {
		time:+new Date()
	}
	this.searchParams = Object.assign({},_this.searchParams,reload);
	this.createSystem = false;
	this.openEditSystem = false;
	Http.request('sync-main-part', '',value).then(function(response) {
		Message.success('提交成功');
		// _this.searchParams = searchParams;
	}).catch(function(err) {
		Message.error('提交失败');
	});

});


module.exports = State;
