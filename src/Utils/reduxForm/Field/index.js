import React from 'react';

export default class Field extends React.Component{

  static displayName = 'Field';

  static propTypes = {
     name:React.PropTypes.string,
     component:React.PropTypes.any
  }

  static contextTypes =  {
      getFieldValue: React.PropTypes.func.isRequired,
      getFieldError: React.PropTypes.func.isRequired,
      registerField: React.PropTypes.func.isRequired,
      onChange: React.PropTypes.func.isRequired,
  }

	constructor(props,context){
		super(props, context);
	}

  componentDidMount(){
    const {registerField} = this.context;
    const {name} = this.props;
    registerField && registerField(name,'field');
  }

  onChange = (value)=>{
    const {onChange} = this.context;
    const {name} = this.props;
    onChange && onChange(name,value);
  }

  renderComponent = (component)=>{

    const {name} = this.props;
    const {getFieldValue,getFieldError} = this.context;

    const input = {
      name,
      value:getFieldValue(name),
      onChange:this.onChange,
    };

    let field = {
      touched:false,
      active:false,
    };

    const meta = {
      dirty:false,
      autofilled:false,
      error:getFieldError(name),
      warning:'',
      pristine:false,
      invalid:false,
      valid:false,
      visited:false,
      active:field.active,
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
