import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';
let State = observable({
	openCreate:false,
	

});

State.upItemPosition = action(function(id) {
	


});
State.resetUpItemPosition = action(function(id) {
	
});

State.activityGetList = action(function(id) {
	
});


module.exports = State;
