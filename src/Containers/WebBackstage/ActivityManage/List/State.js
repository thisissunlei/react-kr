import mobx, {
	observable,
	action,
} from 'mobx';
import {
	Actions,
	Store
} from 'kr/Redux';
import {Message} from 'kr-ui';
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

State.itemDownPublish = action(function(id) {
	var _this = this;
	Store.dispatch(Actions.callAPI('activityPublish', {
		id: id,
		type:0
	})).then(function(response) {
		let searchParams = _this.searchParams;
		console.log('--->',_this.searchParams);
		Message.success('下线成功');
		// extendObservable(_this, {
		// 	searchParams:searchParams
		// })


	}).catch(function(err) {
		Message.error('下线失败');
	});



});



module.exports = State;
