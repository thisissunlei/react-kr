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
	Message,
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
	ListGroup,
	SnackTip,
	ListGroupItem
} from 'kr-ui';

import $ from 'jquery';
import CreateMemberForm from './CreateMemberForm';
import ValidateMember from './ValidateMember';
import CancleLeader from './CancleLeader';
import SetLeader from './SetLeader';
import EditMember from './EditMember';
import ImportData from './ImportData';
import BatchDelet from './BatchDelet';
export default class CompanyMembers extends Component {

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	constructor(props, context) {
		super(props, context);
		this.params = this.context.router.params;
		this.companyId = this.context.router.params.companyId;

		this.state = {
			tab: 'table',
			communityId: '',
			page: 1,
			companyId:this.companyId,
			pageSize: 15,
			validateMember:false,
			createMember:false,
			cancleLeader:false,
			setLeader:false,
			editMember:false,
			itemDetail:{},
			memberList:[],
			allData:{},
			seleced:[],
			selecedList:[],
			importdata:false,
			warns:false,
			batchDelet:false,
			value:'',
			leader:false,
			searchParams:{
				page: 1,
				companyId:this.companyId,
				pageSize: 15,
			}
		}


	}

	componentDidMount() {
		Store.dispatch(Actions.switchSidebarNav(true));

	}
	importData=()=>{
		this.setState({
			importdata:!this.state.importdata
		})
	}

