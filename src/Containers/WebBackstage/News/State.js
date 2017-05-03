import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';
let State = observable({
	// 上传图片地址
	requestURI :'/api/krspace-finance-web/activity/upload-pic',
	detailContent:'',
	openNewCreate:false,
	openView:false,
	openEdit:false,
	openSearch:false,

});
//新建编辑保存
State.saveNews = action(function(params) {
	var _this = this;
	Http.request('save-news', {},params).then(function(response) {
		//_this.detailContent = response.summary;
	}).catch(function(err) {

	});

});

State.openNewCreateDialog = action(function(params) {
	console.log('1111')
	this.openNewCreate=!this.openNewCreate;

});
State.openViewDialog = action(function(params) {
	   this.openView=!this.openView;

});
State.openEditDialog = action(function(params) {
	this.openEdit=!this.openEdit;
	

});
State.openSearchDialog = action(function(params) {
	this.openSearch=!this.openSearch;
});


module.exports = State;
