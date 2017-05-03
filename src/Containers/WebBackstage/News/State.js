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
	this.openNewCreate=!this.openNewCreate;

});
State.openView = action(function(params) {
	this.setState({
	        openView:!this.state.openView
	      });

});
State.openEdit = action(function(params) {
	this.setState({
	        openEdit:!this.state.openEdit
	      });

});
State.openSearch = action(function(params) {
	this.setState({
	        openSearch:!this.state.openSearch
	      });

});


module.exports = State;
