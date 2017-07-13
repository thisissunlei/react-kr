import PureRenderMixin from 'react-addons-pure-render-mixin';
import React, {
	Component,
	PropTypes
} from 'react';
import {Http} from 'kr/Utils';
import {
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
import SearchForm from './SearchForm';

export default class UserList extends Component {

	constructor(props, context) {
		super(props, context);
		var roleId = this.props.params.userId;
		this.state = {
			searchParams: {
				page: 1,
				pageSize: 15,
				roleId: roleId,
				timer: 0,
			},
			itemDetail: '',
			openDeleteDialog: false,
			newPage:1,
		}
	}

	//操作相关
	onOperation = (type, itemDetail) => {

		this.setState({
			itemDetail
		});

		if (type == 'delete') {
			this.openDeleteDialog();
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
		var roleId = this.props.params.userId
		Http.request('deleteUser', {
			roleId: roleId,
			userId: itemDetail.id
		}).then(function(response) {
			_this.openDeleteDialog();
			Message.success('删除成功');
			_this.changeP();
			_this.openDeleteDialog();
		}).catch(function(err) {
			_this.openDeleteDialog();
			Message.error(err.message);
		});
	}
	onSearchSubmit = (name) => {
		var roleId = this.props.params.userId
		this.setState({
			searchParams: {
				userName: name.searchParam,
				roleId: roleId
			}
		})

	}
	//改变页码
    changeP=()=>{
        var timer = new Date();
        this.setState({
            searchParams: {
                    page: this.state.newPage,
                    timer: timer,
            }
        })
    }
    onPageChange=(page)=>{
        this.setState({
            newPage:page,
        })
    }

	back=()=>{
		var page = this.props.params.page;
		var url = `./#/permission/user/${page}`;
		window.location.href=url;
	}

	render() {


		return (
			<div className="g-operation">
				<Section title="人员列表" >
					<Grid style={{marginBottom:22,marginTop:2}}>
						<Row>
						<Col md={4} align="left" >
							<Button label="返回"  onTouchTap={this.back} />
						 </Col>
						<Col md={8} align="right">
						   <ListGroup>
							 <ListGroupItem><SearchForm onSubmit={this.onSearchSubmit} onCancel={this.onSearchCancel}/></ListGroupItem>
						   </ListGroup>
						</Col>
					  </Row>
					</Grid>
	        		<Table
							style={{marginTop:10}}
							displayCheckbox={false}
							onLoaded={this.onLoaded}
							ajax={true}
							ajaxUrlName='findUserByRoleId'
							ajaxParams={this.state.searchParams}
							onOperation={this.onOperation}
							onPageChange={this.onPageChange}
							  >
						<TableHeader>
						<TableHeaderColumn>Id</TableHeaderColumn>
						<TableHeaderColumn>姓名</TableHeaderColumn>
						<TableHeaderColumn>创建时间</TableHeaderColumn>
						<TableHeaderColumn>操作</TableHeaderColumn>
					</TableHeader>

					<TableBody>
						<TableRow>
							<TableRowColumn name="id"></TableRowColumn>
							<TableRowColumn name="realName" ></TableRowColumn>
							<TableRowColumn name="createTime" type="date" component={(value)=>{
								return (
									<KrDate value={value} />
								)
							}}></TableRowColumn>
							<TableRowColumn>
									<Button label="移除"  type="operation" operateCode="sso_roleList_removeUser" operation="delete"/>
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
				</Section>

			</div>
		);
	}

}
