

import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({


	openBatchAddDialog : false,
	openAddEquipmentToGroup : false,



	openNewCreateDoorGroup : false,
	openChangeMemeberDialog : false,

	openUpgradeAdd : false,
	upgradeListParams:{
		page:1,
		pageSize:15,
	},
	doorTypeOptions:[],
	closeConfirmDelete : false,
	itemDetail : {},
	batchUpgradeDialog : false,
	uploadedInfo :{}

});


//获取字典数据
State.getDicOptions= action(function() {
	Http.request('getWarningType',{}).then(function(response) {
		var arrNew = []
		if(response.DoorType){
			for (var i=0;i<response.DoorType.length;i++){

			arrNew[i] = {
						label:response.DoorType[i].desc,
						value:response.DoorType[i].value
					}
			}
		}

		State.doorTypeOptions = arrNew;
	}).catch(function(err) {
		Message.error(err.message);
	});

});




//确认删除
State.confirmDeleteAction = action(function() {
	var urlParams = {id:State.itemDetail.id};
	console.log("urlParams",urlParams);
	Http.request('deleteUpgradeInfo',urlParams).then(function(response) {
		Message.success("删除成功");
		State.upgradeListParams={
			page:1,
			pageSize:15,
			date : new Date()
		}
	}).catch(function(err) {
		Message.error(err.message);
	});

});


State.openBatchUpgradeDialog  = action(function() {

	State.batchUpgradeDialog = !State.batchUpgradeDialog 

});



module.exports = State;
















