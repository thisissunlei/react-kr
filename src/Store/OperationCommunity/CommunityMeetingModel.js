import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable
} from 'mobx';
import {
    Message
} from 'kr-ui';

import {Http} from 'kr/Utils';

let State = observable({
		searchParams:{
			page:1,
			pageSize:15,
			communityId:'',
			capacityBegin:'',
			capacityEnd:'',
			deviceIds:'',
			enable:'',
			searchKey:'',
			searchType:'',

		},
		//新建
		openStation:false,
		//编辑
		openStationEdit:false,
		//实时校验空间名称
		isCode:false,
		//删除
		openDelete:false,
		//删除和编辑的id
		deleteId:'',
		//高级查询
		openSearchUpper:false,
		//导入
		openImport:false,
		//社区名称
		communityName:'',
		//空间类型
		sapceTypes:{},
		//空间设备
		spaceDevices:[],
		//楼层数据准备
		floorData:[],
		//社区id
		communityId:'',
});
//删除
State.deleteStation = action(function() {
	this.openDelete=!this.openDelete;
});
//新建空间
State.addStation = action(function() {
	this.openStation=!this.openStation;
});
//编辑空间
State.editStation = action(function() {
	this.openStationEdit=!this.openStationEdit;
});
//校验
State.codeStationCompare= action(function(params) {
 var _this=this;
 let data={};
 data.id="";
 data.name=params;
 data.communityId=_this.communityId;
 Http.request('meeting-check-name',data).then(function(response) {
		 _this.isCode=false;
 }).catch(function(err) {
	 if(err.message.indexOf("该名称已存在")!=-1){
		 _this.isCode=true;
	 }else{
		 _this.isCode=false;
	 }
 });
});
//新建编辑提交
State.stationSubmit=action(function(params){
	var _this=this;
	Http.request('meeting-edit-submit',{},params).then(function(response) {
	 _this.openStationEdit=false;
	 _this.openStation=false;
	 _this.searchParams={
			time:+new Date(),
			page:1,
			pageSize:15,
			communityId:_this.communityId
	 }
 }).catch(function(err) {
		Message.error(err.message);
 });
})
//删除
State.deleteSubmitFunc=action(function(params){
	var data={};
	data.id=params;
	var _this=this;
	Http.request('meeting-delete',data).then(function(response) {
	 _this.openDelete=false;
	 _this.searchParams={
			time:+new Date(),
			page:1,
			pageSize:15,
			communityId:_this.communityId
	 }
 }).catch(function(err) {
		Message.error(err.message);
 });
})
//高级查询的开关
State.searchUpperCustomer = action(function() {
	this.openSearchUpper=!this.openSearchUpper;
});
//空间列表数据准备
State.stationDataReady = action(function(params) {
	var data={};
	data.communityId=params;
	var _this=this;
	Http.request('meeting-param-data',data).then(function(response) {
		_this.communityName=response.communityName;
		_this.sapceTypes=response.sapceTypes;
		_this.floorData=response.floors;
		_this.spaceDevices=response.spaceDevices;
 }).catch(function(err) {
		Message.error(err.message);
 });
});
//导入开关
State.openImportData= action(function() {
	this.openImport=!this.openImport;
});
module.exports = State;
