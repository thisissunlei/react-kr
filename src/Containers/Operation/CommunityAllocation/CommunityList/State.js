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
			other:'',
		},
		//新建社区
		openNewCommunity:false,
		openEditCommunity:false,
		//高级查询
		openSearchUpper:false,
		openWatchCommunity:false,
		//分期
		openStaging:false,
		//高级查询数据准备
		searchData:'',
		//编辑获取数据
		getData:{},
		//详情
		detailData:{},

		isFlag:'',

		//编辑区县
		cityData:'',
		isCorpName:false,
		isCorpCode:false,
		isCorpRank:false,

		//分期回血数据
		stageData:'',
		projects:[],
		stepStatus:1,
		showLoading:false,
		communityList:[],
		communityOption:[],
		cardOne:{},
		editCommunityId:'',
		editSuccess:false,
		cardTwoEdit:false,
		cardThirdEdit:false,
		initProjects:[],
		relatedInfo:{},
		chooceType:false,
});
//参数修改
State.setSearchParams = action(function(params) {
	this.searchParams=params;
});
//新建社区的开关
State.switchNewCommunityList = action(function() {
	this.openNewCommunity=!this.openNewCommunity;
});
//新建社区的提交
State.onNewCommunitySubmit= action(function(data) {
	 var _this=this;
	 var page=''
	 if(!data.id){
		 page=1;
	 }
});
//改版后--新建社区的提交
State.newCommunitySubmit= action(function(formData,card) {
	var _this=this;
	Http.request('actions-edit',{},formData).then(function(response) {
		var data = response;
		_this.showLoading = true;
		//调用关联接口
		if(!formData.id){
			_this.relatedCommunity(data)
		}else{
			_this.getEditList(formData.id,'edit',card)
		}
		
   }).catch(function(err) {
		Message.error(err.message);
   });
});
//保存关联关系--新建
State.relatedCommunity = action(function(id){
	var _this=this;
	var ids =  _this.projects.map(item=>{return item.projectId})
	 var page=1
	 let data = {
		communityId:id,
		needSyncCommunity:_this.needSyncCommunity,
		projectIds:ids 
	 }
	Http.request('post-community-save',{},data).then(function(response) {
		var data = Object.assign({},_this.searchParams);
		data.page = page==1?1:_this.searchParams.page;
		data.pageSize = 15;
		_this.showLoading = false
		data.time=+new Date();
	   _this.openNewCommunity=false;
	   _this.openEditCommunity=false;
	   _this.searchParams=data;
	   _this.stepStatus = 1;
	  ;
   }).catch(function(err) {
		_this.showLoading = false
		Message.error(err.message);
   });
})

//保存关联关系--编辑
State.saveRelatedCommunity = action(function(){
	var _this=this;
	var ids =  _this.projects.map(item=>{return item.projectId})
	 var page=1
	 let data = {
		communityId:_this.editCommunityId,
		needSyncCommunity:_this.needSyncCommunity==='1'?true:false,
		projectIds:ids 
	 }
	Http.request('post-community-save',{},data).then(function(response) {
		let projectName = _this.projects.map(item=>{return item.label})
		_this.cardOne = {
			needSyncCommunity:_this.needSyncCommunity,
			projectName:projectName.join()
		}
		_this.initProjects = _this.projects;
		_this.getRelatedCommunityInfos(_this.editCommunityId)
   }).catch(function(err) {
		_this.showLoading = false
		Message.error(err.message);
   });
})
//高级查询的开关
State.searchUpperCustomer = action(function() {
	this.openSearchUpper=!this.openSearchUpper;
});
//关闭所有
State.closeAllDialog = action(function() {
	    this.openNewCommunity=false;
        this.openEditCommunity=false;
		this.openWatchCommunity=false;
		this.openStaging=false;
});
//社区列表数据准备
State.searchDataHere = action(function() {
	 var _this=this;
	 Http.request('list-param-data').then(function(response) {
		_this.searchData=response.businessAreas;
		_this.isFlag=response.showEdit;
	}).catch(function(err) {
		 Message.error(err.message);
	});
});
//编辑页面的开关
State.switchEditList = action(function() {
	this.openEditCommunity=!this.openEditCommunity;
})
//查看页面的开关
State.switchWatchList = action(function() {
	this.openWatchCommunity=!this.openWatchCommunity;
})

//分期页面的开关
State.openStagingFun = action(function() {
	
	this.openStaging=!this.openStaging;
	if(!this.openStaging){
		
	}
})


