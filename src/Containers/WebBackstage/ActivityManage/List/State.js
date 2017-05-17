import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
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
	requestURI :'/api/krspace-finance-web/activity/upload-pic',
	// 默认地址

	HeightAuto:false,
	contentHeightAuto:false,
	contentHeightAutoShow:false,
	initailPoint : '',
	choseName: true,
	chosePhone: true,
	choseCompany: false,
	chosePosition: false,
	choseAdd: false,
	noPublic : false,
	itemDetail:{},
	detailContent:'',
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
	itemData : '',
	cityData :'',
	mapDefaultValue:'',
	coverPicDefaultValue:'',
	serialNumRepeat: false,
	timeIsTrue : true,
	activityIntroduce : '',
	cmts:[]

});

State.itemDownPublish = action(function(id) {
	var _this = this;
	var searchParams = Object.assign({},mobx.toJS(_this.searchParams));
	searchParams.time = +new Date();
	Http.request('activityPublish', {
		id: id,
		type:0
	}).then(function(response) {
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

	Http.request('activityPublish', {
		id: id,
		type:1
	}).then(function(response) {
		Message.success('发布成功');
		_this.searchParams = searchParams;
	}).catch(function(err) {
		Message.error(err.message);
	});



});

State.upItemPosition = action(function(id) {
	var _this = this;
	var searchParams = Object.assign({},mobx.toJS(_this.searchParams));
	searchParams.time = +new Date();

	Http.request('activityUpPosition', {
		id: id,
		top:1
	}).then(function(response) {
		Message.success('置顶成功');
		_this.searchParams = searchParams;
	}).catch(function(err) {
		Message.error(err.message);
	});



});
State.resetUpItemPosition = action(function(id) {
	var _this = this;
	var searchParams = Object.assign({},mobx.toJS(_this.searchParams));
	searchParams.time = +new Date();
	Http.request('activityUpPosition', {
		id: id,
		top:0
	}).then(function(response) {
		Message.success('取消置顶成功');
		_this.searchParams = searchParams;
	}).catch(function(err) {
		Message.error(err.message);
	});
});

State.activityGetList = action(function(id) {
	var _this = this;
	Http.request('activityGetList', {
		id: id,
	}).then(function(response) {
		_this.actField = response;
	}).catch(function(err) {

	});
});
State.activityDetail = action(function(id) {
	var _this = this;
	Http.request('getActivityDetail', {
		id: id,
	}).then(function(response) {
		_this.cmts = response.cmts;
		console.log(response)
		_this.detailContent = response.summary;
	}).catch(function(err) {

	});

});
State.setBasicData = (action(function(response){

			var EmptyArr = [];
			if(response.top == 1){
				State.isStick = true;
			}else{
				State.isStick = false;
			}
			EmptyArr.push(response.xPoint);
			EmptyArr.push(response.yPoint);
			State.defaultPoint =  EmptyArr;
			State.mapDefaultValue = response.address;
			State.initailPoint = response.countyName;
			State.cityData=`${response.provinceName}/${response.cityName}/${response.countyName}`;
			State.mapdefaultValue = response.address;
			State.activityIntroduce = response.summary;
			State.pcCoverPicDefaultValue = response.pcCoverPic || '';
			State.appCoverPicDefaultValue = response.appCoverPic ||'';
			State.infoPicDefaultValue = response.infoPic;
			var enrollArr = response.enrollFiels;
			if(enrollArr.indexOf("NAME")>-1){
				State.choseName = true;
			}else{
				State.choseName = false;
			}
			if(enrollArr.indexOf("PHONE")>-1){
				State.chosePhone = true;
			}else{
				State.chosePhone = false;
			}
			if(enrollArr.indexOf("COMPANY")>-1){
				State.choseCompany = true;
			}else{
				State.choseCompany = false;
			}
			if(enrollArr.indexOf("POSITION")>-1){
				State.chosePosition = true;
			}else{
				State.chosePosition = false;
			}
			if(enrollArr.indexOf("ADDRESS")>-1){
				State.choseAdd = true;
			}else{
				State.choseAdd = false;
			}
}))

module.exports = State;
