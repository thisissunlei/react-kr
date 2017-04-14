import React, {
	Component,
	PropTypes
} from 'react';

import {
	reduxForm,
	formValueSelector,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray,
	change
} from 'redux-form';

import {
	Actions,
	Store,
	connect
} from 'kr/Redux';


import {
	Section,
	KrField,
	Grid,
	Row,
	Col,
	Message,
	Notify,
	Button,
	KrDate,
	DotTitle,
	ButtonGroup,
	Paper,
	ListGroup,
	ListGroupItem,
	Field,
	KrForm
} from 'kr-ui';
import './index.less';
import {ShallowEqual} from 'kr/Utils';

export default class SearchDetailForm extends Component {


	constructor(props, context) {
		super(props, context);
		this.detail = this.props.detail;

		this.state={

		}
	}

	onSubmit=(values)=>{
	}

	changeCommunity=(item)=>{
		let {onChange} = this.props;
		onChange && onChange(item);
	}

	render() {
		let {detail,handleSubmit} = this.props;
		return (
			<div className="edit-form" style={{display:"inline-block",padding:0,width:252,margin:"-12px 10px 0 0",float:"right"}}>
				<form onSubmit={handleSubmit(this.onSubmit)} >
					<KrField name="communityId"  label="" component="searchCommunity" onChange={this.changeCommunity}/>
				</form>
			</div>
)
	}
}
const validate = values => {

	const errors = {}


	return errors
}
SearchDetailForm = reduxForm({
	form: 'SearchDetailForm',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(SearchDetailForm);
