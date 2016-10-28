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

		detail = Object.assign({},detail);

        var leasorName ;
        optionValues.fnaCorporationList.map((item)=>{
        	if(item.value === detail.leaseId){
        		return leasorName = item.corporationAddress;
        	}
        });
        var payment;
        optionValues.paymentList.map((item)=>{
        	if(item.id = detail.paymentId){
        		return payment = item.dicName;
        	}
        })

	    detail.signdate=dateFormat(detail.signdate,"yyyy-mm-dd ");

	  return (

		  <div>
								<KrField  grid={1/2} component="labelText" label="出租方" value={leasorName}/>

								 <KrField grid={1/2}   component="labelText" label="地址" value={detail.lessorAddress}/> 

								 <KrField grid={1/2}  component="labelText" label="联系人" value={detail.lessorContactName}/> 
								 <KrField grid={1/2}   component="labelText" label="电话" value={detail.lessorContacttel}/> 

								 <KrField grid={1/2}   component="labelText" label="承租方" value={optionValues.customerName}/> 
								 <KrField grid={1/2}    component="labelText" label="地址" value={detail.leaseAddress}/> 

								 <KrField grid={1/2}   component="labelText" label="联系人" value={detail.leaseContact}/> 
								 <KrField grid={1/2}    component="labelText" label="电话" value={detail.leaseContacttel}/> 

								 <KrField grid={1/2}   component="labelText" label="所属社区" value={optionValues.communityName} /> 

								<KrField   grid={1/2} component="labelText" label="地址" value={optionValues.communityAddress}/>
								
								<KrField name="paymodel"  grid={1/2} component="labelText" label="合同编号" value={detail.contractcode}/> 
								 <KrField grid={1/2}    component="labelText" label="签署日期"  value={detail.signdate}/> 

								<KrField name="paytype"  grid={1/1} component="labelText" label="减租金额" value={detail.rentamount}/>
							 
							 <KrField grid={1/1}  name="fileIdList" component="labelText" label="备注" value={detail.contractmark}/> 
							 <KrField grid={1}  name="fileIdList" component="labelText" label="上传附件" value={detail.fileIdList}/> 


					<Section title="租赁明细" description=""> 

							<Table  displayCheckbox={false}>
									<TableHeader>
											<TableHeaderColumn>类别</TableHeaderColumn>
											<TableHeaderColumn>编号／名称</TableHeaderColumn>
											<TableHeaderColumn>租赁开始时间</TableHeaderColumn>
											<TableHeaderColumn>租赁结束时间</TableHeaderColumn>
									</TableHeader>
									<TableBody>
													
										{detail.list.map((item,index)=>{
											return (
												<TableRow key={index}>
													<TableRowColumn>{item.stationType}</TableRowColumn>
													<TableRowColumn>{item.stationId}</TableRowColumn>
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
						<Col md={2} align="right"> <Button  label="确定" type="button" primary={true}  onTouchTap={this.onSubmit}/> </Col>
					  <Col md={2} align="right"> <Button  label="取消" type="button"  onTouchTap={this.onCancel}/> </Col> </Row>
				</Grid>
		 </div>);
	}
}

