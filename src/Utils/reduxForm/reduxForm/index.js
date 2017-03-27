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
        registerField: React.PropTypes.func.isRequired,
      }

      getChildContext() {

        const {onChange,getFieldValue,registerField }  = this.props;

        return {
          onChange,
          getFieldValue,
          registerField
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
      }

      onChange =(fieldName,fieldValue)=>{
        const {FormModel} = this.props;
        FormModel.change(this.formName,fieldName,fieldValue);
      }

      getValues = ()=>{
        const {FormModel} = this.props;
        return FormModel.getValues(this.formName);
      }

      getFieldValue = (fieldName) =>{
        const {FormModel} = this.props;
        var values = FormModel.getValues(this.formName);
        return values[fieldName];
      }

      registerField = (fieldName,type="field")=>{
        const {FormModel} = this.props;
        FormModel.registerField(this.formName,fieldName,type);
      }


      handleSubmit = (onSubmit)=>{


        var _this = this;

        return function(event){
          event.preventDefault();

          //校验
          var values = _this.getValues();

          onSubmit && onSubmit(values);

        }

      }

      reset = ()=>{

      }

      render(){

        const {FormModel} = this.props;

        const props = {
          values:this.getValues(),
          form:FormModel[this.formName],
        }

        const handles = {
          onChange:this.onChange,
          getFieldValue:this.getFieldValue,
          registerField:this.registerField,
          handleSubmit:this.handleSubmit,
          reset:this.reset,
        }
        return <Form {...props} {...handles}/>
      }

    }


    return FormWrap;

  }

}
