import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import Param from 'jquery-param';
import { Fields } from 'redux-form';
import {Binder} from 'react-binding';
import ReactMixin from "react-mixin";
import LinkedStateMixin from 'react-addons-linked-state-mixin';

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

		this.onStationSubmit = this.onStationSubmit.bind(this);
		this.onStationCancel = this.onStationCancel.bind(this);

		this.onStationDelete = this.onStationDelete.bind(this);
		this.onStationSelect = this.onStationSelect.bind(this);

		this.openStationDialog = this.openStationDialog.bind(this);
		this.onStationUnitPrice = this.onStationUnitPrice.bind(this);
		this.openStationUnitPriceDialog = this.openStationUnitPriceDialog.bind(this);
		this.onChangeSearchPersonel = this.onChangeSearchPersonel.bind(this);
		this.onStationVosChange = this.onStationVosChange.bind(this);

		this.state = {
			stationVos:[
				{id:122},
				{id:12},
				{id:1232},
			],
			selectedStation:[],
			openStation:false,
			openStationUnitPrice:false,
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

// station list
	onStationCancel(){
		this.openStationDialog();
	}

	onStationSubmit(selectedList){

		let {stationVos} = this.state;
		let  result = stationVos;

		stationVos.forEach(function(item,index){
			selectedList.forEach(function(selected,i){
				if (item.id !=selected.id) {
						result.push(selected);
				}
			});
		});
		console.log("0000",result);
		this.setState({
				stationVos:result
		});
		this.openStationDialog();
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
		Store.dispatch(initialize('joinCreateForm',initialValues));
	}

	componentWillReceiveProps(nextProps){

	}

	onSubmit(form){


		form = Object.assign({},form);
		console.log('18911374700',form);
		
		let {changeValues} = this.props;

		let {stationVos} = this.state;
		
		console.log('sdh',stationVos);
		
    	form.lessorAddress = changeValues.lessorAddress;
		form.stationVos =  stationVos;
		console.log('dddddddd',changeValues)
		form.stationVos = JSON.stringify(form.stationVos);

		const {onSubmit} = this.props;
		onSubmit && onSubmit(form);
	}

	onCancel(){
		const {onCancel} = this.props;
		onCancel && onCancel();
	}
	onChangeSearchPersonel(personel){
		console.log('personel',personel)
		Store.dispatch(change('joinCreateForm','lessorContacttel',personel.mobile));
	}
	render(){

		let { error, handleSubmit, pristine, reset, submitting,initialValues,changeValues,optionValues} = this.props;

		let {fnaCorporationList} = optionValues;

		fnaCorporationList && fnaCorporationList.map(function(item,index){
			if(changeValues.leaseId  == item.id){
				changeValues.lessorAddress = item.corporationAddress;
			}
		});

		let {stationVos} = this.state;

		return (
	<div>

<form onSubmit={handleSubmit(this.onSubmit)}>

				<KrField grid={1/2}  name="mainbillid" type="hidden" component="input" />
				<KrField grid={1/2}  name="contractstate" type="hidden" component="input" />
				<KrField grid={1/2}  name="contracttype" type="hidden" component="input" />

				<KrField name="leaseId"  grid={1/2} component="select" label="出租方" options={optionValues.fnaCorporationList}  />
				<KrField grid={1/2}  name="lessorAddress" type="text" component="labelText" label="地址" value={changeValues.lessorAddress}/>
				<KrField grid={1/2}  name="lessorContactid" component="searchPersonel" label="联系人" onChange={this.onChangeSearchPersonel} />
				<KrField grid={1/2}  name="lessorContacttel" type="text" component="input" label="电话" />

				<KrField grid={1/2}  component="labelText" label="承租方" value={optionValues.customerName}/>

				<KrField grid={1/2}  name="leaseAddress" type="text" component="input" label="地址" />

				<KrField grid={1/2}  name="leaseContact" type="text" component="input" label="联系人" />
				<KrField grid={1/2}  name="leaseContacttel" type="text" component="input" label="电话" />

				<KrField grid={1/2}  name="communityid" component="labelText" label="所属社区" value={optionValues.communityName} />

				<KrField grid={1/2}  name="communityAddress" component="labelText" label="地址" value={optionValues.communityAddress} />
				<KrField grid={1/2}  name="contractcode" type="text" component="input" label="合同编号"  />
				<KrField name="paytype"  grid={1/2} component="select" label="支付方式" options={optionValues.payTypeList} />
				<KrField name="paymodel"  grid={1/2} component="select" label="付款方式" options={optionValues.paymentList} /> 
				<KrField name="firstpaydate" component="date" label="首付款时间" value={optionValues.firstpaydate} /> 
				 <KrField grid={1/2}  name="signdate"  component="date" grid={1/2} label="签署时间"value={optionValues.signdate}/> 
				<KrField grid={1/1}  name="rentaluse" type="text" component="input" label="租赁用途" />
				<KrField grid={1/2}  name="totalrent"  component="labelText" label="租金总额" />
				<KrField grid={1/2}  name="totaldeposit" type="text" component="input" label="押金总额" />
				

				<KrField grid={1/1}  name="contractmark" component="textarea" label="备注" />
				<KrField grid={1}  name="fileIdList" component="file" label="合同附件" />

				<Section title="租赁明细" description="" rightMenu = {
					<Menu>
						<MenuItem primaryText="续租"  onTouchTap={this.openStationDialog} />
					</Menu>
				}>

				<Table  displayCheckbox={true} onSelect={this.onStationSelect}>
				<TableHeader>
				<TableHeaderColumn>类别</TableHeaderColumn>
				<TableHeaderColumn>编号／名称</TableHeaderColumn>
				<TableHeaderColumn>单价(元/月)</TableHeaderColumn>
					<TableHeaderColumn>开始时间</TableHeaderColumn>
						<TableHeaderColumn>结束时间</TableHeaderColumn>
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
						open={this.state.openStation} >
								<AllStation onSubmit={this.onStationSubmit} onCancel={this.onStationCancel}/>
					  </Dialog>


			</div>);
	}
	}
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


	return {
		changeValues
	}

})(NewCreateForm);
