import React from 'react';
import {
	reduxForm,
} from 'redux-form';
import {
	Http
} from "kr/Utils";
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ListGroup,
	ListGroupItem,
	SearchForms,
} from 'kr-ui';
import './index.less';


class SearchForm extends React.Component {

	static PropTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		
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
	openAdd = () => {
		const {
			openAdd
		} = this.props;
		openAdd && openAdd();
	}
	openSomeAudit=()=>{
		const {
			openSomeAudit
		} = this.props;
		openSomeAudit && openSomeAudit();
	}
	onCancel = () => {
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
			<div>
				<Button label="新建回款" operateCode="fina_verify_addReturn" onTouchTap={this.openAdd} />
				<span className="u-span"></span>
				<Button label="批量审核" operateCode="fina_verify_batch" onTouchTap={this.openSomeAudit} />
				<span className="u-high-search" onTouchTap={this.openSearch}></span>
				<SearchForms onSubmit={this.onSubmit} placeholder="请输入客户名称" inputName="todo"/>

			</div>
		);
	}
}


export default reduxForm({
	form: 'searchForm1'
})(SearchForm);
