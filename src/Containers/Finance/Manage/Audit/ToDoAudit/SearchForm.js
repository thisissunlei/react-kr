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
	CheckPermission
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
				<CheckPermission  operateCode="fina_verify_addReturn" >
					<Button label="添加回款" onTouchTap={this.openAdd} />
				</CheckPermission>
				<span className="u-span"></span>
				<CheckPermission  operateCode="fina_verify_batch" >
					<Button label="批量审核" onTouchTap={this.openSomeAudit} />
				</CheckPermission>
				<span className="u-high-search" onTouchTap={this.openSearch}></span>
				<SearchForms onSubmit={this.onSubmit} placeholder="请输入客户名称" inputName="todo"/>

			</div>
		);
	}
}


export default reduxForm({
	form: 'searchForm1'
})(SearchForm);
