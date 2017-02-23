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
    var  dateT=new Date();
	var dateYear=dateT.getFullYear();
	var dateMonth=dateT.getMonth()+1;
	var dateDay=dateT.getDate();
			if(dateDay<10){
				dateDay='0'+dateDay
			}
			if(dateMonth<10){
				dateMonth='0'+dateMonth
			}
    var todayDate=dateYear+'-'+dateMonth+'-'+dateDay;

let State = observable({
		searchParams:{
			page:1,	
			pageSize:15,
			createDateEnd:todayDate,
			createDateBegin:todayDate	
		},
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
