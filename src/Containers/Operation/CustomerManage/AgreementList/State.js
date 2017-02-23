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
		searchParams:{
			page:1,		
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





module.exports = State;
