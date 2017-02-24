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

let State = observable({
	   
		openAgreement:false,
		openNewAgreement:false,
		agreementList:[],
		otherFunction:false,
		//查看
		openAgreementDetail:false,
		loading:false,
		contractList:[],

});
State.hasOfficeChange=action(function(params){
	this.ishasOffice=params;
})
//查看开关
State.agreementDetail=action(function(params){
	this.openAgreementDetail=!this.openAgreementDetail;
})
//列表数据请求
State.ajaxListData=action(function(ajaxData){
	    var _this = this;
		Store.dispatch(Actions.callAPI('contract-list', ajaxData)).then(function(response) {
			_this.contractList=response.items;
			setTimeout(function() {
					loading: false
			}, 0);

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);

		});
		Store.dispatch(Actions.switchSidebarNav(false));
})





module.exports = State;
