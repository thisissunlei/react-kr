

import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({
	openNewCreateUpgrade : false,
	upgradeListParams:{
		page:1,
		pageSize:15,
	},
	upgradeTypeOptions:[],
	closeConfirmDelete : false,
	itemDetail : {}

});


//获取字典数据
State.getDicOptions= action(function() {
	Http.request('getWarningType',{}).then(function(response) {
		var arrNew = []
		for (var i=0;i<response.UpgradeType.length;i++){

			arrNew[i] = {
						label:response.UpgradeType[i].desc,
						value:response.UpgradeType[i].value
					}
		}
		State.upgradeTypeOptions = arrNew;
	}).catch(function(err) {
		Message.error(err.message);
	});

});


State.NewCreateUpgrade = action(function(values) {
	Http.request('newCreateUpgradeUrl',{},values).then(function(response) {
		Message.success("添加成功");
		State.upgradeListParams={
			page:1,
			pageSize:15,
			date : new Date()
		}
	}).catch(function(err) {
		Message.error(err.message);
	});

});


//确认删除
State.confirmDeleteAction = action(function() {
	var urlParams = {id:State.itemDetail.id};
	console.log("urlParams",urlParams);
	Http.request('deleteUpgradeInfo',{},urlParams).then(function(response) {
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


module.exports = State;
















