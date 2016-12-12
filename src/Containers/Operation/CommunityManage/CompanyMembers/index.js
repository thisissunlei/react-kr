import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';
import {
	reduxForm,
	submitForm,
	change,
	reset
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';
import http from 'kr/Redux/Utils/fetch';

import {
	Tabs,
	Tab,
	Dialog,
	Section,
	Grid,
	Notify,
	Button,
	KrField,
	Form,
	BreadCrumbs,
	Title,
	Row,
	Col,
	ButtonGroup,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
} from 'kr-ui';

import $ from 'jquery';
export default class CompanyMembers extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			tab: 'table',
			communityId: '',
			searchParams: {
				page: 1,
				pageSize: 15
			}
		}

	}

	componentDidMount() {
		Store.dispatch(Actions.switchSidebarNav(true));

	}

	onOperation=()=>{
		console.log('value');
	}
	onLoaded=()=>{
		console.log('value');

	}

	



	render() {
		
		return (

			<Section title={`全部会员 ()`} description="" >
				<Grid>
					<Row>
						<Col align="left">
							<ButtonGroup>
								<Button  label="新建员工" type="button" onTouchTap={this.onCancel} width={80} height={30}/>
								<Button  label="验证员工" type="button" onTouchTap={this.onCancel} width={80} height={30}/>
						  </ButtonGroup>
						</Col>
					</Row>
				</Grid>
				<Table
				className="members-list-table"
					style={{marginTop:20,position:'inherit'}}
					onLoaded={this.onLoaded}
					ajax={true}
					onProcessData={(state)=>{
						return state;
						}}
					onOperation={this.onOperation}
					exportSwitch={true}
					ajaxFieldListName='items'
					ajaxUrlName='getCompanyMemberList'
					ajaxParams={this.state.searchParams}
				>
				<TableHeader>
						{/*<TableHeaderColumn>ID</TableHeaderColumn>*/}
						<TableHeaderColumn>姓名</TableHeaderColumn>
						<TableHeaderColumn>手机号</TableHeaderColumn>
						<TableHeaderColumn>邮箱</TableHeaderColumn>
						<TableHeaderColumn>职位</TableHeaderColumn>
						<TableHeaderColumn>状态</TableHeaderColumn>
						<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>
				<TableBody style={{position:'inherit'}}>
						<TableRow displayCheckbox={true}>
						<TableRowColumn name="name" ></TableRowColumn>
						<TableRowColumn name="phone" ></TableRowColumn>
						<TableRowColumn name="email" ></TableRowColumn>
						<TableRowColumn name="jobName"></TableRowColumn>
						<TableRowColumn name="checkStatus"></TableRowColumn>
						<TableRowColumn type="operation">
								<Button label="详情"  type="operation" operation="view"/>
								<Button label="编辑"  type="operation" operation="edit"/>
						 </TableRowColumn>
					 </TableRow>
				</TableBody>

				<TableFooter></TableFooter>

				</Table>
									
			</Section>



		);
	}
}