

import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({

	openHardwareDetail:false,
	openNewCreate:false,
	openConfirmDelete:false,
	equipmentDatailInfo:[],
	selectedDeleteIds:'',
	makerOptions :[]

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





module.exports = State;