	onLoaded=(values)=>{
		this.setState({
			allData:values
		})


	}
	onSelect=(values)=>{
		// console.log('onSelect',values);
		let {allData} = this.state;
		let seleced = [];
		allData.items.map((value,index)=>{
			values.map(item=>{
				if(item == index ){
					seleced.push(value)
				}
			})
		})
		this.setState({
			seleced,
			selecedList:values
		})

		// console.log('onSelect',seleced);
	}
	batchDelet=()=>{
		let {seleced} = this.state;
		if(!seleced.length){
			this.onSubmits();
			return;
		}
		this.setState({
			batchDelet:!this.state.batchDelet
		})
	}
	validateMemberSubmit=()=>{
		let {seleced} = this.state;
		let _this = this;
		let selecedList =[];
		seleced.map(item=>{
			selecedList.push(item.id);
		})
		// console.log('selecedList',selecedList);
		Store.dispatch(Actions.callAPI('validMember',{memberIds:String(selecedList)} )).then(function(response) {
			_this.validateMember();
			// Message.show([{
			// 	message: '设置成功',
			// 	type: 'success',
			// }]);
			Message.success('设置成功');
			_this.setState({
				leader:!_this.state.leader,
				searchParams:{
					value:'',
					page:_this.state.page,
					pageSize:15,
					companyId:_this.state.companyId,
					leader:!_this.state.leader
				}
			})

			// window.setTimeout(function() {
			// 	window.location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/admit/" + response.contractId + "/detail";
			// }, 0);

		}).catch(function(err) {
			// Notify.show([{
			// 	message: err.message,
			// 	type: 'danger',
			// }]);
			Message.error(err.message);
		});
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
		let {seleced} = this.state;
		// console.log(seleced);
		if(!seleced.length){
			this.onSubmits();
			return;
		}
		this.setState({
			validateMember: !this.state.validateMember,
		});

	}
	createMember=(itemData)=>{
		this.setState({
			createMember: !this.state.createMember,
		});
	}
	cancleLeader(itemDetail){
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
	setLeaders=()=>{
		this.setState({
			setLeader: !this.state.setLeader,
		});
	}
	setLeaderStatus=(value)=>{
		let {itemDetail} = this.state;
		let params = {
			companyId:this.companyId,
			isLeader:value.isLeader,
			memberIds:itemDetail.id
		}
		let _this = this;
		Store.dispatch(Actions.callAPI('setLeader', params)).then(function(response) {
			if(value.isLeader){
				_this.setLeaders();
			}else{
				_this.cancleLeaders();
			}
			// Notify.show([{
			// 	message: '设置成功',
			// 	type: 'success',
			// }]);
			Message.success('设置成功');


			_this.setState({
				companyId:_this.companyId,
				leader:!_this.state.leader,
				searchParams:{
					value:'',
					page:_this.state.page,
					pageSize:15,
					leader:!_this.state.leader,
					companyId:_this.companyId
				}
			})

		}).catch(function(err) {
			// Notify.show([{
			// 	message: err.message,
			// 	type: 'danger',
			// }]);
			Message.error(err.message);
		});
	}
	editMemberForm=(value)=>{
		let _this = this;
		let params = value;
		// console.log('edit',value);
		Store.dispatch(Actions.callAPI('membersChange',{}, params)).then(function(response) {
			_this.editMembers()
			// Notify.show([{
			// 	message: '设置成功',
			// 	type: 'success',
			// }]);
			Message.success('设置成功');
			_this.setState({
				leader:!_this.state.leader,
				searchParams:{
					value:'',
					page:_this.state.page,
					pageSize:15,
					companyId:_this.state.companyId,
					leader:!_this.state.leader

				}
			})

			// window.setTimeout(function() {
			// 	window.location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/admit/" + response.contractId + "/detail";
			// }, 0);

		}).catch(function(err) {
			// Notify.show([{
			// 	message: err.message,
			// 	type: 'danger',
			// }]);
			Message.error(err.message);
		});
	}
	onExport=(value)=>{
		let {seleced} = this.state;
		let _this = this;
		let selecedList =[];
		seleced.map(item=>{
			selecedList.push(item.id);
		})
		console.log(String(selecedList));
		let companyId = this.companyId;
		let url = `/api/krspace-finance-web/member/member-company-excel?ids=${String(selecedList)}&companyId=${companyId}`;
		window.location.href = url;

	}

	onLoadDemo=()=>{
		let companyId = this.companyId;
		let url = `/api/krspace-finance-web/member/member-templet-excel?${companyId}`;
		window.location.href = url;
	}
	BatchDeletSure=()=>{
		let {seleced} = this.state;
		let _this = this;
		let selecedList =[];
		seleced.map(item=>{
			selecedList.push(item.id);
		})
		Store.dispatch(Actions.callAPI('deleteMembers',{memberIds:String(selecedList)} )).then(function(response) {
			_this.batchDelet();
			// Notify.show([{
			// 	message: '设置成功',
			// 	type: 'success',
			// }]);
			Message.success('设置成功');
			_this.setState({
				leader:!_this.state.leader,
				searchParams:{
					value:'',
					page:_this.state.page,
					pageSize:15,
					companyId:_this.state.companyId,
					leader:!_this.state.leader

				}
			})


			// window.setTimeout(function() {
			// 	window.location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/admit/" + response.contractId + "/detail";
			// }, 0);

		}).catch(function(err) {
			// Notify.show([{
			// 	message: err.message,
			// 	type: 'danger',
			// }]);
			Message.error(err.message);
		});
	}
	importDataPost=(files)=>{
		// console.log('file',files);
		// let companyId = this.companyId;
		// console.log(files);
		// let params = {
		// 	companyId:companyId,
		// 	file:files.file
		// }
		// let _this = this;
		// Store.dispatch(Actions.callAPI('importMemberExcel',{},params)).then(function(response) {
		// 	_this.importData();
		// 	// Notify.show([{
		// 	// 	message: '设置成功',
		// 	// 	type: 'success',
		// 	// }]);
		// 	Message.success('设置成功');

		// 	// window.setTimeout(function() {
		// 	// 	window.location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/admit/" + response.contractId + "/detail";
		// 	// }, 0);

		// }).catch(function(err) {
		// 	// Notify.show([{
		// 	// 	message: err.message,
		// 	// 	type: 'danger',
		// 	// }]);
		// 	Message.error(err.message);
		// });

	}
	onSubmits=()=>{
		this.setState({
			warns:!this.state.warns
		})
	}
	onNewCreateSubmit=(values)=>{
		var _this = this;
			Store.dispatch(Actions.callAPI('membersChange',{},values)).then(function(response){
			_this.createMember();
			// Notify.show([{
 		// 	 message: '成功',
 		// 	 type: 'success',
			//  	}]);
			// console.log('newMember');
			Message.success('成功');
			_this.setState({
				leader:!_this.state.leader,
				searchParams:{
					value:'',
					page:_this.state.page,
					pageSize:15,
					companyId:_this.state.companyId,
					leader:!_this.state.leader
				}
			})
			// window.location.href = "/#/community/companyMembers/" + _this.params.companyId + "/list/" + _this.params.communityId ;
		}).catch(function(err){
			// console.log(err);
			// Notify.show([{
			// 	message: err.message,
			// 	type: 'danger',
			// }]);
			Message.error(err.message);
		});

	}
	detailView(itemData){
		let orderId = itemData.id;
		let companyId=this.state.companyId;
		window.open(`./#/member/MemberManage/${orderId}/detail/${companyId}`, orderId);

	}
	onSearchSubmit=()=>{

		let _this = this;
		let searchParam = {
			registerSourceId :''
		}
		Store.dispatch(Actions.callAPI('membersList',searchParam)).then(function(response){


		}).catch(function(err){
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}








	render() {
		let {itemDetail,seleced,open,title,allData} = this.state;
		// let searchParams ={
		// 	page:this.state.page,
		// 	pageSize:this.state.pageSize,
		// 	companyId:this.state.companyId,
		// 	value:this.state.value

		// }
		let {searchParams} = this.state;
		// console.log('state',searchParams);
		return (
			<div>


			<Section title={`${allData.companyName} (${allData.totalCount})`} description="" >
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
					onSelect={this.onSelect}
					displayCheckbox={true}
					ajaxFieldListName='items'
					ajaxUrlName='membersList'
					ajaxParams={searchParams}
					exportSwitch={true}
					onExport={this.onExport}
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
						<TableRowColumn name="name" component={(value,oldValue,itemData)=>{
							if(itemData.isLeader){
								return(<span>{value}<span style={{color:'#499df1'}}>(Leader)</span></span>)
							}else{
								return(<span>{value}</span>)
							}
						}}></TableRowColumn>
						<TableRowColumn name="phone" ></TableRowColumn>
						<TableRowColumn name="email" ></TableRowColumn>
						<TableRowColumn name="jobName"></TableRowColumn>
						<TableRowColumn name="checkStatus" options={[{label:'已验证',value:'true'},{label:'未验证',value:'false'}]}
						component={(value,oldValue)=>{
							var fontColor="";
							if(value=="未验证"){
								fontColor="#ff6060"
							}
							return (<span style={{color:fontColor}}>{value}</span>)}}>

						</TableRowColumn>
						<TableRowColumn name="isLeader" options={[{label:'isLeader',value:'true'},{label:'setLeader',value:'false'}]}
												component={(value,oldValue,itemData)=>{
													var fontColor="";
													if(value=="isLeader"){
														return (
															<span>
															<Button label="详情"  type="operation" onTouchTap={this.detailView.bind(this,itemData)}/>
															<Button label="编辑"  type="operation" onTouchTap={this.editMember.bind(this,itemData)}/>
															<Button label="取消Leader"  type="operation" onTouchTap={this.cancleLeader.bind(this,itemData)}/>
															</span>
														)
													}else if(value=="setLeader"){
														return (
															<span>
															<Button label="详情"  type="operation" onTouchTap={this.detailView.bind(this,itemData)}/>
															<Button label="编辑"  type="operation" type="operation" onTouchTap={this.editMember.bind(this,itemData)}/>
															<Button label="设置Leader"  type="operation" onTouchTap={this.setLeader.bind(this,itemData)}/>
															</span>
														)

													}
													}}>

												 </TableRowColumn>

					 </TableRow>
				</TableBody>

				<TableFooter onImport={this.importData} batchDelet={this.batchDelet}>
				</TableFooter>

				</Table>

			</Section>
			<Dialog
			title="新建员工"
			modal={true}
			open={this.state.createMember}
			onClose={this.createMember}
			contentStyle={{width:687}}>
				<CreateMemberForm onSubmit={this.onNewCreateSubmit} params={this.params} onCancel={this.createMember}  detail={allData}/>
			</Dialog>
			<Dialog
			title="批量导入"
			modal={true}
			open={this.state.importdata}
			onClose={this.importData}
			contentStyle={{width:687}}>
				<ImportData onSubmit={this.importDataPost} onCancel={this.importData} onLoadDemo={this.onLoadDemo}/>
			</Dialog>
			<Dialog
			title="验证员工"
			modal={true}
			open={this.state.validateMember}
			onClose={this.validateMember}
			contentStyle={{width:687}}>
				<ValidateMember onSubmit={this.validateMemberSubmit} onCancel={this.validateMember} seleced={seleced}/>
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
			<Dialog
			title="批量删除"
			modal={true}
			open={this.state.batchDelet}
			onClose={this.batchDelet}
			contentStyle={{width:440}}>
				<BatchDelet onSubmit={this.BatchDeletSure} onCancel={this.batchDelet}/>
			</Dialog>
			<Dialog
			title="提示"
			modal={true}
			open={this.state.warns}
			onClose={this.onSubmits}
			contentStyle={{width:440}}>
				<div>
				<p style={{marginTop:55,marginBottom:59,textAlign:'center',color:'#333'}}>请至少选择一个成员  </p>
				<Grid style={{marginBottom:20}}>
					<Row>
						<ListGroup>
							<ListGroupItem style={{width:'100%',textAlign:'center',padding:0}}><Button  label="确定" type="button"  onTouchTap={this.onSubmits} width={90} height={34}/></ListGroupItem>
						</ListGroup>
					  </Row>
				</Grid></div>

			</Dialog>
			</div>



		);
	}
}
