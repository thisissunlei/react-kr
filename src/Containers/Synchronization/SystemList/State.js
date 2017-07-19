import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';
let State = observable({
	createSystem:false,
	openEditSystem:false,
	EditSystemData:{},
	searchParams:{
		name:'',
		time:+new Date()
	}

});
State.openEditSystemFn = action(function(item) {
	this.EditSystemData = item;
	this.openEditSystem = true;

});
State.submitForm = action(function(value){
	var _this = this;
	Http.request('sync-system',{},value).then(function(response){
		Message.success('操作成功');
		_this.openEditSystem = false;
		_this.searchParams = Object.assign({},_this.searchParams,{time:+new Date()});
		_this.createSystem = false;
	}).catch(function(err){
		Message.error(err.message);
	});
})



module.exports = State;
