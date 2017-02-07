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
		searchParams:{},
		searchSignParams:{},
		dataReady:{},
		listValue:"请选择项目类型"
});

module.exports = State;
