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
		listValue:"请选择项目类型",
		uiList1:[],
		uiList2:[],
		uiList3:[],
		uiList4:[],
		isUiList1:false,
		isUiList2:false,
		isUiList3:false,
		isUiList4:false,
});

module.exports = State;
