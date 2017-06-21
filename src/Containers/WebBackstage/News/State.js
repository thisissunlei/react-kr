import mobx, {
	observable,
	action,
} from 'mobx';
import {reduxForm,initialize} from 'redux-form';
import {Store} from 'kr/Redux';
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
	newsDate:{},
	searchParams: {
		beginDate:'',
		cityId:'',
		countyId: '',
		endDate:'',
		name:'',
		page: 1,
		pageSize: 15,
		type:'',
		time:''
	},

});
//新建编辑保存
State.saveNews = action(function(params) {
	var _this = this;
	Http.request('save-news', {},params).then(function(response) {
		_this.openNewCreateDialog();
		Message.success("新建成功");
		window.location.reload();
	}).catch(function(err) {
		Message.error(err.message);
	});

});
//编辑保存
State.saveEditNews = action(function(params) {
	var _this = this;
	let searchParams = Object.assign({},this.searchParams);
	searchParams.time = +new Date();
	
	Http.request('save-news', {},params).then(function(response) {
		 Message.success("修改成功");
		_this.openEditDialog();
		_this.searchParams = searchParams;
	}).catch(function(err) {
		Message.error(err.message);
	});

});
//编辑查看获取地址
State.getNewsDate = action(function(id) {
	var _this = this;
	Http.request('get-news-detail', {id:id}).then(function(response) {
		_this.newsDate=response;
		Store.dispatch(initialize('editNewList',response));
	}).catch(function(err) {
		Message.error(err.message);
	});

});

State.openNewCreateDialog = action(function(params) {
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
