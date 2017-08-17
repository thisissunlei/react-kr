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
	syncMainPartType:[],
	syncSystem:[]
});

State.getBasicData = action(function(id) {
	var _this = this;
	console.log('=====>')
	Http.request('get-tongbu-basic-data', {}).then(function(response) {
		console.log('======',response)
		let syncMainPartType = [];
		let syncSystem = [];
		for(var p in response.syncMainPartType){
			console.log('--->',p,response.syncMainPartType[p])
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
		console.log('======',syncMainPartType,syncSystem)
		_this.syncSystem = syncSystem;
		_this.syncMainPartType = syncMainPartType;
	}).catch(function(err) {
		Message.error(err.message);
	});

});



module.exports = State;
