import mobx, {
	observable,
	action,
} from 'mobx';
import {reduxForm,change,initialize,reset} from 'redux-form';
import {Store} from 'kr/Redux';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';
let State = observable({
	openCreate:false,
	openView:false,
	openEdit:false,
	list :[],
	heightAuto:true,
	searchParams:{
		page:1,
		nameKey:'',
		pageSize:15,
		codeKey:'',
		time:+new Date(),

	},
	data:{}


});

State.showView = action(function(item) {
	
	// this.data = item;
	
	let _this = this;
	console.log('----',item)
	Http.request('get-dict-edit-data',{id:item.id}).then(function(response) {
		_this.data = response;
		_this.list = response.records;
		_this.openView = true;
	}).catch(function(err) {
		Message.error(err.message);
	});

});
State.closeAll = action(function() {
	this.openCreate = false;
	this.openView = false;
	this.openEdit = false;
});

State.newCreateDict = action(function(value) {
	let values = Object.assign({},value)
	if(values.itemListStr){
	   values.itemListStr = JSON.stringify(values.itemListStr);
	}
	let _this = this;

	Http.request('new-dict-submit',{},values).then(function(response) {
		Message.success('新建成功');
		_this.openCreate = false;
		_this.searchParams = {
			page:1,
			pageSize:10,
			time:+new Date()
		}
	}).catch(function(err) {
		Message.error(err.message);
	});
});
State.editDict = action(function(value) {
	let values = Object.assign({},value)
	if(values.itemListStr){
	   values.itemListStr = JSON.stringify(values.itemListStr);
	}
	delete values.items;
	let _this = this;

	Http.request('edit-dict-submit',{},values).then(function(response) {
		Message.success('编辑成功');
		_this.closeAll();
		_this.searchParams = {
			page:1,
			pageSize:10,
			time:+new Date()
		}
	}).catch(function(err) {
		Message.error(err.message);
	});
});

State.checkName = action(function(value) {
	let _this = this;
	let values = {
		id:_this.data.id || '',
		dictName:value
	}

	Http.request('check-dict-name',values).then(function(response) {
		console.log('check-dict-name',response)
	}).catch(function(err) {
		Message.error(err.message);
		Store.dispatch(change('EditForm', 'dictName', ''));
		Store.dispatch(change('NewCreateForm', 'dictName', ''));
	});
});
State.checkCode = action(function(value) {
	let _this = this;
	let values = {
		id:_this.data.id || '',
		dictCode:value
	}

	Http.request('check-dict-code',values).then(function(response) {
		console.log('check-dict-code',response)
	}).catch(function(err) {
		Message.error(err.message);
		Store.dispatch(change('NewCreateForm', 'dictCode', ''));
		Store.dispatch(change('EditForm', 'dictCode', ''));
	});
});

module.exports = State;
