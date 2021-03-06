import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable,
	toJS
} from 'mobx';
import {
	Actions,
	Store
} from 'kr/Redux';
import {Http} from "kr/Utils"
let State = observable({
		detail:[],
		ordersNames:[],
		orderList:[],
		customerName:"",
		orderCount:'',
		haveOrder:false,

});
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

//客户名称下拉
State.ordersListData=action(function(customerId,id){

	    var _this = this;
		Http.request('orders-names', customerId).then(function(response) {
			let label='',value='';
			let orderList=[];
			for(let i=0;i<response.orderList.length;i++){
			    let order={};
				order.value=response.orderList[i].id;
				order.label=response.orderList[i].mainbillname;
				order.communityid=response.orderList[i].communityid;
				orderList.push(order);
			}
			var noContract = {
				'value': '-1',
				'label': '新建订单'
			}
			orderList.unshift(noContract);
			extendObservable(_this,{orderList});



		}).catch(function(err) {

			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);

		});
})
module.exports = State;
