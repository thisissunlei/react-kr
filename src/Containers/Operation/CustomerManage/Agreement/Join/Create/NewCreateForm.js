import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import Param from 'jquery-param';

import {reduxForm,formValueSelector,initialize,arrayPush,arrayInsert} from 'redux-form';

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
			customerName:'',
			communityName:'',
			lessorAddress:'',
			payTypeList:[],
			paymentList:[],
			fnaCorporationList:[],
		}
	}

	static PropTypes = {
		initialValues:React.PropTypes.object,
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}

	constructor(props,context){
		super(props, context);

		this.onCancel  = this.onCancel.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.onDistributionDialog = this.onDistributionDialog.bind(this);

		this.state = {
			billList:[]
		}

	}

	componentDidMount(){
		let {initialValues}= this.props;


		Store.dispatch(initialize('joinCreateForm',initialValues));
		//{this.props.changeValues.lessorId}

	}

	componentWillReceiveProps(nextProps){
	}

	onDistributionDialog(){
		//Actions.showModalDialog('http://optest.krspace.cn/krspace_operate_web/commnuity/communityFloorPlan/toCommunityFloorPlanSel?communityId=42&floors=3&goalStationNum=1&goalBoardroomNum=0&selectedObjs=[{type:1,id:883},{type:2,id:2}]',900,800);
	}


	onSubmit(){

		/*
		var form = {
			leaseId:108,
			mainbillid:3,
			contractstate:1,
				lessorAddress:'aahahaha',
				leaseAddress:"海淀区创业大街2",
				contracttype:"ENTER",
				communityName:"test2",
				lessorId:2,
				lessorContacttel:"343242",
				lessorContactid:5,
			leaseid:1,
lessorContactid:1,
				leaseContact:3,
				leaseContacttel:18674761885,
				lessorContacttel:"3423423",
				wherefloor:2,
				username:"324324",
				contractcode:"23423432",
				leaseBegindate:"2016-10-20 11:34:22",
				leaseEnddate:"2016-10-20 11:34:22",
				paymodel:5,
				paytype:8,
				signdate:"2016-10-20 11:34:22",
				firstpaydate:"2016-10-20 11:34:22",
				stationnum:1,
				boardroomnum:0,
				rentaluse:"32423423423423yayayayyayayyayayayayayayayaayyayaayyayaayyaayyaayayay",
				totalrent:324324,
				totaldeposit:23432423,
			paymodel:1,
fielIdList:1,
		}
		*/
		/*
		delete form.floorList;
		delete form.customerName;
		delete form.payTypeList;
		delete form.paymentList;
		delete form.fnaCorporationList;
		*/



		var form = {
					mainbillid:3,
					contractcode:"22222222",
					leaseId:1,
					lessorAddress:"大街",
					lessorContactid:2,
					lessorContacttel:"18652536394",

					leaseAddress:"街里面",

					leaseContact:1212,
					leaseContacttel:"18698522963",
					signdate:"2018-10-15 15:45:17",
					leaseBegindate:+new Date,
					leaseEnddate:"2019-12-25 15:45:17",
					wherefloor:"3",
					totalrent:8666,
					stationnum:1,
					templockday:10,

					paymentId:1,
					contracttype:"ENTER",
					contractstate:"EXECUTE",
					fileIdList:"1,2,3",
					totaldeposit:5555,
					firstpaydate:"2016-10-14 15:45:17",
					paytype:8 ,
					paymodel:2,
					rentaluse:"测试入驻",
		};
		form.stationVos = [
			{
				leaseBeginDate:+new Date,
				leaseEndDate:+new Date,
				stationId:1,
				stationType:1,
				unitprice:1111,
				whereFloor:1
			}
		];

		form.stationVos = JSON.stringify(form.stationVos) ;


		console.log('---',form);
		//form = Param(form);

		const {onSubmit} = this.props;

		onSubmit && onSubmit(form);
	}

	onCancel(){
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

	render(){

		let { error, handleSubmit, pristine, reset, submitting,initialValues} = this.props;


		let {billList,lessorAddress} = this.state;

		return (

			<form onSubmit={handleSubmit(this.onSubmit)}>


				<KrField name="lessorId"  grid={1/2} component="select" label="出租方" options={initialValues.fnaCorporationList}  />

				<KrField grid={1/2}  name="lessorAddress" type="text" component="labelText" label="地址" value={lessorAddress}/> 
				<KrField grid={1/2}  name="lessorContactid" component="search" label="联系人" /> 
				<KrField grid={1/2}  name="lessorContacttel" type="text" component="input" label="电话" /> 

				<KrField grid={1/2}  name="leaseId" component="labelText" label="承租方" value={initialValues.customerName}/> 
				<KrField grid={1/2}  name="leaseAddress" type="text" component="input" label="地址" /> 

				<KrField grid={1/2}  name="leaseContact" type="text" component="input" label="联系人" /> 
				<KrField grid={1/2}  name="leaseContacttel" type="text" component="input" label="电话" /> 

				<KrField grid={1/2}  name="communityid" component="labelText" label="所属社区" value={initialValues.communityName} /> 

				<KrField name="whereFloor"  grid={1/2} component="select" label="所在楼层" options={initialValues.floorList} />

				<KrField grid={1/2}  name="username" type="text" component="input" label="地址"  /> 
				<KrField grid={1/2}  name="contractcode" type="text" component="input" label="合同编号"  /> 

				<KrField grid={1}  name="" component="group" label="租赁期限"> 
				<KrField grid={1/2}  name="leaseBeginDate"  component="date"  /> 
				<KrField grid={1/2}  name="leaseEndDate" component="date" /> 
				</KrField>

				<KrField name="paymodel"  grid={1/2} component="select" label="付款方式" options={initialValues.paymentList} /> 
				<KrField name="paytype"  grid={1/2} component="select" label="支付方式" options={initialValues.payTypeList} />

				<KrField grid={1/2}  name="signdate"  component="date" grid={1/2} label="签署时间" /> 

				<KrField name="firstpaydate" component="date" label="首付款时间"  /> 
				<KrField name="" component="labelText" label=" 租赁项目"  /> 
				<KrField grid={1}  name="stationnum" type="text" component="input" label="工位" /> 
				<KrField grid={1}  name="boardroomnum" type="text" component="input" label="会议室" /> 

				<KrField grid={1}  name="rentaluse" type="text" component="input" label="租赁用途" placeholder="办公使用"  /> 

				<KrField grid={1/2}  name="totalrent" type="text" component="input" label="租金总额" placeholder="" /> 
				<KrField grid={1/2}  name="totaldeposit" type="text" component="input" label="押金总额" /> 
				<KrField grid={1/2}  name="contractmark" component="textarea" label="备注" /> 
				<KrField grid={1}  name="fileIdList" component="file" label="合同附件" /> 


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
				<TableHeaderColumn>单价(元/月)</TableHeaderColumn>
					<TableHeaderColumn>租赁开始时间</TableHeaderColumn>
						<TableHeaderColumn>租赁结束时间</TableHeaderColumn>
						</TableHeader>
						<TableBody>
						{billList.map((item,index)=>{
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
						<Col md={2} align="right"> <Button  label="确定" type="submit" primary={true} /> </Col>
						<Col md={2} align="right"> <Button  label="取消" type="button"  onTouchTap={this.onCancel}/> </Col> </Row>
						</Grid>

						</form>
				);
	}
	}

	/*
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
	*/

const selector = formValueSelector('joinCreateForm');

NewCreateForm = reduxForm({ form: 'joinCreateForm',enableReinitialize:true,keepDirtyOnReinitialize:true})(NewCreateForm);

export default connect((state)=>{

	let changeValues = {};

	changeValues.lessorId = selector(state,'lessorId');

	return {
		changeValues
	}
})(NewCreateForm);
