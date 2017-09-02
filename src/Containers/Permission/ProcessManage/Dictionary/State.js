import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';
let State = observable({
	openCreate:false,
	openView:false,
	openEdit:false,
	list :[{formName:'1',lastUseTime:+new Date()},
			{formName:'2',lastUseTime:+new Date()},
			{formName:'3',lastUseTime:+new Date()},
			{formName:'4',lastUseTime:+new Date()},
			{formName:'5',lastUseTime:+new Date()},
			{formName:'6',lastUseTime:+new Date()},
			{formName:'7',lastUseTime:+new Date()}
		],
	heightAuto:true,
	searchParams:{
		page:1,
		pageSize:10,
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
	values.itemListStr = JSON.stringify(values.itemListStr);
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
	values.itemListStr = JSON.stringify(values.itemListStr);
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


module.exports = State;
