

import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({
	warnSearchParams:{
		page:1,
		pageSize:15,
		stime :  '',
		etime: '',
		deviceId:'',
		logType: ''
	}

});


// 获取日志类型列表
State.getWarningTypeList = action(function() {
	var _this = this;
	Http.request('getWarningType', {}).then(function(response) {
		var arrNew = []
		for (var i=0;i<response.LogType.length;i++){
			arrNew[i] = {
						label:response.LogType[i].desc,
						value:response.LogType[i].value
					}
		}
		
		State.LogTypeOptions = arrNew;

	}).catch(function(err) {
		Message.error(err.message);
	});

});





module.exports = State;













