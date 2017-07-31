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
		communityId:''
	},
	stationType:'rent',
	roomType:'rent',
	//收账payment、订单order、带入驻合同agreement、预约参观visit
	tableType:'payment',
	loading:true,
	paymentList:[],
	openMonthPayment:false,
	openAllPayment:false,
	arrearages:false,
	openSettledCustomer:false,
	signedCustomer:false,
	allCustomer :false,
	fCustomer :false,
	newClue:false,
	cityList :[],
	community:[]

});
//select下拉数组的初始化
State.selectDataInit=action(function(params) {
	this.selectData=params;
});
State.ChangeCommunity = action(function(value) {
	this.info = value;
	this.openChangeCommunity = false;
});

// 获取应收账款的数据
State.getPaymentList=action(function(params){
		// params = {page:1,pageSize:10};
		let _this = this;
		Http.request('contract-list', params).then(function(response) {
			_this.paymentList = response.items;
			_this.loading = false;
		}).catch(function(err) {
			Message.error(err.message);
		});
		//Store.dispatch(Actions.switchSidebarNav(false));
})
// 获取应收账款的数据
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
			Message.error(err.message);
		});
		//Store.dispatch(Actions.switchSidebarNav(false));
})


module.exports = State;
