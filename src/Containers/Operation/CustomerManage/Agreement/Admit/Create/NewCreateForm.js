import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import Param from 'jquery-param';
import { Fields } from 'redux-form'; 
import {Binder} from 'react-binding';

import {reduxForm,formValueSelector,initialize,arrayPush,arrayInsert,FieldArray} from 'redux-form';

import {Actions,Store} from 'kr/Redux';

import UnitPriceForm from './UnitPriceForm';

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
	IframeContent,
	Date,
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


		//stationsRefs表单
		this.stationRefs = {};

		this.onCancel  = this.onCancel.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onStationDelete = this.onStationDelete.bind(this);
		this.onStationSelect = this.onStationSelect.bind(this);

		this.getStationUrl = this.getStationUrl.bind(this);
		this.onIframeClose = this.onIframeClose.bind(this);
		this.openStationDialog = this.openStationDialog.bind(this);
		this.getDateFormat = this.getDateFormat.bind(this);
		this.onStationUnitPrice = this.onStationUnitPrice.bind(this);
		this.openStationUnitPriceDialog = this.openStationUnitPriceDialog.bind(this);

		this.state = {
			selectedStation:[],
			billList:[],
			openStation:false,
			openStationUnitPrice:false,
			stationForm:{}
		}
	}

	//录入单价dialog
	openStationUnitPriceDialog(){
		this.setState({
			openStationUnitPrice:!this.state.openStationUnitPrice
		});
	}

	//录入单价
	onStationUnitPrice(form){

		var value = form.price;
		let {stationForm,billList,selectedStation} = this.state;

		billList.map(function(item,index){
			if(selectedStation.indexOf(index) != -1){
				stationForm['station-'+index] = value;
			}
		});

		this.setState({
			stationForm
		});

		this.openStationUnitPriceDialog();
	}

	//删除工位
	onStationDelete(){

		let {selectedStation,billList} = this.state;
		billList = billList.filter(function(item,index){

			if(selectedStation.indexOf(index) != -1){
				return false;
			}
			return true;
		});
		console.log('---->>>>>aaaa>',billList);
		this.setState({
			billList
		});
	}

	onStationSelect(selectedStation){
		this.setState({
			selectedStation
		})
	}

	openStationDialog(){

		let {changeValues} = this.props;


		let {wherefloor} = changeValues;

		if(!wherefloor){
			Notify.show([{
				message:'请先选择楼层',
				type: 'danger',
			}]);
			return ;
		}

		this.setState({
			openStation:!this.state.openStation
		});
	}

	componentDidMount(){
		let {initialValues}= this.props;
		Store.dispatch(initialize('joinCreateForm',initialValues));
	}

	componentWillReceiveProps(nextProps){

	}

	getDateFormat(value,format){

		var result = '';
		var dt = new Date(value);
		var result =  dt.getFullYear()+'-'+(1+dt.getMonth())+'-'+dt.getDay()+' '+dt.getHours()+':'+dt.getMinutes()+':'+dt.getSeconds();

		return result;
	}

	onSubmit(form){

		delete form.floorList;
		delete form.customerName;
		delete form.payTypeList;
		delete form.paymentList;
		delete form.fnaCorporationList;

		let {billList} = this.state;

		let {changeValues} = this.props;

        form.lessorAddress = changeValues.lessorAddress;

		let stationVos = [];


		var _this = this;

		try{
			billList.map(function(item,index){
					var obj = {};
				/*
					obj.leaseBeginDate = _this.getDateFormat(changeValues.leaseBegindate);
					obj.leaseEndDate = _this.getDateFormat(changeValues.leaseEnddate);
				*/
					obj.stationId = item.id;
					obj.stationType = item.type;
					obj.unitprice = '';
					obj.whereFloor =  item.wherefloor;
					stationVos.push(obj);
			});

		}catch(err){
			console.log('billList 租赁明细工位列表为空');
		}

		form.stationVos =  stationVos;

		let {stationForm} = this.state;
		for(var i in stationForm){
			if(stationForm.hasOwnProperty(i)){
				var value = stationForm[i];
				var index = i.split('-').pop();
				var obj = stationVos[index];
				obj.unitprice = value; 
				stationVos[index] = obj;
			}
		}

		form.stationVos = JSON.stringify(form.stationVos);

		console.log('00000',form);
		const {onSubmit} = this.props;
		onSubmit && onSubmit(form);

	}

	onCancel(){
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

	getStationUrl(){

	    let url = "http://optest.krspace.cn/krspace_operate_web/commnuity/communityFloorPlan/toCommunityFloorPlanSel?communityId={communityId}&floors={floors}&goalStationNum={goalStationNum}&goalBoardroomNum={goalBoardroomNum}&selectedObjs={selectedObjs}";

		let {changeValues,initialValues} = this.props;

		let params = {
			communityId:initialValues.mainbillCommunityId,
			floors:changeValues.wherefloor,
			//工位
			goalStationNum:changeValues.stationnum,
			//会议室
			goalBoardroomNum:changeValues.boardroomnum,
			selectedObjs:"[{type:1,id:883}]"
		};

		if(Object.keys(params).length){
			for (let item in params) {
				if (params.hasOwnProperty(item)) {
					url = url.replace('{' + item + '}', params[item]);
					delete params[item];
				}
			}
		}

		return url ;
	}

	onIframeClose(billList){

		this.openStationDialog();

		console.log('data',billList);

		if(!billList){
			return ;
		}

		this.setState({
			billList
		});
	}


	render(){

		let { error, handleSubmit, pristine, reset, submitting,initialValues,changeValues} = this.props;

		let {fnaCorporationList} = initialValues;

		fnaCorporationList && fnaCorporationList.map(function(item,index){
			if(changeValues.leaseId  == item.id){
				changeValues.lessorAddress = item.corporationAddress;
			}
		});

		let {billList} = this.state;

		return (


			<div>


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
											<TableHeaderColumn>租赁开始时间</TableHeaderColumn>
											<TableHeaderColumn>租赁结束时间</TableHeaderColumn>
									</TableHeader>
									<TableBody>
										{initialValues.billList.map((item,index)=>{
											return (
												<TableRow key={index}>
													<TableRowColumn>{item.stationType}</TableRowColumn>
													<TableRowColumn>{item.stationId}</TableRowColumn>
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


					<Dialog
						title="分配工位"
						autoScrollBodyContent={true}
						contentStyle ={{ width: '100%', maxWidth: 'none'}}
						open={this.state.openStation} >
							<IframeContent src={this.getStationUrl()} onClose={this.onIframeClose}/>
					  </Dialog>

					<Dialog
						title="录入单价"
						autoScrollBodyContent={true}
						open={this.state.openStationUnitPrice} >
								<UnitPriceForm  onSubmit={this.onStationUnitPrice} onCancel={this.openStationUnitPriceDialog}/>
					  </Dialog>

			</div>);
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
	changeValues.leaseId = selector(state,'leaseId');
	changeValues.stationnum = selector(state,'stationnum') || 0;
	changeValues.boardroomnum = selector(state,'boardroomnum') || 0;
	changeValues.leaseBegindate = selector(state,'leaseBegindate') || 0;
	changeValues.leaseEnddate = selector(state,'leaseEnddate') || 0;
	changeValues.wherefloor = selector(state,'wherefloor') || 0;

	console.log("0000chann",changeValues);

	return {
		changeValues
	}

})(NewCreateForm);

