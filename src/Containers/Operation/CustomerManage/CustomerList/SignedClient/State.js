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
import {
    Message
} from 'kr-ui';
let State = observable({
		searchParams:{
			page:1,
		},
		openNewMerchants:false,
		openLookMerchants:false,
		openEditCustomerList:false,
		openNewCustomerIndent:false,
		openNewIndent:false,
		openEditIndent:false,
		openDelete:false,
		openSearchUpper:false,
		openSwitch:false,
		openPersonDialog:false,
		indentReady:{},
		listId:"",
		deleteId:'',
		companyName:'',
		openDelete:false,
		editIndentData:{},
		editIndentId:'',
		customerName:"",
		orderCount:"",
		mainbillname:"",
		cityname:"",
		editCity:'',
		editprojectName:'',
		ishasOffice:false,
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
//转移开关
State.openSwitchGoDialog= action(function() {
	this.openSwitch=!this.openSwitch;
});
//删除订单
State.openDeleteOrder= action(function() {
	this.openDelete=!this.openDelete;
})
//新建订单页得数据准备
State.indentReady= action(function(params) {
	this.indentReady=params;
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

	Store.dispatch(Actions.callAPI('get-customName-orderName',data)).then(function(response) {
		_this.customerName=response.customerName;
		_this.orderCount=response.orderCount;

	}).catch(function(err) {
		 Message.error(err.message);
	});		
});


//转移提交
State.switchSureSubmit= action(function(value) {
	var _this=this;
	Store.dispatch(Actions.callAPI('customerTransfer',{},value)).then(function(response) {
		 _this.openSwitch=false;
         Message.success('转移成功');
         _this.openPersonDialog=false;
         _this.searchParams={
         	page:1,
			time:+new Date()
         }
	}).catch(function(err) {
		 Message.error(err.message);
	});		
});
//导出
State.exportData = action(function(value) {
	    var search={};
	    search.company= this.searchParams.company;
	    search.cityId=this.searchParams.cityId;
	    search.communityId=this.searchParams.communityId;
	    search.signEndDate=this.searchParams.signEndDate;
	    search.signStartDate=this.searchParams.signStartDate;
	    if(!search.company){
	    	search.company='';
	    }
	    if(!search.cityId){
	    	search.cityId='';
	    }
	    if(!search.signStartDate){
	    	search.signStartDate='';
	    }
	    if(!search.communityId){
	    	search.communityId='';
	    }
	    if(!search.signEndDate){
	    	search.signEndDate='';
	    }
		let customerIds = [];
		if (value.length != 0) {
			value.map((item, value) => {
				customerIds.push(item.id)
			});
		}
		var url = `http://optest.krspace.cn/api/krspace-finance-web/customer/sign-customers-export?customerIds=${customerIds}&company=${search.company}&cityId=${search.cityId}&signStartDate=${search.signStartDate}&communityId=${search.communityId}&signEndDate=${search.signEndDate}`
		window.location.href = url;
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
