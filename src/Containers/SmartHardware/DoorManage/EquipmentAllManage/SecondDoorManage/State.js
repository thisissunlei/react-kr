

import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({
	itemDetail:[],
	realPage : 1,
	openHardwareDetail:false,
	openNewCreate:false,
	openEditDialog:false,
	openConfirmDelete:false,
	openSearchEquipment:false,
	openSearchDialog :false,
	upgradeDialog:false,
	openClearCached : false,
	openConnectAgian :false,
	passwordDialog : false,
	openEquipmentCache:false,
	equipmentDatailInfo:[],
	selectedDeleteIds:'',
	makerOptions :[],
	deviceVO:{},
	equipmentSecondParams: {
		        
		        communityId:'',
		        deviceId :'',
		        doorCode :'',
		        doorType : '',
		        floor : '',
		        page : 1,
		        pageSize: 15,

		      },
	searchEquipmentParam:{
		page : 1,
		pageSize: 15
	},
	searchEquipmentList :[],
	//第一次请求设备缓存时的设备Id
	cachedeviceId: '',
	equipmentCacheitems :[],
	switch : false,

});


// 获取列表数据
State.getDetailList= action(function() {

	var searchParams={

		endDate : State.endDate,
		customerId :  State.customerId,
		corporationId : State.corporationId,
		communityId : State.communityId,
		dayType : State.dayType,
		end : State.end

	}
	
	Http.request('getDetailList', searchParams).then(function(response) {
		
		State.items = response;
		
		
	}).catch(function(err) {
		Message.error(err.message);
	});

});

// 批量删除设备
State.deleteEquipmentBatch= action(function() {
	
	Http.request('deleteEquipmentBatch',{},{ids:State.selectedDeleteIds}).then(function(response) {
		
		State.freshPageReturn();
		Message.success("删除成功");
	}).catch(function(err) {
		Message.error(err.message);
	});

});

//单个删除
State.deleteEquipmentSingle= action(function() {
	
	
	Http.request('deleteEquipmentSingleURL',{},{id:State.selectedDeleteIds}).then(function(response) {
		
		State.freshPageReturn();	
		Message.success("删除成功");
	}).catch(function(err) {
		Message.error(err.message);
	});

});

// 获取设备厂家列表
State.getListDic = action(function() {
	var _this = this;
	Http.request('getListDic', {}).then(function(response) {
		
		var arrNew = []
		for (var i=0;i<response.Maker.length;i++){
			arrNew[i] = {
						label:response.Maker[i].desc,
						value:response.Maker[i].value
					}
		}
		
		State.makerOptions = arrNew;

	}).catch(function(err) {
		Message.error(err.message);
	});

});

//新增
State.newCreateSecondDoor = action(function(values){
	
	Http.request('addOrEditEquipment',{},values ).then(function(response) {
		
		State.equipmentSecondParams = {
			page:1,
			pageSize:15,
			date: new Date()		
		}
		State.openNewCreate =false;
		Message.success("新增成功");

	}).catch(function(err) {
		State.openNewCreate =false;
		State.equipmentSecondParams = {
			page:1,
			pageSize:15,
			date: new Date()		
		}
		Message.error(err.message);
	});	

})

//编辑
State.editSecondDoor = action(function(values){
	
	Http.request('addOrEditEquipment',{},values ).then(function(response) {
		
		State.freshPageReturn();
		State.openEditDialog =false;
		Message.success("编辑成功");

	}).catch(function(err) {
		State.openEditDialog =false;
		State.freshPageReturn();
		Message.error(err.message);
	});	

})

//刷新
State.freshPage = action(function(){
	State.equipmentSecondParams = {
        date:new Date(),
        page : 1,
        pageSize: 15
    }	
})

