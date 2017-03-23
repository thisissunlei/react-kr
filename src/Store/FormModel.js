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
    submitFailed:true

  }
});

State.createForm = action(function(formName,configs) {
  var basic = {};
  basic[formName] = Object.assign({},configs);
  extendObservable(this,basic);
});

State.change = action(function(formName,fieldName,fieldValue) {
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

State.touch = action(function(formName,fieldName) {

});

State.untouch = action(function(formName,fieldName) {

});

State.destroy = action(function(formName) {

});

State.getForm = action(function(formName) {

  var state = mobx.toJS(this);
  var form = {};

  if(!state.hasOwnProperty(formName)){
      form[formName] = {};
      extendObservable(this,form);
  }
  return form;

});

State.registerField = action(function(formName,fieldName,type) {
  var state = this.getForm(formName);
  extendObservable(this,basic);
});

State.unregisterField = action(function(formName,fieldName) {

});

State.reset = action(function(formName) {

});

State.submit = action(function(formName) {

});

module.exports = State;
