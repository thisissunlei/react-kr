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

export default class UserList extends Component {

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
		/*Store.dispatch(Actions.callAPI('delRole', {
			id: itemDetail.id
		})).then(function(response) {
			_this.openDeleteDialog();
			Message.success('删除成功')
		}).catch(function(err) {
			_this.openDeleteDialog();
			Message.error(err.message)
		});*/
	}


	render() {

		return (
			<div className="g-operation">
				<Section title="人员列表" >
					
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
						<TableHeaderColumn>Id</TableHeaderColumn>
						<TableHeaderColumn>姓名</TableHeaderColumn>
						<TableHeaderColumn>创建时间</TableHeaderColumn>
						<TableHeaderColumn>操作</TableHeaderColumn>
					</TableHeader>

					<TableBody>
						<TableRow>
							<TableRowColumn name="id"></TableRowColumn>
							<TableRowColumn name="name" ></TableRowColumn>
							<TableRowColumn name="createTime" type="date" component={(value)=>{
								return (
									<KrDate value={value} />
								)
							}}></TableRowColumn>
							<TableRowColumn>
									<Button label="移除"  type="operation" operation="delete"/>
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