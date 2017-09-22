

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
	upgradeDialog:false,
	openClearCached : false,
	openConnectAgian :false,
	passwordDialog : false,
	openEquipmentCache:false,
	synchronizingPswDialog :false,
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
	equipmentCacheitems :[],
	switch : false,
	showOpretion : false,
	openRestartSystemsDialog : false,
	openRestartAPPDialog :false,
	openManagePsd :false,
	resetEquipmentDialog : false,
	openFreshHTMLDialog :false,
	openConfirmDeleteBatch : false,
	loading :false,
	DropItems : [],
	openFirstHardwareDetail: false,
	resetFirstEquipmentDialog : false,
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
	
	
	Http.request('deleteEquipmentSingleURL',{id:State.selectedDeleteIds}).then(function(response) {
		
		State.freshPageReturn();	
		Message.success("删除成功");
	}).catch(function(err) {
		Message.error(err.message);
	});

});

// 获取通用字典
State.getDicList = action(function() {
	var _this = this;
	Http.request('getWarningType', {}).then(function(response) {
		
		var arrNewMaker = []
		var arrNewDoorType = []
		for (var i=0;i<response.Maker.length;i++){
			
			arrNewMaker[i] = {
						label:response.Maker[i].desc,
						value:response.Maker[i].value
					}
		}
		for(var i=0;i<response.DoorType.length;i++){
			arrNewDoorType[i] = {
						label:response.DoorType[i].desc,
						value:response.DoorType[i].value,
						code : response.DoorType[i].code
					}
		}
		
		State.makerOptions = arrNewMaker;
		State.propertyOption = arrNewDoorType;

	}).catch(function(err) {
		Message.error(err.message);
	});

});

//获取升级信息列表字典
State.getUpgradeTypeOptions = action(function() {
	var _this = this;
	Http.request('getUpgradeInfoUrl', {}).then(function(response) {
		
		var arrNew = []
		for (var i=0;i<response.items.length;i++){
			arrNew[i] = {
						label:response.items[i].label,
						value:response.items[i].value
					}
		}
		State.typeOptions = arrNew;

	}).catch(function(err) {
		Message.error(err.message);
	});

});



//新增
State.newCreateSecondDoor = action(function(values){
	
	Http.request('addOrEditEquipment',values ).then(function(response) {
		
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
	
	Http.request('addOrEditEquipment',values ).then(function(response) {
		
		State.freshPageReturn();
		State.openEditDialog =false;
		Message.success("编辑成功");

	}).catch(function(err) {
		State.openEditDialog =false;
		State.freshPageReturn();
		Message.error(err.message);
	});	

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



//添加
State.equipmentAddLocation = action(function(param){
	var urlParams = {deviceId:param}
	Http.request('changeUnusedToList',{},urlParams).then(function(response) {
		console.log("response",response);
		Message.success("注册设备成功");
		State.getUnusedEquipmentFun();
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


//获取口令码
State.getPassword= action(function(){
	var urlParams = {deviceId:State.itemDetail.deviceId}
	Http.request('getPasswordURL',urlParams).then(function(response) {
		State.EquipmentPassword =response.token;
		State.passwordDialog = true;
	}).catch(function(err) {
		Message.error(err.message);
	});
})

//远程开门
State.openDoorOnlineAction = action(function(){
	var urlParams = {deviceId:State.itemDetail.deviceId}
	Http.request('openDoorOnlineURL',{},urlParams).then(function(response) {

		Message.success("远程开门成功");
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


//确认重启设备系统
State.confirmOpenRestartSystemsAction = action(function(){
	var urlParams = {deviceId:State.itemDetail.deviceId}
	Http.request('restartSystemsUrl',urlParams).then(function(response) {
		Message.success("设备接收到重启命令");
	}).catch(function(err) {
		Message.error(err.message);
	});
})

//确认重启APP
State.confirmOpenRestartAPPAction = action(function(){
	var urlParams = {deviceId:State.itemDetail.deviceId}
	Http.request('restartAPPUrl',urlParams).then(function(response) {
		Message.success("设备接收到重启APP命令");
	}).catch(function(err) {
		Message.error(err.message);
	});
})




//确认恢复出厂设置
State.confirmResetEquipmentAction  = action(function(){
	var urlParams = {deviceId:State.itemDetail.deviceId}
	Http.request('resetEquipmentUrl',urlParams).then(function(response) {
		console.log("response",response);
		Message.success("设备已收到恢复出厂设置的消息");
	}).catch(function(err) {
		Message.error(err.message);
	});
})

//确认刷新H5
State.confirmFreshHTMLAction = action(function(){
	var urlParams = {deviceId:State.itemDetail.deviceId}
	Http.request('freshHTMLUrl',urlParams).then(function(response) {
		
		Message.success("设备已经收到刷新H5页面的消息");
	}).catch(function(err) {
		Message.error(err.message);
	});
})


//刷新设备上报信息
State.freshEquipmentReporterAction = action(function(){
	var urlParams = {deviceId:State.deviceVO.deviceId}
	Http.request('freshReporteInfoUrl',urlParams).then(function(response) {
		State.deviceVO.reported = response.reported;
		Message.success("刷新成功");
	}).catch(function(err) {
		Message.error(err.message);
	});
})


State.confirmSynchronizingAction = action(function(){
	var urlParams = {deviceId:State.deviceVO.deviceId}
	Http.request('SynchronizingUrl',{},urlParams).then(function(response) {
		
		Message.success("同步成功");
	}).catch(function(err) {
		Message.error(err.message);
	});
})


//一代门禁重置
State.confirmResetFirstEquipmentState = action(function(){
	var urlParams = {deviceId:State.itemDetail.deviceId}
	Http.request('resetFirstEquipmentUrl',urlParams).then(function(response) {
		Message.success("重置设备成功");
	}).catch(function(err) {
		Message.error(err.message);
	});
})








module.exports = State;


