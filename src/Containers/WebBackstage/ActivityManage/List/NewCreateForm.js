
import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	Message,
	SnackTip,
	ListGroup,
	ListGroupItem
} from 'kr-ui';
 class NewCreateForm extends Component{
	constructor(props){
		super(props);
		this.state={
			
		}
	}
	componentWillMount() {
	}

	render(){
	
		return (
			<div className="new-create-activity">
				
		  	</div>
		);
	}
}
const validate = values => {
	const errors = {}
	
	// if (!values.email) {
	// 	errors.email = '请输入邮箱';
	// }


	return errors
}
const selector = formValueSelector('NewCreateForm');
export default NewCreateForm = reduxForm({
	form: 'NewCreateForm',
	validate,
})(NewCreateForm);
