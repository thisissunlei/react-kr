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
	
	this.createSystem = false;
	this.openEditSystem = false;
	Http.request('sync-main-part', '',value).then(function(response) {
		Message.success('提交成功');
		_this.searchParams = Object.assign({},_this.searchParams,reload);
	}).catch(function(err) {
		Message.error(err.message);
	});

});


module.exports = State;
