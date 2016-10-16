import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector,initialize} from 'redux-form';
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


	static DefaultPropTypes = {
		initialValues:{
			customerName:'hha'
		}
	}

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
		const {detail}= this.props;
		Store.dispatch(initialize('newCreateForm',detail));
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

		let { error, handleSubmit, pristine, reset, submitting,fnaCorporation,paymentList,payTypeList,floorList,customer,initialValues} = this.props;

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

		initialValues = {};


	initialValues.customerName = 'jjjdf';
	initialValues.communityName = 'jjjdf';

	  return (

		<form onSubmit={handleSubmit(this.onSubmit)}>
								
								<KrField name="lessorId"  grid={1/2} component="select" label="出租方" options={fnaCorporation}  />

								 <KrField grid={1/2}  name="lessorAddress" type="text" component="labelText" label="地址" /> 

								 <KrField grid={1/2}  name="lessorContactid" component="search" label="联系人" /> 
								 <KrField grid={1/2}  name="lessorContacttel" type="text" component="input" label="电话" /> 

								 <KrField grid={1/2}  name="leaseId" component="labelText" label="承租方" value={initialValues.customerName}/> 
								 <KrField grid={1/2}  name="leaseAddress" type="text" component="input" label="地址" /> 

								 <KrField grid={1/2}  name="leaseContact" type="text" component="input" label="联系人" /> 
								 <KrField grid={1/2}  name="leaseContacttel" type="text" component="input" label="电话" /> 

								 <KrField grid={1/2}  name="communityid" component="labelText" label="所属社区" value={initialValues.communityName} /> 
								 <KrField grid={1/2}  name="customerAddress" type="labelText" component="labelText" label="地址"  /> 
								 <KrField grid={1}  name="contractcode" type="text" component="input" label="合同编号"  /> 
								 <KrField name="totalreturn"  grid={1/2} type="text" component="input" label="退租金总额" /> 
								<KrField name="depositamount"  grid={1/2} type="text" component="input" label="退押金总额"  />
								 <KrField grid={1/2}  name="withdrawdate" component="date" label="撤场日期"/> 
							 <KrField grid={1/2}  name="rname"  component="date" grid={1/2} label="签署时间" />  //签署日期字段没有
							 <KrField grid={1}  name="contractmark	" type="textarea" component="textarea" label="备注" /> 
							 <KrField grid={1}  name="fileIdList" component="file" label="合同附件" /> 
						<Grid>
							<Row style={{marginTop:30}}>
								<Col md={2} align="right"> <Button  label="确定" type="submit" primary={true} disabled={submitting} /> </Col>
							  <Col md={2} align="right"> <Button  label="取消" type="button"  onTouchTap={this.onCancel}/> </Col> </Row>
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
