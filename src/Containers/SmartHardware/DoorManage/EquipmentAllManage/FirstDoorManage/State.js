import mobx, {
	observable,
	action,
} from 'mobx';
import {Actions,Store} from 'kr/Redux';
import {
	reduxForm,
	initialize,
	change
} from 'redux-form';
import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';

let State = observable({
	makerOptions : []
});

State.getListDic = action(function() {
	var _this = this;
	Http.request('getListDic', {}).then(function(response) {
		
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