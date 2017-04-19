import React from 'react';
import {
  observer,
  inject
} from 'mobx-react';

module.exports =  function (initializeConfigs){


  return function(WrapComponent) {



    class Form extends React.Component {

      static displayName = "Form";

      static propTypes = {
        initialize:React.PropTypes.func.isRequired,
        reset: React.PropTypes.func.isRequired,
        unregisterField: React.PropTypes.func.isRequired,
        onChange:React.PropTypes.func.isRequired,
        onFocus: React.PropTypes.func.isRequired,
        onBlur: React.PropTypes.func.isRequired,
        getField: React.PropTypes.func.isRequired,
        getFieldValue: React.PropTypes.func.isRequired,
        getFieldError: React.PropTypes.func.isRequired,
		getValues:React.PropTypes.func.isRequired,
      }

      static childContextTypes = {
        getFieldValue: React.PropTypes.func.isRequired,
        getField: React.PropTypes.func.isRequired,
        getFieldError: React.PropTypes.func.isRequired,
        registerField: React.PropTypes.func.isRequired,
        unregisterField: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onBlur: React.PropTypes.func.isRequired,
        onFocus: React.PropTypes.func.isRequired,
        reset: React.PropTypes.func.isRequired,
        isMobx: React.PropTypes.bool.isRequired,
      }

      getChildContext() {

        const {onChange,getFieldValue,registerField,unregisterField,getFieldError,getField,onBlur,reset,register,onFocus,getValues}  = this.props;

        return {
          getFieldValue,
          registerField,
          unregisterField,
          getFieldError,
          getField,
          onChange,
          onBlur,
          onFocus,
          reset,
          isMobx:true
        }

      }

      constructor(props,context){
        super(props,context);

      }

      change = (fieldName,fieldValue)=>{
        const {onChange} = this.props;
        onChange && onChange(fieldName,fieldValue);
      }

      submit = ()=>{
        const {submit} = this.props;
        submit && submit();
      }

      reset = ()=>{
        const {reset} = this.props;
        reset && reset();
      }

      initialize = (fieldValues)=>{
        const {initialize} = this.props;
        initialize && initialize(fieldValues);
      }

      changeValues = (fieldValues)=>{
        const {changeValues} = this.props;
        changeValues && changeValues(fieldValues);
      }

      render(){

        const {
          handleSubmit,
          pristine,
          submitting,
		  getValues,
          ...otherProps
        } = this.props;


        const props = {
          handleSubmit,
          pristine,
          submitting,
          $form:{
		  	values:getValues(),
            submit:this.submit,
            reset:this.reset,
            change:this.change,
            changeValues:this.changeValues,
            initialize:this.initialize,
          }

        };

        return <WrapComponent {...props}  {...otherProps}/>
      }

    }

    @inject("FormModel")
    @observer
    class FormConnect extends React.Component {

      constructor(props){
        super(props);
        this.formName = initializeConfigs.form;
        this.setValidateCallback(initializeConfigs.validate);
      }

      onChange =(fieldName,fieldValue)=>{
        const {FormModel} = this.props;
        FormModel.change(this.formName,fieldName,fieldValue);
        this.touch(fieldName);
        this.validate();
      }

      getFormState = ()=>{
        const {FormModel} = this.props;
        return FormModel.getFormState(this.formName);
      }

      setValidateCallback = (validate)=>{
        validate = validate || function(){return {}};
        const {FormModel} = this.props;
        FormModel.setValidateCallback(this.formName,validate);
      }

      validate = ()=>{
        const {FormModel} = this.props;
        FormModel.validate(this.formName);
      }

      setErrors = (errors)=>{
        const {FormModel} = this.props;
        FormModel.setErrors(this.formName,errors);
      }

      getErrors = ()=>{
        const {FormModel} = this.props;
        return FormModel.getErrors(this.formName);
      }

      getFieldError = (fieldName)=>{
        var errors = this.getErrors();
        return errors[fieldName];
      }

      getValues = ()=>{
        const {FormModel} = this.props;
        return FormModel.getValues(this.formName);
      }

      getField = (fieldName)=>{
        const {FormModel} = this.props;
        return FormModel.getField(this.formName,fieldName);
      }

      getFieldValue = (fieldName) =>{
        const {FormModel} = this.props;
		return FormModel.getFieldValue(this.formName,fieldName);
      }

      registerField = (fieldName,type="field")=>{
        const {FormModel} = this.props;
        FormModel.registerField(this.formName,fieldName,type);
      }

      unregisterField = (fieldName,type="field")=>{
        const {FormModel} = this.props;
        FormModel.unregisterField(this.formName,fieldName,type);
      }

      handleSubmit = (onSubmit)=>{

        var _this = this;

        this.setSubmitCallback(onSubmit);

        return function(event){
          event.preventDefault();
          _this.submit();
        }

      }

      setSubmitCallback = (onSubmit) =>{

        onSubmit = onSubmit || function(){};
        const {FormModel} = this.props;
        FormModel.setSubmitCallback(this.formName,onSubmit);

      }

      submit = ()=>{
        const {FormModel} = this.props;
        FormModel.submit(this.formName);
      }

      onFocus = ()=>{

      }

      reset = ()=>{
        const {FormModel} = this.props;
        FormModel.reset(this.formName);
      }

      changeValues = (fieldValues)=>{
        const {FormModel} = this.props;
        FormModel.changeValues(this.formName,fieldValues);
      }

      touch = (fieldName)=>{
        const {FormModel} = this.props;
        FormModel.touch(this.formName,fieldName);
      }

      onBlur = (fieldName)=>{
        this.touch(fieldName);
        this.validate();
      }

      initialize = (fieldValues)=>{
        const {FormModel} = this.props;
        FormModel.initialize(this.formName,fieldValues);
      }


      render(){

        const {FormModel,...otherProps} = this.props;

        const props = {
          form:FormModel[this.formName]
        }

        const handles = {
			getValues:this.getValues,
		  getFieldValue:this.getFieldValue,
		  getFieldError:this.getFieldError,
		  getField:this.getField,
		  registerField:this.registerField,
		  unregisterField:this.unregisterField,
		  handleSubmit:this.handleSubmit,
		  reset:this.reset,
		  submit:this.submit,
		  onBlur:this.onBlur,
		  onFocus:this.onFocus,
		  onChange:this.onChange,
		  getFormState:this.getFormState,
		  changeValues:this.changeValues,
		  initialize:this.initialize,
		}
		return <Form {...props} {...handles} {...otherProps}/>
	  }

	}


	return FormConnect;

  }

}
