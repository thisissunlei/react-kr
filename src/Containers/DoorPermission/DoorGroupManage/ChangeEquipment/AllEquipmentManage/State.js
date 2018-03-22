

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
	closeConfirmDelete : false,
	itemDetail : {},
	batchUpgradeDialog : false,
	uploadedInfo :{}

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
















