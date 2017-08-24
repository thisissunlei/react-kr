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
		{type:'负责人1',
		unitprice:'123',
		name:'111',
		phone:'111',
		email:'111',
		headerUrl:''},
		{type:'负责人2',
		unitprice:'111',
		name:'222',
		phone:'222',
		email:'222',
		headerUrl:''}],
	position:{
		name:'',
		phone:'',
		email:''
	},
	searchParams:{
		
	}
	
});

//action
State.getBasicInfo = action(function(params) {
	var _this = this;
	



});

module.exports = State;
