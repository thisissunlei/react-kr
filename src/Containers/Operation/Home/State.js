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
	paymentList:[]

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
			console.log('=====>',response.items)
			_this.loading = false;
		}).catch(function(err) {
			Message.error(err.message);
		});
		//Store.dispatch(Actions.switchSidebarNav(false));
})


module.exports = State;
