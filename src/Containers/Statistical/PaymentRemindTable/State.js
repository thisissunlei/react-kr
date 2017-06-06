import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';
let State = observable({
	// 即将开发票的ID
	invoiceId :0,
	// 备注信息
	voiceIntro :'',
	openDialog : false,
	items:[],
	searchParams:{
		communityId:'',
		customerName:'',
		beginDate:'',
		endDate:'',
		page:1,
		pageSize:10
	}

});

State.getList = action(function(id) {

	var _this = this;
	var searchParams = State.searchParams;
	Http.request('getPaymentRemind', searchParams).then(function(response) {
		State.items = response.items;
	}).catch(function(err) {
		Message.error(err.message);
	});

});

State.submitVioce = action(function(){

	var _this = this;
	var searchParams = {id:State.invoiceId,intro:State.voiceIntro};
	console.log("searchParams",searchParams);
	// Http.request('getPaymentRemind', searchParams).then(function(response) {
	// 	// State.items = response.items;
	// 	Message.success("提交成功");
	// }).catch(function(err) {
	// 	Message.error(err.message);
	// });

});


module.exports = State;
