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
	newCreatAndEditParams:{
		maxPerson : '',
		infoPic :'',
		countyId :'',
		type :'',
		sort :'',
		enroll :'',
		name :'',
		beginDate :'',
		address :'',
		top :'',
		summary :'',
		joinType:'',
		coverPic: '',
		publishType: '',
		id: '',
		Point: '',
		xPoint: '',
		endDate: '',
		contact: '',
		contactPhone: '',
		cityId: '',
	}
});


module.exports = State;
