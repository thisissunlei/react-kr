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
		systemId:''
	},
	searchSync:{
		page:1,
		pageSize:10,
		interfaceAddL:'',
		remark:''
	}

});
State.setEditSystem = action(function(data){
	this.editData = data;
	this.openEditSystem = true;
})

State.getSyncList = action(function(value) {
	var _this = this;
	this.searchSync = Object.assign({},value);
	Http.request('get-news-list', _this.searchSync).then(function(response) {
		_this.synchroList = response.items;
		_this.pages = response;
	}).catch(function(err) {
		Message.error('下线失败');
	});

});


module.exports = State;
