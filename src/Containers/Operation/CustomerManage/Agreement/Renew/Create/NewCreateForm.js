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
			customerName:'hha',
			communityName:'',
			customerAddress:'',
            fnaCorporation:[],
            payType:"",
            lessorAdress:"",
            buyType:[],
            sumRent:"",
            billList:[]
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

		let { error, handleSubmit, pristine, reset, submitting,initialValues} = this.props;

		

		initialValues = {};


	initialValues.customerName = 'jjjdf';
	initialValues.communityName = 'jjjdf';
	initialValues.customerAddress = 'jjjdf';
	initialValues.lessorAdress="大街";
	initialValues.fnaCorporation=[
     {value:'123',label:'123'}, 
     {value:'ahah',label:'123'}, 
	 
	]
   initialValues.payType="月度"
   initialValues.buyType=[
      {value:'123',label:'季度'}, 
      {value:'123',label:'月度'}, 
   ]
   initialValues.sumRent="123";
   initialValues.billList=[
      {stationType:'ahah',stationId:'yayay','unitprice':'345','leaseBeginDate':'123','leaseEndDate':'345'}
    ]
	  return (

		<form onSubmit={handleSubmit(this.onSubmit)}>
								
								<KrField name="leaseId"  grid={1/2} component="select" label="出租方" options={initialValues.fnaCorporation}  />

								 <KrField grid={1/2}  type="text" component="input" component="labelText" label="地址" value={initialValues.lessorAdress}/> 

								 <KrField grid={1/2}  name="lessorContactid" component="input" type="text" label="联系人" /> 
								 <KrField grid={1/2}  name="lessorContacttel" type="text" component="input" label="电话" /> 

								 <KrField grid={1/2}  component="labelText" label="承租方" value={initialValues.customerName}/> 
								 <KrField grid={1/2}  name="leaseAddress" type="text" component="input" label="地址" /> 

								 <KrField grid={1/2}  name="leaseContact" type="text" component="input" label="联系人" /> 
								 <KrField grid={1/2}  name="leaseContacttel" type="text" component="input" label="电话" /> 

								 <KrField grid={1}   component="labelText" label="所属社区" value={initialValues.communityName} /> 

								 <KrField grid={1/2}  type="text" component="labelText" label="地址" value={initialValues.customerAddress} /> 
								 <KrField grid={1/2}  name="contractcode" type="text" component="input" label="合同编号"  /> 
                                  
                                 <KrField grid={1/2}  type="text" component="labelText" label="支付方式" value={initialValues.payType}/> 
								 <KrField grid={1/2}  name="paymodel" type="text" component="select" label="付款方式"  options={initialValues.buyType}/> 
                                 
                                 <KrField grid={1/2}  name="firstpaydate"  component="date" label="首付款时间"  /> 
								 <KrField grid={1/2}  name="signdate"  component="date"  label="签署时间" /> 
                                
                                 <KrField grid={1}  name="rentaluse" type="text" component="input"  label="租赁用途" />

                                 <KrField grid={1}  type="text" component="labelText"  label="租金总额" value={initialValues.sumRent}/>
                                 <KrField grid={1}  name="totaldeposit" type="text" component="input"  label="押金总额" />

								 
								 <KrField grid={1/2}  name="contractmark" type="textarea" component="textarea" label="备注" /> 
								 <KrField grid={1}  name="fileIdList" component="file" label="上传附件" /> 


					<Section title="租赁明细" description="" rightMenu = {
									<Menu>
										  <MenuItem primaryText="减租"  onTouchTap={this.onDistributionDialog} />
									</Menu>
					}> 

							<Table  displayCheckbox={false}>
									<TableHeader>
											<TableHeaderColumn>类别</TableHeaderColumn>
											<TableHeaderColumn>编号／名称</TableHeaderColumn>
											<TableHeaderColumn>单价(元/月)</TableHeaderColumn>
											<TableHeaderColumn>起始时间</TableHeaderColumn>
											<TableHeaderColumn>减租开始时间</TableHeaderColumn>
									</TableHeader>
									<TableBody>
										{initialValues.billList.map((item,index)=>{
											return (
												<TableRow key={index}>
													<TableRowColumn>{item.stationType}</TableRowColumn>
													<TableRowColumn>{item.stationId}</TableRowColumn>
													<TableRowColumn>{item.unitprice}</TableRowColumn>
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
