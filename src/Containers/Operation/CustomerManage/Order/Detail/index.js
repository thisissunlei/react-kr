import React, {Component, PropTypes} from 'react';
import { connect } from 'kr/Redux';


import {reduxForm } from 'redux-form';
import Section from 'kr-ui/Section';

import {
	KrField,
	KrDate,
	Button,
	DotTitle
} from 'kr-ui';


import {Grid,Row,Col} from 'kr-ui/Grid';

import {Dialog,Snackbar} from 'material-ui';

import {
	BreadCrumbs,
	Loading,
	Notify
} from 'kr-ui';

import Circle from './circle';
import  './active.less';

import {
	Menu,
	MenuItem,
	Divider,
	FontIcon,
	DatePicker,
	Paper,
} from 'material-ui';


import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,TableFooter} from 'kr-ui/Table';


import {List, ListItem} from 'material-ui/List';


import {Actions,Store} from 'kr/Redux';

export default class OrderDetail extends React.Component {

	constructor(props,context){
		super(props, context);

		this.openCreateAgreementDialog = this.openCreateAgreementDialog.bind(this);
		this.getAgrementDetailUrl = this.getAgrementDetailUrl.bind(this);
		this.getAgrementEditUrl = this.getAgrementEditUrl.bind(this);
		this.renderTableItem = this.renderTableItem.bind(this);
		this.getAgrementType = this.getAgrementType.bind(this);

		this.state = {
			open:false,
			loading:true,
			openCreateAgreement:false,
			response:{
				orderBaseInfo:{},
				installment:{},
				earnest:{},
				contractList:[],
				antecedent:[]
			}
		}

	}

	componentDidMount(){
		console.log('000000');

		const closeAll = this.props.location.query.closeAll;

		if(closeAll){
			Store.dispatch(Actions.switchSidebarNav(false));
			Store.dispatch(Actions.switchHeaderNav(false));
		}

		var _this = this;

		Store.dispatch(Actions.callAPI('get-order-detail',{mainBillId:this.props.params.orderId})).then(function(response){
			_this.setState({
				response:response
			});
            

			setTimeout(function(){
				_this.setState({
					loading:false
				});
			},1000);

		}).catch(function(err){
			console.log('---err',err);
			Notify.show([{
				message:'报错了',
				type: 'danger',
			}]);

		});

	}

	openCreateAgreementDialog(){
		this.setState({
			openCreateAgreement:!this.state.openCreateAgreement
		});
	}

	getAgrementEditUrl(customerId,orderId,typeId,agreementId){

		var typeArray = [
			{label:'INTENTION',value:'admit'},
			{label:'ENTER',value:'join'},
			{label:'RENEW',value:'renew'},
			{label:'LESSRENT',value:'reduce'},
			{label:'QUITRENT',value:'exit'},
			{label:'ADDRENT',value:'increase'},
		];
		var typeValue = '';
		typeArray.map((value)=>{
			if(typeId === value.label){
				typeValue = value.value;
			}
		});
		return './#/operation/customerManage/'+customerId+'/order/'+orderId+'/agreement/'+typeValue+'/'+agreementId+'/edit';
	}
	getAgrementDetailUrl(customerId,orderId,typeId,agreementId){
		var typeArray = [
			{label:'INTENTION',value:'admit'},
			{label:'ENTER',value:'join'},
			{label:'RENEW',value:'renew'},
			{label:'LESSRENT',value:'reduce'},
			{label:'QUITRENT',value:'exit'},
			{label:'ADDRENT',value:'increase'},
		];
		var typeValue = '';
		typeArray.map((value)=>{
			if(typeId === value.label){
				typeValue = value.value;
			}
		});
		return './#/operation/customerManage/'+customerId+'/order/'+orderId+'/agreement/'+typeValue+'/'+agreementId+'/detail';
	}

