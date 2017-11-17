import mobx, {
	observable,
	action,
} from 'mobx';
import {reduxForm,initialize} from 'redux-form';
import {Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';
let State = observable({
	openCreate:false,
	openView:false,
	openEdit:false,
	syncMainPartType:[],
	syncSystem:[],
	search:{
		page:1,
		pageSize:15,
		content:'',
		time:+new Date()
	},
	itemData:{
		syncDate:+new Date(),
		remark:'123456',
		
	}
});

State.getBasicData = action(function(id) {
	var _this = this;
	Http.request('get-tongbu-basic-data', {}).then(function(response) {
		let syncMainPartType = [];
		let syncSystem = [];
		for(var p in response.syncMainPartType){
			let obj = {};
			obj.label = response.syncMainPartType[p];
			obj.value = p;
			syncMainPartType.push(obj);
		}
		for(var q in response.syncSystem){
			let obj = {};
			obj.label = response.syncSystem[q];
			obj.value = q;
			syncSystem.push(obj);
		}
		_this.syncSystem = syncSystem;
		_this.syncMainPartType = syncMainPartType;
	}).catch(function(err) {
		Message.error(err.message);
	});

});
State.showView=action(function(data){
	this.openView = true;
	this.itemData = data;
})
State.showEdit=action(function(data){
	this.openEdit = true;
	this.itemData = data;
})
State.editSubmit=action(function(){
	let search={
		page:1,
		pageSize:15,
		time:+new Date()
	}
	this.search = Object.assign({},this.search,search)
})



module.exports = State;
