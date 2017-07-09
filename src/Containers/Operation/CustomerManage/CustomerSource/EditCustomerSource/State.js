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
    isCode : true,
	isOrderName:true,
	names : {} ,
	codes : {} ,
	orderNums :{},
	childs:{},
});

module.exports = State;
