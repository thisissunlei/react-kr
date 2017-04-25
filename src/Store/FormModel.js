import mobx, { action} from 'mobx';

const FormFactory = function(formName){

	var form = mobx.observable({

		name:formName,
		values:{},
		fields:{},
		registeredFields:{},
		syncErrors:{},
		initializeValues:{},
		submitFailed:false,
		submitSucceeded:false,
		submitting:false,
		isInitSubmitCallback:false,

		fieldArrays:{
			fields:{
				members:[
					{lastname:'',userName:''}
				]
			},
		},

	});

	form.getName = action(function(){
		return this.name;
	});

	form.getState = action(function(){
		return mobx.toJS(this);
	});

	form.blur = action(function(fieldName,fieldValue) {

	});

	form.focus = action(function(fieldName) {

	});

	form.getFieldError = action(function(fieldName){
		var errors = this.getErrors();
		return errors[fieldName];
	});


	form.getFormState = action(function() {
		return mobx.toJS(this);
	});

	form.reset = action(function() {
		var initializeValues = this.initializeValues;
		this.changeValues(initializeValues);
	});
	form.destory = action(function() {
		this.isInitSubmitCallback = false;
	});

	form.stopSubmit = action(function(errors) {

		this.setErrors(errors);

		var isError = false;
		for(var item in errors){
			if(errors.hasOwnProperty(item)){
				isError = true;
			}
		}

		if(isError){
			this.submitSucceeded = false;
			this.submitting = false;
			this.submitFailed = true;
		}else{
			this.submitSucceeded = true;
			this.submitting = false;
			this.submitFailed = true;
		}

	});

	form.getValues = action(function() {
		return mobx.toJS(this.values);
	});

	form.validate = action(function() {
		var values = this.getValues();
		var validate = this.getValidateCallback();
		var errors = validate(values);
		this.startSubmit();
		this.stopSubmit(errors);

	});

	form.submit = action(function() {

		this.validate(formName);
		this.touchAll(formName);

		var submitCallback = this.submitCallback;

		if(form.submitSucceeded){
			let values = this.getValues(formName);
			submitCallback(values);
		}

	});

	form.startSubmit = action(function() {
		this.submitting = true;
		this.submitSucceeded = false;
		this.submitFailed = false;
	});

	form.setSubmitCallback = action(function(submitHandle) {

		submitHandle = submitHandle || function(){};
		if(this.isInitSubmitCallback){
			return ;
		}
		this.submitCallback = submitHandle;
		this.isInitSubmitCallback = true;

	});
	form.getValidateCallback = action(function() {
		return this.validateCallback;
	});

	form.setValidateCallback = action(function(validate) {
		var validateCallback = validate || function(){};
		mobx.extendObservable(this,{validateCallback});
	});

	form.getFieldValue = action(function(fieldName) {
		var values = this.getValues();
		return values[fieldName] || '';
	});

	form.initialize = action(function(fieldValues){

		if(typeof fieldValues !== 'object'){
			return ;
		}

		this.changeValues(fieldValues);

		if(this.initialized){
			return ;
		}

		var initializeValues = fieldValues;
		var initialized = true;

		mobx.extendObservable(this,{initializeValues,initialized});

	});



	form.getField = action(function(fieldName) {
		var fields = mobx.toJS(this.fields);
		return fields[fieldName] || {};
	});

	form.touchAll = action(function(formName) {
		var fields = mobx.toJS(this.fields);
		for(var item in fields){
			if(fields.hasOwnProperty(item)){
				this.touch(item);
			}
		}
	});

	form.touch = action(function(fieldName) {

		var fields = mobx.toJS(this.fields);
		var field = fields[fieldName];

		field = Object.assign({},field,{touched:true});

		fields[fieldName] = field;
		mobx.extendObservable(this,{fields});

	});


	form.setErrors = action(function(errors) {
		var syncErrors = Object.assign({},errors);
		mobx.extendObservable(this,{syncErrors});
	});

	form.getErrors = action(function(formName) {
		return mobx.toJS(this.syncErrors);
	});

	form.getInitializeValues = action(function() {
		return mobx.toJS(this.initializeValues);
	});

	form.change = action(function(fieldName,fieldValue) {
		var values = this.getValues();
		values[fieldName] = fieldValue;
		mobx.extendObservable(this,{values});
	});

	form.changeValues = action(function(values){

		var isEmpty = function(obj){

			for(var name in obj){
				return false;
			}
			return true;
		}

		if(isEmpty(values)){

			var fieldValues = this.getValues();
			for(var fieldName in fieldValues){
				if(fieldValues.hasOwnProperty(fieldName)){
					this.change(fieldName,'');
				}
			}
			return ;
		}

		for(var field in values){
			if(values.hasOwnProperty(field)){
				this.change(field,values[field]);
			}
		}

	});


	form.unregisterField = action(function(fieldName) {

		var registeredFields = mobx.toJS(this.registeredFields);
		var values = this.getValues();

		if(registeredFields.hasOwnProperty(fieldName)){
			delete registeredFields[fieldName];
			delete values[fieldName];
		}

		mobx.extendObservable(this,{registeredFields,values});

	});

	form.registerField = action(function(fieldName,type){

		var registeredFields = mobx.toJS(this.registeredFields);

		if(registeredFields.hasOwnProperty(fieldName)){
			let reField = registeredFields[fieldName];
			let count = reField.count + 1;
			registeredFields[fieldName] = Object.assign({},{name:fieldName},{type},{count});
		}else{
			registeredFields[fieldName] = Object.assign({},{name:fieldName},{type},{count:0});
		}

		var values = mobx.toJS(this.values);

		if(!values.hasOwnProperty(fieldName)){
			values[fieldName] = '';
		}

		var fields = mobx.toJS(this.fields);
		fields[fieldName] = Object.assign({},{touched:false,visited:false});

		var initializeValues = this.initializeValues;

		if(!initializeValues.hasOwnProperty(fieldName)){
			initializeValues[fieldName] = '';
		}

		this.registeredFields =  registeredFields;
		this.values =  values;
		this.fields =  fields;
		this.initializeValues = initializeValues;


	});

	return form;

}

