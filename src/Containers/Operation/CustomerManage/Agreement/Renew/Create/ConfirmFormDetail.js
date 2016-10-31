import React, {Component, PropTypes} from 'react';

import {Actions,Store} from 'kr/Redux';
import dateFormat from 'dateformat';

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
	KrDate
} from 'kr-ui';


export default class ConfirmFormDetail  extends Component{


	static PropTypes = {
		detail:React.PropTypes.object,
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
		optionValues:React.PropTypes.object,

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

		let {detail, optionValues} = this.props;
        console.log("----------",detail, optionValues);
        var leasorName ;
        optionValues.fnaCorporationList.map((item)=>{
        	if(item.value === detail.leaseId){
        		return leasorName = item.corporationAddress;
        	}
        });
        var payment, payType;
        optionValues.paymentList.map((item)=>{
        	if(item.id === detail.paymodel){
        		return payment = item.dicName;
        	}
        });
         optionValues.payTypeList.map((item)=>{
        	if(item.id === detail.paytype){
        		return payType = item.dicName;
        	}
        })

        detail.firstpaydate=dateFormat(detail.firstpaydate,"yyyy-mm-dd ");
        detail.signdate=dateFormat(detail.signdate,"yyyy-mm-dd ");

	  return (

		  <div>
								<KrField grid={1/2} component="labelText" label="出租方" value={leasorName}/>

								 <KrField grid={1/2}  component="labelText" label="地址" value={detail.lessorAddress}/> 

								 <KrField grid={1/2}   component="labelText" label="联系人" value={detail.lessorContactName}/> 
								 <KrField grid={1/2}   component="labelText" label="电话"  value={detail.lessorContacttel}/> 

								 <KrField grid={1/2}  component="labelText" label="承租方" value={optionValues.customerName}/> 
								 <KrField grid={1/2}    component="labelText" label="地址" value={detail.leaseAddress}/> 

								 <KrField grid={1/2}    component="labelText" label="联系人" value={detail.leaseContact}/> 
								 <KrField grid={1/2}    component="labelText" label="电话" value={detail.leaseContacttel}/> 

								 <KrField grid={1}      component="labelText" label="所属社区" value={optionValues.communityName} /> 

								

								 <KrField grid={1/2}    component="labelText" label="地址"  value={optionValues.communityAddress}/> 
								 <KrField grid={1/2}    component="labelText" label="合同编号"  value={detail.contractcode}/> 

								
                                <KrField   grid={1/2} component="labelText" label="支付方式" value={payType}/>
								<KrField   grid={1/2} component="labelText" label="付款方式" value={payment}/> 
								

								 

                             <KrField  component="labelText" label="首付款时间" grid={1/2}  value={detail.firstpaydate}/> 
							 <KrField grid={1/2}   component="labelText" label="签署时间" value={detail.signdate}/> 

							
							

							 <KrField grid={1}   component="labelText" label="租赁用途" value={detail.rentaluse}/> 

							 <KrField grid={1/2}   component="labelText"  label="租金总额" placeholder="" value={detail.totaldeposit}/> 
							 <KrField grid={1/2}    component="labelText" label="押金总额" value={detail.totaldeposit}/>


							 <KrField grid={1}   component="labelText" label="备注" value={detail.contractmark}/> 
							 <KrField grid={1}   component="labelText" label="上传附件" value={detail.fileIdList}/> 


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
													
										{detail.list.map((item,index)=>{
											return (
												<TableRow key={index}>
													<TableRowColumn>{(item.stationType == 1) ?'工位':'会议室'}</TableRowColumn>
													<TableRowColumn>{item.stationName}</TableRowColumn>
													<TableRowColumn>{item.unitprice}</TableRowColumn>
													<TableRowColumn>
														<KrDate.Format value={item.leaseBeginDate} format="yyyy-mm-dd"/>
													</TableRowColumn>
													<TableRowColumn>
														<KrDate.Format value={item.leaseEndDate} format="yyyy-mm-dd"/>
													</TableRowColumn>
												</TableRow>
											);
										})}
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

