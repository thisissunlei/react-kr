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
import CreateMemberForm from './CreateMemberForm';
import ValidateMember from './ValidateMember';
export default class CompanyMembers extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			tab: 'table',
			communityId: '',
			searchParams: {
				page: 1,
				pageSize: 15
			},
			validateMember:false,
			createMember:false,
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
	validateMember=()=>{
		this.setState({
			validateMember: !this.state.validateMember,
		});

	}
	createMember=()=>{
		this.setState({
			createMember: !this.state.createMember,
		});
	}

	



	render() {
		
		return (
			<div>

			<Section title={`全部会员 ()`} description="" >
				<Grid>
					<Row>
						<Col align="left">
							<ButtonGroup>
								<Button  label="新建员工" type="button" onTouchTap={this.createMember} width={80} height={30}/>
								<Button  label="验证员工" type="button" onTouchTap={this.validateMember} width={80} height={30}/>
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
						<TableRowColumn name="checkStatus" options={[{label:'已验证',value:1},{label:'未验证',value:0}]}
						component={(value,oldValue)=>{
							var fontColor="";
							if(value=="未验证"){
								fontColor="#ff6060"
							}
							return (<span style={{color:fontColor}}>{value}</span>)}}>
							
						</TableRowColumn>
						<TableRowColumn name="isLeader" options={[{label:'isLeader',value:1},{label:'Leader',value:0}]}
						component={(value,oldValue)=>{
							var fontColor="";
							if(value=="Leader"){
								return (<span>
									<Button label="详情"  type="button" onTouchTap={this.createMember}/>
									<Button label="编辑"  type="button" onTouchTap={this.createMember}/>
									<Button label="设置Leader"  type="button" onTouchTap={this.createMember}/>
								</span>)
							}else{
								return (<span>
									<Button label="详情"  type="button" onTouchTap={this.createMember}/>
									<Button label="编辑"  type="button" onTouchTap={this.createMember}/>
									<Button label="取消Leader"  type="button" onTouchTap={this.createMember}/>
								</span>)
							}
							}}>
								
						 </TableRowColumn>
					 </TableRow>
				</TableBody>

				<TableFooter>
				</TableFooter>

				</Table>
									
			</Section>
			<Dialog
			title="新建员工"
			modal={true}
			open={this.state.createMember}
			onClose={this.createMember}
			contentStyle={{width:687}}>
				<CreateMemberForm onSubmit={this.onNewCreateSubmit} onCancel={this.createMember} />
			</Dialog>
			<Dialog
			title="验证员工"
			modal={true}
			open={this.state.validateMember}
			onClose={this.validateMember}
			contentStyle={{width:687}}>
				<ValidateMember onSubmit={this.onNewCreateSubmit} onCancel={this.validateMember} />
			</Dialog>
			</div>



		);
	}
}