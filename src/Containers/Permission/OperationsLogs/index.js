import PureRenderMixin from 'react-addons-pure-render-mixin';
import React, {
	Component,
	PropTypes
} from 'react';

import {
	Actions,
	Store
} from 'kr/Redux';
import {
	Http
} from "kr/Utils";

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
import SearchForm from './SearchForm';

export default class OperationsLogs extends Component {

	constructor(props, context) {
		super(props, context);
		var roleId = this.props.params.userId;
		this.state = {
			searchParams: {
				page: 1,
				pageSize: 15,
			},
			itemDetail: '',
		}
	}

	//操作相关
	onOperation = (type, itemDetail) => {

		this.setState({
			itemDetail
		});

		if (type == 'delete') {
		}
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

	render() {


		return (
			<div className="g-operation">
				<Section title="人员列表" >
					<Grid style={{marginBottom:22,marginTop:2}}>
						<Row>
						<Col md={4} align="left" > </Col>
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
									<KrDate value={value} format="yyyy-mm-dd hh:MM:ss"/>
								)
							}}></TableRowColumn>
							<TableRowColumn>
									<Button label="移除"  type="operation" operation="delete"/>
							 </TableRowColumn>
						 </TableRow>
					</TableBody>
					<TableFooter></TableFooter>
					</Table>
				</Section>

			</div>
		);
	}

}
