import PureRenderMixin from 'react-addons-pure-render-mixin';
import React, {
	Component,
	PropTypes
} from 'react';

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
	Message
} from 'kr-ui';
import './index.less';
import Deletedialog from './Deletedialog';
import Createdialog from './Createdialog';
import SearchForm from './SearchForm';


class Operations extends Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			searchParams: {
				page: 1,
				pageSize: 15
			},
			itemDetail: '',
			openDeleteDialog: false
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
			this.openEditDetailDialog();
		} else if (type == 'view') {
			this.openView(itemDetail.id);
		}
	}
	openView = (id) => {
		var url = `./#/permission/userlist/${id}`;
		window.open(url)
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
		Store.dispatch(Actions.callAPI('delRole', {
			id: itemDetail.id
		})).then(function(response) {
			_this.openDeleteDialog();
			Message.success('删除成功')
			window.location.reload();
		}).catch(function(err) {
			_this.openDeleteDialog();
			Message.error(err.message);
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
		}
		this.setState({
			searchParams: searchParams
		});
	}

	render() {
		let {
			openDeleteDialog
		} = this.state;
		return (
			<div className="g-operation">
				<Section title="角色列表" >
					<SearchForm onSubmit={this.onSearch} /> 
	        		<Table
							style={{marginTop:10}}
							displayCheckbox={false}
							onLoaded={this.onLoaded}
							ajax={true}
							ajaxUrlName='UserfindPage'
							ajaxParams={this.state.searchParams}
							onOperation={this.onOperation}
							  >
						<TableHeader>
						<TableHeaderColumn>编码</TableHeaderColumn>
						<TableHeaderColumn>名称</TableHeaderColumn>
						<TableHeaderColumn>创建人</TableHeaderColumn>
						<TableHeaderColumn>创建时间</TableHeaderColumn>
						<TableHeaderColumn>操作</TableHeaderColumn>
					</TableHeader>

					<TableBody>
						<TableRow>
							<TableRowColumn name="code"></TableRowColumn>
							<TableRowColumn name="name" ></TableRowColumn>
							<TableRowColumn name="creater"></TableRowColumn>
							<TableRowColumn name="createTime" type="date" component={(value)=>{
								return (
									<KrDate value={value} />
								)
							}}></TableRowColumn>
							<TableRowColumn>
									<Button label="编辑" onTouchTap=''  type="operation" operation="edit"/>
									<Button label="删除"  type="operation" operation="delete"/>
									<Button label="查看人员"  type="operation" operation="view"/>
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
						
 					< /Dialog>
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