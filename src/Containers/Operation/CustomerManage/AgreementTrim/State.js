
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
	openAgreementList:false,
	orderList:[],
	contractList:[],
	openEdit:false,
	itemDetail:{},
	openDeleteContent:false,
	openDelete:false,
	searchParams:{
		// pageSize:5
	},
	createData:false

});
State.opencreateData = action(function(){
	this.createData = !this.createData;
})

State.editAgreement = action(function(item){
	this.openEdit = true;
    let _this = this;
    let url = '';
    switch (item.contracttype){
			case 'ENTER' :
				url = 'show-checkin-agreement'; 
				break;
			case 'ADDRENT' :
				url = 'show-checkin-agreement';
				break;
			case 'RENEW' :
				url = 'show-checkin-agreement'
				break;
			case 'LESSRENT' :
				url = 'showFnaContractRentController'
				break;
			case 'INTENTION' :
				url = 'showFinaContractIntentletter'
				break;
		}
	Http.request(url, {
		id: item.id
	}).then(function(response) {
		_this.itemDetail = response;
	}).catch(function(err) {
		Notify.show([{
			message: err.message,
			type: 'danger',
		}]);
	});

})

State.deleteDemo = action(function() {
	var _this = this;
	Http.request('delete-demo', {},'').then(function(response) {
		Message.success("删除成功");
		window.location.reload();
	}).catch(function(err) {
		Message.error(err.message);
	});

});

State.deleteAgreementButton = action(function(item){
	this.openDeleteContent = true;
    this.itemDetail = item;
})


State.submitEdit = action(function(form){
	let time = +new Date();
	let _this = this;
	
	Http.request('agreementTrimSave', {},form).then(function(response) {
		Message.success("操作成功");
		let search = Object.assign({},State.searchParams,{time})
		_this.searchParams = search;
		_this.openEdit = false;
		_this.openAgreementList = false;
		_this.contractList = []
	}).catch(function(err) {
		Message.error(err.message);
	});
	//agreementTrimSave
	console.log('====>',form)
})
State.deleteAgreement = action(function(){
	let time = +new Date();
	let search = Object.assign({},State.searchParams,{time})
	this.searchParams = search;
	this.openDeleteContent = false;
	this.openEdit = false;
	this.openAgreementList = false;
	this.contractList = []
	console.log('====>')
})

//获取订单名称
State.getOrderList = action(function(value) {
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
