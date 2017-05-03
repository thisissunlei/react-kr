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
		openAddGuide:false,
		openEditGuide:false,
		//删除单条指南确认填框 	
		openDeleteGuideItemDialog:false,
		//详情
		detailData:{},
		addGuideList:[],
		guideItem:{},
		stationVos:[
			{
				managerName:'',
				managerPhone:'',
				managerEmail:'',
				managerIcon:'',
				managerType:'COMMUNITY_MANAGER'
			}],
		Leader:{
			managerName:'',
			managerPhone:'',
			managerEmail:'',
			managerIcon:'',
			managerType:'COMMUNITY_LEADER'
		},
		// 编辑的具体item
		guideEditItem:{},
		// 编辑的具体index
		Editindex:'',
		deleteIndex:'',



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

State.switchOpenAddGuideFun =action(function() {	
	State.openAddGuide = !State.openAddGuide;
});
// 是否打开编辑指南
State.switchOpenEditGuideFun = action(function() {	
	State.openEditGuide = !State.openEditGuide;
});

State.addGuideListFun=action(function(values) {	
	State.addGuideList.push(values);
	this.switchOpenAddGuideFun();
});

State.EditGuideListFun = action(function(values) {	
	State.addGuideList.push(values);
	this.switchOpenAddGuideFun();
});


// 编辑单条指南
State.EditGuideItemFun = action(function(values) {	

	this.addGuideList.splice(this.Editindex,1,values);
	State.switchOpenEditGuideFun();
});


// 删除单条指南的确认弹窗，并存储deleteIndex
State.switchOpenDeleteItemGuideFun = action(function(item,index) {
	
	this.openDeleteGuideItemDialog = !this.openDeleteGuideItemDialog;
	this.deleteIndex = index;
	
});


//  确认删除单条指南
State.confirmDeleteGuideItem= action(function() {
	
	State.openDeleteGuideItemDialog = !State.openDeleteGuideItemDialog;
	State.addGuideList.splice(State.deleteIndex,1);

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

//获取社区列表
State.getCommunityList=action(function(values) {	
	Http.request('getCommunity', {
		communityName: lastname
	}).then(function(response) {
		response.communityInfoList.forEach(function(item, index) {
			item.value = item.id;
			item.label = item.name;
			return item;
		});
	}).catch(function(err) {
	});
});


module.exports = State;
