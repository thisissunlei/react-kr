

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
State.getListDic = action(function() {
	var _this = this;
	Http.request('getListDic', {}).then(function(response) {
		console.log("response",response);
		var arrNew = []
		for (var i=0;i<response.Maker.length;i++){
			arrNew[i] = {
						label:response.Maker[i].desc,
						value:response.Maker[i].value
					}
		}
		
		State.makerOptions = arrNew;

	}).catch(function(err) {
		Message.error(err.message);
	});

});





module.exports = State;













