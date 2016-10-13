import React, {Component, PropTypes} from 'react';
import { connect } from 'kr/Redux';

import {reduxForm,submitForm} from 'redux-form';

import {Actions,Store} from 'kr/Redux';

import http from 'kr/Redux/Utils/fetch';

import {
	Menu,
	MenuItem,
	DropDownMenu,
	IconMenu,
	Divider,
	FontIcon,
	DatePicker,
	Paper,
	Avatar,
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
	LabelText,
	Grid,
	Row,
	Col,
	Button,
	Notify,
} from 'kr-ui';


class JoinCreateForm  extends Component{

	constructor(props,context){
		super(props, context);

	}

	render(){

		let { error, handleSubmit, pristine, reset, submitting,submit,cancel ,onSubmit,handleOpen,fnaCorporation,paymentList,payTypeList,floorList,customer} = this.props;

		console.log('----orip',this.props);

		fnaCorporation.map(function(item,index){
			item.value = item.id;
			item.label = item.corporationName;
		});

		paymentList.map(function(item,index){
			item.value = item.id;
			item.label = item.dicName;
		});

		payTypeList.map(function(item,index){
			item.value = item.id;
			item.label = item.dicName;
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
										  <MenuItem primaryText="分配"  onTouchTap={handleOpen} />
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


 class JoinCreate extends Component {

	constructor(props,context){
		super(props, context);

		this.handleOpen = this.handleOpen.bind(this);
		this.openConfirmCreateDialog = this.openConfirmCreateDialog.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			open:false,
			openConfirmCreate:false,
			billList:[
				{
					id:883,
					name:'23432',
					type:1
				},
				{
					id:883,
					name:'23432',
					type:1
				},
			],
			init:{
				customer:{},
				fnaCorporation:[],
				payType:[],
				payment:[]
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

		JoinCreateForm = reduxForm({
			form: 'joinCreateForm',
			validate,
			initialValues:{
				leaseAddress:'haha'
			}
		})(JoinCreateForm);
	}

	 openConfirmCreateDialog(){
		 this.setState({
			 openConfirmCreate:!this.state.openConfirmCreate
		 });
	 }

	 componentDidMount(){

		var _this = this;

		 const {params} = this.props;

		Store.dispatch(Actions.callAPI('fina-contract-intention',{customerId:params.customerId,mainBillId:params.orderId,communityId:1})).then(function(response){
			_this.setState({
				init:response
			});
		}).catch(function(err){
			/*
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
			*/
		});
	 }

	 onSubmit(form){
		 const {params} = this.props;

		Store.dispatch(Actions.callAPI('addOrEditEnterContract',{customerId:params.customerId,mainBillId:params.orderId})).then(function(response){

		}).catch(function(err){
			/*
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
			*/
		});
	 }

	handleOpen(){
		Actions.showModalDialog('http://optest.krspace.cn/krspace_operate_web/commnuity/communityFloorPlan/toCommunityFloorPlanSel?communityId=42&floors=3&goalStationNum=1&goalBoardroomNum=0&selectedObjs=[{type:1,id:883},{type:2,id:2}]',900,800);

		var _this = this;

		window.setReturnValue = function(value){
			console.log('valu',value);
			_this.setState({
				billList:value.data
			});
		};

	}

	handleClose(values){
		this.setState({open: false});
	}

  render() {


	  let {fnaCorporation,payType,payment,customer} = this.state.init;

    return (

		 <div>
			<Section title="创建入驻协议书" description=""> 
			
					<JoinCreateForm onSubmit={this.onSubmit} handleOpen={this.handleOpen} fnaCorporation={fnaCorporation} paymentList={payment} payTypeList={payType} floorList={customer.floor} billList={this.state.billList} customer={customer}/>
			</Section>

			<Dialog
				title="确定新建"
				modal={true}
				open={this.state.openConfirmCreate} >

			  </Dialog>
		</div>
	);

  }
}


export default connect()(JoinCreate);
