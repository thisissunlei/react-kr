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
import {Actions,Store} from 'kr/Redux';
//全局store
let State = observable({
	contractList:[],
	totalPaper:'',
	page:'',
	pageSize:'',
	//第二次打开的新建
	openTowAgreement:false,
	//第一次打开的新建
	openOneAgreement:false,
	//编辑合同
	openEditAgreement:false,

});

//列表数据请求
State.ajaxListData=action(function(ajaxData){
	    //错误到了这一层要深究
		ajaxData = Object.assign({},ajaxData);
	    var _this = this;
		Store.dispatch(Actions.callAPI('contract-list', ajaxData)).then(function(response) {
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

module.exports = State;
