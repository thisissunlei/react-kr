

import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({

	realPage : 1,
	openHardwareDetail:false,
	openNewCreate:false,
	openEditDialog:false,
	openConfirmDelete:false,
	openSearchEquipment:false,
	openSearchDialog :false,
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
	searchEquipmentList :[]

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
		
	}).catch(function(err) {
		Message.error(err.message);
	});

});

//单个删除
State.deleteEquipmentSingle= action(function() {
	
	
	Http.request('deleteEquipmentSingleURL',{},{id:State.selectedDeleteIds}).then(function(response) {
		
		State.freshPageReturn();		
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
		
		State.equipmentSecondParams = {
			page:State.realPage,
			pageSize:15,
			date: new Date()		
		}
		State.openEditDialog =false;
		Message.success("编辑成功");

	}).catch(function(err) {
		State.openEditDialog =false;
		State.equipmentSecondParams = {
			page:State.realPage,
			pageSize:15,
			date: new Date()		
		}
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
        pageSize: 15
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
		console.log("response",response);
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
		State.freshSearchEquipmentPage();

	}).catch(function(err) {
		Message.error(err.message);
	});
})






module.exports = State;













