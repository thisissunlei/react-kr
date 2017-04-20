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

		/*
	shouldComponentUpdate(nextProps,nextState,nextContext){

		const {name} = this.props;
		const {getFieldError,getFieldValue} = this.context;
		
		if(nextContext.getFieldError(name) !== getFieldError(name)){
			return true;
		}

		if(nextContext.getFieldValue(name) !== getFieldValue(name)){
			return true;
		}

		return false;

	}

		*/


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


  getFieldValue = ()=>{
    const {name} = this.props;
    var value = '';

    return value;
  }

  renderComponent = (component)=>{

    const {name} = this.props;
    const {getField,getFieldValue,getFieldError} = this.context;

    const input = {
      name,
      value:getFieldValue(name),
      onFocus:this.onFocus,
      onChange:this.onChange,
      onBlur:this.onBlur,
    };

    let field = Object.assign({
		visited:false,
		touched:false,
		pristine:false,
		invalid:false,
		valid:false,
		dirty:false,
		autofilled:false,
    },getField(name));

 	 const meta = Object.assign({},field,{ error:getFieldError(name)}); 

    const props = Object.assign({},{ ref:name, input, meta },{...this.props});

    return React.createElement(component,{ ...props});

  }

	render(){

    	const {name,component} = this.props;
	  	return this.renderComponent(component);

	}

}
