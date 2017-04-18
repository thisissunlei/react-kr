import React, {
	PropTypes
} from 'react';
import {
	reduxForm
} from 'redux-form';
import {
	SearchForms
} from 'kr-ui';


class SearchForm extends React.Component {

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

		form.pageSize = 10;
		form.page = 1;
		form.accountname = form.content;
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

			<SearchForms onSubmit={this.onSubmit}/>
		);
	}
}


export default reduxForm({
	form: 'searchForm'
})(SearchForm);
