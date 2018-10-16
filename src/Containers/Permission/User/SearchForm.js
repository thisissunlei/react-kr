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
	openCreateGroup = () =>{
		let {
			openCreateGroup
		} = this.props;
		openCreateGroup && openCreateGroup();
	}
	openManageGroup = () =>{
		let {
			openRoleManage
		} = this.props;
		openRoleManage && openRoleManage();
	}
	render() {
		let options = [{
			label: '名称',
			value: 'name'
		}, {
			label: '编码',
			value: 'code'
		},{
			label: '分组',
			value: 'group'
		}
	];

		return (
			<form name="searchForm" className="searchForm searchList" style={{marginBottom:10,marginTop:12,height:45,zIndex:100}}>

					<Button style={{width:'100px',marginRight:'15px'}} label="新建角色"  operateCode="sso_roleList_edit"  onTouchTap={this.openCreateDialog} />
					<Button style={{width:'100px',marginRight:'15px'}} label="新建角色分组" operateCode="sso_roleList_edit"  onTouchTap={this.openCreateGroup} />
					<Button style={{width:'100px',marginRight:'15px'}} label="管理角色分组" operateCode="sso_roleList_edit"  onTouchTap={this.openManageGroup} />
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
