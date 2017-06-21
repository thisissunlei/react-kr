import PureRenderMixin from 'react-addons-pure-render-mixin';
import React, {
	Component,
	PropTypes
} from 'react';
import {
	Http
} from "kr/Utils";
import {
	connect,
	Actions,
	Store
} from 'kr/Redux';

import {
	reduxForm,
	formValueSelector,
	change
} from 'redux-form';
import {
	KrField,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	Grid,
	Row,
	Col,
	ListGroupItem,
	ListGroup,
	Dialog,
	SearchForms,
	KrDate,
	Drawer,
	Message
} from 'kr-ui';
import './index.less';
import Deletedialog from './Deletedialog';
import Createdialog from './Createdialog';
import Editdialog from './Editdialog';


class SearchForm extends Component {
	constructor(props, context) {
		super(props, context);

	}


	onSubmit = (form) => {
		let {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(form);

	}


	onFilter = (value) => {
		let {
			onFilter
		} = this.props;
		onFilter && onFilter(value);
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
				label: '类型',
				value: 'type'
			}, {
				label: '编码',
				value: 'code'
			},
			{
				label: '菜单',
				value: 'moduleName'
			},

		];

		return (
			<form className="g-op-form" name="searchForm" className="searchForm searchList" style={{marginBottom:10,marginTop:12,height:45,zIndex:100}}>
					<Button label="新建" operateCode="sso_resource_edit"  onTouchTap={this.openCreateDialog} />
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

SearchForm = reduxForm({
	form: 'searchForm'
})(SearchForm);

class Operations extends Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			searchParams: {
				page: 1,
				pageSize: 15
			},
			itemDetail: '',
			openDeleteDialog: false,
			openCreateDialog: false,
			openEditDialog: false,
		}
	}

	//操作相关
	onOperation = (type, itemDetail) => {

		this.setState({
			itemDetail
		});

		if (type == 'delete') {
			this.openDeleteDialog();
		} else if (type == 'edit') {
			this.openEditDialog();
		}
	}
	openDeleteDialog = () => {
		this.setState({
			openDeleteDialog: !this.state.openDeleteDialog
		})
	}
	onDeleteSubmit = () => {
		let {
			itemDetail
		} = this.state;
		var _this = this;
		Http.request('delResources', {
			id: itemDetail.id
		}).then(function(response) {
			_this.openDeleteDialog();
			Message.success('删除成功');
			window.setTimeout(function() {
				window.location.reload();
			}, 800);
		}).catch(function(err) {
			_this.openDeleteDialog();
			Message.error(err.message)
		});
	}
	openCreateDialog = () => {
		this.setState({
			openCreateDialog: !this.state.openCreateDialog
		})
	}
	openEditDialog = () => {
		this.setState({
			openEditDialog: !this.state.openEditDialog
		})
	}
	onCreatSubmit = (params) => {
		var _this = this;
		Http.request('createResources', {}, params).then(function(response) {
			_this.openCreateDialog();
			Message.success('新建成功');
			window.setTimeout(function() {
				window.location.reload();
			}, 800);
		}).catch(function(err) {
			Message.error(err.message)
		});

	}
	onEditSubmit = (params) => {
		var _this = this;
		Http.request('editResources', {}, params).then(function(response) {
			_this.openEditDialog();
			Message.success('修改成功');
			window.setTimeout(function() {
				window.location.reload();
			}, 800);
		}).catch(function(err) {
			Message.error(err.message)
		});
	}
	onSearch = (form) => {
		var searchParams = {}
		if (form.filter == "name") {
			searchParams = {
				name: form.content
			}
		} else if (form.filter == "code") {
			searchParams = {
				code: form.content
			}
		} else if (form.filter == 'type') {
			var content;
			if (form.content == '菜单') {
				content = 'MENU'
			} else if (form.content == '操作') {
				content = 'OPERATION'
			}
			searchParams = {
				type: content
			}
		}else if (form.filter == "moduleName") {
			searchParams = {
				moduleName: form.content
			}
		}
		this.setState({
			searchParams: searchParams
		});
	}


	render() {
		let {
			openDeleteDialog,
			itemDetail
		} = this.state;
		return (
			<div className="g-operation">
				<Section title="操作项" >
					<SearchForm onCreate={this.openCreateDialog} onSubmit={this.onSearch} />
	        		<Table
							style={{marginTop:10}}
							displayCheckbox={false}
							onLoaded={this.onLoaded}
							ajax={true}
							ajaxUrlName='RosfindPage'
							ajaxParams={this.state.searchParams}
							onOperation={this.onOperation}
							  >
						<TableHeader>
						<TableHeaderColumn>ID</TableHeaderColumn>
						<TableHeaderColumn>名称</TableHeaderColumn>
						<TableHeaderColumn>类型</TableHeaderColumn>
						<TableHeaderColumn>编码</TableHeaderColumn>
						<TableHeaderColumn>创建人</TableHeaderColumn>
						<TableHeaderColumn>所属菜单</TableHeaderColumn>
						<TableHeaderColumn>创建时间</TableHeaderColumn>
						<TableHeaderColumn>操作</TableHeaderColumn>
					</TableHeader>

					<TableBody>
						<TableRow>
							<TableRowColumn style={{overflow:'hidden'}} name="id"></TableRowColumn>
							<TableRowColumn name="name" ></TableRowColumn>
							<TableRowColumn
									name="type"
									options={[
										{label:'菜单',value:'MENU'},
										{label:'操作',value:'OPERATION'}
									]}
							></TableRowColumn>
							<TableRowColumn name="code"></TableRowColumn>
							<TableRowColumn name="creater"></TableRowColumn>
							<TableRowColumn name="moduleName"></TableRowColumn>
							<TableRowColumn type="date" name="createTime" component={(value)=>{
								return (
									<KrDate value={value} />
								)
							}}> </TableRowColumn>
							<TableRowColumn>
									<Button label="编辑"   type="operation" operateCode="sso_resource_edit" operation="edit"/>
									<Button label="删除"  type="operation" operateCode="sso_resource_del" operation="delete"/>
							 </TableRowColumn>
						 </TableRow>
					</TableBody>
					<TableFooter></TableFooter>
					</Table>
					<Dialog
						title="提示"
						modal={true}
						onClose={this.openDeleteDialog}
						open={this.state.openDeleteDialog}
						contentStyle={{width:460}}
						>
						<Deletedialog  onCancel={this.openDeleteDialog} onSubmit={this.onDeleteSubmit} />

					 </Dialog>
					 <Drawer
						modal={true}
						width={750}
						openSecondary={true}
						onClose={this.openCreateDialog}
						open={this.state.openCreateDialog}
						>
						<Createdialog  onCancel={this.openCreateDialog} onSubmit={this.onCreatSubmit} />

					 </Drawer>
					 <Drawer
						modal={true}
						width={750}
						open={this.state.openEditDialog}
						onClose={this.openEditDialog}
						openSecondary={true}
						>
						<Editdialog  detail={itemDetail} onCancel={this.openEditDialog} onSubmit={this.onEditSubmit} />

					 </Drawer>
				</Section>

			</div>
		);
	}

}
export default reduxForm({
	form: 'operations',
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(Operations);
