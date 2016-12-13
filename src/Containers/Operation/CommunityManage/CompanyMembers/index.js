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
import CancleLeader from './CancleLeader';
import SetLeader from './SetLeader';
import EditMember from './EditMember';
export default class CompanyMembers extends Component {

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

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
			cancleLeader:false,
			setLeader:false,
			editMember:false,
			itemDetail:{}
		}
		this.companyId = this.context.router.params.companyId;
		this.params = this.context.router.params;

	}

	componentDidMount() {
		Store.dispatch(Actions.switchSidebarNav(true));

	}

	onLoaded=()=>{
		console.log('value');

	}
	editMember(itemDetail){
		this.setState({
			editMember: !this.state.editMember,
			itemDetail:itemDetail
		});
	}
	editMembers=()=>{
		this.setState({
			editMember: !this.state.editMember,
		});
	}
	validateMember=()=>{
		this.setState({
			validateMember: !this.state.validateMember,
		});

	}
	createMember=(itemData)=>{
		console.log('itemData',itemData);
		this.setState({
			createMember: !this.state.createMember,
		});
	}
	cancleLeader(itemDetail){
		console.log(itemDetail);
		this.setState({
			cancleLeader: !this.state.cancleLeader,
			itemDetail:itemDetail
		});
	}
	cancleLeaders=()=>{
		this.setState({
			cancleLeader: !this.state.cancleLeader,
		});
	}
	setLeader(itemDetail){
		this.setState({
			setLeader: !this.state.setLeader,
			itemDetail:itemDetail
		});
	}
	setLeader=()=>{
		this.setState({
			setLeader: !this.state.setLeader,
		});
	}
	setLeaderStatus=(value)=>{
		let {itemDetail} = this.state;
		let params = {
			companyId:this.companyId,
			isLeader:value.isLeader,
			memberId:itemDetail.id
		}
		let _this = this;
		console.log(value);
		Store.dispatch(Actions.callAPI('setLeader', params)).then(function(response) {
			if(value.isLeader){
				_this.setLeaders();
			}else{
				_this.cancleLeaders();
			}
			Notify.show([{
				message: '设置成功',
				type: 'success',
			}]);

			// window.setTimeout(function() {
			// 	window.location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/admit/" + response.contractId + "/detail";
			// }, 0);

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}
	editMemberForm=(value)=>{
		console.log('index',value);
		Store.dispatch(Actions.callAPI('setLeader', params)).then(function(response) {
			if(value.isLeader){
				_this.setLeaders();
			}else{
				_this.cancleLeaders();
			}
			Notify.show([{
				message: '设置成功',
				type: 'success',
			}]);

			// window.setTimeout(function() {
			// 	window.location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/admit/" + response.contractId + "/detail";
			// }, 0);

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}
	

	



	render() {
		let {itemDetail} = this.state;
		

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
						<TableRowColumn name="isLeader" options={[{label:'isLeader',value:1},{label:'setLeader',value:0}]}
												component={(value,oldValue,itemData)=>{
													var fontColor="";
													if(value=="isLeader"){
														return (
															<span>
															<Button label="详情"  type="operation" />
															<Button label="编辑"  type="operation" onTouchTap={this.editMember.bind(this,itemData)}/>
															<Button label="取消Leader"  type="operation" onTouchTap={this.cancleLeader.bind(this,itemData)}/>
															</span>
														)
													}else if(value=="setLeader"){
														return (
															<span>
															<Button label="详情"  type="operation" />
															<Button label="编辑"  type="operation" />
															<Button label="设置Leader"  type="operation" onTouchTap={this.setLeader.bind(this,itemData)}/>
															</span>
														)

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
			<Dialog
			title="编辑员工"
			modal={true}
			open={this.state.editMember}
			onClose={this.editMembers}
			contentStyle={{width:687}}>
				<EditMember onSubmit={this.editMemberForm} params={this.params} onCancel={this.editMembers} detail={itemDetail}/>
			</Dialog>
			<Dialog
			title="取消Leader"
			modal={true}
			open={this.state.cancleLeader}
			onClose={this.cancleLeaders}
			contentStyle={{width:440}}>
				<CancleLeader onSubmit={this.setLeaderStatus} onCancel={this.cancleLeaders}/>
			</Dialog>
			<Dialog
			title="设置Leader"
			modal={true}
			open={this.state.setLeader}
			onClose={this.setLeaders}
			contentStyle={{width:440}}>
				<SetLeader onSubmit={this.setLeaderStatus} onCancel={this.setLeaders}/>
			</Dialog>
			</div>



		);
	}
}