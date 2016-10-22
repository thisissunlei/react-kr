import React from 'react';
import {reduxForm,formValueSelector,initialize,arrayPush,arrayInsert,FieldArray} from 'redux-form';
import {Actions,Store} from 'kr/Redux';


class FormComponent  extends React.Component{

	static PropTypes = {
		onSubmit:React.PropTypes.func,
		name:React.PropTypes.string,
	}

	constructor(props,context){
		super(props, context);

		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(values){
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	}

	render(){

		let {children, error, handleSubmit, pristine, reset, submitting} = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>
				{children}
			 </form>
		 );

	}

}


export default  class Form  extends React.Component{

	static PropTypes = {
		name:React.PropTypes.string,
		initialValues:React.PropTypes.object,
		onSubmit:React.PropTypes.func,
	}

	constructor(props,context){
		super(props, context);

		this.onSubmit  = this.onSubmit.bind(this);
	}

	onSubmit(values){
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	}

	render(){

		const {children,initialValues,name} = this.props;

	    FormComponent = reduxForm({ 
			form: name,
			enableReinitialize:true,
			keepDirtyOnReinitialize:true,
			initialValues
		})(FormComponent);

	  return (

		  	 <FormComponent onSubmit={this.onSubmit} {...this.props}>
		  		{children}
		  	</FormComponent>
	 );

	}

}






