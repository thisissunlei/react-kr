import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable
} from 'mobx';
import {Http} from 'kr/Utils';
import {
    Message
} from 'kr-ui';

let State = observable({
		openNewMerchants:false,
		openLookMerchants:false,
		openSearchUpper:false,
		openEditCustomerList:false,
		openNewCustomerIndent:false,
		openNewIndent:false,
		openEditIndent:false,
		listId:0,
		companyName:'',
		openDelete:false,
		editIndentData:{},
		editIndentId:'',
		deleteId:'',

		customerName:"",
		orderCount:"",
		mainbillname:"",

		cityname:"",
		isOpenIndent:false,
		ishasOffice:false,
		editCity:'',
		editprojectName:'',
		cityNameIndent:"",
		allData:''
});
State.hasOfficeChange=action(function(params){
	this.ishasOffice=params;
})
//新建页的开关
State.switchNewCustomerList = action(function() {
	this.openNewMerchants=!this.openNewMerchants;
});
//查看页面的开关
State.switchLookCustomerList = action(function() {
	this.openLookMerchants=!this.openLookMerchants;
});
//编辑页面的开关
State.switchEditCustomerList = action(function() {
	this.openEditCustomerList=!this.openEditCustomerList;
})
//新增排放记录的开关
State.switchCustomerIndent = action(function() {
	this.openNewCustomerIndent=!this.openNewCustomerIndent;
})
//新建订单的开关
State.switchNewIndent = action(function() {
	this.openNewIndent=!this.openNewIndent;

})
//编辑订单的开关
State.switchEditIndent=action(function() {
	this.openEditIndent=!this.openEditIndent;
})
//高级查询的开关
State.searchUpperCustomer = action(function() {
	this.openSearchUpper=!this.openSearchUpper;
});
//删除订单
State.openDeleteOrder= action(function() {
	this.openDelete=!this.openDelete;
})
//编辑定点id
State.editIndentIdChange=action(function(params){
	this.editIndentId=params;
})

//订单名称
State.orderNameChange=action(function(params){
	this.orderName=params;
})

//获取订单名称
State.orderNameInit= action(function(value) {
	var _this=this;
	let data={};

	data.customerId=value;

	Http.request('get-customName-orderName',data).then(function(response) {
		_this.customerName=response.customerName;
		_this.orderCount=response.orderCount;
	}).catch(function(err) {
		 Message.error(err.message);
	});
});

//城市改变
State.cityChange=action(function(params){
	this.cityname=params;
})


State.closeAllMerchants = action(function() {
	this.openLookMerchants=false;
	this.openNewMerchants=false;
	this.openSearchUpper=false;
	this.openEditCustomerList=false;
	this.openNewCustomerIndent=false;
	this.openNewIndent=false;
	this.openEditIndent=false;
});
State.MerchantsListId = action(function(params) {
	this.listId=params;

});
module.exports = State;
