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
	Notify
} from 'kr-ui';

class Distribution extends Component {
	static PropTypes = {
		detail: React.PropTypes.object,
	}
	constructor(props, context) {
		super(props, context);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);


	}

	onCancel() {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}

	onSubmit(form) {

		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(form);
	}

	render() {

		let {
			optionValues,
			stationId,
			customerId,
			communityId,
			detail
		} = this.props;

		let initialValues = {};
		initialValues.stationId = stationId;
		initialValues.customerId = customerId;
		initialValues.communityId = communityId;


		return (

			<Form name="jyayayoinForm"  initialValues={initialValues} onSubmit={this.onSubmit}>
				<KrField name="id" type="hidden"/>
				<KrField name="customerId" type="hidden"/>
				<KrField name="communityId" type="hidden"/>
				<div style={{textAlign:"center",marginBottom:'20px'}}>
					{detail.companyName}{detail.id}序号员工为<KrField name="memberId"component="select" grid={2/3}  options={optionValues.member}/>
				</div>
				<Grid>
					<Row style={{marginTop:30,marginBottom:100}}>
					<Col md={2} align="right"> <Button  label="确定" type="submit" joinEditForm  onSubmit={this.onSubmit}/> </Col>
					<Col md={2} align="right"> <Button  label="取消" type="button"  onTouchTap={this.onCancel}/> </Col> </Row>
				</Grid>
			</Form>


		);



	}

}
//变更
class ChangeStation extends Component {
	static PropTypes = {
		detail: React.PropTypes.object,
	}
	constructor(props, context) {
		super(props, context);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);

	}
	onCancel() {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}

	onSubmit(form) {
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(form);
	}

	render() {
		let {
			optionValues,
			stationId,
			customerId,
			communityId,
			detail
		} = this.props;
		let initialValues = {};
		initialValues.stationId = stationId;

		initialValues.customerId = customerId;
		initialValues.communityId = communityId;

		return (

			<Form name="jyayayoin" initialValues={initialValues} onSubmit={this.onSubmit}>
			<KrField name="id" type="hidden"  />
			<KrField name="customerId" type="hidden"/>
			<KrField name="communityId" type="hidden"/>
			<div style={{textAlign:"center",marginBottom:150}}>
				{detail.companyName}{detail.id}序号员工为{detail.memberName},变更为员工<KrField name="memberId"component="select" grid={2/3}  options={optionValues.members}/>
			</div>
			<Grid>
				<Row style={{marginTop:30}}>
				<Col md={2} align="right"> <Button  label="确定" type="submit" joinEditForm  onSubmit={this.onSubmit}/> </Col>
				<Col md={2} align="right"> <Button  label="取消" type="button"  onTouchTap={this.onCancel}/> </Col> </Row>
			</Grid>
		</Form>


		);

	}


}



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

		this.setState({
			openNewmeber: !this.state.openNewmeber
		});
		window.location.reload()



	}

	getStationUrl() {
		let {
			customerId,
			communityId
		} = this.state;

		let url = `/krspace_member_web/member/toAddMember?companyId=${customerId}&communityId=${communityId}`;
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

		const ParamValues = {
			communityIds: id,
			mainBillId: detail.billId
		}
		var _this = this;
		console.log('...detail', detail)
		return (

			<div className="employees-content">
		 	<Table  style={{marginTop:10}} displayCheckbox={false} ajax={true}  ajaxUrlName='getStation' ajaxParams={ParamValues} pagination={false} onOperation={this.onOperation} loading={this.state.isLoading} 
		 		onProcessData={(state)=>{
		 			var listData  = state.listData;
		 			listData.forEach(function(item){
		 				if(item.memberName){
							item.distributionHidden = true;
		 				}else {
							item.changeHidden = true;
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
								<Button label="变更" className="changeBtn" type="operation" operation="ChangeStation" hidden="changeHidden"  /><Button label="分配" className="Distribtn"  type="operation" operation="Distribution" hidden="distributionHidden"  />
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
			>

				<Distribution  detail={this.state.itemDetail} onCancel={this.onDistributionCancel} onSubmit={this.onDistributionSubmit} optionValues={optionValues} stationId={this.state.stationId} customerId={this.state.customerId} communityId={this.state.communityId}/>
			</Dialog>
			<Dialog
				title="变更工位"
				modal={true}
				open={this.state.openChangeStation}
				onClose={this.onChangeCancel}
			>
				<ChangeStation  detail={this.state.itemDetail} onCancel={this.onChangeCancel} onSubmit={this.onChangeSubmit}  optionValues={optionValues} stationId={this.state.stationId} customerId={this.state.customerId} communityId={this.state.communityId}/>

			</Dialog>
			<Dialog
				title="新增员工"
				modal={true}
				open={this.state.openNewmeber}
				onClose={this.onIframeClose}
			>

				<IframeContent src={this.getStationUrl()}  onClose={this.onIframeClose}  />
			</Dialog>

		</div>
		);
	}
}