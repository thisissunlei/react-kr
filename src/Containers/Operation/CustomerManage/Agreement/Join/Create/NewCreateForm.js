import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector} from 'redux-form';
import {Actions,Store} from 'kr/Redux';

import {
	Menu,
	MenuItem,
	DropDownMenu,
	IconMenu,
	Dialog,

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


class NewCreateForm  extends Component{


	static PropTypes = {
		initialValues:React.PropTypes.object,
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
		paymentList:React.PropTypes.array,
		payTypeList:React.PropTypes.array,
		floorList:React.PropTypes.array,
	}

	constructor(props,context){
		super(props, context);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel  = this.onCancel.bind(this);

		this.onDistributionDialog = this.onDistributionDialog;
	}

	componentDidMount(){

	}

	onDistributionDialog(){

	}

	onSubmit(){
		const {onSubmit} = this.props;
		onSubmit && onSubmit();
	}

	onCancel(){
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

	render(){

		let { error, handleSubmit, pristine, reset, submitting,submit,onCancel ,onSubmit,fnaCorporation,paymentList,payTypeList,floorList,customer} = this.props;

		fnaCorporation.map(function(item,index){
			item.value = item.id;
			item.label = item.corporationName;
			return item;
		});

		paymentList.map(function(item,index){
			item.value = item.id;
			item.label = item.dicName;
			return item;
		});

		payTypeList.map(function(item,index){
			item.value = item.id;
			item.label = item.dicName;
			return item;
		});

	  return (

		<form onSubmit={handleSubmit(onSubmit)}>

								<KrField name="lessorId"  grid={1/2} component="select" label="出租方" options={fnaCorporation} />

								 <KrField grid={1/2}  name="lessorAddress" type="text" component="input" label="地址" /> 

								 <KrField grid={1/2}  name="lessorContactid" component="search" label="联系人" /> 
								 <KrField grid={1/2}  name="lessorContacttel" type="text" component="input" label="电话" /> 

								 <KrField grid={1/2}  name="leaseId" component="labelText" label="承租方" value={customer.customerName}/> 
								 <KrField grid={1/2}  name="leaseAddress" type="text" component="input" label="地址" /> 

								 <KrField grid={1/2}  name="leaseContact" type="text" component="input" label="联系人" /> 
								 <KrField grid={1/2}  name="leaseContacttel" type="text" component="input" label="电话" /> 

								 <KrField grid={1/2}  name="communityid" component="labelText" label="所属社区" value={customer.communityName} /> 

								<KrField name="wherefloor"  grid={1/2} component="select" label="所在楼层" options={floorList}/>

								 <KrField grid={1/2}  name="username" type="text" component="input" label="地址" /> 
								 <KrField grid={1/2}  name="contractcode" type="text" component="input" label="合同编号" /> 

								 <KrField grid={1}  name="username" component="group" label="租赁期限"> 
										  <KrField grid={1/2}  name="leaseBeginDate"  component="date"  /> 
										  <KrField grid={1/2}  name="leaseEndDate" component="date"/> 
								  </KrField>

								<KrField name="paymodel"  grid={1/2} component="select" label="付款方式" options={paymentList}/> 
								<KrField name="paytype"  grid={1/2} component="select" label="支付方式" options={payTypeList}/>

							 <KrField grid={1/2}  name="rname"  component="date" grid={1/2} label="签署时间" /> 

							 <KrField name="signdate" component="date" label="首付款时间" /> 

							 <KrField grid={1/2}  name="stationnum" type="text" component="input" label="工位" /> 
							 <KrField grid={1/2}  name="boardroomnum" type="text" component="input" label="会议室" /> 

							 <KrField grid={1/2}  name="rentaluse" type="text" component="input" label="租赁用途" placeholder="办公使用" /> 

							 <KrField grid={1/2}  name="totaldeposit" type="text" component="input" label="租金总额" placeholder="" /> 
							 <KrField grid={1/2}  name="totalrent" type="text" component="input" label="押金总额" /> 

							 <KrField grid={1/2}  name="fileIdList" component="file" label="合同附件" /> 


					<Section title="租赁明细" description="" rightMenu = {
									<Menu>
										  <MenuItem primaryText="删除" />
										  <MenuItem primaryText="分配"  onTouchTap={this.onDistributionDialog} />
									</Menu>
					}> 

							<Table  displayCheckbox={false}>
									<TableHeader>
											<TableHeaderColumn>类别</TableHeaderColumn>
											<TableHeaderColumn>编号／名称</TableHeaderColumn>
											<TableHeaderColumn>租赁开始时间</TableHeaderColumn>
											<TableHeaderColumn>租赁结束时间</TableHeaderColumn>
									</TableHeader>
									<TableBody>
										{this.props.billList.map((item,index)=>{
											return (
												<TableRow key={index}>
													<TableRowColumn>{item.type}</TableRowColumn>
													<TableRowColumn>{item.name}</TableRowColumn>
													<TableRowColumn>Employed</TableRowColumn>
													<TableRowColumn>John Smith</TableRowColumn>
												</TableRow>
											);
										})}
								   </TableBody>
							 </Table>

				</Section>

				<Grid>
					<Row style={{marginTop:30}}>
						<Col md={2} align="right"> <Button  label="确定" type="submit" primary={true} disabled={submitting} /> </Col>
					  <Col md={2} align="right"> <Button  label="取消" type="button" /> </Col> </Row>
				</Grid>

			</form>
			 );
	}
}

const validate = values =>{

	const errors = {}

	if(!values.mainbilltype){
		errors.mainbilltype = '请选择订单类型';
	}else if (!values.communityid) {
		errors.communityid = '请选择所在社区';
	}else if(!values.mainbillname){
		errors.mainbillname = '订单名称不能为空';
	}

	return errors
}

export default reduxForm({ form: 'joinCreateForm'})(NewCreateForm);
