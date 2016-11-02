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
	KrDate,
	DotTitle
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

         detail.leaseBegindate=dateFormat(detail.leaseBegindate,"yyyy-mm-dd ");
	     detail.leaseEnddate=dateFormat(detail.leaseEnddate,"yyyy-mm-dd ");
	     detail.firstpaydate=dateFormat(detail.firstpaydate,"yyyy-mm-dd ");
	     detail.signdate=dateFormat(detail.signdate,"yyyy-mm-dd ");

	  return (

		  <div>
								<KrField name="lessorId"  grid={1/2} component="labelText" label="出租方" value={leasorName} />

								 <KrField grid={1/2}  name="lessorAddress"  component="labelText" label="地址" value={detail.lessorAddress}/> 

								 <KrField grid={1/2}  name="lessorContactid" component="labelText" label="联系人" value={detail.lessorContactName} /> 
								 <KrField grid={1/2}  name="lessorContacttel"  component="labelText" label="电话" value={detail.lessorContacttel}/> 

								 <KrField grid={1/2}  name="leaseId" component="labelText" label="承租方" value={optionValues.customerName}/> 
								 <KrField grid={1/2}  name="leaseAddress"  component="labelText" label="地址" value={detail.leaseAddress} /> 

								 <KrField grid={1/2}  name="leaseContact"  component="labelText" label="联系人" value={detail.leaseContact}/> 
								 <KrField grid={1/2}  name="leaseContacttel"  component="labelText" label="电话" value={detail.leaseContacttel}/> 

								 <KrField grid={1/2}  name="communityid" component="labelText" label="所属社区" value={optionValues.communityName} /> 
								 <KrField grid={1/2}  name=""  component="labelText" label="地址"  value={optionValues.communityAddress}/> 

								<KrField name="whereFloor"  grid={1/2} component="labelText" label="所在楼层" value={detail.wherefloor} defaultValue="无"/>

								 <KrField grid={1/2}  name="contractcode"  component="labelText" label="合同编号" value={detail.contractcode} defaultValue="无"/> 

								 <KrField grid={1}  name="username" component="labelText" label="租赁期限" value={`${detail.leaseBegindate}--${detail.leaseEnddate}`}/> 

								<KrField name="paymodel"  grid={1/2} component="labelText" label="付款方式" value={detail.paymodelName}/> 
								<KrField name="paytype"  grid={1/2} component="labelText" label="支付方式" value={detail.paytypeName}/>

							 <KrField grid={1/2}  name="signdate"  component="labelText" grid={1/2} label="签署时间" value={detail.signdate} defaultValue="无"/> 

							 <KrField name="firstpaydate" component="labelText" label="首付款时间" value={detail.firstpaydate} defaultValue="无"/> 
							 <KrField name="" component="labelText" label=" 租赁项目"  /> 
							 <KrField grid={1}  name="stationnum"  component="labelText" label="工位" value={detail.stationnum} defaultValue="0"/> 
							 <KrField grid={1}  name="boardroomnum"  component="labelText" label="会议室" value={detail.boardroomnum} defaultValue="0"/> 

							 <KrField grid={1}  name="rentaluse"  component="labelText" label="租赁用途" placeholder="办公使用" value={detail.rentaluse} /> 

							 <KrField grid={1/2}  name="totalrent" component="labelText"  label="租金总额" placeholder="" value={detail.totalrent}  defaultValue="0"/> 
							 <KrField grid={1/2}  name="totaldeposit"  component="labelText" label="押金总额" value={detail.totaldeposit} defaultValue="0"/> 
							 <KrField grid={1}  name="contractmark" component="labelText" label="备注" value={detail.contractmark} defaultValue="无"/> 

							
							<KrField component="group" label="合同附件">
									{detail.contractFileList && detail.contractFileList.map((item,index)=>{
										return <Button label={item.fileName} type="link" href={item.fileUrl} key={index}/>
									})}
							</KrField>

                  <DotTitle title='租赁明细'> 
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
										{detail && detail.list && detail.list.map((item,index)=>{
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
               </DotTitle>
				<Grid>
					<Row style={{marginTop:30}}>
						<Col md={2} align="right"> <Button  label="确定" type="button" primary={true} onTouchTap={this.onSubmit} /> </Col>
					  <Col md={2} align="right"> <Button  label="取消" type="button"  onTouchTap={this.onCancel}/> </Col> </Row>
				</Grid>
		 </div>);
	}
}

