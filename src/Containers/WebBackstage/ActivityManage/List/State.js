import mobx, {
	observable,
	action,
	extendObservable
} from 'mobx';
import {
	Actions,
	Store
} from 'kr/Redux';

import {Message} from 'kr-ui';
let State = observable({
	openNewCreate: false,
	openView: false,
	openDetail:false,
	openEditDetail: false,
	openAdvancedQuery :false,
	openCloseNavs:false,
	status:false,
	submit:false,
	itemDetail: {},
	item: {},
	list: {},
	content:'',
	actField:{
		actEnroll:[],
		items:[]
	},
	filter:'COMP_NAME',
	// 是否置顶
	isStick : false,
	// 上传图片地址
	requestURI :'/mockjsdata/33/activity/upload-pic', 
	// 默认地址

	initailPoint : "北京",

	choseName: false,
	chosePhone: false,
	choseCompany: false,
	chosePosition: false,
	choseAdd: false,
	noPublic : false,
	itemDetail:{},
	
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

State.itemDownPublish = action(function(id) {
	var _this = this;
	var searchParams = Object.assign({},mobx.toJS(_this.searchParams));
	searchParams.time = +new Date();
	Store.dispatch(Actions.callAPI('activityPublish', {
		id: id,
		type:0
	})).then(function(response) {
		Message.success('下线成功');
		_this.searchParams = searchParams;
	}).catch(function(err) {
		Message.error('下线失败');
	});

});
State.itemUpPublish = action(function(id) {
	var _this = this;
	var searchParams = Object.assign({},mobx.toJS(_this.searchParams));
	searchParams.time = +new Date();
	
	Store.dispatch(Actions.callAPI('activityPublish', {
		id: id,
		type:1
	})).then(function(response) {
		Message.success('发布成功');
		_this.searchParams = searchParams;
	}).catch(function(err) {
		Message.error('发布失败');
	});



});

State.upItemPosition = action(function(id) {
	var _this = this;
	var searchParams = Object.assign({},mobx.toJS(_this.searchParams));
	searchParams.time = +new Date();
	
	Store.dispatch(Actions.callAPI('activityUpPosition', {
		id: id,
		top:1
	})).then(function(response) {
		Message.success('置顶成功');
		_this.searchParams = searchParams;
	}).catch(function(err) {
		console.log('err',err);
		Message.error(err.message);
	});



});
State.resetUpItemPosition = action(function(id) {
	var _this = this;
	var searchParams = Object.assign({},mobx.toJS(_this.searchParams));
	searchParams.time = +new Date();
	
	Store.dispatch(Actions.callAPI('activityUpPosition', {
		id: id,
		top:0
	})).then(function(response) {
		Message.success('取消置顶成功');
		_this.searchParams = searchParams;
	}).catch(function(err) {
		console.log('err',err);
		Message.error(err.message);
	});



});

State.activityGetList = action(function(id) {
	var _this = this;
	
	Store.dispatch(Actions.callAPI('activityGetList', {
		id: id,
	})).then(function(response) {
		console.log('response',response);
		_this.actField = response;
	}).catch(function(err) {
		console.log('err',err);
	});



});
State.activityGetInfo = action(function(id) {
	var _this = this;
	
	Store.dispatch(Actions.callAPI('activityGetInfo', {
		id: id,
	})).then(function(response) {
		console.log('====>',response);
	}).catch(function(err) {
		console.log('err',err);
	});



});

module.exports = State;
