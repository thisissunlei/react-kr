import React, {
	Component,
	PropTypes
} from 'react';

import {
	Actions,
	Store
} from 'kr/Redux';
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


export default class ConfirmFormDetail extends Component {


	static PropTypes = {
		detail: React.PropTypes.object,
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
		optionValues: React.PropTypes.object,

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
	type=(type)=>{
		let {optionValues} = this.props;
		let typeName = '';
		optionValues.saleList.map(item=>{
			if(item.value == type){
				typeName = item.label;
			}
		})
		return typeName;
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
				return leasorName = item.corporationAddress;
			}
		});
		var payment, payType;
		optionValues.paymentList && optionValues.paymentList.map((item) => {
			if (item.id === detail.paymodel) {
				return payment = item.dicName;
			}
		});
		optionValues.payTypeList && optionValues.payTypeList.map((item) => {
			if (item.id === detail.paytype) {
				return payType = item.dicName;
			}
		})

		detail.firstpaydate = dateFormat(detail.firstpaydate, "yyyy-mm-dd ");
		detail.signdate = dateFormat(detail.signdate, "yyyy-mm-dd ");
		if(typeof detail.saleList == 'string'){
			detail.saleList = JSON.parse(detail.saleList)
		}
		return (

			<div>
								<KrField grid={1/2} component="labelText" label="出租方" value={leasorName} inline={false}/>

								 <KrField grid={1/2}  component="labelText" label="地址" value={detail.lessorAddress} inline={false}/>

								 <KrField grid={1/2}   component="labelText" label="联系人" value={detail.lessorContactName} inline={false}/>
								 <KrField grid={1/2}   component="labelText" label="电话"  value={detail.lessorContacttel} inline={false}/>

								 <KrField grid={1/2}  component="labelText" label="承租方" value={optionValues.customerName} inline={false}/>
								 <KrField grid={1/2}    component="labelText" label="地址" value={detail.leaseAddress} inline={false}/>

								 <KrField grid={1/2}    component="labelText" label="联系人" value={detail.leaseContact} inline={false}/>
								 <KrField grid={1/2}    component="labelText" label="电话" value={detail.leaseContacttel} inline={false}/>

								 <KrField grid={1}      component="labelText" label="所属社区" value={optionValues.communityName} inline={false} />



								 <KrField grid={1/2}    component="labelText" label="地址"  value={optionValues.communityAddress} inline={false}/>
								 <KrField grid={1/2}    component="labelText" label="合同编号"  value={detail.contractcode} inline={false}/>


                                <KrField   grid={1/2} component="labelText" label="支付方式" value={payType} inline={false}/>
								<KrField   grid={1/2} component="labelText" label="付款方式" value={payment} inline={false}/>




                             <KrField  component="labelText" label="首付款时间" grid={1/2}  value={detail.firstpaydate} inline={false}/>
							 <KrField grid={1/2}   component="labelText" label="签署时间" value={detail.signdate} inline={false}/>




							 

							 <KrField grid={1/2}   component="labelText"  label="租金总额" placeholder="" value={detail.totalrent} inline={false}/>
							 <KrField grid={1/2}    component="labelText" label="押金总额" value={detail.totaldeposit} inline={false}/>


							 <KrField grid={1}   component="labelText" label="备注" value={detail.contractmark} defaultValue="" inline={false}/>
							 <KrField grid={1}  name="agreement" component="labelText" label="双方其他约定内容" value={detail.agreement} defaultValue="无" inline={false}/>
							 

							<KrField component="group" label="上传附件">
									{detail.contractFileList && detail.contractFileList.map((item,index)=>{
										return <Button label={item.fileName} type="link" href={item.fileUrl} key={index}/>
									})}
							</KrField>

                  <DotTitle title='租赁明细'>


							<Table  displayCheckbox={false}>
									<TableHeader>
											<TableHeaderColumn>类别</TableHeaderColumn>
											<TableHeaderColumn>编号／名称</TableHeaderColumn>
											<TableHeaderColumn>单价(元/月)</TableHeaderColumn>
											<TableHeaderColumn>租赁开始时间</TableHeaderColumn>
											<TableHeaderColumn>租赁结束时间</TableHeaderColumn>
									</TableHeader>
									<TableBody>

										{detail.stationVosList && detail.stationVosList.map((item,index)=>{
											return (
												<TableRow key={index}>
													<TableRowColumn>{(item.stationType == 1) ?'工位':'独立空间'}</TableRowColumn>
													<TableRowColumn>{item.stationName}</TableRowColumn>
													<TableRowColumn>{item.unitprice}</TableRowColumn>
													<TableRowColumn>
														<KrDate value={item.leaseBeginDate} format="yyyy-mm-dd"/>
													</TableRowColumn>
													<TableRowColumn>
														<KrDate value={item.leaseEndDate} format="yyyy-mm-dd"/>
													</TableRowColumn>
												</TableRow>
											);
										})}
								   </TableBody>
							 </Table>


              </DotTitle>
			  {detail.saleList?<DotTitle title='优惠明细' style={{marginTop:53,marginBottom:25,paddingLeft:0,paddingRight:0}}>
					<Table  displayCheckbox={false}>
									<TableHeader>
											<TableHeaderColumn>优惠类型</TableHeaderColumn>
											<TableHeaderColumn>开始时间</TableHeaderColumn>
											<TableHeaderColumn>结束日期</TableHeaderColumn>
											<TableHeaderColumn>折扣</TableHeaderColumn>
											<TableHeaderColumn>优惠金额</TableHeaderColumn>
									</TableHeader>
									<TableBody>
										{detail && detail.saleList && detail.saleList.map((item,index)=>{
											return (
												<TableRow key={index}>
													<TableRowColumn>{this.type(item.tacticsType)}</TableRowColumn>
													<TableRowColumn>{dateFormat(item.validStart, "yyyy-mm-dd ")}</TableRowColumn>
													<TableRowColumn>{dateFormat(item.validEnd, "yyyy-mm-dd ")}</TableRowColumn>
													<TableRowColumn>
														{item.discount || '-'}
													</TableRowColumn>
													<TableRowColumn>
														{item.discountAmount || '0'}
													</TableRowColumn>
												</TableRow>
											);
										})}
								   </TableBody>
							 </Table>
			   </DotTitle>:''}
				<Grid>
					<Row style={{marginTop:30}}>
						<Col md={4}></Col>
						<Col md={2} align="center"> <Button  label="确定" type="button"  onTouchTap={this.onSubmit}  /> </Col>
					  <Col md={2} align="center"> <Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}/> </Col>
						<Col md={4}></Col>
					   </Row>
				</Grid>
		 </div>);
	}
}