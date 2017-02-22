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

});
State.hasOfficeChange=action(function(params){
	this.ishasOffice=params;
})




module.exports = State;
