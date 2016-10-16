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
        console.log("-----",this.props.initialValues);
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

								 <KrField grid={1/2}  name="lessorAddress" type="text" component="input" label="地址" /> 

								 <KrField grid={1/2}  name="lessorContactid" component="search" label="联系人" /> 
								 <KrField grid={1/2}  name="lessorContacttel" type="text" component="input" label="电话" /> 

								 <KrField grid={1/2}  name="leaseId" component="labelText" label="承租方" value={initialValues.customerName}/> 
								 <KrField grid={1/2}  name="leaseAddress" type="text" component="input" label="地址" /> 

								 <KrField grid={1/2}  name="leaseContact" type="text" component="input" label="联系人" /> 
								 <KrField grid={1/2}  name="leaseContacttel" type="text" component="input" label="电话" /> 

								 <KrField grid={1/2}  name="communityid" component="labelText" label="所属社区" value={initialValues.communityName} /> 

								<KrField name="wherefloor"  grid={1/2} component="select" label="所属楼层" options={floorList} />

								
								 <KrField grid={1/2}  name="username" type="text" component="input" label="签署日期"  /> 
								 <KrField grid={1/2}  name="contractcode" type="text" component="input" label="合同编号"  /> 

                                 <KrField grid={1/2}  name="username" type="text" component="input" label="定金总额"  /> 
								 <KrField grid={1/2}  name="contractcode" type="text" component="select" label="付款方式"  />
                                     
								 <KrField grid={1/2}  name="username" component="group" label="租赁期限"> 
										  <KrField grid={1/2}  name="leaseBeginDate"  component="date"  /> 
										  <KrField grid={1/2}  name="leaseEndDate" component="date" /> 
								  </KrField>
                                  <KrField name="paymodel"  grid={1/2} component="select" label="保留天数" options={paymentList} /> 


								
							
							 <KrField grid={1} name="" component="labelText" label=" 租赁项目"  /> 
							 <KrField grid={1}  name="stationnum" type="text" component="input" label="工位" /> 
							 <KrField grid={1}  name="boardroomnum" type="text" component="input" label="会议室" /> 

							
							 <KrField grid={1}  name="fileIdList" type="textarea" component="textarea" label="备注" /> 
							 <KrField grid={1}  name="fileIdList" component="file" label="上传附件" /> 


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
													<TableRowColumn>{item.type}</TableRowColumn>
													<TableRowColumn>{item.name}</TableRowColumn>
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
