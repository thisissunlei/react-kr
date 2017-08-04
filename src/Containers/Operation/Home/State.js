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
import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {
    Message
} from 'kr-ui';
import {Http} from "kr/Utils"


let State = observable({
	openChangeCommunity:false,
	info:{
		communityName:'酒仙桥社区',
		communityId:'',
		cityId:''
	},
	stationType:'rent',
	roomType:'rent',
	//收账payment、订单order、带入驻合同agreement、预约参观visit
	tableType:'payment',
	loading:true,
	paymentList:{
		items:[]
	},
	InfoData:{},
	openMonthPayment:false,
	openAllPayment:false,
	arrearages:false,
	openSettledCustomer:false,
	signedCustomer:false,
	allCustomer :false,
	fCustomer :false,
	newClue:false,
	cityList :[],
	communitys:[],
	orderList:{
		items:[]
	},
	agreementList:{
		items:[]
	},
	visitList:{
		items:[]
	},
	openAgreementDetail:false,
	customerId:'',
	mainbillId:''


});

// 获取运营主页数据
State.getHomeData=action(function(params){
		let _this = this;
		Http.request('get-home-data', params).then(function(response) {
			_this.InfoData = response;
			let info = {};
			info.communityName = response.community;
			info.communityId = response.communityId;
			_this.info = info;
			_this.getPaymentList({page:1,pageSize:10,cmtId:_this.info.communityId})
		}).catch(function(err) {
			Message.error('后台出错，请联系管理员');
		});
		//Store.dispatch(Actions.switchSidebarNav(false));
})
State.setAgreementData = action(function(data){
	this.openAgreementDetail = true;
	this.customerId = data.customerId;
	this.mainbillId = data.mainbillId;
})


//select下拉数组的初始化
State.selectDataInit=action(function(params) {
	this.selectData=params;
});
State.ChangeCommunity = action(function(value) {
	this.info = value;
	this.InfoData = {};
	this.tableType='payment';
	let obj = {items:[],page:1,pageSize:10,totalCount:0};
	this.paymentList = obj;
	this.orderList = obj;
	this.agreementList = obj;
	this.visitList = obj;
	State.getHomeData({cmtId:value.communityId})
	this.openChangeCommunity = false;
});

// 获取应收账款的数据
State.getPaymentList=action(function(params){
		let _this = this;
		params = Object.assign({},params,{cmtId:_this.info.communityId})
		Http.request('get-accounts-receivable', params).then(function(response) {
			_this.paymentList = response;
			_this.loading = false;
		}).catch(function(err) {
			Message.error(err.message);
		});
		//Store.dispatch(Actions.switchSidebarNav(false));
})
// 获取切换社区
State.getCommunityList=action(function(){
		let _this = this;
		Http.request('getActivityCommunityList',"").then(function(response){
			console.log('==community===>',response)
			_this.cityList= response.map((item,index)=>{
				
				item.communitys = item.communitys.map(value=>{
					let i = value;
					i.value = value.id;
					i.label = value.name;
					return i;
				})
				let obj = item;
				obj.value = item.id;
				obj.label = item.name;
				return obj;
			})
		}).catch(function(err) {
			Message.error('后台出错，请联系管理员');
		});
		//Store.dispatch(Actions.switchSidebarNav(false));
})
// 获取订单到期列表
State.getOrderList=action(function(params){
		let _this = this;
		params = Object.assign({},params,{cmtId:_this.info.communityId})
		Http.request('get-expire-contract',params).then(function(response){
			_this.orderList = response;
		}).catch(function(err) {
			// Message.error(err.message);
		});
		//Store.dispatch(Actions.switchSidebarNav(false));
})
// 待驻合同列表
State.getIncomeList=action(function(params){
		let _this = this;
		params = Object.assign({},params,{cmtId:_this.info.communityId})
		Http.request('get-settled-contract',params).then(function(response){
			_this.agreementList = response;
		}).catch(function(err) {
			Message.error('后台出错，请联系管理员');
		});
		//Store.dispatch(Actions.switchSidebarNav(false));
})
// 预约参观列表
State.getVisitList=action(function(params){
		let _this = this;
		params = Object.assign({},params,{cmtId:_this.info.communityId})
		Http.request('get-appointment',params).then(function(response){
			_this.visitList = response
		}).catch(function(err) {
			Message.error('后台出错，请联系管理员');
		});
})

State.getCommunity=action(function(id){
	let list = [];
	list = this.cityList.filter((item)=>{
		if(item.id === id){
			return item;
		}
	})
	State.communitys = list[0].communitys;
	
})

// 获取切换社区
State.getLeftList =action(function(type){
		let _this = this;
		let params = {page:1,pageSize:10}

		switch (type){
			case 'payment':
				_this.getPaymentList(params);
				_this.tableType = type;
				break;
			case 'order':
				_this.tableType = type;
				_this.getOrderList(params);
				break;
			case 'agreement':
				_this.tableType = type;
				_this.getIncomeList(params);
				break;
			case 'visit':
				_this.tableType = type;
			 	_this.getVisitList(params)
			 	break;
			default:
				return;
		}
})


module.exports = State;
