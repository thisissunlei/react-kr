import React, {
	PropTypes
} from 'react';
import {
	reduxForm,
	formValueSelector
} from 'redux-form';
import {
	SearchForms
} from 'kr-ui';
import './index.less';


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
	openSearch = () => {
		const {
			openSearch
		} = this.props;
		openSearch && openSearch();

	}

	render() {

		const {
			error,
			handleSubmit,
			pristine,
			reset
		} = this.props;

		return (
			<div  className="u-clearfix">
				<span className="u-high-search" onTouchTap={this.openSearch}></span>
				<SearchForms onSubmit={this.onSubmit} placeholder="请输入客户名称"  inputName="done"/>
			</div>
		);
	}
}


export default reduxForm({
	form: 'searchForm3'
})(SearchForm);
