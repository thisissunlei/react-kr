import React from 'react';
import {
  observer,
  inject
} from 'mobx-react';

module.exports =  function (initializeConfigs){


  return function(WrapComponent) {



    class Form extends React.Component {

      static displayName = "Form";

      static childContextTypes = {
        onChange: React.PropTypes.func.isRequired,
        getFieldValue: React.PropTypes.func.isRequired,
        getField: React.PropTypes.func.isRequired,
        getFieldError: React.PropTypes.func.isRequired,
        registerField: React.PropTypes.func.isRequired,
        onBlur: React.PropTypes.func.isRequired,
        onFocus: React.PropTypes.func.isRequired,
        reset: React.PropTypes.func.isRequired,
        _reduxForm: React.PropTypes.object.isRequired,
      }

      getChildContext() {

        const {onChange,getFieldValue,registerField,getFieldError,getField,onBlur,reset,register,onFocus}  = this.props;

        return {
          onChange,
          getFieldValue,
          registerField,
          getFieldError,
          getField,
          onBlur,
          onFocus,
          reset,
          _reduxForm:{

          }
        }

      }

      constructor(props,context){
        super(props,context);
      }

      render(){

        const {
          handleSubmit,
          pristine,
          reset,
          submitting,
        } = this.props;

        const props = {
          handleSubmit,
          pristine,
          reset,
          submitting,
         };
        return <WrapComponent {...props}/>
      }

    }

    @inject("FormModel")
    @observer
    class FormWrap extends React.Component {

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

      }

      register = ()=>{

      }

      setValidateCallback = (validate)=>{
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
        var values = FormModel.getValues(this.formName);
        return values[fieldName] || '';
      }

      registerField = (fieldName,type="field")=>{
        const {FormModel} = this.props;
        FormModel.registerField(this.formName,fieldName,type);
      }

      stopSubmit = ()=>{
        const {FormModel} = this.props;
        this.validate();
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
        const {FormModel} = this.props;
        FormModel.setSubmitCallback(this.formName,onSubmit);
      }

      startSubmit = ()=>{
        const {FormModel} = this.props;
        FormModel.startSubmit(this.formName);
      }

      submit = ()=>{

        const {FormModel} = this.props;
        FormModel.submit(this.formName);
      }

      onFocus = ()=>{

      }

      reset = ()=>{

      }

      touch = (fieldName)=>{
        const {FormModel} = this.props;
        FormModel.touch(this.formName,fieldName);
      }

      onBlur = (fieldName)=>{
        this.touch(fieldName);
        this.validate();
      }


      render(){

        const {FormModel} = this.props;

        const props = {
          values:this.getValues(),
          errors:this.getErrors(),
          form:FormModel[this.formName],
        }

        const handles = {
          onChange:this.onChange,
          getFieldValue:this.getFieldValue,
          getFieldError:this.getFieldError,
          getField:this.getField,
          registerField:this.registerField,
          handleSubmit:this.handleSubmit,
          reset:this.reset,
          onBlur:this.onBlur,
          onFocus:this.onFocus,
          stopSubmit:this.stopSubmit,
          register:this.register,
          getFormState:this.getFormState
        }
        return <Form {...props} {...handles}/>
      }

    }


    return FormWrap;

  }

}
