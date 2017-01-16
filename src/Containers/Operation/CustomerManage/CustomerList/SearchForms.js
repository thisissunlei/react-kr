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
	ListGroup,
	ListGroupItem,
	SearchForms
} from 'kr-ui';


export default  class SearchForms extends Component{

	 static PropTypes = {
		 onSubmit:React.PropTypes.func,
	 }

	constructor(props){
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}

	 onSubmit(form){
	 	const {onSubmit} = this.props;
	    onSubmit && onSubmit(form);
	 }

	

	render(){

		const { error, handleSubmit, pristine, reset} = this.props;

		return (
		  <SearchForms onSubmit={this.onSubmit}/>
		);
	}
}
