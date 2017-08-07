

import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({

	openHardwareDetail:false,
	openNewCreate:false,
	openEditDialog:false,
	openConfirmDelete:false,
	openSearchEquipment:false,
	equipmentDatailInfo:[],
	selectedDeleteIds:'',
	makerOptions :[],
	equipmentParams: {
		        page : 1,
		        pageSize: 15
		      },

});


// 高级查询主体准备数据
State.getMainbody = action(function() {
	
	Http.request('getMainbody', {}).then(function(response) {
		
		for(var i=0;i<response.length;i++){
			State.mainbodyOptions.push({
				label:response[i].corporationName,
				value:response[i].id,
			})
		}
	}).catch(function(err) {
		Message.error(err.message);
	});

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

// 删除设备
State.deleteEquipment= action(function() {
	
	var params={
		// ids : State.selectedDeleteIds,
		// endDate : State.endDate,
		// customerId :  State.customerId,
		// corporationId : State.corporationId,
		// communityId : State.communityId,
		// dayType : State.dayType,
		// end : State.end
	}
	
	//Http.request('deleteEquipment', searchParams).then(function(response) {
		
		//State.items = response;
		
	//}).catch(function(err) {
		//Message.error(err.message);
	//});

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

State.newCreateSecondDoor = action(function(values){
	
	Http.request('equipmentNewCreateOrEdit',{},values ).then(function(response) {
		
		State.equipmentParams = {
			page:1,
			pageSize:15,
			date: new Date()		
		}
		State.openNewCreate =false;
		Message.success("新增成功");

	}).catch(function(err) {
		State.openNewCreate =false;
		State.equipmentParams = {
			page:1,
			pageSize:15,
			date: new Date()		
		}
		Message.error(err.message);
	});	

})

State.editSecondDoor = action(function(values){
	
	Http.request('equipmentNewCreateOrEdit',{},values ).then(function(response) {
		
		State.equipmentParams = {
			page:1,
			pageSize:15,
			date: new Date()		
		}
		State.openNewCreate =false;
		Message.success("编辑成功");

	}).catch(function(err) {
		State.openNewCreate =false;
		State.equipmentParams = {
			page:1,
			pageSize:15,
			date: new Date()		
		}
		Message.error(err.message);
	});	

})


module.exports = State;













