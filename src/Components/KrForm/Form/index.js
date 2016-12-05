import React from 'react';


export default class KrForm  extends React.Component{

  static displayName = 'KrForm';

  static propTypes = {
    name:React.PropTypes.string
  }

  static childContextTypes =  {
          blur: React.PropTypes.func.isRequired,
          focus: React.PropTypes.func.isRequired,
          error: React.PropTypes.func.isRequired,
          change: React.PropTypes.func.isRequired,
          initializeField:React.PropTypes.func.isRequired,
          syncErrors:React.PropTypes.object.isRequired,
          fields:React.PropTypes.object.isRequired,
          initializeValidations:React.PropTypes.func.isRequired
  }

	getChildContext() {
				return {
					blur:this.blur,
					focus:this.focus,
          error:this.error,
					change:this.change,
          initializeValidations:this.initializeValidations,
          initializeField: this.initializeField,
          syncErrors:this.state.syncErrors,
          fields:this.state.fields,
				};
	 }


	constructor(props,context){
		super(props, context);

    this.state = {
      registeredFields:[],
      syncErrors:{},
      fields:{},
      values:{},
      initial:{},
      validations:{}
    }

	}

  error =  (fieldName,message='')=>{

    let {syncErrors} = this.state;
    syncErrors[fieldName] = message;

    this.setState({
      syncErrors
    });

  }

  blur =  (name)=>{

    let {fields} = this.state;

    let fieldsItem = fields[name] || {};
    fieldsItem.touched = true;
    fieldsItem.active = false;

    fields[name] = fieldsItem;

    this.setState({
      fields
    });

  }

  focus = (name)=>{

    let {fields} = this.state;

    let fieldsItem = fields[name] || {};
    fieldsItem.touched = true;
    fieldsItem.active = true;

    fields[name] = fieldsItem;

    this.setState({
      fields
    });

  }

  initializeField = (name,value = '')=>{
    this.change(name,value);
  }

  initializeValidations = (name,validation)=>{

    let {validations} = this.state;
    validations[name] = validation;

    console.log('--->>>',validation,name);
    this.setState({
        validations
    });

  }

  change =(name,value)=>{

    let {values} = this.state;
    values[name] = value;

    this.setState({
      values
    });
  }

  getErrorMessage = (value,validation)=>{
    let {errors}  = validation;

		if(errors.hasOwnProperty('requiredValue') && !value){
			return errors['requiredValue'];
		}

		if(errors.hasOwnProperty('minLength') && String(value).length<validation['minLength']){

			return errors['minLength'];
		}

		if(errors.hasOwnProperty('maxLength') && String(value).length>validation['maxLength']){
			return errors['maxLength'];
		}

		if(errors.hasOwnProperty('pattern') && !validation['pattern'].test(value)){
			return errors['pattern'];
		}

    return '';
  }

  validate = ()=>{

    let valiabled = true;

    let {validations,values,syncErrors,fields} = this.state;
    let validationKeys = Object.keys(validations);

    let checkValidation = {};
    let _this = this;

    validationKeys.map(function(fieldName,index){

      if(!validations.hasOwnProperty(fieldName)){
        return ;
      }

      checkValidation = validations[fieldName];

      syncErrors[fieldName] = _this.getErrorMessage(values[fieldName],checkValidation);

      fields[fieldName] = Object.assign({},fields[fieldName],{touched:true});

      if(syncErrors[fieldName]){
        valiabled = false;
      }

    });

    this.setState({
        syncErrors,
        fields,
    });

    return valiabled;

  }

  handleSubmit = (onSubmit)=>{
    //校验
    let {values} = this.state;
    onSubmit && onSubmit(values);
  }

  reset = ()=>{

      let {values,syncErrors,fields} = this.state;

      Object.keys(values).map(function(item,index){
            values[item] = '';
      });

      Object.keys(syncErrors).map(function(item,index){
            syncErrors[item] = '';
      });

/*
      fields = Object.keys(fields).map(function(item,index){
          return Object.assign({},item,{touched:false});
      });
      */

      this.setState({
        values,
      });

  }

  submit =(event)=>{
    
    event = event || window.event;
    //取消默认事件
     event.preventDefault();

    //校验
    if(!this.validate()){
        return ;
    }

    const {values} = this.state;

    const {onSubmit} = this.props;
    onSubmit && onSubmit(values);

     return false;
  }

	render(){

    const {name,children} = this.props;

	  return (
		  <form name={name} onSubmit={this.submit}>
          {children}
		  </form>
	 );
	}
}
