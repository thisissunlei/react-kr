import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import Param from 'jquery-param';
import { Fields } from 'redux-form';
import {Binder} from 'react-binding';
import ReactMixin from "react-mixin";
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import dateFormat from 'dateformat';

import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray} from 'redux-form';

import {Actions,Store} from 'kr/Redux';

import AllStation from './AllStation';

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
	KrDate,
} from 'kr-ui';

@ReactMixin.decorate(LinkedStateMixin)
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

		this.onStationSubmit = this.onStationSubmit.bind(this);
		this.onStationCancel = this.onStationCancel.bind(this);

		this.onStationDelete = this.onStationDelete.bind(this);
		this.onStationSelect = this.onStationSelect.bind(this);

		this.openStationDialog = this.openStationDialog.bind(this);
		this.openStationUnitPriceDialog = this.openStationUnitPriceDialog.bind(this);
		this.onChangeSearchPersonel = this.onChangeSearchPersonel.bind(this);
		this.onStationVosChange = this.onStationVosChange.bind(this);
		this.reduceMoney = this.reduceMoney.bind(this);
		this.state = {
			stationVos:[],
			selectedStation:[],
			openStation:false,
			openStationUnitPrice:false,
			rentamount:0,
		}
	}

	onStationVosChange(index,value){
		let {stationVos} = this.state;
		 stationVos[index].unitprice = value;
	 	this.setState({stationVos});
	}

	//录入单价dialog
	openStationUnitPriceDialog(){
		this.setState({
			openStationUnitPrice:!this.state.openStationUnitPrice
		});
	}

	onChangeSearchPersonel(personel){
		Store.dispatch(change('reduceCreateForm','lessorContacttel',personel.mobile));
		Store.dispatch(change('reduceCreateForm','lessorContactName',personel.lastname));
		
	}

