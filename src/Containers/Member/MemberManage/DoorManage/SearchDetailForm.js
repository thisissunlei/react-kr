import React, {
	PropTypes
} from 'react';

import {
	reduxForm,
} from 'redux-form';

import {
	KrField,
} from 'kr-ui';
import './index.less';

export default class SearchDetailForm extends React.Component {


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
					<KrField name="communityId"  label="" component="searchCommunityAll" onChange={this.changeCommunity} inline={false}/>
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
