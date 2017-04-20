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
			communityId:''
		},
		//工位
		openStation:false,
		//编辑
		openStationEdit:false,
		//属于与不属于
		isBelong:false,
		//属于不属于编辑
		isBelongEdit:false,
		//实时校验工位编号
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
		//会议室名称数据准备
		stationName:[],
		//楼层数据准备
		floorData:[]

});
//删除
State.deleteStation = action(function() {
	this.openDelete=!this.openDelete;
});
//新建工位
State.addStation = action(function() {
	this.openStation=!this.openStation;
});
//编辑工位
State.editStation = action(function() {
	this.openStationEdit=!this.openStationEdit;
});
//校验
State.codeStationCompare= action(function(params) {
	var _this=this;
  let data={};
 data.id="";
 data.code=params;
 Http.request('station-check-code',data).then(function(response) {
		 _this.isCode=false;
 }).catch(function(err) {
	 if(err.message.indexOf("该编号已存在")!=-1){
			_this.isCode=true;
	 }else{
		 _this.isCode=false;
	 }
 });
});
//新建编辑提交
State.stationSubmit=action(function(params){
	var _this=this;
	Http.request('station-edit',{},params).then(function(response) {
	 _this.openStationEdit=false;
	 _this.openStation=false;
	 _this.searchParams={
			time:+new Date(),
			page:1,
			pageSize:15
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
	Http.request('station-delete',data).then(function(response) {
	 _this.openDelete=false;
	 _this.searchParams={
			time:+new Date(),
			page:1,
			pageSize:15
	 }
 }).catch(function(err) {
		Message.error(err.message);
 });
})
//高级查询的开关
State.searchUpperCustomer = action(function() {
	this.openSearchUpper=!this.openSearchUpper;
});
//工位列表数据准备
State.stationDataReady = action(function(params) {
	var data={};
	data.communityId=params;
	var _this=this;
	Http.request('station-param-data',data).then(function(response) {
		_this.communityName=response.communityName;
		console.log('////',response.spaces,response);
		_this.stationName=response.spaces;
		_this.floorData=response.floors;
 }).catch(function(err) {
		Message.error(err.message);
 });
});
//导入开关
State.openImportData= action(function() {
	this.openImport=!this.openImport;
});
module.exports = State;
