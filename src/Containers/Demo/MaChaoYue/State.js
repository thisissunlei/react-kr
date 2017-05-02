import mobx, {
	observable,
	action,
} from 'mobx';
import {
	Actions,
	Store
} from 'kr/Redux';

let State = observable({
	stationVos:[
		{type:'负责人1',unitprice:'',name:'',
		phone:'',
		email:''},
		{type:'负责人2',unitprice:'',name:'',
		phone:'',
		email:''}],
	position:{
		name:'',
		phone:'',
		email:''
	},
	headerUrl:'',
	
});

//action
State.getBasicInfo = action(function(params) {
	var _this = this;
	



});

module.exports = State;
