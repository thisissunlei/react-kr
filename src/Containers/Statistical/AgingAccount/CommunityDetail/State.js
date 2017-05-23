

import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({

	
	items : [],
	advanceQueryDialogOpen :false,
	mainbodyOptions:[],

	// 截止日期
	endDate:'',
	// 客户名称
	customerId:'',
	corporationId:'',
	communityId:'',
	// 欠费天数
	dayType:'',
	// 是否结束
	end :''

});


// 高级查询主体准备数据
State.getMainbody = action(function() {
	
	Http.request('getMainbody', {}).then(function(response) {
		
		for(var i=0;i<response.fnaCorporation.length;i++){
			State.mainbodyOptions.push({
				label:response.fnaCorporation[i].corporationName,
				value:response.fnaCorporation[i].id,
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





module.exports = State;
