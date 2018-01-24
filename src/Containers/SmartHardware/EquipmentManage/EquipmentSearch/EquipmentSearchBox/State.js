

import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({
	listUrl : '',
	listParams : {},
	repeatIpParams : {},
	searchIpParams:{}
});




//刷新设备上报信息
State.freshEquipmentReporterAction = action(function(){
	var urlParams = {deviceId:State.iitemDetail.deviceId}
	Http.request('freshReporteInfoUrl',urlParams).then(function(response) {
		State.iitemDetail.reported = response.reported;
		Message.success("刷新成功");
	}).catch(function(err) {
		Message.error(err.message);
	});
})



module.exports = State;


