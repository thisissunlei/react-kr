import React from 'react';

export default class Field extends React.Component{

  static displayName = 'Field';

  static propTypes = {
     name:React.PropTypes.string,
     component:React.PropTypes.any
  }

  static contextTypes =  {
      getFieldValue: React.PropTypes.func.isRequired,
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
    const {getFieldValue} = this.context;

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
      warning:'',
      pristine:false,
      invalid:false,
      valid:false,
      visited:false,
      active:field.active,
      touched:field.touched
    };

    const props = Object.assign({},{
      ref:name,
      input,
      meta,
    },{...this.props});

    const handles = {

    };

  return React.createElement(component,{ ...props, ...handles });

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
