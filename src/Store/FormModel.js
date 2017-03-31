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
    syncErrors:{
      email:'邮箱填写错误'
    },
    registeredFields:{
      email:{
          name:"email",
          type:"Field",
          count:1
      }
    },
    fields:{
        email:{
            visited:true,
            touched:true
        }
    },
    values:{
      email:'ayaya@qq.com'
    },
    anyTouched:true,
    submitFailed:true,
    validate:function(){

    }
  }
});

State.createForm = action(function(formName,configs) {
  var form = {};
  form[formName] = Object.assign({},configs);
  extendObservable(this,form);
});

State.getForm = action(function(formName) {

  var state = mobx.toJS(this);
  var form = {};

  if(!state.hasOwnProperty(formName)){
      form[formName] = {
				values:{},
				fields:{},
				registeredFields:{},
				syncErrors:{}
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
		return fields[fieldName];
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

		var formObject = {};
		formObject[formName] = form;
		mobx.extendObservable(this,formObject);
});

State.touch = action(function(formName,fieldName) {

	var form = this.getForm(formName);
	var fields = form.fields;

	var field = fields[fieldName];
	field.touched = true;

	fields[fieldName] = field;
	form.fields = fields;



console.log('touch',fieldName);
	var formObject = {};
	formObject[formName] = form;
	mobx.extendObservable(this,formObject);

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

State.stopSubmit = action(function(formName,errors) {
		this.setErrors(formName,errors);
		this.touchAll(formName);
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

	State.autofill = action(function(formName,fieldName) {

	});

	State.focus = action(function(formName,fieldName) {

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

	});

	State.blur = action(function(formName,fieldName,fieldValue) {

	});

	State.autofill = action(function(formName,fieldName) {

	});

	State.focus = action(function(formName,fieldName) {

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

	State.untouch = action(function(formName,fieldName) {

	});

	State.destroy = action(function(formName) {

	});


	State.registerField = action(function(formName,fieldName,type) {

		var form = this.getForm(formName);


		var registeredFields = Object.assign({},form.registeredFields);
		registeredFields[fieldName] = Object.assign({},{name:fieldName},{type});

		var values = Object.assign({},form.values);
		values[fieldName] = '';

		var fields = Object.assign({},form.fields);
		fields[fieldName] = Object.assign({},{touched:false,visited:false});

		form.registeredFields =  registeredFields;
		form.values =  values;
		form.fields =  fields;

		var formObject = {};
		formObject[formName] = form;
		mobx.extendObservable(this,formObject);

	});

	State.unregisterField = action(function(formName,fieldName) {

	});

	State.reset = action(function(formName) {
		var form = {};
		extendObservable(this,form);
	});

	State.submit = action(function(formName) {

	});

	module.exports = State;
