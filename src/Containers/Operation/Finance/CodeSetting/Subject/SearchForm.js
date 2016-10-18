import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector} from 'redux-form';
import {Actions,Store} from 'kr/Redux';

import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
} from 'kr-ui';


 class SearchForm extends Component{

	 static PropTypes = {
		 onSubmit:React.PropTypes.func,
		 onCancel:React.PropTypes.func,
	 }

	constructor(props){
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}

	 onSubmit(form){

	 	form.pageSize = 10;
	 	form.page = 1;

	 	console.log('----form----',form)
		const {onSubmit} = this.props;
	    onSubmit && onSubmit(form);
	 }

	 onCancel(){
		 const {onCancel} = this.props;
		 onCancel && onCancel();
	 }

	render(){

		const { error, handleSubmit, pristine, reset} = this.props;

		return (

			<form onSubmit={handleSubmit(this.onSubmit)}>


              <Row>
				<Col md={8}><KrField name="accountname" type="text"  /></Col>
				<Col md={4}><Button  label="查询" type="submit" primary={true} /></Col>
              </Row>
				
			   
					
				</form>
		);
	}
}


export default reduxForm({ form: 'searchForm'})(SearchForm);
