import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable
} from 'mobx';
import {
	Message
} from "kr-ui";
import {Http} from "kr/Utils";
import {Actions,Store} from 'kr/Redux';
//全局store
let State = observable({
	oldDetail:{},
	//inputType
	inputType:'',
	//comType
	comType:'',
	//判断itemStr
	itemStr:''
});



module.exports = State;
