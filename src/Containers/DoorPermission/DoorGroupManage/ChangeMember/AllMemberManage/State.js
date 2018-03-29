

import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({

	openAddMemberToGroup : false,
	openBatchAddDialog : false,



	openNewCreateDoorGroup : false,
	openChangeMemeberDialog : false,

	openUpgradeAdd : false,
	upgradeListParams:{
		page:1,
		pageSize:15,
	},
	upgradeTypeOptions:[],
	closeConfirmDelete : false,
	itemDetail : {},
	batchUpgradeDialog : false,
	uploadedInfo :{}

});


//获取字典数据
State.getDicOptions= action(function() {
	Http.request('getWarningType',{}).then(function(response) {
		var arrNew = []
		if(response.UpgradePkgType){
			for (var i=0;i<response.UpgradePkgType.length;i++){

			arrNew[i] = {
						label:response.UpgradePkgType[i].desc,
						value:response.UpgradePkgType[i].value
					}
			}
		}

		State.upgradeTypeOptions = arrNew;
	}).catch(function(err) {
		Message.error(err.message);
	});

});




//确认删除
State.confirmDeleteAction = action(function() {
	var urlParams = {id:State.itemDetail.id};
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
















