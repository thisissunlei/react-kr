import React from 'react';
import {
	reduxForm,
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
		this.state = {
			onHover: false
		}
	}
	onSubmit = (form) => {
		form = Object.assign({},form);
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(form);
	}
	openSearch = () => {
		const {
			openSearch
		} = this.props;
		openSearch && openSearch();

	}
	onCancel = () => {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}
	onHover = () => {
		this.setState({
			onHover: !this.state.onHover
		})
	}
	render() {
		const {
			error,
			handleSubmit,
			pristine,
			reset
		} = this.props;

		return (
			<div>
				<SearchForms onSubmit={this.onSubmit} placeholder="请输入合同类型名称"/>
			</div>
		);
	}
}


export default reduxForm({
	form: 'searchForm'
})(SearchForm);
