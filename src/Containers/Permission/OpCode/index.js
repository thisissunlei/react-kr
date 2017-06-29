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
			value: 'codeName'
		}];
		return (
			<form className="g-op-form" name="searchForm" className="searchForm searchList" style={{marginBottom:10,marginTop:12,height:45,zIndex:100}}>
					<Button label="新建" operateCode="sso_resource_edit"  onTouchTap={this.openCreateDialog} />
				<SearchForms
						onSubmit={this.onSubmit}
						style={{marginTop:5}}
						placeholder="请输入"
						searchFilter={options} 
						onFilter={this.onFilter}
				/>
			</form>

		);
	}
}

SearchForm = reduxForm({
	form: 'searchForm'
})(SearchForm);

class OpCode extends Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			searchParams: {
                accountName: '',
                page: 1,
                pageSize: 15,
                timer: 1
            },
            newPage:1,
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

		if (type == 'edit') {
			this.openEditDialog();
		}
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
		Http.request('op-code-insert', {}, params).then(function(response) {
			_this.openCreateDialog();
			Message.success('新建成功');
			_this.changeP();
		}).catch(function(err) {
			Message.error(err.message)
		});

	}
	onEditSubmit = (params) => {
		var _this = this;
		Http.request('op-code-edit', {}, params).then(function(response) {
			_this.openEditDialog();
			Message.success('修改成功');
			_this.changeP();
		}).catch(function(err) {
			Message.error(err.message)
		});
	}
	onSearch = (form) => {
		var searchParams = {};
		if (form.filter == "name") {
			searchParams = {
				name: form.content
			}
		} else if (form.filter == "codeName") {
			searchParams = {
				codeName: form.content
			}
		}
		this.setState({
			searchParams: searchParams
		});
	}
	//改变页码
    changeP=()=>{
        var timer = new Date();
		var searchParams = Object.assign({},this.state.searchParams);
		console.log(searchParams);
		searchParams.timer=timer;
		this.setState({
            searchParams:searchParams,
        })
    }
	onPageChange=(page)=>{
		var searchParams = Object.assign({},this.state.searchParams);
		searchParams.page=page;
		console.log(searchParams);
		this.setState({
            searchParams:searchParams,
        })
    }

	render() {
		let {
			openDeleteDialog,
			itemDetail
		} = this.state;
		return (
			<div className="g-operation">
				<Section title="业务代码" >
					<SearchForm onCreate={this.openCreateDialog} onSubmit={this.onSearch} />
	        		<Table
							style={{marginTop:10}}
							displayCheckbox={false}
							onLoaded={this.onLoaded}
							ajax={true}
							ajaxUrlName='op-code-list'
							ajaxParams={this.state.searchParams}
							onOperation={this.onOperation}
							onPageChange={this.onPageChange}
						>
						<TableHeader>
						<TableHeaderColumn>名称</TableHeaderColumn>
						<TableHeaderColumn>编码</TableHeaderColumn>
						<TableHeaderColumn>是否启用</TableHeaderColumn>
						<TableHeaderColumn>创建人</TableHeaderColumn>
						<TableHeaderColumn>创建时间</TableHeaderColumn>
						<TableHeaderColumn>操作</TableHeaderColumn>
					</TableHeader>

					<TableBody>
						<TableRow>
							<TableRowColumn name="name"></TableRowColumn>
							<TableRowColumn name="codeName"></TableRowColumn>
							<TableRowColumn name="enableFlagName"></TableRowColumn>
							<TableRowColumn name="creater"></TableRowColumn>
							<TableRowColumn type="date" name="createDate" component={(value)=>{
								return (
									<KrDate value={value} format = "yyyy-mm-dd HH:MM:ss" />
								)
							}}> </TableRowColumn>
							<TableRowColumn>
									<Button label="编辑"   type="operation" operateCode="sso_resource_edit" operation="edit"/>
							 </TableRowColumn>
						 </TableRow>
					</TableBody>
					<TableFooter></TableFooter>
					</Table>
					
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
	form: 'opCode',
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(OpCode);
