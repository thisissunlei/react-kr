import React from 'react';
import {
	Http
} from "kr/Utils";
import {
	reduxForm
} from 'redux-form';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	ListGroupItem,
	ListGroup,
	Dialog,
	SearchForms,
	KrDate,
	Message,
	Drawer,
} from 'kr-ui';
import './index.less';
import Deletedialog from './Deletedialog';
import Createdialog from './Createdialog';
import Editdialog from './Editdialog';
import SearchForm from './SearchForm';
import CodeDialog from './CodeDialog';

class Operations extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			searchParams: {
				page: this.props.params.page,
				pageSize: 10,
				timer: 0,
			},
			itemDetail: '',
			openDeleteDialog: false,
			openCreateDialog: false,
			openEditDialog: false,
			openCodeDialog:false,
			moduleDetail: '',
			newPage:1,
		}
	}
	componentDidMount() {
		// if(!this.props.params.page){
		// 	window.location.href = window.location.href+'/1';
		// }
		var _this = this;
		this.setState({
			newPage:this.props.params.page || '1',
		},function(){
			_this.changeP();
		})
		
	}
	//操作相关
	onOperation = (type, itemDetail) => {

		this.setState({
			itemDetail
		});
		var _this = this;
		if (type == 'delete') {
			this.openDeleteDialog();
		} else if (type == 'edit') {
			this.openEditDialog();
			

		} else if (type == 'view') {
			this.openView(itemDetail.id,this.state.newPage);
		}else if (type == 'code') {
			this.openCodeDialog();
		}
	}
	openView = (id,page) => {
		var url = `./#/permission/userlist/${id}/${page}`;
		window.location.href=url;
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
		Http.request('delRole', {
			id: itemDetail.id
		}).then(function(response) {
			Message.success('删除成功')
			_this.changeP();
        	_this.openDeleteDialog();
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
	openCreateDialog = () => {
		this.setState({
			openCreateDialog: !this.state.openCreateDialog
		})
	}
	openCodeDialog = () => {
		this.setState({
			openCodeDialog: !this.state.openCodeDialog
		})
	}
	onCreatSubmit = (form) => {
		var _this = this;
		Http.request('createRole', {}, form).then(function(response) {
			Message.success('新建成功');
			_this.changeP();
        	_this.openCreateDialog();
		}).catch(function(err) {
			Message.error(err.message);
		});

	}
	openEditDialog = () => {
		this.setState({
			openEditDialog: !this.state.openEditDialog
		})
	}
	onEditSubmit = (form) => {
		var _this = this;
		Http.request('editRole', {}, form).then(function(response) {
			Message.success('修改成功');
			_this.changeP();
        	_this.openEditDialog();
		}).catch(function(err) {
			Message.error(err.message);
		});
	}
	onCodeSubmit=()=>{
		this.changeP();
		this.openCodeDialog();
	}
	//改变页码
    changeP=()=>{
        var timer = new Date();
        this.setState({
            searchParams: {
                    page: this.state.newPage,
                    timer: timer,
					pageSize:10,
            }
        })
    }
    onPageChange=(page)=>{
        this.setState({
            newPage:page,
        })
    }
	render() {
		let {
			openDeleteDialog,
			itemDetail,
			moduleDetail
		} = this.state;

		return (
			<div className="g-operation">
				<Section title="角色列表" >
					<SearchForm onSubmit={this.onSearch} onCreate={this.openCreateDialog}/>
	        		<Table
							style={{marginTop:10}}
							displayCheckbox={false}
							onLoaded={this.onLoaded}
							ajax={true}
							ajaxUrlName='UserfindPage'
							ajaxParams={this.state.searchParams}
							onOperation={this.onOperation}
							onPageChange={this.onPageChange}
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
									<Button label="编辑"   type="operation" operation="edit"/>
									<Button label="删除"  type="operation" operation="delete"/>
									<Button label="查看人员"  type="operation" operation="view"/>
									<Button label="业务代码"  type="operation" operation="code"/>
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
					<Dialog
						title="业务代码"
						modal={true}
						onClose={this.openCodeDialog}
						open={this.state.openCodeDialog}
						contentStyle={{width:600}}
						>
						<CodeDialog detail={itemDetail} onCancel={this.openCodeDialog} onSubmit={this.onCodeSubmit} />
					</Dialog>
					 <Drawer
					 	 modal={true}
			             width={750}
			             open={this.state.openCreateDialog}
			             onClose={this.openCreateDialog}
			             openSecondary={true}
			             containerStyle={{paddingTop:40,paddingBottom:48,zIndex:20}}
						
						>
						<Createdialog  onCancel={this.openCreateDialog} onSubmit={this.onCreatSubmit} />
					</Drawer>
					 <Drawer
					 	 modal={true}
			             width={750}
			             open={this.state.openEditDialog}
			             onClose={this.openEditDialog}
			             openSecondary={true}
						 containerStyle={{paddingRight:43,paddingTop:40,paddingLeft:48,paddingBottom:48,zIndex:20}}
						>
						<Editdialog  detail={itemDetail}   onCancel={this.openEditDialog} onSubmit={this.onEditSubmit} />
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
