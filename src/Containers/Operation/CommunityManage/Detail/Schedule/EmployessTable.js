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
	Grid,
	Row,
	Col,
	Dialog,
	BreadCrumbs,
	Form,
	KrField,
	IframeContent,
	Notify,
	Message,
	ButtonGroup
} from 'kr-ui';
import CreateMemberForm from './CreateMemberForm';
import ChangeStation from './ChangeStation';
import Distribution from './Distribution';

export default class EmployessTable extends Component {

	static defaultProps = {
		activity: false,


	}

	static PropTypes = {
		params: React.PropTypes.object,
		activity: React.PropTypes.bool,
	}

	constructor(props, context) {
		super(props, context);
		this.openChangeStation = this.openChangeStation.bind(this);
		this.openDistributionStation = this.openDistributionStation.bind(this);
		this.onChangeCancel = this.onChangeCancel.bind(this);
		this.onDistributionCancel = this.onDistributionCancel.bind(this);
		this.onDistributionSubmit = this.onDistributionSubmit.bind(this);
		this.onChangeSubmit = this.onChangeSubmit.bind(this);
		this.onOperation = this.onOperation.bind(this);
		this.onIframeClose = this.onIframeClose.bind(this);
		this.onClose = this.onClose.bind(this);
		this.state = {
			openChangeStation: false,
			openDistribution: false,
			optionValues: {},
			itemDetail: {},
			stationId: 1,
			openNewmeber: false,
			customerId: 1,
			communityId: 1,
			isLoading: false,
			state: {},

		}

	}

	componentDidMount() {


	}

	openChangeStation(itemDetail) {
		var _this = this;

		this.setState({
			openChangeStation: !this.state.openChangeStation,
			stationId: itemDetail.id,
			customerId: itemDetail.customerId,
			communityId: itemDetail.communityId
		})
		let optionValues = {};

		const formValues = {
			customerId: itemDetail.customerId
		}
		Store.dispatch(Actions.callAPI('getmembers', formValues)).then(function(response) {

			optionValues.members = response.map(function(item, index) {
				item.value = item.id;
				item.label = item.memberName;
				return item;
			});
			_this.setState({
				optionValues
			});

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});

	}

