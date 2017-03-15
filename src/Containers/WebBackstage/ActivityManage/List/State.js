import mobx, {
	observable,
	action,
} from 'mobx';
import {
	Actions,
	Store
} from 'kr/Redux';

let State = observable({
	openNewCreate: false,
	openView: false,
	openEditDetail: false,
	openAdvancedQuery :false,
	status:false,
	submit:false,
	itemDetail: {},
	item: {},
	list: {},
	content:'',
	filter:'COMP_NAME',
	searchParams: {
		page: 1,
		pageSize: 15,
		beginDate:'',
		endDate:'',
		cityId:'',
		type:'',
		name:'',
		companyId:0
	}
});


module.exports = State;
