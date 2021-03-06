import React, {
	 
	PropTypes
} from 'react';

import {
	Actions,
	Store
} from 'kr/Redux';
import {DateFormat} from 'kr/Utils';

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	KrField,
	Grid,
	Row,
	Col,
	Button,
} from 'kr-ui';


export default class ConfirmFormDetail extends React.Component {


	static PropTypes = {
		detail: React.PropTypes.object,
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props, context) {
		super(props, context);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);

	}

	onSubmit(form) {

		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(form);
	}

	onCancel() {

		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}

	render() {

		let {
			detail,
			optionValues
		} = this.props;

		detail = Object.assign({}, detail);

		var leasorName;
		optionValues.fnaCorporationList && optionValues.fnaCorporationList.map((item) => {
			if (item.value === detail.leaseId) {
				return leasorName = item.label;
			}
		});


		return (

			<div>
								<KrField name="lessorId"  inline={false} grid={1/2} component="labelText" label="出租方" value={leasorName} />

								 <KrField grid={1/2}  inline={false} name="lessorAddress"  component="labelText" label="地址" value={detail.lessorAddress}/>

								 <KrField grid={1/2}  inline={false} name="lessorContactid" component="labelText" label="联系人" value={detail.lessorContactName} />
								 <KrField grid={1/2}  inline={false} name="lessorContacttel"  component="labelText" label="电话" value={detail.lessorContacttel}/>

								 <KrField grid={1/2}   inline={false}name="leaseId" component="labelText" label="承租方" value={optionValues.customerName}/>
								 <KrField grid={1/2}   inline={false}name="leaseAddress"  component="labelText" label="地址" value={detail.leaseAddress} />

								 <KrField grid={1/2}  inline={false} name="leaseContact"  component="labelText" label="联系人" value={detail.leaseContact}/>
								 <KrField grid={1/2}  inline={false} name="leaseContacttel"  component="labelText" label="电话" value={detail.leaseContacttel}/>

								 <KrField grid={1/2}  inline={false} name="communityid" component="labelText" label="所属社区" value={optionValues.communityName} />

								 <KrField grid={1/2}  inline={false} name=""  component="labelText" label="地址"  value={optionValues.communityAddress}/>
								 <KrField grid={1/2}  inline={false} name="contractcode"  component="labelText" label="合同编号" value={detail.contractcode} />
								  <KrField grid={1/2}  inline={false} name="totalreturn" component="labelText"  label="退租金总额" placeholder="" value={detail.totalreturn} />
							 <KrField grid={1/2}  inline={false} name="depositamount"  component="labelText" label="退押金总额" value={detail.depositamount}/>
							 <KrField grid={1/2}  inline={false} name="withdrawdate" component="labelText" label="撤场日期"  value={detail.withdrawdate}/>
							 <KrField grid={1/2}  inline={false} name="signdate"  component="labelText" grid={1/2} label="签署时间" value={detail.signdate}/>
							 <KrField grid={1/2}  inline={false} name="contractmark" component="labelText" label="备注" value={detail.contractmark} defaultValue=""/>
							 <KrField grid={1}  inline={false} name="agreement" component="labelText" label="双方其他约定内容" value={detail.agreement} defaultValue="无" inline={false}/>
							 

							<KrField component="group" label="上传附件">
									{detail.contractFileList && detail.contractFileList.map((item,index)=>{
										return <Button label={item.fileName}  type="link" href={item.fileUrl} key={index} linkStyle={{display:'block'}}/>
									})}
							</KrField>

				<Grid>
					<Row style={{marginTop:30}} >
					<Col md={4}></Col>
						<Col md={2} align="center"> <Button  label="确定" type="button"  onTouchTap={this.onSubmit} /> </Col>
					  <Col md={2} align="center"> <Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}/> </Col> </Row>
					<Col md={4}></Col>
				</Grid>
		 </div>);
	}
}