	openDistributionStation(itemDetail) {


		var _this = this;
		this.setState({
			openDistribution: !this.state.openDistribution,
			stationId: itemDetail.id,
			customerId: itemDetail.customerId,
			communityId: itemDetail.communityId
		})
		let optionValues = {};
		const formValue = {
			customerId: itemDetail.customerId,
		}

		Store.dispatch(Actions.callAPI('getmembers', formValue)).then(function(response) {

			optionValues.member = response.map(function(item, index) {
				item.value = item.id;
				item.label = item.memberName;
				return item;
			});
			_this.setState({
				optionValues,
			});

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}

	onChangeCancel() {
		this.setState({
			openChangeStation: !this.state.openChangeStation
		})

	}

	onDistributionCancel() {
		this.setState({
			openDistribution: !this.state.openDistribution
		})
	}
	onClose() {
		this.setState({
			openNewmeber: !this.state.openNewmeber
		});
	}

	onChangeSubmit(form) {
		var _this = this;
		if (form.memberId == -1) {
			this.setState({
				openNewmeber: !this.state.openNewmeber
			});
			this.onChangeCancel();
		} else {

			Store.dispatch(Actions.callAPI('changeStation', {}, form)).then(function(response) {
				_this.onChangeCancel();
				Notify.show([{
					message: '操作成功！',
					type: 'success',
				}]);
				_this.setState({
					isLoading: !_this.state.isLoading
				})

			}).catch(function(err) {

				Notify.show([{
					message: err.message,
					type: 'danger',
				}]);
			});
		}

	}

	onIframeClose(response) {
		if (response.operator == 'ok') {
			Notify.show([{
				message: '新增成功！',
				type: 'success',
			}]);
		}

		this.setState({
			openNewmeber: !this.state.openNewmeber
		});

	}

	getStationUrl() {
		let {
			customerId,
			communityId
		} = this.state;

		let url = `/krspace_member_web/member/toAddMember?companyId=${customerId}&communityId=${communityId}&flag=op`;
		return url;
	}



	onDistributionSubmit(form) {
		var _this = this;
		if (form.memberId == -1) {
			this.setState({
				openNewmeber: !this.state.openNewmeber,

			});
			this.onDistributionCancel()
		} else {
			Store.dispatch(Actions.callAPI('changeStation', {}, form)).then(function(response) {
				_this.onDistributionCancel()
				Notify.show([{
					message: '操作成功！',
					type: 'success',
				}]);
				_this.setState({
					isLoading: !_this.state.isLoading
				})

			}).catch(function(err) {

				Notify.show([{
					message: err.message,
					type: 'danger',
				}]);
			});
		}

	}



	//操作相关
	onOperation(type, itemDetail) {
		this.setState({
			itemDetail
		});

		if (type == 'Distribution') {
			this.setState({
				stationId: itemDetail.stationId
			}, function() {
				this.openDistributionStation(itemDetail)
			})

		} else if (type == 'ChangeStation') {
			this.setState({
				stationId: itemDetail.stationId
			}, function() {

				this.openChangeStation(itemDetail)
			})

		}
	}
	onNewCreateSubmit=(values)=>{
		var _this = this;
		let form = {};
		form.stationId = this.state.stationId;
		form.customerId = this.state.customerId;
		form.communityId = this.state.communityId;
		Store.dispatch(Actions.callAPI('membersChange',{},values))
		.then(function(response){
			Message.success('成功');
			
			form.memberId = response;
			console.log('onDistributionSubmit',response);
			_this.onDistributionSubmit(form);

			_this.onClose();
			_this.onDistributionCancel()
			// window.location.reload();
			// window.location.href = "/#/community/companyMembers/" + _this.params.companyId + "/list/" + _this.params.communityId ;
		}).catch(function(err){
			Message.error(err.message);
			_this.onClose();
		});

	}



	render() {

		let {
			activity,
			detail,
			id
		} = this.props;

		if (!activity) {
			return null;
		}
		let {
			optionValues

		} = this.state;
		
		let {
			customerId,
			communityId
		} = this.state;
		let params = {
			communityId:communityId,
			companyId:customerId
		}
		const ParamValues = {
			communityIds: detail.communityId,
			mainBillId: detail.billId
		}
		var _this = this;

		return (

			<div className="employees-content">
		 	<Table className="childTable" style={{marginTop:10,width:'100%'}} displayCheckbox={false} ajax={true}  ajaxUrlName='getStation' ajaxParams={ParamValues} pagination={false} onOperation={this.onOperation} loading={this.state.isLoading} 
		 		onProcessData={(state)=>{
		 			var listData  = state.listData;
			 			listData.forEach(function(item){
			 				
			 				if(item.status=="LEFTED"){
								item.distributionHidden = true;
								item.changeHidden = true;
			 				}else{
			 					if(item.memberName){
									item.distributionHidden = true;
									item.noneHidden=true;
				 				}else {
									item.changeHidden = true;
									item.noneHidden=true;
				 				}
			 				}
			 				
							
			 			});
						return state;
					}}>
				<TableHeader>
						<TableHeaderColumn>工位编号</TableHeaderColumn>
						<TableHeaderColumn>租赁起始时间</TableHeaderColumn>
						<TableHeaderColumn>租赁结束时间</TableHeaderColumn>
						<TableHeaderColumn>员工</TableHeaderColumn>
						<TableHeaderColumn>电话</TableHeaderColumn>
						<TableHeaderColumn>状态</TableHeaderColumn>
						<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>

				<TableBody>
					<TableRow displayCheckbox={true}>
						<TableRowColumn name="stationCode" ></TableRowColumn>
						<TableRowColumn name="leaseBeginDate" type="date" format="yyyy-mm-dd"></TableRowColumn>
						<TableRowColumn name="leaseEndDate" type="date" format="yyyy-mm-dd"></TableRowColumn>
						<TableRowColumn name="memberName" ></TableRowColumn>
						<TableRowColumn name="memberPhone" ></TableRowColumn>
						<TableRowColumn name="status" options={[{label:'未入住',value:'UNLIVE'},{label:'已入住',value:'LIVED'},{label:'已离场',value:'LEFTED'}]}></TableRowColumn>
						<TableRowColumn type="operation">
								<Button label="变更" className="changeBtn" type="operation" operation="ChangeStation" hidden="changeHidden"  />
								<Button label="分配" className="Distribtn"  type="operation" operation="Distribution" hidden="distributionHidden"  />
								<Button label="无" className="Distribtn bgcolor" type="operation" operation="none" hidden="noneHidden"/>
						</TableRowColumn>
					</TableRow>
				</TableBody>

				<TableFooter></TableFooter>
			</Table>


			<Dialog
				title="分配工位"
				modal={true}
				open={this.state.openDistribution}
				onClose={this.onDistributionCancel}
				contentStyle={{width:445}}
			>

				<Distribution  detail={this.state.itemDetail} onCancel={this.onDistributionCancel} onSubmit={this.onDistributionSubmit} optionValues={optionValues} stationId={this.state.stationId} customerId={this.state.customerId} communityId={this.state.communityId}/>
			</Dialog>
			<Dialog
				title="变更工位"
				modal={true}
				open={this.state.openChangeStation}
				onClose={this.onChangeCancel}
				contentStyle={{width:445}}
			>
				<ChangeStation  detail={this.state.itemDetail} onCancel={this.onChangeCancel} onSubmit={this.onChangeSubmit}  optionValues={optionValues} stationId={this.state.stationId} customerId={this.state.customerId} communityId={this.state.communityId}/>

			</Dialog>
			<Dialog
				title="新增员工"
				modal={true}
				open={this.state.openNewmeber}
				onClose={this.onClose}
				contentStyle={{width:620}}
			>
				<CreateMemberForm onSubmit={this.onNewCreateSubmit} params={params} onCancel={this.onClose} detail={this.state.itemDetail}/>
			

				{/*<IframeContent  width={500} height={600} src={this.getStationUrl()}  onClose={this.onIframeClose}  />*/}
			</Dialog>

		</div>
		);
	}
}