//全局store
let State = mobx.observable({ });

State.getForm = action(function(formName) {
	var form = this;
	if(!form.hasOwnProperty(formName)){
		form[formName] = FormFactory(formName);
	}
	return form[formName];
});
//TODO

/*


State.blur = action(function(formName,fieldName,fieldValue) {

});

State.focus = action(function(formName,fieldName) {

});

	State.autofill = action(function(formName,fieldName) {

	});

	State.arrayInsert = action(function(formName,fieldName,index,value) {

	});

	State.arrayMove = action(function(formName,fieldName,fromIndex,toIndex) {

	});

	State.arrayShift = action(function(formName,fieldName) {

	});

	State.arrayUnShift = action(function(formName,fieldName,value) {

	});

	State.arraySplice = action(function(formName,fieldName,index,removeNum,value) {

	});

	State.arraySwap = action(function(formName,fieldName,indexA,indexB) {

	});

	State.arrayPush = action(function(formName,fieldName,value) {

	});

	State.arrayPop = action(function(formName,fieldName) {

	});

	State.arrayRemove = action(function(formName,fieldName,index) {

	});

	State.arrayRemoveAll = action(function(formName,fieldName) {

	});



	State.arrayInsert = action(function(formName,fieldName,index,value) {

	});

	State.arrayMove = action(function(formName,fieldName,fromIndex,toIndex) {

	});

	State.arrayShift = action(function(formName,fieldName) {

	});

	State.arrayUnShift = action(function(formName,fieldName,value) {

	});

	State.arraySplice = action(function(formName,fieldName,index,removeNum,value) {

	});

	State.arraySwap = action(function(formName,fieldName,indexA,indexB) {

	});

	State.arrayPush = action(function(formName,fieldName,value) {

	});

	State.arrayPop = action(function(formName,fieldName) {

	});

	State.arrayRemove = action(function(formName,fieldName,index) {

	});

	State.arrayRemoveAll = action(function(formName,fieldName) {

	});
*/


module.exports = State;
