

import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({
	openNewCreateDoorGroup : false,
	openEditDoorGroup: false,
	openDeleteGroup : false,
	openChangeMemeberDialog : false,
	openChangeEquipmentDialog : false,
	doorTypeOptions : [],
	groupLevelOptions: [{
		label:"普通组",
		value: "NORMAL"
	},{
		label:"全国通开组",
		value: "ROOT"
	},{
		label:"社区通开组",
		value: "COMMUNITY"
	},{
		label:"客户默认组",
		value: "CUSTOMER"
	}],
	

	openUpgradeAdd : false,
	upgradeListParams:{
		page:1,
		pageSize:15,
	},
	upgradeTypeOptions:[],
	closeConfirmDelete : false,
	itemDetail : {},
	batchUpgradeDialog : false,
	uploadedInfo :{},

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
















