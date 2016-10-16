import React, {Component, PropTypes} from 'react';

import {Actions,Store} from 'kr/Redux';

import {
	Table, 
	TableBody, 
	TableHeader, 
	TableHeaderColumn, 
	TableRow, 
	TableRowColumn,
	TableFooter,
	Section,
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
} from 'kr-ui';


export default class ConfirmFormDetail  extends Component{


	static PropTypes = {
		detail:React.PropTypes.object,
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}

	constructor(props,context){
		super(props, context);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel  = this.onCancel.bind(this);
		
	}

	onSubmit(form){

		const {onSubmit} = this.props;
		onSubmit && onSubmit(form);
	}

	onCancel(){

		const {onCancel} = this.props;
		onCancel && onCancel();
	}

	render(){

		let {detail} = this.props;


	  return (

		  <div>
								<KrField grid={1/2} component="labelText" label="出租方" value={detail.leasorName}/>

								 <KrField grid={1/2}  component="labelText" label="地址" value={detail.lessorAddress}/> 

								 <KrField grid={1/2}   component="labelText" label="联系人" value={detail.lessorContactName}/> 
								 <KrField grid={1/2}   component="labelText" label="电话"  value={detail.lessorContacttel}/> 

								 <KrField grid={1/2}  component="labelText" label="承租方" value={detail.customerName}/> 
								 <KrField grid={1/2}    component="labelText" label="地址" value={detail.leaseAddress}/> 

								 <KrField grid={1/2}    component="labelText" label="联系人" value={detail.leaseContact}/> 
								 <KrField grid={1/2}    component="labelText" label="电话" value={detail.leaseContacttel}/> 

								 <KrField grid={1}      component="labelText" label="所属社区" value={detail.communityName} /> 

								

								 <KrField grid={1/2}    component="labelText" label="地址"  value={detail.communityAddress}/> 
								 <KrField grid={1/2}    component="labelText" label="合同编号"  value={detail.contractcode}/> 

								
                                <KrField   grid={1/2} component="labelText" label="支付方式" value={detail.payType}/>
								<KrField   grid={1/2} component="labelText" label="付款方式" value={detail.payment}/> 
								

								 

                             <KrField  component="labelText" label="首付款时间" grid={1/2}  value={detail.firstpaydate}/> 
							 <KrField grid={1/2}   component="labelText" label="签署时间" value={detail.signdate}/> 

							
							

							 <KrField grid={1}   component="labelText" label="租赁用途" value={detail.rentaluse}/> 

							 <KrField grid={1/2}   component="labelText"  label="租金总额" placeholder="" value={detail.totaldeposit}/> 
							 <KrField grid={1/2}    component="labelText" label="押金总额" value={detail.leasorName}/>


							 <KrField grid={1}   component="labelText" label="备注" value={detail.contractmark}/> 
							 <KrField grid={1}   component="labelText" label="上传附件" value={detail.contractFileList}/> 


					<Section title="租赁明细" description=""> 

							<Table  displayCheckbox={false}>
									<TableHeader>
											<TableHeaderColumn>类别</TableHeaderColumn>
											<TableHeaderColumn>编号／名称</TableHeaderColumn>
											<TableHeaderColumn>单价(元/月)</TableHeaderColumn>
											<TableHeaderColumn>租赁开始时间</TableHeaderColumn>
											<TableHeaderColumn>租赁结束时间</TableHeaderColumn>
									</TableHeader>
									<TableBody>
													{/*
													
										{detail.billList.map((item,index)=>{
											return (
												<TableRow key={index}>
													<TableRowColumn>{item.stationType}</TableRowColumn>
													<TableRowColumn>{item.stationId}</TableRowColumn>
													<TableRowColumn>{item.unitprice}</TableRowColumn>
													<TableRowColumn>{item.leaseBeginDate}</TableRowColumn>
													<TableRowColumn>{item.leaseEndDate}</TableRowColumn>
												</TableRow>
											);
										})}
													*/}
								   </TableBody>
							 </Table>

				</Section>

				<Grid>
					<Row style={{marginTop:30}}>
						<Col md={2} align="right"> <Button  label="确定" type="button" primary={true} onTouchTap={this.onSubmit} /> </Col>
					  <Col md={2} align="right"> <Button  label="取消" type="button"  onTouchTap={this.onCancel}/> </Col> </Row>
				</Grid>
		 </div>);
	}
}

