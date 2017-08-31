import mobx, {
	observable,
	action,
} from 'mobx';

import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';
let State = observable({
	openCreate:false,
	openView:false,
	openEdit:false,
	list :[{name:'1',time:+new Date()},
			{name:'2',time:+new Date()},
			{name:'3',time:+new Date()},
			{name:'4',time:+new Date()},
			{name:'5',time:+new Date()},
			{name:'6',time:+new Date()},
			{name:'7',time:+new Date()}
		],
	heightAuto:true,


});

State.showView = action(function(item) {
	
	// this.data = item;
	this.openView = true;
	this.data = {
		name:'11',
		code:'code',
		type:'1',
		remark:'123456'
	}

});
State.closeAll = action(function() {
	this.openCreate = false;
	this.openView = false;
	this.openEdit = false;
});

State.activityGetList = action(function(id) {
	
});


module.exports = State;
