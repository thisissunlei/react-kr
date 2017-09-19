import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable
} from 'mobx';
import {
	Message
} from "kr-ui";
import {Http} from "kr/Utils";
import {Actions,Store} from 'kr/Redux';
//全局store
let State = observable({
	contractList:[],
	totalPaper:'111',
	page:'',
	pageSize:'',
	//第二次打开的新建
	openTowAgreement:false,
	//第一次打开的新建
	openOneAgreement:false,
	//编辑合同
	openEditAgreement:false,
	openLocalStorage:false,
	openAgreementDetail:false,
	detailValue:'',

	//高级查询
	openSearchUpper:false,
	communityId:'',
	saleList:[]

});

//列表数据请求
State.ajaxListData=action(function(ajaxData){
	    //错误到了这一层要深究
		ajaxData = Object.assign({},ajaxData);
	    var _this = this;
	    console.log('====列表数据请求====')
		Http.request('contract-list', ajaxData).then(function(response) {
			_this.contractList=response.items;
			_this.totalPaper=response.totalCount;
			_this.page=response.page;
			_this.pageSize=response.pageSize;
			setTimeout(function() {
					loading: false
			}, 0);
		}).catch(function(err) {
			Message.error(err.message);
		});
		//Store.dispatch(Actions.switchSidebarNav(false));
})
State.getSaleList=action(function(){
	    var _this = this;
		Http.request('sale-tactics', {communityId:_this.communityId}).then(function(response) {
			console.log('getSaleList===>',response)
			let saleList = response.map((item)=>{
					let obj = {};
					obj.label = item.tacticsName;
					obj.value = item.tacticsType;
					obj.id = item.tacticsId;
					obj.discount = item.discount;

					return obj;
				})
				_this.saleList = saleList;
		}).catch(function(err) {
			// Message.error(err.message);
		});
		//Store.dispatch(Actions.switchSidebarNav(false));
})

module.exports = State;
