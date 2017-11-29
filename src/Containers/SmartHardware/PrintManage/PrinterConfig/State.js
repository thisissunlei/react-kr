

import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({
	printerConifigListParams:{
		page:1,
		pageSize:15,
		communityId: '',
		
	},
	openNewCreate : false

});


//新增
State.newCreatePrinterConfig = action(function(values){
	
	Http.request('addPrinterConfig',{},values ).then(function(response) {
		
		State.printerConifigListParams = {
			page:1,
			pageSize:15,
			communityId : '',
			date: new Date()		
		}
		State.openNewCreate =false;
		Message.success("新增成功");

	}).catch(function(err) {
		State.openNewCreate =false;
		State.printerConifigListParams = {
			page:1,
			pageSize:15,
			communityId: '',
			date: new Date()		
		}
		Message.error(err.message);
	});	

})


module.exports = State;













