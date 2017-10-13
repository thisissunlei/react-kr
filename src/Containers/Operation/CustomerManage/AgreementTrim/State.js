
import {reduxForm,initialize} from 'redux-form';
import {Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import {Message,Notify} from 'kr-ui';
import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable,
	toJS
} from 'mobx';
let State = observable({
	// 上传图片地址
	requestURI :'/api/krspace-finance-web/activity/upload-pic',
	detailContent:'',
	openNewCreate:false,
	openView:false,
	openSearch:false,
	newsDate:{},
	searchParams: {
		beginDate:'',
		cityId:'',
		countyId: '',
		endDate:'',
		name:'',
		page: 1,
		pageSize: 15,
		type:'',
		time:''
	},
	newsDetail:'',


	openAgreementList:false,
	orderList:[],
	contractList:[],
	openEdit:false,
	itemDetail:{},
	openDeleteContent:false

});

//获取订单名称
State.getOrderList = action(function(value) {
	console.log('customerId',value)
		var _this = this;
		Http.request('orders-names', {customerId:value}).then(function(response) {
			let label='',value='';
			let orderList=[];
			for(let i=0;i<response.orderList.length;i++){
			    let order={};
				order.value=response.orderList[i].id;
				order.label=response.orderList[i].mainbillname;
				orderList.push(order);
			}
			// var noContract = {
			// 	'value': '-1',
			// 	'label': '新建订单'
			// }
			// orderList.unshift(noContract);
			extendObservable(_this,{orderList});



		}).catch(function(err) {

			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);

		});

});

//新建编辑保存
State.saveNews = action(function(params) {
	var _this = this;
	Http.request('save-news', {},params).then(function(response) {
		_this.openNewCreateDialog();
		Message.success("新建成功");
		window.location.reload();
	}).catch(function(err) {
		Message.error(err.message);
	});

});
//编辑保存
State.saveEditNews = action(function(params) {
	var _this = this;
	let searchParams = Object.assign({},this.searchParams);
	searchParams.time = +new Date();
	
	Http.request('save-news', {},params).then(function(response) {
		 Message.success("修改成功");
		_this.openEditDialog();
		_this.searchParams = searchParams;
	}).catch(function(err) {
		Message.error(err.message);
	});

});

State.getAgreementList = action(function(id) {
	let _this = this;
	Http.request('get-order-detail', {
			mainBillId: id
		}).then(function(response) {
			_this.contractList = response.contractList;
			console.log('=====>',response.contractList)
		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);

		});
});

State.openNewCreateDialog = action(function(params) {
	this.openNewCreate=!this.openNewCreate;

});
State.openViewDialog = action(function(params) {
	   this.openView=!this.openView;

});
State.openEditDialog = action(function(params) {
	this.openEdit=!this.openEdit;
	

});
State.openSearchDialog = action(function(params) {
	this.openSearch=!this.openSearch;
});


module.exports = State;