	getAgrementType(type){
		var typeList = [
			{name:'INTENTION',value:'意向书'},
			{name:'ENTER',value:'入住协议'},
			{name:'ADDRENT',value:'增租协议'},
			{name:'LESSRENT',value:'减租协议'},
			{name:'QUITRENT',value:'退租协议'},
			{name:'RENEW',value:'续租协议'}
		];
		let name = ''
		typeList.map(function(value){
			if(value.name === type){
				name = value.value;
			}
		});
		return(
			<TableRowColumn>{name}</TableRowColumn>
		)
	}

	renderTableItem(item){
		if(item){
			return (
				<Row>
				<Col md={3} align="left" className="ContractName"><Circle type={item.payStatus}></Circle>款项：{item.installmentName}</Col>
				<Col md={3} align="left" className="ContractName">计划付款日期：<KrDate.Format value={item.installmentReminddate}/></Col>
				<Col md={3} align="left" className="ContractName">计划付款金额：{item.installmentAmount}</Col>
				<Col md={3} align="left" className="ContractName">实际付款金额：{item.installmentBackamount}</Col>
				</Row>
			)
		}

		return null;


	}

	render() {

		const {orderBaseInfo,earnest,contractList,installmentPlan,contractStatusCount} = this.state.response;
		if(this.state.loading){
			return(<Loading/>);
		}
       
        
       
		return (
       <div>

			<BreadCrumbs children={['系统运营','财务管理']} hide={!!this.props.location.query.closeAll}/>

			<Section title="客户订单详情" description="" hide={!!this.props.location.query.closeAll}> 

			<Button label="新建合同"  onTouchTap={this.openCreateAgreementDialog}  primary={true}/>


			<Grid style={{marginTop:50}}>
			<span className='ui-remark'>注：如（0-1），1表示该类型合同总数，0表示执行完该类型合同数</span>
			<ul className='ui-adminBook'>
              <li><span className={contractStatusCount.intentionTotoal!=0?'ui-circle':'ui-circle-dot'}></span></li>
              <li><span className={contractStatusCount.enterTotoal!=0?'ui-circle':'ui-circle-dot'}></span></li>
              <li><span className={contractStatusCount.addRentTotoal!=0?'ui-circle':'ui-circle-dot'}></span></li>
              <li><span className={contractStatusCount.renewComplete!=0?'ui-circle':'ui-circle-dot'}></span></li>
              <li><span className={contractStatusCount.lessRentComplete!=0?'ui-circle':'ui-circle-dot'}></span></li>
              <li><span className={contractStatusCount.quitRentTotoal!=0?'ui-circle':'ui-circle-dot'}></span></li>
			</ul>
			<Row>
				<Col md={2} align="center">承租意向书({contractStatusCount.intentionComplete}-{contractStatusCount.intentionTotoal}) </Col>
				<Col md={2} align="center"> 入驻协议书({contractStatusCount.enterComplete}-{contractStatusCount.enterTotoal}) </Col>
				<Col md={2} align="center"> 增租协议书({contractStatusCount.addRentComplete}-{contractStatusCount.addRentTotoal}) </Col>
				<Col md={2} align="center"> 续租协议书({contractStatusCount.renewComplete}-{contractStatusCount.renewComplete}) </Col>
				<Col md={2} align="center"> 减租协议书({contractStatusCount.lessRentComplete}-{contractStatusCount.lessRentComplete}) </Col>
				<Col md={2} align="center"> 退租协议书({contractStatusCount.quitRentComplete}-{contractStatusCount.quitRentTotoal}) </Col>
			</Row>
		</Grid>

            <DotTitle title='订单描述'/>

			<Grid style={{marginTop:50}}>
				<Row>
				<Col md={4} ><KrField label="社区名称：" component="labelText" value={orderBaseInfo.communityName} defaultValue="无" alignRight={true}/></Col>
				<Col md={4} ><KrField label="客户名称：" component="labelText" value={orderBaseInfo.customerName} alignRight={true}/></Col>
				<Col md={4} ><KrField label="订单名称：" component="labelText" value={orderBaseInfo.mainbillname} alignRight={true}/></Col>
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
				<Col md={4} ><KrField label="工位回款：" component="labelText" value={orderBaseInfo.accruedrent} defaultValue="0" alignRight={true}/></Col>
				</Row>
			<Row>
				<Col md={4} ><KrField label="实收押金：" component="labelText" value={orderBaseInfo.realdeposit} defaultValue="0" alignRight={true}/></Col>
				<Col md={4} ><KrField label="实收定金：" component="labelText" value={orderBaseInfo.realdownpayment} defaultValue="0" alignRight={true}/></Col>
				<Col md={4} ><KrField label="其他回款：" component="labelText" value={orderBaseInfo.refundamount} defaultValue="0" alignRight={true}/></Col>		
				</Row>

				<Row>
				<Col md={4} ><KrField label="营业外收入汇款：" component="labelText" value={orderBaseInfo.nonbusinessincomeBackamount} width={150} defaultValue="0" alignRight={true}/></Col>
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
					<TableRowColumn><KrDate.Format value={item.leaseBegindate}/></TableRowColumn>
					<TableRowColumn> <KrDate.Format value={item.leaseEnddate}/></TableRowColumn>
					<TableRowColumn>
					<Button  type="link" label="查看" href={this.getAgrementDetailUrl(item.customerid,this.props.params.orderId,item.contracttype,item.id)}/>
					{item.contractstate != 'EXECUTE'  && <Button  type="link" label="编辑" href={this.getAgrementEditUrl(item.customerid,this.props.params.orderId,item.contracttype,item.id)} disabled={item.contractstate == 'EXECUTE'}/> }
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
								<Col md={3} align="left" className="ContractName">计划付款日期：<KrDate.Format value={list.installmentReminddate}/></Col>
								<Col md={3} align="left" className="ContractName">计划付款金额：{list.installmentAmount}</Col>
								<Col md={3} align="left" className="ContractName">实际付款金额：{list.installmentBackamount}</Col>
								</Row>
							)
						})
					}

					</Grid>
				);
			})}

			


          
			</Section>


			<Dialog
			title="新建合同"
			modal={true}
			actions={ <Button label="取消" primary={true} onTouchTap={this.openCreateAgreementDialog} /> }
			open={this.state.openCreateAgreement}>


			<Grid>
			<Row>
			<Col md={4} align="center"><Button label="承租意向书" type="link" href={"./#/operation/customerManage/"+this.props.params.customerId+"/order/"+this.props.params.orderId+"/agreement/admit/create"}/></Col>
			<Col md={4} align="center"><Button label="入驻协议书" type="link" href={"./#/operation/customerManage/"+this.props.params.customerId+"/order/"+this.props.params.orderId+"/agreement/join/create"}/></Col>
			<Col md={4} align="center"><Button label="增租协议书" type="link" href={"./#/operation/customerManage/"+this.props.params.customerId+"/order/"+this.props.params.orderId+"/agreement/increase/create"}/></Col>
			</Row>

			<Row style={{marginTop:10}}>
			<Col md={4} align="center" ><Button label="续租协议书" type="link" href={"./#/operation/customerManage/"+this.props.params.customerId+"/order/"+this.props.params.orderId+"/agreement/renew/create"}/></Col>
			<Col md={4} align="center"><Button label="减租协议书" type="link" href={"./#/operation/customerManage/"+this.props.params.customerId+"/order/"+this.props.params.orderId+"/agreement/reduce/create"}/></Col>
			<Col md={4} align="center"><Button label="退租协议书" type="link" href={"./#/operation/customerManage/"+this.props.params.customerId+"/order/"+this.props.params.orderId+"/agreement/exit/create"}/></Col>
			</Row>

			</Grid>


			</Dialog>


			</div>
			
		);
	}
}



