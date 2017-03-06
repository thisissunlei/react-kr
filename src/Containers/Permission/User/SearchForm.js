import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';

import {
	reduxForm,
	formValueSelector
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';

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

class SearchForm extends Component {
	constructor(props, context) {
		super(props, context);

	}

	onSubmit = (form) => {
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(form);
	}
	openCreateDialog = () => {
		let {
			onCreate
		} = this.props;
		onCreate && onCreate();
	}



	render() {



		let options = [{
			label: '名称',
			value: 'name'
		}, {
			label: '编码',
			value: 'code'
		}];

		return (
			<form name="searchForm" className="searchForm searchList" style={{marginBottom:10,marginTop:12,height:45,zIndex:100}}>
				<Button label="新建"  onTouchTap={this.openCreateDialog} />
				<SearchForms 
						onSubmit={this.onSubmit} 
						searchFilter={options} 
						style={{marginTop:5}} 
						onFilter={this.onFilter}
				/>
			</form>

		);
	}
}

export default reduxForm({
	form: 'searchForm'
})(SearchForm);