//获取详情信息
State.getEditList = action(function(id,type,card) {
	var _this=this;
	 Http.request('communityGetEdit',{id:id}).then(function(response) {
		_this.detailData=response;
		_this.detailData.cityData = response.provinceName+'/'+response.cityName+'/'+response.countyName 
		if(type=='edit' && card === '2'){
			_this.cardTwoEdit = false
		}
		if(type=='edit' && card === '3'){
			_this.cardThirdEdit = false
		}
		
	}).catch(function(err) {
		 Message.error(err.message);
	});
})

//校验社区名称
State.communityName = action(function(params,id) {
	 var _this=this;
	 let data={};
	 data.id=id;
	 data.name=params;
	 Http.request('check-name',data).then(function(response) {
	    _this.isCorpName=false;
	}).catch(function(err) {
		if(err.message.indexOf("该名称已存在")!=-1){
			 _this.isCorpName=true;
		}else{
			 _this.isCorpName=false;
		}
	});
});
//校验社区编码
State.communityCode = action(function(params,id) {
	 var _this=this;
	 let data={};
	 data.id=id;
	 data.code=params;
	 Http.request('check-code',data).then(function(response) {
	   _this.isCorpCode=false;
	}).catch(function(err) {
		 if(err.message.indexOf("该编码已存在")!=-1){
			 _this.isCorpCode=true;
		}else{
			 _this.isCorpCode=false;
		}
	});
});

//校验社区排序
State.communityRank = action(function(params,id,communityId) {
	 var _this=this;
	 let data={};
	 data.cityId=id;
	 data.orderNum=params;
	 data.id=communityId;
	 Http.request('check-rank',data).then(function(response) {
	     _this.isCorpRank=false;
	}).catch(function(err) {
		 if(err.message.indexOf("该序号已存在")!=-1){
			 _this.isCorpRank=true;
		}else{
			 _this.isCorpRank=false;
		}
	});
});

//获取关联社区列表
State.getRelatedCommunity = action(function(id) {
	var _this=this;
	id = id|| ''; 
	 Http.request('get-project-community-list',{communityId:id}).then(function(response) {
	    _this.communityList=response.map(item=>{
			item.value = item.projectId;
			// item.label = item.communityName;
			item.label = item.projectName;
			return item;
		});
		_this.communityOption=response.map(item=>{
			item.value = item.projectId;
			// item.label = item.communityName;
			item.label = item.projectName;
			return item;
		});
		let obj = {
			label: '不关联项目',
			value:'0',
		}
		_this.communityList.push(obj)
		_this.communityOption.push(obj);
	}).catch(function(err) {
		 Message.error(err.message);
	});
})

//获取社区的关联社区信息--查看
State.getRelatedCommunityInfo = action(function(id) {
	var _this=this;
	 Http.request('get-community-edit-info',{communityId:id}).then(function(response) {
	    _this.cardOne = response;
	}).catch(function(err) {
		 Message.error(err.message);
	});
})
//获取社区的关联社区信息==编辑
State.getRelatedCommunityInfos = action(function(id) {
	var _this=this;
	 Http.request('get-community-edit-info',{communityId:id}).then(function(response) {
		response.needSyncCommunityBool = response.needSyncCommunity;
		_this.chooceType = false;
		let needs = response.needSyncCommunity;
		
		
		let needSyncCommunity = response.needSyncCommunity?'1':'2';
		_this.needSyncCommunity = response.needSyncCommunity?'1':'2';
		response.needSyncCommunity = needSyncCommunity
		_this.cardOne = response;
		let pro = []
		_this.communityList = _this.communityOption.filter(item=>{
			if(response.projectIds.indexOf(item.value)!=-1){
				pro.push(item)
			}else{
				return true;
			}
		})
		_this.projects = pro;
		_this.initProjects = pro;

		if(needs){
			_this.getRelatedCommunityData(response.projectIds[0])
			_this.chooceType = true;

		}else{
			_this.openEditCommunity = true;
		}
		
		


	}).catch(function(err) {
		 Message.error(err.message);
	});
})
//获取关联社区的关联数据
State.getRelatedCommunityData = action(function(id) {
	var _this=this;
	 Http.request('get-community-info-related',{projectId:id}).then(function(response) {
		let res = response
	  _this.detailData.name  = res.communityName;
	  _this.detailData.address = res.detailAddress;
	  _this.detailData.buildName = res.buildingName; 
	  _this.detailData.cityData = res.provinceName+'/'+res.cityName+'/'+res.countyName
	  if(res.openDate){
		_this.detailData.openDate = res.openDate
	  } 
		_this.relatedInfo = res;
		 _this.openEditCommunity = true;
	}).catch(function(err) {
		 Message.error(err.message);
	});
})


module.exports = State;
