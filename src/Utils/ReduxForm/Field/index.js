import React from 'react';

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
      reset: React.PropTypes.func,
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
	  if(this.name !== nextProps.name){
		  this.context.unRegisterField(this.name);
		  this.context.registerField(nextProps.name);
	  }
  }

  get name(){
	  return this.props.name;
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

    let field = Object.assign({ visited:false, touched:false,
    pristine:false,
    invalid:false,
    valid:false,
    },getField(name));

    const meta = {
      dirty:false,
      autofilled:false,
      error:getFieldError(name),
      warning:'',
      pristine:false,
      invalid:false,
      valid:false,
      visited:field.visited,
      touched:field.touched
    };

    const props = Object.assign({},{ ref:name, input, meta, },{...this.props});
      return React.createElement(component,{ ...props});
  }

	render(){
    const {name,component} = this.props;
	  return (
      <span>
       {this.renderComponent(component)}
      </span>
	 );
	}

}
