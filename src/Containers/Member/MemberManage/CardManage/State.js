

import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({
	cardManageSearchParams:{
		page:1,
		pageSize: 15,
		type:'',
		value:''
	}
	
});



// 批量删除设备
State.deleteEquipmentBatch= action(function() {
	
	Http.request('deleteEquipmentBatch',{},{ids:State.selectedDeleteIds}).then(function(response) {
		
		State.freshPageReturn();
		Message.success("删除成功");
	}).catch(function(err) {
		Message.error(err.message);
	});

});



module.exports = State;


