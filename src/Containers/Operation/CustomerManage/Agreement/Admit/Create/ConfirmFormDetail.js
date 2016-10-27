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
        		return leasorName = item.corporationName;
        	}
        });
        var payment;
        optionValues.paymentList.map((item)=>{
        	if(item.id = detail.paymentId){
        		return payment = item.dicName;
        	}
        })

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

								<KrField   grid={1/2} component="labelText" label="所在楼层" value={detail.wherefloor}/>

								 <KrField grid={1/2}   component="labelText" label="定金总额"  value={detail.totaldownpayment}/> 
								 <KrField grid={1/2}    component="labelText" label="签署日期"  value={detail.signdate}/> 



								
								<KrField name="paymodel"  grid={1/2} component="labelText" label="合同编号" value={detail.contractcode}/> 
								<KrField name="paytype"  grid={1/2} component="labelText" label="付款方式" value={payment}/>

							
							 <KrField name="" component="labelText" label=" 租赁项目"  /> 
							 <KrField grid={1}  name="stationnum"  component="labelText" label="工位" value={detail.stationnum}/> 
							 <KrField grid={1}  name="boardroomnum"  component="labelText" label="会议室" value={detail.boardroomnum}/> 

							  <KrField grid={1/1}  name="username" component="labelText" label="租赁期限" value={`${detail.leaseBegindate}--${detail.leaseEnddate}`}/> 
							 <KrField grid={1/2}  name="rentaluse"  component="labelText" label="保留天数" value={detail.templockday}/> 

							 
							 <KrField grid={1/2}  name="fileIdList" component="labelText" label="备注" value={detail.contractmark}/> 
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
												
												<TableRowColumn>{item.leaseBeginDate}</TableRowColumn>
													<TableRowColumn>{item.leaseEndDate}</TableRowColumn>
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

