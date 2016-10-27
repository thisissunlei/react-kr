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

		let {detail,optionValues} = this.props;
		console.log('detail',detail)
		console.log('optionValues',optionValues)
		console.log('stationVos',detail.stationVos)
		/* var leasorName ;
	        optionValues.fnaCorporationList.map((item)=>{
	        	if(item.value === detail.leaseId){
	        		return leasorName = item.label;
	        	}
	        });
	        var payment;
	        optionValues.paymentList.map((item)=>{
	        	if(item.id = detail.paymodel){
	        		return payment = item.dicName;
	        	}

	        })
	        var paytypes;
	        optionValues.payTypeList.map((item)=>{
	        	if(item.id = detail.paytype){
	        		return paytypes = item.dicName;
	        	}

	        })
	        var paytypes;
	        optionValues.payTypeList.map((item)=>{
	        	if(item.id = detail.paytype){
	        		return paytypes = item.dicName;
	        	}

	        })*/
		
	  return (

		  <div>
								<KrField name="lessorId"  grid={1/2} component="labelText" label="出租方" value='' />

								 <KrField grid={1/2}  name="lessorAddress"  component="labelText" label="地址" value={detail.lessorAddress}/> 

								 <KrField grid={1/2}  name="lessorContactid" component="labelText" label="联系人" value={detail.lessorContactid} /> 
								 <KrField grid={1/2}  name="lessorContacttel"  component="labelText" label="电话" value={detail.lessorContacttel}/> 

								 <KrField grid={1/2}  name="leaseId" component="labelText" label="承租方" value={detail.leaseId}/> 
								 <KrField grid={1/2}  name="leaseAddress"  component="labelText" label="地址" value={detail.leaseAddress} /> 

								 <KrField grid={1/2}  name="leaseContact"  component="labelText" label="联系人" value={detail.leaseContact}/> 
								 <KrField grid={1/2}  name="leaseContacttel"  component="labelText" label="电话" value={detail.leaseContacttel}/> 

								 <KrField grid={1/2}  name="communityid" component="labelText" label="所属社区" value='' /> 

								 <KrField grid={1/2}  name=""  component="labelText" label="地址"  value=''/> 
								 <KrField grid={1/2}  name="contractcode"  component="labelText" label="合同编号" value={detail.contractcode} /> 
								  <KrField grid={1/2}  name="totalreturn" component="labelText"  label="退租金总额" placeholder="" value={detail.totalrent} /> 
							 <KrField grid={1/2}  name="depositamount"  component="labelText" label="退押金总额" value={detail.totaldeposit}/> 
							 <KrField grid={1/2}  name="signdate"  component="labelText" grid={1/2} label="签署时间"value={detail.signdate}/> 
							 <KrField grid={1/2}  name="contractmark" component="labelText" label="备注" value={detail.contractmark}/> 
							 <KrField grid={1}  name="fileIdList" component="labelText" label="合同附件" value={detail.fileIdList}/> 


					

				<Grid>
					<Row style={{marginTop:30}}>
						<Col md={2} align="right"> <Button  label="确定" type="button" primary={true} onTouchTap={this.onSubmit} /> </Col>
					  <Col md={2} align="right"> <Button  label="取消" type="button"  onTouchTap={this.onCancel}/> </Col> </Row>
				</Grid>
		 </div>);
	}
}

