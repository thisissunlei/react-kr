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
import './index.less';


class SearchForm extends Component {

	static PropTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}

	onSubmit(form) {

		form.pageSize = 20;
		form.page = 1;
		form.searchParam = form.content;
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(form);
	}

	onCancel() {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}

	render() {

		const {
			error,
			handleSubmit,
			pristine,
			reset
		} = this.props;

		return (
			<div >
				<Button label="添加回款"onTouchTap={this.openCreateDialog} />
				<span className="u-span"></span>
				<Button label="批量审核"  />
				<span className="u-high-search"></span>
				<SearchForms onSubmit={this.onSubmit}/>

			</div>
		);
	}
}


export default reduxForm({
	form: 'searchForm'
})(SearchForm);