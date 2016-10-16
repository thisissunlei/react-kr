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
			fnaCorporationList:[],
			floorList:[],
			lessorAdress:"",
			buyType:[]
			
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
        console.log("-----",this.props.initialValues);
		let { error, handleSubmit, pristine, reset, submitting,initialValues} = this.props;
     
        
	  
	  	initialValues = {};
	   
		
      

	initialValues.customerName = 'yyy';
	initialValues.communityName = 'mmm';
	initialValues.lessorAdress="大街";
	initialValues.fnaCorporationList =[ //此处犯错
	 {value:'ahah',label:'123'}, 
     {value:'77',label:'yayay'}
	];
    initialValues.floorList=[
     {value:'ahah',label:'yayay'}
    ];
    initialValues.buyType=[
     {value:'ahah',label:'yayay'}
    ]
	  return (

		<form onSubmit={handleSubmit(this.onSubmit)}>
								
								 <KrField name="leaseId"  grid={1/2} component="select" label="出租方" options={initialValues.fnaCorporationList} />

								 <KrField grid={1/2}  type="text" component="labelText" label="地址" value={initialValues.lessorAdress}/> 

								 <KrField grid={1/2}  name="lessorContactid" component="input" type="text" label="联系人" /> 
								 <KrField grid={1/2}  name="lessorContacttel" type="text" component="input" label="电话" /> 

								 <KrField grid={1/2}  component="labelText" label="承租方" value={initialValues.customerName}/> 
								 <KrField grid={1/2}  name="leaseAddress" type="text" component="input" label="地址" /> 

								 <KrField grid={1/2}  name="leaseContact" type="text" component="input" label="联系人" /> 
								 <KrField grid={1/2}  name="leaseContacttel" type="text" component="input" label="电话" /> 

								 <KrField grid={1/2}  component="labelText" label="所属社区" value={initialValues.communityName} /> 

								 <KrField name="wherefloor"  grid={1/2} component="select" label="所属楼层" options={initialValues.floorList} />

								
								 <KrField grid={1/2}  name="signdate"  component="date" label="签署日期"  /> 
								 <KrField grid={1/2}  name="contractcode" type="text" component="input" label="合同编号"  /> 

                                 <KrField grid={1/2}  name="totaldownpayment" type="text" component="input" label="定金总额"  /> 
								 <KrField grid={1/2}  name="paymentId" type="text" component="select" label="付款方式" options={initialValues.buyType} />
                                     
								 <KrField grid={1/2}  name="" component="group" label="租赁期限"> 
										  <KrField grid={1/2}  name="leaseBegindate"  component="date"  /> 
										  <KrField grid={1/2}  name="leaseEnddate" component="date" /> 
								  </KrField>
                                  <KrField name="templockday"  grid={1/2} component="input" type="text" label="保留天数" /> 


								
							
							 <KrField grid={1} name="" component="labelText" label=" 租赁项目"  /> 
							 <KrField grid={1}  name="stationnum" type="text" component="input" label="工位" /> 
							 <KrField grid={1}  name="boardroomnum" type="text" component="input" label="会议室" /> 

							
							 <KrField grid={1}  name="contractmark" type="textarea" component="textarea" label="备注" /> 
							 <KrField grid={1}  name="contractfile" component="file" label="上传附件" /> 


					    <Section title="租赁明细" description="" rightMenu = {
									<Menu>
										  <MenuItem primaryText="删除" />
										  <MenuItem primaryText="租赁"  onTouchTap={this.onDistributionDialog} />
									</Menu>
					        }> 

							<Table  displayCheckbox={false}>
									<TableHeader>
											<TableHeaderColumn>类别</TableHeaderColumn>
											<TableHeaderColumn>编号／名称</TableHeaderColumn>
											<TableHeaderColumn>单价(元/月)</TableHeaderColumn>
											<TableHeaderColumn>租赁开始时间</TableHeaderColumn>
											<TableHeaderColumn>租赁结束时间</TableHeaderColumn>
									</TableHeader>
									<TableBody>
										{this.props.billList.map((item,index)=>{
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

export default reduxForm({ form: 'admintCreateForm'})(NewCreateForm);
