import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';
let State = observable({
	// 上传图片地址
	requestURI :'/api/krspace-finance-web/activity/upload-pic',
	detailContent:'',
});


State.getDetail = action(function(id) {
	var _this = this;
	Http.request('getActivityDetail', {
		id: id,
	}).then(function(response) {
		_this.detailContent = response.summary;
	}).catch(function(err) {

	});

});



module.exports = State;
