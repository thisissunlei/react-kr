import React, {Component, PropTypes} from 'react';
import { connect } from 'kr/Redux';


import {reduxForm } from 'redux-form';
import Section from 'kr-ui/Section';
import {LabelText} from 'kr-ui/Form';


import {Grid,Row,Col} from 'kr-ui/Grid';

import {Dialog,Snackbar} from 'material-ui';

import { Button } from 'kr-ui/Button';
import Date from 'kr-ui/Date';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

import {
	BreadCrumbs,
	Loading,
	Notify
} from 'kr-ui';
import Circle from './circle';


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


class OrderDetail extends Component {

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

		var {actions} = this.props;

		const closeAll = this.props.location.query.closeAll;

		if(closeAll){
			actions.switchSidebarNav(false);
			actions.switchHeaderNav(false);
		}

		var _this = this;

		actions.callAPI('get-order-detail',{
			mainBillId:this.props.params.orderId
		},{}).then(function(response){
			_this.setState({
				response:response
			});

			setTimeout(function(){
				_this.setState({
					loading:false
				});
			},1000);

		}).catch(function(err){
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
					<Col md={3} align="left" className="ContractName"><Circle type={item.payStatus}></Circle>款项：押金</Col>
					<Col md={3} align="left" className="ContractName">计划付款日期：<Date.Format value={item.installmentReminddate}/></Col>
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



<Stepper activeStep={1}>
		          <Step>
		            <StepLabel>承租意向书({contractStatusCount.intentionComplete}-{contractStatusCount.intentionTotoal})</StepLabel>
		          </Step>
		          <Step>
		            <StepLabel>入驻协议书({contractStatusCount.enterComplete}-{contractStatusCount.enterTotoal})</StepLabel>
		          </Step>
		          <Step>
		            <StepLabel>增租协议书({contractStatusCount.addRentComplete}-{contractStatusCount.addRentTotoal})</StepLabel>
		          </Step>
		          <Step>
		            <StepLabel>续租协议书({contractStatusCount.renewComplete}-{contractStatusCount.renewComplete})</StepLabel>
		          </Step>
		          <Step>
		            <StepLabel>减租协议书({contractStatusCount.lessRentComplete}-{contractStatusCount.lessRentComplete})</StepLabel>
		          </Step>
		          <Step>
		            <StepLabel>退租协议书({contractStatusCount.quitRentComplete}-{contractStatusCount.quitRentTotoal})</StepLabel>
		         </Step>

        </Stepper>

				
				<Grid style={{marginTop:30}}>

				
					<Row>
						<Col md={4} ><LabelText label="社区名称" text={orderBaseInfo.communityName}/></Col>
						<Col md={4} ><LabelText label="客户名称" text={orderBaseInfo.customerName}/></Col>
						<Col md={4} ><LabelText label="订单名称" text={orderBaseInfo.mainbillname}/></Col>
					</Row>

					<Row>
						<Col md={4} ><LabelText label="当前工位数" text={orderBaseInfo.stationnum}/></Col>
						<Col md={4} ><LabelText label="订单编号" text={orderBaseInfo.mainbillcode}/></Col>
						<Col md={4} ><LabelText label="起始日期" text={orderBaseInfo.contractEntrydate} type="date"/></Col>
					</Row>
					<Row>
						<Col md={4} ><LabelText label="结束日期" text={orderBaseInfo.contractLeavedate} type="date"/></Col>
						<Col md={4} ><LabelText label="撤场日期" text={orderBaseInfo.actualLeavedate} type="date"/></Col>
						<Col md={4} ><LabelText label="订单总额" text={orderBaseInfo.contractTotalamount} /></Col>
					</Row>

					<Row>
						<Col md={4} ><LabelText label="回款总额" text={orderBaseInfo.contractBackamount}/></Col>
						<Col md={4} ><LabelText label="未回款额" text={orderBaseInfo.unBackamount}/></Col>
						<Col md={4} ><LabelText label="工位回款" text={orderBaseInfo.accruedrent}/></Col>
					</Row>

					<Row>
						<Col md={4} ><LabelText label="实收押金" text={orderBaseInfo.realdeposit}/></Col>
						<Col md={4} ><LabelText label="应收定金" text={orderBaseInfo.realdownpayment}/></Col>
						<Col md={4} ><LabelText label="其他回款" text={orderBaseInfo.refundamount}/></Col>		
					</Row>

					<Row>
						<Col md={4} ><LabelText label="营业外收入汇款" text={orderBaseInfo.nonbusinessincomeBackamount} width={150}/></Col>
						<Col md={4} ><LabelText label="生活消费收入回款" text={orderBaseInfo.liveincomeBackamount} width={160}/></Col>
						<Col md={4} ><LabelText label="工位收入" text={orderBaseInfo.accruedrent}/></Col>
					</Row>

					<Row>

						<Col md={4} ><LabelText label="其他收入" text={orderBaseInfo.otherincome}/></Col>
						<Col md={4} ><LabelText label="营业外收入" text={orderBaseInfo.nonbusinessincome}/></Col>
						<Col md={4} ><LabelText label="生活消费收入" text={orderBaseInfo.liveincome} width={120}/></Col>
					</Row>
					<Row>						
						<Col md={4} ><LabelText label="订单描述" text={orderBaseInfo.mainbilldesc}/></Col>
					</Row>
				

				</Grid>

			       
            <Table>
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
							<TableRowColumn>{item.contractcode}</TableRowColumn>
								{this.getAgrementType(item.contracttype)}
							
							<TableRowColumn><Date.Format value={item.contractTotalamount}/></TableRowColumn>
							<TableRowColumn><Date.Format value={item.leaseBegindate}/></TableRowColumn>
							<TableRowColumn> <Date.Format value={item.leaseEnddate}/></TableRowColumn>
							<TableRowColumn>
								<Button  type="link" label="查看" href={this.getAgrementDetailUrl(item.customerid,this.props.params.orderId,item.contracttype,item.id)}/>
								<Button  type="link" label="编辑" href={this.getAgrementEditUrl(item.customerid,this.props.params.orderId,item.contracttype,item.id)}/>
							</TableRowColumn>
						   </TableRow>
							);
					})}
						
				   </TableBody>
			 </Table>

		 