//刷新并保持原查询条件
State.freshPageReturn =  action(function(){
	State.equipmentSecondParams = {
        date:new Date(),
        page : State.realPage,
        pageSize: 15,
        communityId: State.equipmentSecondParams.communityId ||'',
        deviceId : State.equipmentSecondParams.deviceId ||'',
        doorCode : State.equipmentSecondParams.doorCode ||'',
        doorType :  State.equipmentSecondParams.doorType ||'',
        floor :  State.equipmentSecondParams.floor ||'',

    }	
})

//刷新设备搜索页面
State.freshSearchEquipmentPage = action(function(){
	State.searchEquipmentParam = {
        date:new Date(),
        page : 1,
        pageSize: 15
    }	
})


//
State.getUnusedEquipmentFun = action(function(){
	
	Http.request('getUnusedEquipment', {}).then(function(response) {
		State.searchEquipmentList = response.items;
	}).catch(function(err) {
		Message.error(err.message);
	});
})
//分配设备所在位置（添加）
State.equipmentAddLocation = action(function(param){
	var urlParams = {deviceId:param}
	Http.request('changeUnusedToList',{},urlParams).then(function(response) {

		Message.success("添加成功");
		State.freshPageReturn();

	}).catch(function(err) {
		Message.error(err.message);
	});
})

//清空缓存
State.clearCacheAction= action(function(){
	var urlParams = {deviceId:State.itemDetail.deviceId}
	Http.request('clearEquipmentCacheURL',{},urlParams).then(function(response) {

		Message.success("缓存清除成功");
		State.freshPageReturn();

	}).catch(function(err) {
		Message.error(err.message);
	});
})


State.disConnectAction= action(function(){
	var urlParams = {deviceId:State.itemDetail.deviceId}
	Http.request('disconnnetEquipmentURL',{},urlParams).then(function(response) {

		Message.success("断开成功");
		State.freshPageReturn();

	}).catch(function(err) {
		Message.error(err.message);
	});
})


State.getPassword= action(function(){
	var urlParams = {deviceId:State.itemDetail.deviceId}
	Http.request('getPasswordURL',urlParams).then(function(response) {

		State.EquipmentPassword =response.token;
		State.passwordDialog = true;
	}).catch(function(err) {
		Message.error(err.message);
	});
})

State.openDoorOnlineAction = action(function(){
	var urlParams = {deviceId:State.itemDetail.deviceId}
	Http.request('openDoorOnlineURL',{},urlParams).then(function(response) {

		Message.success("远程开门成功");
	}).catch(function(err) {
		Message.error(err.message);
	});
})


State.getEquipmentCache = action(function(){
	if(State.cachedeviceId !==State.itemDetail.deviceId){
		State.cachedeviceId = State.itemDetail.deviceId;
		var urlParams = {
						deviceId:State.itemDetail.deviceId,
						lastCardNo:'',
						limit:100,
					}
	}else{

		var urlParams = {
						deviceId:State.itemDetail.deviceId,
						lastCardNo:State.equipmentCacheitems[length-1].cardNo,
						limit:100,
					}
	}
	
	Http.request('getEquipmentCacheURL',{},urlParams).then(function(response) {
		var oldItems = State.equipmentCacheitems;
		if(!urlParams.lastCardNo){
			State.equipmentCacheitems = oldItems.concat(response.list);
		}else{
			State.equipmentCacheitems = response.list;
		}
	}).catch(function(err) {
		Message.error(err.message);
	});
})

State.getWitchFind = action(function(){
	Http.request('getSwitchStatusUrl',{}).then(function(response) {
		State.switch = response.onOff;
	}).catch(function(err) {
		Message.error(err.message);
	});
})

State.changeSwitchStatusAction = action(function(params){
	Http.request('changeSwitchStatusUrl',{},params).then(function(response) {
		if(params.onOff){
			Message.success("设备连接自动入库");
		}else{
			Message.success("设备连接不自动入库");
		}
		
	}).catch(function(err) {
		Message.error(err.message);
	});
})





module.exports = State;













