import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable
} from 'mobx';
import {Http} from 'kr/Utils';
import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {
    Message
} from 'kr-ui';

let State = observable({
		searchParams:{
			page:1,	
			pageSize:15,
		},
		//新建
		openNewAddress:false,
		// 编辑
		openEditAddress:false,
		openDeleteDialog: false,
		//详情
		detailData:{},



});


State.closeAllDialog = action(function() {	
	
		this.openNewAddress=false;
		this.openEditAddress=false;
		this.openDeleteDialog=false;
});

State.switchNewAddress= action(function() {	
	this.openNewAddress = !this.openNewAddress;
});

State.switchEditAddress= action(function() {	
	this.openEditAddress = !this.openEditAddress;
});

State.isOpenDeleteDialog= action(function() {	
	State.openDeleteDialog = !State.openDeleteDialog;
});

State.confirmDelete= action(function() {
	State.openDeleteDialog = !State.openDeleteDialog;
	//  Http.request('actions-edit',{},data).then(function(response) {
		
	// }).catch(function(err) {
	// 	 Message.error(err.message);
	// });
});


//新建提交
State.onNewAddressSubmit= action(function(data) {	
	//  var _this=this;
	//  Http.request('actions-edit',{},data).then(function(response) {
	// 	_this.openNewAddress=false;	
	// 	_this.openEditCommunity=false;
	// 	_this.searchParams={
	// 		 time:+new Date(),
	// 		 page:1,
	// 		 pageSize:15
	// 	}	
	// }).catch(function(err) {
	// 	 Message.error(err.message);
	// });	
});


module.exports = State;