// station list
	onStationCancel(){
		this.openStationDialog();
	}

	onStationSubmit(stationVos){

		stationVos.map((item)=>{
			item.leaseBeginDate = dateFormat(item.leaseBeginDate,"yyyy-mm-dd hh:MM:ss");
			item.leaseEndDate = dateFormat(item.startDate,"yyyy-mm-dd hh:MM:ss");
		});

		this.setState({
			stationVos
		});

		this.openStationDialog();
		this.reduceMoney(stationVos, 'add');
	}

	// 计算减租金额
	reduceMoney(selectedList,from){
		console.log(selectedList);
		
		if(from === 'add'){
			var {rentamount} = this.state;
		}else{
			var rentamount = 0;
		}
		console.log('result', rentamount);
		var sum  = rentamount;
		selectedList.forEach(function(value){
			
			try{
				var price = parseFloat((value.unitprice*12/365).toFixed(2));
				var start = Date.parse(value.leaseBeginDate);
				var  end= Date.parse(value.leaseEndDate);
				var num =  Math.floor((end-start)/(3600*24*1000));
				sum += num*price;
				return parseFloat(sum).toFixed(2);


			}catch(err){
				console.log(err,'err');
			}

			
		});
		console.log(sum);
		this.setState({
			rentamount:sum
		});

	}

	//删除工位
	onStationDelete(){

		let {selectedStation,stationVos} = this.state;
		stationVos = stationVos.filter(function(item,index){

			if(selectedStation.indexOf(index) != -1){
				return false;
			}
			return true;
		});
		this.reduceMoney(stationVos, 'less');
		this.setState({
			stationVos
		});
	}

	onStationSelect(selectedStation){
		this.setState({
			selectedStation
		})
	}

	openStationDialog(){
		this.setState({
			openStation:!this.state.openStation
		});
	}

	componentDidMount(){
		let {initialValues}= this.props;
		Store.dispatch(initialize('reduceCreateForm',initialValues));
	}

	componentWillReceiveProps(nextProps){

	}

	onSubmit(form){

		form = Object.assign({},form);

		let {changeValues} = this.props;
		let {stationVos} = this.state;

		if(!stationVos.length){
			Notify.show([{
				message:"请选择工位",
				type: 'danger',
			}]);
			return ;
		};

		form.list = stationVos;
		form.lessorAddress = changeValues.lessorAddress;
		// form.lessorContactid = 111;
		form.rentamount= this.state.rentamount;
		form.leaseBegindate = stationVos[0].leaseBeginDate;
		form.leaseEnddate = stationVos[0].leaseEndDate;

		form.firstpaydate = dateFormat(form.firstpaydate,"yyyy-mm-dd hh:MM:ss");

		var _this = this;

		form.stationVos =  stationVos;

		form.stationVos = JSON.stringify(form.stationVos);

		const {onSubmit} = this.props;
		onSubmit && onSubmit(form);
	}

	onCancel(){
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

	render(){

		let { error, handleSubmit, pristine, reset, submitting,initialValues,changeValues,optionValues} = this.props;

		let {fnaCorporationList} = optionValues;

		fnaCorporationList && fnaCorporationList.map(function(item,index){
			if(changeValues.leaseId  == item.id){
				changeValues.lessorAddress = item.corporationAddress;
			}
		});

		let {stationVos, rentamount} = this.state;

		return (
	<div>

<form onSubmit={handleSubmit(this.onSubmit)}>

				<KrField grid={1/2}  name="mainbillid" type="hidden" component="input" />
				<KrField grid={1/2}  name="contractstate" type="hidden" component="input" />
				<KrField grid={1/2}  name="contracttype" type="hidden" component="input" />
				<KrField grid={1/2}  name="leaseBegindate" type="hidden" component="input" />

				<KrField name="leaseId"  grid={1/2} component="select" label="出租方" options={optionValues.fnaCorporationList}  requireLabel={true} />
				<KrField grid={1/2}  name="lessorAddress" type="text" component="labelText" label="地址" value={changeValues.lessorAddress}  defaultValue="无"/>
				<KrField grid={1/2}  name="lessorContactid" component="searchPersonel" label="联系人" onChange={this.onChangeSearchPersonel} requireLabel={true} />
				<KrField grid={1/2}  name="lessorContacttel" type="text" component="input" label="电话" requireLabel={true}  />

				<KrField grid={1/2}  component="labelText" label="承租方" value={optionValues.customerName}/>

				<KrField grid={1/2}  name="leaseAddress" type="text" component="input" label="地址" requireLabel={true} />

				<KrField grid={1/2}  name="leaseContact" type="text" component="input" label="联系人" requireLabel={true} />
				<KrField grid={1/2}  name="leaseContacttel" type="text" component="input" label="电话" requireLabel={true} />

				<KrField grid={1/2}  name="communityid" component="labelText" label="所属社区" value={optionValues.communityName} />

				<KrField grid={1/2}  name="communityAddress" component="labelText" label="地址" value={optionValues.communityAddress} requireLabel={true} />
				<KrField grid={1/2}  name="contractcode" type="text" component="input" label="合同编号"  requireLabel={true} />

				<KrField name="paymodel"  grid={1/2} component="select" label="付款方式" options={optionValues.paymentList} requireLabel={true} /> 
				<KrField name="paytype"  grid={1/2} component="select" label="支付方式" options={optionValues.payTypeList} requireLabel={true} />
				<KrField name="firstpaydate" component="date" label="首付款时间"  requireLabel={true} /> 

				<KrField grid={1/2}  name="signdate"  component="date"  label="签署时间" requireLabel={true} />
				<KrField grid={1}  name="rentaluse" type="text" component="input" label="租赁用途" placeholder="办公使用"  requireLabel={true} /> 
				<KrField grid={1/2}  name="totalrent" type="text" component="input" label="租金总额" placeholder="" requireLabel={true} /> 
				<KrField grid={1/2}  name="totaldeposit" type="text" component="input" label="押金总额" requireLabel={true}  />

				<KrField grid={1/1}  name="contractmark" component="textarea" label="备注" />
				<KrField grid={1}  name="fileIdList" component="file" label="合同附件" requireLabel={true} defaultValue={[]} />

				<Section title="租赁明细" description="" rightMenu = {
					<Menu>
						<MenuItem primaryText="删除" onTouchTap={this.onStationDelete} />
						<MenuItem primaryText="续租"  onTouchTap={this.openStationDialog} />
					</Menu>
				}>

				<Table  displayCheckbox={true} onSelect={this.onStationSelect}>
				<TableHeader>
				<TableHeaderColumn>类别</TableHeaderColumn>
				<TableHeaderColumn>编号／名称</TableHeaderColumn>
				<TableHeaderColumn>单价(元/月)</TableHeaderColumn>
					<TableHeaderColumn>开始时间</TableHeaderColumn>
						<TableHeaderColumn>续租结束日期</TableHeaderColumn>
						</TableHeader>
						<TableBody>
						{stationVos.map((item,index)=>{
							return (
								<TableRow key={index}>
									<TableRowColumn>{(item.stationType == 1) ?'工位':'会议室'}</TableRowColumn>
									<TableRowColumn>{item.stationName}</TableRowColumn>
									<TableRowColumn>
											{item.unitprice}
									</TableRowColumn>
									<TableRowColumn> <KrDate.Format value={item.leaseBeginDate}/></TableRowColumn>
									<TableRowColumn><KrDate.Format value={item.leaseEndDate}/></TableRowColumn>

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


					<Dialog
						title="分配工位"
						open={this.state.openStation}
						modal={true}
						autoScrollBodyContent={true}
						autoDetectWindowHeight={true} >
								<AllStation onSubmit={this.onStationSubmit} onCancel={this.onStationCancel}/>
					  </Dialog>


			</div>);
	}
	}



	const validate = values =>{

		const errors = {}

		if(!values.leaseId){
			errors.leaseId = '请填写出租方';
		}

		if (!values.lessorContactid) {
			errors.lessorContactid = '请填写出租方联系人';
		}

		if (!values.lessorContacttel) {
			errors.lessorContacttel = '请填写出租方联系电话';
		}

		if (!values.leaseContact) {
			errors.leaseContact = '请填写承租方联系人';
		}

		if (!values.leaseContacttel) {
			errors.leaseContacttel = '请填写承租方联系人';
		}


		if (!values.leaseAddress) {
			errors.leaseAddress = '请填写承租方地址';
		}

		if (values.leaseAddress && !isNaN(values.leaseAddress)) {
			errors.leaseAddress = '承租方地址不能为数字';
		}

		if (!values.fileIdList) {
			errors.fileIdList = '请填写合同附件';
		}
		if (!values.contractcode) {
			errors.contractcode = '请填写合同编号';
		}
		
		if (!values.rentaluse) {
			errors.rentaluse = '请填写租赁用途';
		}
		if (!values.totalrent) {
			errors.totalrent = '请填写租金总额';
		}

		if (!values.totaldeposit) {
			errors.totaldeposit = '请填写押金总额';
		}

		if (!values.paymodel) {
			errors.paymodel = '请填写付款方式';
		}

		if (!values.paytype) {
			errors.paytype = '请填写支付方式';
		}

		if (!values.signdate) {
			errors.signdate = '请填写签署时间';
		}

		if (!values.stationnum && !values.boardroomnum) {
			errors.stationnum = '租赁项目必须填写一项';
		}

		return errors
	}


const selector = formValueSelector('reduceCreateForm');

NewCreateForm = reduxForm({ form: 'reduceCreateForm',validate,enableReinitialize:true,keepDirtyOnReinitialize:true})(NewCreateForm);

export default connect((state)=>{

	let changeValues = {};

	changeValues.lessorId = selector(state,'lessorId');
	changeValues.leaseId = selector(state,'leaseId');
	changeValues.stationnum = selector(state,'stationnum') || 0;
	changeValues.boardroomnum = selector(state,'boardroomnum') || 0;
	changeValues.leaseBegindate = selector(state,'leaseBegindate') || 0;
	changeValues.leaseEnddate = selector(state,'leaseEnddate') || 0;
	changeValues.wherefloor = selector(state,'wherefloor') || 0;


	return {
		changeValues
	}

})(NewCreateForm);
