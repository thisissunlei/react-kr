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
								<KrField name="lessorId"  grid={1/2} component="labelText" label="出租方" value="ahah " />

								 <KrField grid={1/2}  name="lessorAddress"  component="labelText" label="地址" /> 

								 <KrField grid={1/2}  name="lessorContactid" component="labelText" label="联系人" /> 
								 <KrField grid={1/2}  name="lessorContacttel"  component="labelText" label="电话" /> 

								 <KrField grid={1/2}  name="leaseId" component="labelText" label="承租方" /> 
								 <KrField grid={1/2}  name="leaseAddress"  component="labelText" label="地址" /> 

								 <KrField grid={1/2}  name="leaseContact"  component="labelText" label="联系人" /> 
								 <KrField grid={1/2}  name="leaseContacttel"  component="labelText" label="电话" /> 

								 <KrField grid={1/2}  name="communityid" component="labelText" label="所属社区" value="haha" /> 

								<KrField name="wherefloor"  grid={1/2} component="labelText" label="所在楼层"/>

								 <KrField grid={1/2}  name="username"  component="labelText" label="地址"  /> 
								 <KrField grid={1/2}  name="contractcode"  component="labelText" label="合同编号"  /> 

								 <KrField grid={1}  name="username" component="group" label="租赁期限"> 
										  <KrField grid={1/2}  name="leaseBeginDate"  component="labelText"  /> 
										  <KrField grid={1/2}  name="leaseEndDate" component="labelText" /> 
								  </KrField>

								<KrField name="paymodel"  grid={1/2} component="labelText" label="付款方式" /> 
								<KrField name="paytype"  grid={1/2} component="labelText" label="支付方式" />

							 <KrField grid={1/2}  name="rname"  component="labelText" grid={1/2} label="签署时间" /> 

							 <KrField name="signdate" component="labelText" label="首付款时间"  /> 
							 <KrField name="" component="labelText" label=" 租赁项目"  /> 
							 <KrField grid={1}  name="stationnum"  component="labelText" label="工位" /> 
							 <KrField grid={1}  name="boardroomnum"  component="labelText" label="会议室" /> 

							 <KrField grid={1}  name="rentaluse"  component="labelText" label="租赁用途" placeholder="办公使用"  /> 

							 <KrField grid={1/2}  name="totaldeposit" component="labelText"  label="租金总额" placeholder="" /> 
							 <KrField grid={1/2}  name="totalrent"  component="labelText" label="押金总额" /> 
							 <KrField grid={1/2}  name="fileIdList" component="labelText" label="备注" /> 
							 <KrField grid={1}  name="fileIdList" component="labelText" label="合同附件" /> 


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
													<TableRowColumn>{item.type}</TableRowColumn>
													<TableRowColumn>{item.name}</TableRowColumn>
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
						<Col md={2} align="right"> <Button  label="确定" type="button" primary={true} /> </Col>
					  <Col md={2} align="right"> <Button  label="取消" type="button"  onTouchTap={this.onCancel}/> </Col> </Row>
				</Grid>
		 </div>);
	}
}

