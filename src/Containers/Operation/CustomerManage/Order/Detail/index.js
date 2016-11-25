import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';


import {
	reduxForm
} from 'redux-form';
import Section from 'kr-ui/Section';


import DelAgreementNotify from './DelAgreementNotify';

import {
	KrField,
	KrDate,
	Button,
	DotTitle,
	Dialog
} from 'kr-ui';


import {
	Grid,
	Row,
	Col
} from 'kr-ui/Grid';

import {
	Snackbar
} from 'material-ui';

import {
	BreadCrumbs,
	Loading,
	Notify
} from 'kr-ui';

import Circle from './circle';
import './active.less';

import {
	Menu,
	MenuItem,
	Divider,
	FontIcon,
	DatePicker,
	Paper,
} from 'material-ui';


import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter
} from 'kr-ui/Table';


import {
	List,
	ListItem
} from 'material-ui/List';


import {
	Actions,
	Store
} from 'kr/Redux';
import ReactTooltip from 'react-tooltip'

class NewCreatForm extends Component {
	static PropTypes = {
		contractStatusCount: React.PropTypes.object,
		params: React.PropTypes.object,

	}
	constructor(props, context) {
		super(props, context);
	}

	render() {
		let {
			contractStatusCount,
			params
		} = this.props;

		return (
			<Grid style={{paddingBottom:20}}>
				<Row>
				<Col md={4} align="center">
					{
					contractStatusCount.enterTotoal>0?<span className="createButton disabled">承租意向书</span>:<a className="createButton" href={"./#/operation/customerManage/"+params.customerId+"/order/"+this.props.params.orderId+"/agreement/admit/create"}>承租意向书</a>
					}
				</Col>
				<Col md={4} align="center">
				  {
					contractStatusCount.enterTotoal>0 ?<span className="createButton disabled">入驻协议书</span>:<a className="createButton" href={"./#/operation/customerManage/"+this.props.params.customerId+"/order/"+this.props.params.orderId+"/agreement/join/create"}>入驻协议书</a>
				  }
				</Col>
				<Col md={4} align="center">
				{contractStatusCount.enterTotoal>0 && contractStatusCount.enterFlag?<a  className="createButton" href={"./#/operation/customerManage/"+this.props.params.customerId+"/order/"+this.props.params.orderId+"/agreement/increase/create"}>增租协议书</a>:<span className="createButton disabled">增租协议书</span>}

				</Col>
				</Row>

				<Row style={{marginTop:10}}>
				<Col md={4} align="center" >
				  	{contractStatusCount.enterTotoal>0 && contractStatusCount.enterFlag ?<a className="createButton" href={"./#/operation/customerManage/"+this.props.params.customerId+"/order/"+this.props.params.orderId+"/agreement/renew/create"}>续租协议书</a>:<span className="createButton disabled">续租协议书</span>}

				</Col>
				<Col md={4} align="center">
					{contractStatusCount.enterTotoal>0 && contractStatusCount.enterFlag ?<a className="createButton" href={"./#/operation/customerManage/"+this.props.params.customerId+"/order/"+this.props.params.orderId+"/agreement/reduce/create"} >减租协议书</a>:<span className="createButton disabled">减租协议书</span>}

				</Col>
				<Col md={4} align="center">
					{contractStatusCount.enterTotoal>0 && contractStatusCount.enterFlag?<a  className="createButton" href={"./#/operation/customerManage/"+this.props.params.customerId+"/order/"+this.props.params.orderId+"/agreement/exit/create"} >退租协议书</a>:<span className="createButton disabled">退租协议书</span>}

				</Col>
				</Row>

				</Grid>



		)
	}

}
export default class OrderDetail extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.openCreateAgreementDialog = this.openCreateAgreementDialog.bind(this);
		this.getAgrementDetailUrl = this.getAgrementDetailUrl.bind(this);
		this.getAgrementEditUrl = this.getAgrementEditUrl.bind(this);
		this.renderTableItem = this.renderTableItem.bind(this);
		this.getAgrementType = this.getAgrementType.bind(this);


		this.confirmDelAgreement = this.confirmDelAgreement.bind(this);
		this.openDelAgreementDialog = this.openDelAgreementDialog.bind(this);


		this.state = {
			open: false,
			loading: true,
			delAgreementId:0,
			openCreateAgreement: false,
			openDelAgreement:false,
			response: {
				orderBaseInfo: {},
				installment: {},
				earnest: {},
				contractList: [],
				antecedent: []
			}
		}

	}

	openDelAgreementDialog(){
		this.setState({
			 	openDelAgreement:!this.state.openDelAgreement
		});
	}

	setDelAgreementId(delAgreementId){
		this.setState({
				delAgreementId,
		},function(){
					this.openDelAgreementDialog();
		});

	}

	confirmDelAgreement(){

		this.openDelAgreementDialog(0);

		let {delAgreementId} = this.state;
		Store.dispatch(Actions.callAPI('delete-enter-contract', {
			contractId:delAgreementId
		})).then(function(response) {
			Notify.show([{
				message: '删除成功!',
				type: 'success',
			}]);
			window.setTimeout(function(){
				window.location.reload();
			},100)
		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});


	}

	componentDidMount() {
		const closeAll = this.props.location.query.closeAll;
		if (closeAll) {
			Store.dispatch(Actions.switchSidebarNav(false));
			Store.dispatch(Actions.switchHeaderNav(false));
		}

		var _this = this;

		Store.dispatch(Actions.callAPI('get-order-detail', {
			mainBillId: this.props.params.orderId
		})).then(function(response) {
			_this.setState({
				response: response
			});


			setTimeout(function() {
				_this.setState({
					loading: false
				});
			}, 0);

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);

		});
		Store.dispatch(Actions.switchSidebarNav(false));

	}

	openCreateAgreementDialog() {

		const {
			contractStatusCount
		} = this.state.response;

		if (contractStatusCount.quitRentTotoal) {
			Notify.show([{
				message: '您已经签约了退租合同！',
				type: 'danger',
			}]);

			return;
		}


		this.setState({
			openCreateAgreement: !this.state.openCreateAgreement
		});
	}

	getAgrementEditUrl(customerId, orderId, typeId, agreementId) {

		var typeArray = [{
			label: 'INTENTION',
			value: 'admit'
		}, {
			label: 'ENTER',
			value: 'join'
		}, {
			label: 'RENEW',
			value: 'renew'
		}, {
			label: 'LESSRENT',
			value: 'reduce'
		}, {
			label: 'QUITRENT',
			value: 'exit'
		}, {
			label: 'ADDRENT',
			value: 'increase'
		}, ];
		var typeValue = '';
		typeArray.map((value) => {
			if (typeId === value.label) {
				typeValue = value.value;
			}
		});
		return './#/operation/customerManage/' + customerId + '/order/' + orderId + '/agreement/' + typeValue + '/' + agreementId + '/edit';
	}
	getAgrementDetailUrl(customerId, orderId, typeId, agreementId) {
		var typeArray = [{
			label: 'INTENTION',
			value: 'admit'
		}, {
			label: 'ENTER',
			value: 'join'
		}, {
			label: 'RENEW',
			value: 'renew'
		}, {
			label: 'LESSRENT',
			value: 'reduce'
		}, {
			label: 'QUITRENT',
			value: 'exit'
		}, {
			label: 'ADDRENT',
			value: 'increase'
		}, ];
		var typeValue = '';
		typeArray.map((value) => {
			if (typeId === value.label) {
				typeValue = value.value;
			}
		});
		return './#/operation/customerManage/' + customerId + '/order/' + orderId + '/agreement/' + typeValue + '/' + agreementId + '/detail';
	}

	getAgrementType(type) {
		var typeList = [{
			name: 'INTENTION',
			value: '意向书'
		}, {
			name: 'ENTER',
			value: '入驻协议'
		}, {
			name: 'ADDRENT',
			value: '增租协议'
		}, {
			name: 'LESSRENT',
			value: '减租协议'
		}, {
			name: 'QUITRENT',
			value: '退租协议'
		}, {
			name: 'RENEW',
			value: '续租协议'
		}];
		let name = ''
		typeList.map(function(value) {
			if (value.name === type) {
				name = value.value;
			}
		});
		return (
			<TableRowColumn>{name}</TableRowColumn>
		)
	}

	delArgument(id){


	}

	renderTableItem(item) {
		var _this = this;
		if (item) {

			return (
				<Row>
				<Col md={3} align="left" className="ContractName"><Circle type={item.payStatus}></Circle>款项：{item.installmentName}</Col>
				<Col md={3} align="left" className="ContractName">计划付款日期：<KrDate value={item.installmentReminddate}/></Col>
				<Col md={3} align="left" className="ContractName">计划付款金额：{item.installmentAmount}</Col>
				{item.installmentBackamount > 0?<Col md={3} align="left"className="ContractName">实际付款金额：{item.installmentBackamount}</Col>:<Col md={3} align="left"  className="ContractName">实际付款金额：<span style={{color:'red'}}>{item.installmentBackamount}</span></Col>}
				</Row>
			)
		}

		return null;


	}

	render() {

		const {
			orderBaseInfo,
			earnest,
			contractList,
			installmentPlan,
			contractStatusCount
		} = this.state.response;

		if (this.state.loading) {
			return (<Loading/>);
		}


		return (
			<div>

			<BreadCrumbs children={['系统运营','财务管理']} hide={!!this.props.location.query.closeAll}/>

			<Section title="客户订单详情" description="" hide={!!this.props.location.query.closeAll} bodyPadding={'20px 20px 50px 20px'}>
			<div className="content">
			<Button label="新建合同"  onTouchTap={this.openCreateAgreementDialog} style={{width:80,marginTop:15}}/>

			<span className='border-top'></span>
			<Grid style={{marginTop:50,width:800,marginLeft:'auto',marginRight:'auto'}}>
			<span className='ui-remark'>注：如（0-1），1表示该类型合同总数，0表示执行完该类型合同数</span>
			<ul className='ui-adminBook'>
              <li><span className={(contractStatusCount.intentionTotoal&&contractStatusCount.intentionComplete)!=0?'ui-circle':'ui-circle-dot'}></span></li>
              <li><span className={(contractStatusCount.enterTotoal&&contractStatusCount.enterComplete)!=0?'ui-circle':'ui-circle-dot'}></span></li>
              <li><span className={(contractStatusCount.addRentTotoal&&contractStatusCount.addRentComplete)!=0?'ui-circle':'ui-circle-dot'}></span></li>
              <li><span className={(contractStatusCount.renewComplete&&contractStatusCount.renewComplete)!=0?'ui-circle':'ui-circle-dot'}></span></li>
              <li><span className={(contractStatusCount.lessRentComplete&&contractStatusCount.lessRentComplete)!=0?'ui-circle':'ui-circle-dot'}></span></li>
              <li><span className={(contractStatusCount.quitRentTotoal&&contractStatusCount.quitRentComplete)!=0?'ui-circle':'ui-circle-dot'}></span></li>
			</ul>
			<Row style={{marginLeft:40}}>
				<Col md={2} align="center" className="adminTitle"><span className="adminName">承租意向书({contractStatusCount.intentionComplete}-{contractStatusCount.intentionTotoal})</span> </Col>
				<Col md={2} align="center" className="adminTitle"> <span className="adminName">入驻协议书({contractStatusCount.enterComplete}-{contractStatusCount.enterTotoal})</span> </Col>
				<Col md={2} align="center" className="adminTitle"><span className="adminName" > 增租协议书({contractStatusCount.addRentComplete}-{contractStatusCount.addRentTotoal})</span> </Col>
				<Col md={2} align="center" className="adminTitle"><span className="adminName"> 续租协议书({contractStatusCount.renewComplete}-{contractStatusCount.renewTotoal})</span> </Col>
				<Col md={2} align="center" className="adminTitle"><span className="adminName">  减租协议书({contractStatusCount.lessRentComplete}-{contractStatusCount.lessRentTotoal})</span>  </Col>
				<Col md={2} align="center" className="adminTitle"> <span className="adminName"> 退租协议书({contractStatusCount.quitRentComplete}-{contractStatusCount.quitRentTotoal}) </span> </Col>
			</Row>
		</Grid>

            <DotTitle title='订单描述'/>

			<Grid style={{marginTop:50}}>
				<Row>
				<Col md={4} ><KrField label="社区名称：" component="labelText" value={orderBaseInfo.communityName} defaultValue="无" alignRight={true} tooltip={orderBaseInfo.communityName}/></Col>
				<Col md={4} ><KrField label="客户名称：" component="labelText" value={orderBaseInfo.customerName} alignRight={true} tooltip={orderBaseInfo.customerName}/></Col>
				<Col md={4} ><KrField label="订单名称：" component="labelText"  value={orderBaseInfo.mainbillname} tooltip={orderBaseInfo.mainbillname} alignRight={true}/>
				</Col>

				</Row>

				<Row>
				<Col md={4} ><KrField label="当前工位数：" component="labelText" value={orderBaseInfo.stationnum} defaultValue="0" alignRight={true}/></Col>
				<Col md={4} ><KrField label="订单编号："  component="labelText" value={orderBaseInfo.mainbillcode} defaultValue="无" alignRight={true}/></Col>
				<Col md={4} ><KrField label="起始日期：" component="labelText" value={orderBaseInfo.contractEntrydate} type="date" defaultValue="无" alignRight={true}/></Col>
				</Row>
				<Row>
				<Col md={4} ><KrField label="结束日期：" component="labelText" value={orderBaseInfo.contractLeavedate} type="date" defaultValue="无" alignRight={true}/></Col>
				<Col md={4} ><KrField label="撤场日期：" component="labelText" value={orderBaseInfo.actualLeavedate} type="date" defaultValue="无" alignRight={true}/></Col>
				<Col md={4} ><KrField label="订单总额：" component="labelText" value={orderBaseInfo.contractTotalamount} defaultValue="0" alignRight={true}/></Col>
				</Row>

				<Row>
				<Col md={4} ><KrField label="回款总额：" component="labelText" value={orderBaseInfo.contractBackamount} defaultValue="0" alignRight={true}/></Col>
				<Col md={4} ><KrField label="未回款额：" component="labelText" value={orderBaseInfo.unBackamount} defaultValue="0" alignRight={true}/></Col>
				<Col md={4} ><KrField label="工位回款：" component="labelText" value={orderBaseInfo.paidrent} defaultValue="0" alignRight={true}/></Col>
				</Row>
			<Row>
				<Col md={4} ><KrField label="实收押金：" component="labelText" value={orderBaseInfo.realdeposit} defaultValue="0" alignRight={true}/></Col>
				<Col md={4} ><KrField label="实收定金：" component="labelText" value={orderBaseInfo.realdownpayment} defaultValue="0" alignRight={true}/></Col>
				<Col md={4} ><KrField label="其他回款：" component="labelText" value={orderBaseInfo.refundamount} defaultValue="0" alignRight={true}/></Col>
				</Row>

				<Row>
				<Col md={4} ><KrField label="营业外收入回款：" component="labelText" value={orderBaseInfo.nonbusinessincomeBackamount} width={150} defaultValue="0" alignRight={true}/></Col>
				<Col md={4} ><KrField label="生活消费收入回款：" component="labelText" value={orderBaseInfo.liveincomeBackamount} width={160} defaultValue="0" alignRight={true}/></Col>
				<Col md={4} ><KrField label="工位收入：" component="labelText" value={orderBaseInfo.accruedrent} defaultValue="0" alignRight={true}/></Col>
				</Row>

				<Row>

				<Col md={4} ><KrField label="其他收入：" component="labelText" value={orderBaseInfo.otherincome} defaultValue="0" alignRight={true}/></Col>
				<Col md={4} ><KrField label="营业外收入：" component="labelText" value={orderBaseInfo.nonbusinessincome} defaultValue="0" alignRight={true}/></Col>
				<Col md={4} ><KrField label="生活消费收入：" component="labelText" value={orderBaseInfo.liveincome} width={120} defaultValue="0" alignRight={true}/></Col>
				</Row>
				<Row>
				<Col md={4} ><KrField label="订单描述：" component="labelText" value={orderBaseInfo.mainbilldesc} defaultValue="无" alignRight={true}/></Col>
				</Row>


			</Grid>

            <DotTitle title='合同列表'/>

			<Table pageSize={contractList.length} displayCheckbox={false}>
			<TableHeader>
			<TableHeaderColumn>合同编号</TableHeaderColumn>
			<TableHeaderColumn>合同类型</TableHeaderColumn>
			<TableHeaderColumn>合同总额</TableHeaderColumn>
			<TableHeaderColumn>合同开始时间</TableHeaderColumn>
			<TableHeaderColumn>合同结束日期</TableHeaderColumn>
			<TableHeaderColumn>操作</TableHeaderColumn>
			</TableHeader>
			<TableBody>

			{contractList.map((item,index)=>{
				return (
					<TableRow key={index}>
					<TableRowColumn>{item.contractcode || '无'}</TableRowColumn>
					{this.getAgrementType(item.contracttype)}

					<TableRowColumn>{item.contractTotalamount}</TableRowColumn>
					<TableRowColumn><KrDate value={item.leaseBegindate}/></TableRowColumn>
					<TableRowColumn> <KrDate value={item.leaseEnddate}/></TableRowColumn>
					<TableRowColumn>
					<Button  type="link" label="查看" href={this.getAgrementDetailUrl(item.customerid,this.props.params.orderId,item.contracttype,item.id)} />
							{item.contractstate != 'EXECUTE' && item.editFlag && <Button  type="link" label="编辑" href={this.getAgrementEditUrl(item.customerid,this.props.params.orderId,item.contracttype,item.id)} disabled={item.contractstate == 'EXECUTE'}/> }

				{item.contracttype == 'ENTER' && item.contractstate != 'EXECUTE' && item.editFlag  && <Button  type="link" label="删除"  href="javascript:void(0)" onTouchTap={this.setDelAgreementId.bind(this,item.id)} disabled={item.contractstate == 'EXECUTE'}/> }
						{/*
							{item.contractstate != 'EXECUTE' && item.editFlag  && <Button  type="link" label="删除" onTouchTap={this.delArgument.bind(this,item.id)} disabled={item.contractstate == 'EXECUTE'}/> }

							*/}


					</TableRowColumn>
					</TableRow>
				);
			})}

			</TableBody>
			</Table>

            <DotTitle title='分期计划'/>

			<div className='ui-remark'>
              <div className='ui-circle-remark'><span className='circle-color circle-color-top over-circle'></span><span className='remark-green-text'>已完成</span></div>
              <div className='ui-circle-remark'><span className='circle-color circle-color-top section-circle'></span><span className='remark-green-text'>付部分款</span></div>
              <div className='ui-circle-remark'><span className='circle-color circle-color-top no-pay'></span><span className='remark-green-text'>未付款</span></div>
			</div>

			{installmentPlan.map((item,index)=>{
				return (
					<Grid key={index}>
					<Row>
					<Col md={12} align="left" className="ContractNameTitle">{item.detailName}</Col>
					</Row>
					{this.renderTableItem(item.antecedent)}
					{this.renderTableItem(item.earnest)}
					{item.installment && item.installment.map((list,index)=>{
							return (
								<Row key={index} >
								<Col md={3} align="left" className="ContractName"><Circle type={list.payStatus}/>款项：{list.installmentName}</Col>
								<Col md={3} align="left" className="ContractName">计划付款日期：<KrDate value={list.installmentReminddate}/></Col>
								<Col md={3} align="left" className="ContractName">计划付款金额：{list.installmentAmount}</Col>
								{list.installmentBackamount>0?<Col md={3} align="left" className="ContractName">实际付款金额：<span>{list.installmentBackamount}</span></Col>:<Col md={3} align="left" className="ContractName">实际付款金额：<span style={{color:'red'}}>{list.installmentBackamount}</span></Col>}
								</Row>
							)
						})
					}

					</Grid>
				);
			})}
			<span className="border-bottom"></span>



          	</div>
			</Section>


			<Dialog
			title="新建合同"
			modal={true}
			onClose={this.openCreateAgreementDialog}
			open={this.state.openCreateAgreement}
			contentStyle={{width:687}}>
				<NewCreatForm contractStatusCount={contractStatusCount} params={this.props.params}/>
			</Dialog>


			<Dialog
			title="删除合同"
			modal={true}
			onClose={this.openDelAgreementDialog}
			open={this.state.openDelAgreement}
			contentStyle={{width:387}}>
				<DelAgreementNotify onSubmit={this.confirmDelAgreement} onCancel={this.openDelAgreementDialog.bind(this,0)}/>
			</Dialog>
			</div>

		);
	}
}
