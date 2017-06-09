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
	loading:false,
	totalPages:0,
	searchParams:{
		communityId:'',
		customerName:'',
		beginDate:'',
		endDate:'',
		page:1,
		pageSize:20
	}

});

State.getList = action(function() {
	State.loading = true;
	var _this = this;
	
	var searchParams = Object.assign({},State.searchParams);
	Http.request('getPaymentRemind', searchParams).then(function(response) {
		
		if(State.searchParams.page ==1){
			State.items = response.items;
		}else{
			for(var i=0;i<response.items.length;i++){
				State.items.push(response.items[i])
			}
		}

		State.totalPages = response.totalCount;
		State.loading = false;

	}).catch(function(err) {
		State.loading = false;
		Message.error(err.message);
	});

});



module.exports = State;
