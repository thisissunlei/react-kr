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
	openDetail:false,
	openEditDetail: false,
	openAdvancedQuery :false,
	openCloseNavs:false,
	status:false,
	submit:false,
	itemDetail: {},
	item: {},
	list: {},
	content:'',
	filter:'COMP_NAME',
	// 是否置顶
	isStick : false,
	// 上传图片地址
	requestURI :'/mockjsdata/33/activity/upload-pic', 
	// 默认地址

	initailPoint : "北京",

	choseName: false,
	chosePhone: false,
	choseCompany: false,
	chosePosition: false,
	choseAdd: false,
	noPublic : false,
	
	searchParams: {
		beginDate:'',
		cityId:'',
		countyId: '',
		endDate:'',
		name:'',
		page: 1,
		pageSize: 15,
		type:'',
	},
	
});


module.exports = State;
