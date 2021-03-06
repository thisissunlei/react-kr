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
		//社区id
		communityId:''

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
 data.id=_this.deleteId;
 data.code=params;
 data.communityId=_this.communityId;
 Http.request('station-check-code',data).then(function(response) {
		 _this.isCode=false;
 }).catch(function(err) {
	 if(err.message.indexOf("该编码已存在")!=-1){
			_this.isCode=true;
	 }else{
		 _this.isCode=false;
	 }
 });
});
//新建编辑提交
State.stationSubmit=action(function(params){
	var _this=this;
	var page='';
	if(!params.id){
      page=1;
	}
	var data = Object.assign({},this.searchParams);
	data.page = page==1 ? 1 : this.searchParams.page;
	data.time = +new Date();
	data.communityId = this.communityId;
	
	Http.request('station-edit',{},params).then(function(response) {
	 _this.openStationEdit = false;
	 _this.openStation = false;

	 _this.searchParams = data;
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
//导入开关
State.openImportData= action(function() {
	this.openImport=!this.openImport;
});
module.exports = State;
