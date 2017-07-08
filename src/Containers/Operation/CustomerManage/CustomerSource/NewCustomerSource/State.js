import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable
} from 'mobx';
import {
	Actions,
	Store
} from 'kr/Redux';
let State = observable({
		isName : true,
    isChildName : [],
    isCode : true,
    isChildCode : [],
    isRequire : [],
	isOrderName:true,
	isChildOrderName:[],
	names : {} ,
	codes : {} ,
	orderNums :{},
});

module.exports = State;