<Section title="分期计划" description="" style={{marginTop:20}}> 

					 {installmentPlan.map((item,index)=>{
						return (
						   <Grid key={index}>
						   	<Row>
								<Col md={12} align="left" className="ContractName">{item.detailName}</Col>
							</Row>
							{this.renderTableItem(item.antecedent)}
							{this.renderTableItem(item.earnest)}
							{
							
								item.installment && item.installment.map((list,index)=>{
										return (
											<Row key={index} >
												<Col md={3} align="left" className="ContractName"><Circle type={list.payStatus}></Circle>款项：{list.installmentName}</Col>
												<Col md={3} align="left" className="ContractName">计划付款日期：<Date.Format value={list.installmentReminddate}/></Col>
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
		 
		

			</Section>

			<Dialog
				title="新建合同"
				modal={true}
				actions={ <Button label="取消" primary={true} onTouchTap={this.openCreateAgreementDialog} /> }
				open={this.state.openCreateAgreement}>


					<Grid>
							<Row>
								<Col md={4} align="center"><Button label="入驻协议书" type="link" href={"./#/operation/customerManage/"+this.props.params.customerId+"/order/"+this.props.params.orderId+"/agreement/join/create"}/></Col>
								<Col md={4} align="center"><Button label="承租意向书" type="link" href={"./#/operation/customerManage/"+this.props.params.customerId+"/order/"+this.props.params.orderId+"/agreement/admit/create"}/></Col>
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



function mapStateToProps(state){
	return  {
		items:state.notify.items
	};
}


export default connect(mapStateToProps)(OrderDetail);



