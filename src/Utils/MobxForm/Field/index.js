import React from 'react';

import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Field extends React.Component{

  static displayName = 'Field';

  static propTypes = {
     name:React.PropTypes.string,
     component:React.PropTypes.any
  }

  static contextTypes =  {
      getField: React.PropTypes.func,
      getFieldValue: React.PropTypes.func,
      getFieldError: React.PropTypes.func,
      registerField: React.PropTypes.func,
      onChange: React.PropTypes.func,
      onBlur: React.PropTypes.func,
      onFocus: React.PropTypes.func,
  }

	constructor(props,context){
		super(props, context);


    const {name,value,type} = this.props;

    this.name = name;
    this._value = value;
    this.type = type;


	}

  componentDidMount(){
    const {registerField} = this.context;
    const {name} = this.props;
    registerField && registerField(name,'field');
  }

  componentWillReceiveProps(nextProps){
	  if(this.props.name !== nextProps.name){
		  this.context.unRegisterField(this.props.name);
		  this.context.registerField(nextProps.name);
	  }
  }


  onChange = (event)=>{

    const {onChange} = this.context;
    const {name} = this.props;

    var value = '';

    if(typeof event === 'object' && event.target){
      var target = event.target;
      value = target.value;
    }else{
      value = event;
    }
    onChange && onChange(name,value);
  }

  onFocus = (event)=>{
    const {onFocus} = this.context;
    const {name} = this.props;
    onFocus && onFocus(name);
  }

  onBlur = (event)=>{
    const {onBlur} = this.context;
    const {name} = this.props;
    onBlur && onBlur(name);
  }


  getField = ()=>{
    const {getField} = this.context;
    const fieldName = this.name;
    return getField(fieldName);
  }

  getFieldType = ()=>{
    return this.type;
  }

  getFieldValue = ()=>{

    const {getFieldValue} = this.context;
    var fieldName = this.name;
    var fieldValue = getFieldValue(fieldName);
    var fieldType = this.getFieldType();

    if(fieldType === 'radio'){
      fieldValue = this._value;
    }
    return fieldValue;
  }

  getFieldChecked = ()=>{

    const {getFieldValue} = this.context;
    var fieldName = this.name;
    var fieldValue = getFieldValue(fieldName);
    var _value = this._value;

    if(fieldValue === _value){
      return true;
    }

    return false;
  }

  getFieldError = ()=>{
    const {getFieldError} = this.context;
    const fieldName = this.name;
    return getFieldError(fieldName);
  }

  getName = ()=>{
    return this.name;
  }

  renderComponent = (component)=>{

    const input = {
      name:this.getName(),
      value:this.getFieldValue(),
      onFocus:this.onFocus,
      onChange:this.onChange,
      onBlur:this.onBlur,
      checked:this.getFieldChecked(),
    };

    let field = Object.assign({
      visited:false,
      touched:false,
      pristine:false,
      invalid:false,
      valid:false,
      dirty:false,
      autofilled:false,
    },this.getField());

    const meta = Object.assign({},field,{ error:this.getFieldError()});
    const componentProps = Object.assign({},{input, meta },{...this.props});
    return React.createElement(component,{ ...componentProps});

  }

  render(){
    const {name,component} = this.props;
    return this.renderComponent(component);

  }

}
