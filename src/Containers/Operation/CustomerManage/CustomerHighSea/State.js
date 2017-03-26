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
			pageSize:15		
		},
		openImport:false
});

State.openImportFun=action(function(){
	this.openImport=!this.openImport;
})

module.exports = State;
