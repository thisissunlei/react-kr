import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import Param from 'jquery-param';
import { Fields } from 'redux-form'; 
import {Binder} from 'react-binding';
import ReactMixin from "react-mixin";
import dateFormat from 'dateformat';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import Immutable from 'immutable';

import {reduxForm,formValueSelector,initialize,change,arrayPush,arrayInsert,FieldArray} from 'redux-form';

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
		this.onStationDelete = this.onStationDelete.bind(this);
		this.onStationSelect = this.onStationSelect.bind(this);

		this.getStationUrl = this.getStationUrl.bind(this);
		this.onIframeClose = this.onIframeClose.bind(this);
		this.openStationDialog = this.openStationDialog.bind(this);
		this.onStationUnitPrice = this.onStationUnitPrice.bind(this);
		this.openStationUnitPriceDialog = this.openStationUnitPriceDialog.bind(this);

		this.onStationVosChange = this.onStationVosChange.bind(this);
		this.onChangeSearchPersonel = this.onChangeSearchPersonel.bind(this);


		this.onChangeLeaseBeginDate = this.onChangeLeaseBeginDate.bind(this);
		this.onChangeLeaseEndDate = this.onChangeLeaseEndDate.bind(this);

		this.calcStationNum = this.calcStationNum.bind(this);

		this.isInit = false;
		this.state = {
			stationVos:this.props.stationVos,
			delStationVos:[],
			selectedStation:[],
			openStation:false,
			openStationUnitPrice:false,
		}
	}

	componentDidMount(){
		let {initialValues}= this.props;
		Store.dispatch(initialize('joinCreateForm',initialValues));
	}

	componentWillReceiveProps(nextProps){

		if(!this.isInit && nextProps.stationVos.length){
			let stationVos = nextProps.stationVos;
			this.setState({stationVos},function(){
				this.calcStationNum();
			});
			this.isInit = true;
		}
	}

	//修改租赁期限－开始时间
	onChangeLeaseBeginDate(value){

		value = dateFormat(value,"yyyy-mm-dd hh:MM:ss");

		let {stationVos} = this.state;

		if(!stationVos.length){
			return ;
		}
		stationVos.forEach(function(item,index){
			item.leaseBeginDate = value;
		});
		this.setState({
			stationVos
		});
	}

	//修改租赁期限-结束时间
	onChangeLeaseEndDate(value){
		value = dateFormat(value,"yyyy-mm-dd hh:MM:ss");
		let {stationVos} = this.state;

		if(!stationVos.length){
			return ;
		}
		stationVos.forEach(function(item,index){
			item.leaseEndDate = value;
		});
		this.setState({
			stationVos
		});
	}

	onChangeSearchPersonel(personel){
		Store.dispatch(change('joinCreateForm','lessorContacttel',personel.mobile));
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

	//录入单价
	onStationUnitPrice(form){

		var value = form.price;
		let {stationVos,selectedStation} = this.state;

		stationVos = stationVos.map(function(item,index){
			if(selectedStation.indexOf(index) != -1){
				item.unitprice= value;
			}
			return item;
		});

		this.setState({
			stationVos
		});

		this.openStationUnitPriceDialog();
	}

	//删除工位
	onStationDelete(){
		let {selectedStation,stationVos,delStationVos} = this.state;

		stationVos = stationVos.filter(function(item,index){
			if(selectedStation.indexOf(index) != -1){
				delStationVos.push(item);
				return false;
			}
			return true;
		});

		this.setState({
			stationVos,
			delStationVos
		},function(){
			this.calcStationNum();
		});

	}

	onStationSelect(selectedStation){
		this.setState({
			selectedStation
		})
	}

	openStationDialog(){

		let {changeValues} = this.props;

		let {wherefloor,leaseBegindate,leaseEnddate} = changeValues;

		if(!wherefloor){
			Notify.show([{
				message:'请先选择楼层',
				type: 'danger',
			}]);
			return ;
		}

		if(!leaseBegindate){
			Notify.show([{
				message:'请选择租赁开始时间',
				type: 'danger',
			}]);
			return ;
		}

		if(!leaseEnddate){
			Notify.show([{
				message:'请选择租赁结束时间',
				type: 'danger',
			}]);
			return ;
		}

		this.setState({
			openStation:!this.state.openStation
		});
	}

	onSubmit(form){

		form = JSON.parse(JSON.stringify(form));

		let {stationVos,delStationVos} = this.state;
		let {changeValues} = this.props;

        form.lessorAddress = changeValues.lessorAddress;

		var _this = this;

		form.delStationVos = JSON.stringify(delStationVos);
		form.stationVos = JSON.stringify(stationVos);
				
		form.firstpaydate = dateFormat(form.firstpaydate,"yyyy-mm-dd hh:MM:ss");
		form.signdate = dateFormat(form.signdate,"yyyy-mm-dd hh:MM:ss");
		form.leaseBegindate = dateFormat(form.leaseBegindate,"yyyy-mm-dd hh:MM:ss");
		form.leaseEnddate = dateFormat(form.leaseEnddate,"yyyy-mm-dd hh:MM:ss");

		const {onSubmit} = this.props;
		onSubmit && onSubmit(form);
	}

	onCancel(){
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

	getStationUrl(){

	    let url = "http://optest.krspace.cn/krspace_operate_web/commnuity/communityFloorPlan/toCommunityFloorPlanSel?communityId={communityId}&floors={floors}&goalStationNum={goalStationNum}&goalBoardroomNum={goalBoardroomNum}&selectedObjs={selectedObjs}";

		let {changeValues,initialValues,optionValues} = this.props;
		
		let {stationVos} = this.state;

		stationVos = stationVos.map(function(item){
			var obj = {};
			obj.id = item.stationId;
			obj.type = item.stationType;
			return obj;
		});

		let params = {
			communityId:optionValues.mainbillCommunityId,
			floors:changeValues.wherefloor,
			//工位
			goalStationNum:changeValues.stationnum,
			//会议室
			goalBoardroomNum:changeValues.boardroomnum,
			selectedObjs:JSON.stringify(stationVos)
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
		if(!billList){
			return ;
		}
		var _this = this;
		let {changeValues} = this.props;
		console.log('----',changeValues);
		let {stationVos} = this.state;
		try{
			billList.map(function(item,index){
					var obj = {};
					obj.leaseBeginDate = changeValues.leaseBegindate;
					obj.leaseEndDate = changeValues.leaseEnddate;
					obj.stationId = item.id;
					obj.stationType = item.type;
					obj.unitprice = '';
					obj.whereFloor =  item.wherefloor;
					stationVos.push(obj);
			});
		}catch(err){
			console.log('billList 租赁明细工位列表为空');
		}
		this.setState({stationVos},function(){
			this.calcStationNum();
		}); 
	}

	calcStationNum(){
		let {stationVos} = this.state;

		var stationnum = 0;
		var boardroomnum = 0;

		stationVos.forEach(function(item,index){
			if(item.stationType == 1){
				stationnum++;
			}else{
				boardroomnum++;
			}
		});

		Store.dispatch(change('joinCreateForm','stationnum',stationnum));
		Store.dispatch(change('joinCreateForm','boardroomnum',boardroomnum));
	}

	render(){

		let { error, handleSubmit, pristine, reset, submitting,initialValues,changeValues,optionValues} = this.props;

		let {fnaCorporationList} = optionValues;

		fnaCorporationList && fnaCorporationList.map(function(item,index){
			if(changeValues.leaseId  == item.id){
				changeValues.lessorAddress = item.corporationAddress;
			}
		});

		let {billList,stationVos} = this.state;

		return (


			<div>

<form onSubmit={handleSubmit(this.onSubmit)}>

				<KrField grid={1/2}  name="mainbillid" type="hidden" component="input" /> 
				<KrField grid={1/2}  name="contractstate" type="hidden" component="input" /> 
				<KrField grid={1/2}  name="contracttype" type="hidden" component="input" /> 

				<KrField grid={1}  name="stationnum" type="hidden" component="input" label="工位"/> 
				<KrField grid={1}  name="boardroomnum" type="hidden" component="input" label="会议室"/> 

				<KrField name="leaseId"  grid={1/2} component="select" label="出租方" options={optionValues.fnaCorporationList}   requireLabel={true} />
				<KrField grid={1/2}  name="lessorAddress" type="text" component="labelText" label="地址" value={changeValues.lessorAddress}/> 
				<KrField grid={1/2}  name="lessorContactid" component="searchPersonel" label="联系人" onChange={this.onChangeSearchPersonel} placeholder={optionValues.lessorContactName}  requireLabel={true}  /> 

				<KrField grid={1/2}  name="lessorContacttel" type="text" component="input" label="电话"  requireLabel={true}  /> 

				<KrField grid={1/2}  component="labelText" label="承租方" value={optionValues.customerName} /> 

				<KrField grid={1/2}  name="leaseAddress" type="text" component="input" label="地址"  requireLabel={true}  /> 

				<KrField grid={1/2}  name="leaseContact" type="text" component="input" label="联系人"  requireLabel={true}  /> 
				<KrField grid={1/2}  name="leaseContacttel" type="text" component="input" label="电话"  requireLabel={true}  /> 

				<KrField grid={1/2}  name="communityid" component="labelText" label="所属社区" value={optionValues.communityName}  requireLabel={true} /> 

				<KrField name="wherefloor"  grid={1/2} component="select" label="所在楼层" options={optionValues.floorList} requireLabel={true} />

				<KrField grid={1/2}  name="communityAddress" component="labelText" label="地址" value={optionValues.communityAddress} /> 
				<KrField grid={1/2}  name="contractcode" type="text" component="input" label="合同编号"  requireLabel={true}/> 

				<KrField grid={1/1}  component="group" label="租赁期限" requireLabel={true}> 
					<KrField grid={1/2}  name="leaseBegindate"  component="date" onChange={this.onChangeLeaseBeginDate}/> 
					<KrField grid={1/2}  name="leaseEnddate" component="date" onChange={this.onChangeLeaseEndDate} /> 
				</KrField>

				<KrField name="paymodel"  grid={1/2} component="select" label="付款方式" options={optionValues.paymentList} requireLabel={true} /> 
				<KrField name="paytype"  grid={1/2} component="select" label="支付方式" options={optionValues.payTypeList} requireLabel={true} />

				<KrField grid={1/2}  name="signdate"  component="date" grid={1/2} label="签署时间" defaultValue={initialValues.signdate} requireLabel={true} /> 

				<KrField name="firstpaydate" component="date" label="首付款时间"  requireLabel={true}/> 

				<KrField grid={1}  name="rentaluse" type="text" component="input" label="租赁用途" placeholder="办公使用"  requireLabel={true}/> 

				<KrField grid={1/2}  name="totalrent" type="text" component="input" label="租金总额" placeholder="" requireLabel={true} /> 
				<KrField grid={1/2}  name="totaldeposit" type="text" component="input" label="押金总额" requireLabel={true} /> 
				<KrField grid={1/2}  name="contractmark" component="textarea" label="备注" /> 
				<KrField grid={1}  name="fileIdList" component="file" label="合同附件" defaultValue={optionValues.contractFileList} requireLabel={true}/> 

				<KrField grid={1/1} component="group" label="租赁项目" requireLabel={true}> 
					<KrField grid={1/2}  name="stationnum" type="text" component="labelText" label="工位" value={changeValues.stationnum} /> 
					<KrField grid={1/2}  name="boardroomnum" type="text" component="labelText" label="会议室" value={changeValues.station} /> 
				</KrField>

				<Section title="租赁明细" description="" rightMenu = {
					<Menu>
						<MenuItem primaryText="录入单价"  onTouchTap={this.openStationUnitPriceDialog}/>
						<MenuItem primaryText="删除" onTouchTap={this.onStationDelete} />
						<MenuItem primaryText="租赁"  onTouchTap={this.openStationDialog} />
					</Menu>
				}> 

				<Table  displayCheckbox={true} onSelect={this.onStationSelect}>
				<TableHeader>
				<TableHeaderColumn>类别</TableHeaderColumn>
				<TableHeaderColumn>编号／名称</TableHeaderColumn>
				<TableHeaderColumn>单价(元/月)</TableHeaderColumn>
					<TableHeaderColumn>租赁开始时间</TableHeaderColumn>
						<TableHeaderColumn>租赁结束时间</TableHeaderColumn>
						</TableHeader>
						<TableBody>
						{stationVos.map((item,index)=>{
							var typeLink = {
								value: this.state.stationVos[index].unitprice,
								requestChange: this.onStationVosChange.bind(null, index)
							}
							return (
								<TableRow key={index}>
									<TableRowColumn>{(item.stationType == 1) ?'工位':'会议室'}</TableRowColumn>
									<TableRowColumn>{item.stationName}</TableRowColumn>
									<TableRowColumn>
											<input type="text" name="age"  valueLink={typeLink} />
									</TableRowColumn>
									<TableRowColumn> <Date.Format value={item.leaseBeginDate}/></TableRowColumn>
									<TableRowColumn><Date.Format value={item.leaseEndDate}/></TableRowColumn>

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

	const validate = values =>{

		const errors = {}

		if(!values.leaseId){
			errors.leaseId = '请填写出租方';
		}

		if (!values.lessorContactid) {
			errors.lessorContactid = '请填写出租方联系人';
		}

		if (!values.wherefloor) {
			errors.wherefloor = '请填写';
		}

		if (!values.lessorContacttel) {
			errors.lessorContacttel = '请填写出租方联系电话';
		}

		if (!values.contractcode) {
			errors.contractcode = '请填写合同编号';
		}

		if (!values.leaseContact) {
			errors.leaseContact = '请填写承租方联系人';
		}

		if (!values.leaseContacttel) {
			errors.leaseContacttel = '请填写承租方联系人';
		}

		if (!values.contractcode) {
			errors.leaseContacttel = '请填写承租方联系人';
		}

		if (!values.leaseAddress) {
			errors.leaseAddress = '请填写承租方电话';
		}

		if (!values.fileIdList) {
			errors.fileIdList = '请填写合同附件';
		}

		if (!values.rentaluse) {
			errors.rentaluse = '请填写租赁用途';
		}
		if (!values.totalrent) {
			errors.totalrent = '请填写租金总额';
		}

		if (!values.totaldeposit) {
			errors.totaldeposit = '请填写租金总额';
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

		if (!values.leaseBegindatesigndate) {
			errors.signleaseBegindatedate = '请填写签署时间';
		}

				<KrField gleaseBegindaterid={1/1}  component="group" label="租赁期限" requireLabel={true}> 
					<KrField leaseBegindategrid={1/2}  name="leaseBegindate"  component="date" onChange={this.onChangeLeaseBeginDate}/> 
					<KrField grid={1/2}  name="leaseEnddate" component="date" onChange={this.onChangeLeaseEndDate} /> 
				</KrField>

		if (!values.stationnum && !values.boardroomnum) {
			errors.stationnum = '租赁项目必须填写一项';
		}

		return errors
	}

const selector = formValueSelector('joinCreateForm');

NewCreateForm = reduxForm({ form: 'joinCreateForm',validate,enableReinitialize:true,keepDirtyOnReinitialize:true})(NewCreateForm);

export default connect((state)=>{

	let changeValues = {};

	changeValues.lessorId = selector(state,'lessorId');
	changeValues.leaseId = selector(state,'leaseId');
	changeValues.stationnum = selector(state,'stationnum') || 0;
	changeValues.boardroomnum = selector(state,'boardroomnum') || 0;
	changeValues.leaseBegindate = selector(state,'leaseBegindate');
	changeValues.leaseEnddate = selector(state,'leaseEnddate');
	changeValues.wherefloor = selector(state,'wherefloor');


	return {
		changeValues
	}

})(NewCreateForm);

