import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable,
  toJS
} from 'mobx';

//全局store
let State = observable({
  demoForm:{
		submitFailed:false,
		submitSucceeded:false,
		submitting:false,
    syncErrors:{
      email:'邮箱填写错误'
    },
    registeredFields:{
      email:{
          name:"email",
          type:"Field",
		  count:1,
      }
    },
    fields:{
        email:{
			chekced:false,
            visited:true,
            touched:true
        }
    },
	fieldArrays:{
		fields:{
			members:[
				{lastname:'',userName:''}
			]
		},
	},
    values:{
      email:'ayaya@qq.com'
    },
		initializeValues:{},
		initialized:false,
    anyTouched:true,
    submitFailed:true,
		submitCallback:function(){

		},
    validateCallback:function(){

    }
  }
});


State.setSubmitCallback = action(function(formName,submitHandle) {
	this.submitCallback = submitHandle;
});

State.isSubmitting = action(function(formName) {
		return this.submitting;
});

State.isSubmitFailed = action(function(formName) {
	return this.submitFailed;
});

State.isSubmitSucceeded = action(function(formName) {
	return this.submitSucceeded;
});

State.startSubmit = action(function(formName) {
	  var form = this.getForm(formName);
		form.submitting = true;
		form.submitSucceeded = false;
		form.submitFailed = false;
		this.setForm(formName,form);
});

State.stopSubmit = action(function(formName,errors) {

		this.setErrors(formName,errors);

		var isError = false;
		for(var item in errors){
			if(errors.hasOwnProperty(item)){
				isError = true;
			}
		}

		let form = this.getForm(formName);

		if(isError){
			form.submitSucceeded = false;
			form.submitting = false;
			form.submitFailed = true;
		}else{
			form.submitSucceeded = true;
			form.submitting = false;
			form.submitFailed = true;
		}

		this.setForm(formName,form);

	});

	State.submit = action(function(formName) {

		this.validate(formName);
		this.touchAll(formName);

		let form = this.getForm(formName);
		if(form.submitSucceeded){
			let values = this.getValues(formName);
			this.submitCallback(values);
		}

	});

	State.setValidateCallback = action(function(formName,validate) {
		var form = this.getForm(formName);
		form.validateCallback = validate;
		this.setForm(formName,form);
	});

	State.getValidateCallback = action(function(formName,validate) {
		var form = this.getForm(formName);
		return form.validateCallback;
	});

	State.initialize = action(function(formName,fieldValues){

		if(typeof fieldValues !== 'object'){
			return ;
		}

		this.changeValues(formName,fieldValues);
		var form = this.getForm(formName);

		if(form.initialized){
			return ;
		}

		form.initializeValues = fieldValues;
		form.initialized = true;

		this.setForm(formName,form);

	});

	State.validate = action(function(formName) {
		var values = this.getValues(formName);
		var validate = this.getValidateCallback(formName);
		var errors = validate(values);
		this.startSubmit(formName);
		this.stopSubmit(formName,errors);
	});

	State.createForm = action(function(formName,configs) {
		var form = {};
		form[formName] = Object.assign({},configs);
		extendObservable(this,form);

		var form = this.getForm(formName);
		var fields = form.fields;

		var field = fields[fieldName];
		field.touched = true;

		fields[fieldName] = field;
		form.fields = fields;

		this.setForm(formName,form);

	});

	State.setForm = action(function(formName,form){
		var formObject = {};
		formObject[formName] = form;
		mobx.extendObservable(this,formObject);
	});

	State.getForm = action(function(formName) {

		var state = mobx.toJS(this);
		var form = {};

		if(!state.hasOwnProperty(formName)){
			form[formName] = {
				values:{},
				fields:{},
				registeredFields:{},
				syncErrors:{},
				initializeValues:{},
			};
			mobx.extendObservable(this,form);
		}else{
			form = state;
		}

		return form[formName];

	});

	State.getField = action(function(formName,fieldName) {
		var form = this.getForm(formName);
		var fields = form.fields;
		return fields[fieldName] || {};
	});


	State.getFormState = action(function(formName) {
		var form = this.getForm(formName);
		return mobx.toJS(form);
	});

	State.getFieldValue = action(function(formName,fieldName) {
        var values = this.getValues(formName);
        return values[fieldName] || '';
	});

	State.getValues = action(function(formName) {
		var form = this.getForm(formName);
		return form.values;
	});

	State.getErrors = action(function(formName) {
		var form = this.getForm(formName);
		return form.syncErrors;
	});

	State.setErrors = action(function(formName,errors) {
		var form = this.getForm(formName);
		form.syncErrors = Object.assign({},errors);
		this.setForm(formName,form);
	});

	State.touch = action(function(formName,fieldName) {

		var form = this.getForm(formName);
		var fields = form.fields;

		var field = fields[fieldName];
		field.touched = true;

		fields[fieldName] = field;
		form.fields = fields;

		this.setForm(formName,form);

	});

	State.untouch = action(function(formName,fieldName) {

	});

	State.touchAll = action(function(formName) {
		var form = this.getForm(formName);
		var fields = form.fields;

		for(var item in fields){
			if(fields.hasOwnProperty(item)){

				this.touch(formName,item);
			}
		}

	});


	State.changeValues = action(function(formName,values){
		for(var field in values){
			if(values.hasOwnProperty(field)){
				this.change(formName,field,values[field]);
			}
		}
	});


	State.change = action(function(formName,fieldName,fieldValue) {

		var form = this.getForm(formName);

		var values = form.values;
		values[fieldName] = fieldValue;
		form.values = values;

		var formObject = {};
		formObject[formName] = form;
		mobx.extendObservable(this,formObject);

	});

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


	State.destroy = action(function(formName) {
		this.setForm(formName,{});
	});


	State.registerField = action(function(formName,fieldName,type) {

		var form = this.getForm(formName);

		var registeredFields = Object.assign({},form.registeredFields);

		if(registeredFields.hasOwnProperty(fieldName)){

			let reField = registeredFields[fieldName];
			let count = reField.count + 1; 

			registeredFields[fieldName] = Object.assign({},{name:fieldName},{type},{count});
		}else{
			registeredFields[fieldName] = Object.assign({},{name:fieldName},{type},{count:0});
		}

		var values = Object.assign({},form.values);

		if(!values.hasOwnProperty(fieldName)){
			values[fieldName] = '';
		}

		var fields = Object.assign({},form.fields);
		fields[fieldName] = Object.assign({},{touched:false,visited:false});

		var initializeValues = form.initializeValues;

		if(!initializeValues.hasOwnProperty(fieldName)){
			initializeValues[fieldName] = '';
		}

		form.registeredFields =  registeredFields;
		form.values =  values;
		form.fields =  fields;
		form.initializeValues = initializeValues;

		this.setForm(formName,form);

	});

	State.unregisterField = action(function(formName,fieldName) {

		var form = this.getForm(formName);
		var registeredFields = form.registeredFields;
		var values = form.values;

		if(registeredFields.hasOwnProperty(fieldName)){
			delete registeredFields[fieldName];
			delete values[fieldName];
		}

		form.registeredFields = registeredFields;
		from.values = values;

		this.setForm(formName,form);

	});


State.reset = action(function(formName) {
	var form = this.getForm(formName);
	var initializeValues = form.initializeValues;
	this.changeValues(formName,initializeValues);
});


module.exports = State;
