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
						<KrField name="lessorId"  grid={1/2} component="labelText" label="出租方"  value={detail.lessorId} />

								 <KrField grid={1/2}  name="lessorAddress" type="text" component="labelText" label="地址" value={detail.lessorAddress}/> 

								 <KrField grid={1/2}  name="lessorContactid" component="labelText" label="联系人" value={detail.lessorContactid}/> 
								 <KrField grid={1/2}  name="lessorContacttel" type="text" component="labelText" label="电话" value={detail.lessorContacttel}/> 

								 <KrField grid={1/2}  name="leaseId" component="labelText" label="承租方" value={detail.leaseId}/> 
								 <KrField grid={1/2}  name="leaseAddress" type="text" component="labelText" label="地址" value={detail.leaseAddress}/> 

								 <KrField grid={1/2}  name="leaseContact" type="text" component="labelText" label="联系人" value={detail.leaseContact}/> 
								 <KrField grid={1/2}  name="leaseContacttel" type="text" component="labelText" label="电话" value={detail.leaseContacttel}/> 

								 <KrField grid={1/2}  name="communityid" component="labelText" label="所属社区" value={detail.communityid}/> 
								 <KrField grid={1/2}  name="customerAddress" type="labelText" component="labelText" label="地址" value={detail.customerAddress} /> 
								 <KrField grid={1}  name="contractcode" type="text" component="labelText" label="合同编号"  value={detail.contractcode}/> 
								 <KrField name="totalreturn"  grid={1/2} type="text" component="labelText" label="退租金总额" value={detail.totalreturn}/> 
								<KrField name="depositamount"  grid={1/2} type="text" component="labelText" label="退押金总额"  value={detail.depositamount}/>
								 <KrField grid={1/2}  name="withdrawdate" component="labelText" label="撤场日期" value={detail.withdrawdate}/> 
							 <KrField grid={1/2}  name="signdate"  component="labelText" grid={1/2} label="签署时间" value={detail.signdate}/>  {/*签署日期字段没有*/}
							 <KrField grid={1}  name="contractmark	" type="textarea" component="labelText" label="备注" value={detail.contractmark}/> 
							 <KrField grid={1}  name="fileIdList" component="labelText" label="合同附件" value={detail.fileIdList}/> 
				<Grid>
					<Row style={{marginTop:30}}>
						<Col md={2} align="right"> <Button  label="确定" type="button" primary={true} onTouchTap={this.onSubmit} /> </Col>
					  <Col md={2} align="right"> <Button  label="取消" type="button"  onTouchTap={this.onCancel}/> </Col> </Row>
				</Grid>
		 </div>);
	}
}

