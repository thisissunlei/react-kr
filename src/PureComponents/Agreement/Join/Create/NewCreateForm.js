import React, {
	Component,
	PropTypes
} from 'react';

import {
	connect,
	ReduxFrom
} from 'kr/Redux';

import Param from 'jquery-param';
import nzh from 'nzh';
import {
	arrReverse
} from 'kr/Utils';


import {
	Binder
} from 'react-binding';
import ReactMixin from "react-mixin";
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import dateFormat from 'dateformat';

import {
	reduxForm,
	formValueSelector,
	change,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray,
	Field,
	Fields
} from 'redux-form';


import {DateFormat,Http} from 'kr/Utils'
import PlanMapContent from 'kr/PureComponents/PlanMapContent';
import {
	Actions,
	Store
} from 'kr/Redux';

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
	KrDate,
	DotTitle,
	ButtonGroup,
	ListGroup,
	ListGroupItem,
	Paper,
	CircleStyle,
	Tooltip
} from 'kr-ui';
var tabelLength = 0;
var titleChecked = false;

@ReactMixin.decorate(LinkedStateMixin)
class NewCreateForm extends Component {

	static contextTypes = {
		params: React.PropTypes.object.isRequired
	}

	static DefaultPropTypes = {
		initialValues: {
			customerName: '',
			communityName: '',
			lessorAddress: '',
			payTypeList: [],
			paymentList: [],
			fnaCorporationList: [],

		}
	}

	static PropTypes = {
		initialValues: React.PropTypes.object,
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props, context) {
		super(props, context);


		//stationsRefs表单
		this.stationRefs = {};

		this.onCancel = this.onCancel.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onStationDelete = this.onStationDelete.bind(this);
		this.onStationSelect = this.onStationSelect.bind(this);

		this.getStationUrl = this.getStationUrl.bind(this);
		this.onIframeClose = this.onIframeClose.bind(this);
		this.openStationDialog = this.openStationDialog.bind(this);
		this.onStationUnitPrice = this.onStationUnitPrice.bind(this);
		this.openStationUnitPriceDialog = this.openStationUnitPriceDialog.bind(this);
		this.openPreStationUnitPriceDialog = this.openPreStationUnitPriceDialog.bind(this);

		this.onStationVosChange = this.onStationVosChange.bind(this);
		this.onChangeSearchPersonel = this.onChangeSearchPersonel.bind(this);

		this.onChangeLeaseBeginDate = this.onChangeLeaseBeginDate.bind(this);
		this.onChangeLeaseEndDate = this.onChangeLeaseEndDate.bind(this);

		this.calcStationNum = this.calcStationNum.bind(this);


		this.state = {
			stationVos:this.props.initialValues.stationVos|| [],
			selectedStation: [],
			openStation: false,
			openStationUnitPrice: false,
			HeightAuto: false,
			allRent:0,
			checkedArr:[],
			biaodan:[]

		}
	}

	calcStationNum() {
		let {
			stationVos
		} = this.state;

		var stationnum = 0;
		var boardroomnum = 0;

		stationVos.forEach(function(item, index) {
			if (item.stationType == 1) {
				stationnum++;
			} else {
				boardroomnum++;
			}
		});


		Store.dispatch(change('joinCreateForm', 'stationnum', stationnum));
		Store.dispatch(change('joinCreateForm', 'boardroomnum', boardroomnum));
	}

	//修改租赁期限－开始时间
	onChangeLeaseBeginDate(value) {

		value = dateFormat(value, "yyyy-mm-dd");
		let {array } = this.props;
		array.removeAll('saleList')
		let {
			stationVos
		} = this.state;

		if (!stationVos.length) {
			return;
		}
		Store.dispatch(change('joinCreateForm', 'stationVos', []));
		Store.dispatch(change('joinCreateForm', 'totalrent', '0'));

		this.setState({
			stationVos: [],
			allRent:0
		});

	}

	//修改租赁期限-结束时间
	onChangeLeaseEndDate(value) {
		value = dateFormat(value, "yyyy-mm-dd");
		let {array } = this.props;
		array.removeAll('saleList')
		let {
			stationVos
		} = this.state;

		if (!stationVos.length) {
			return;
		}
		Store.dispatch(change('joinCreateForm', 'stationVos', []));
		Store.dispatch(change('joinCreateForm', 'totalrent', '0'));


		this.setState({
			stationVos: [],
			allRent:0
		});

	}

	onStationVosChange(index, value) {

		let {
			stationVos
		} = this.state;
		if(!value ||isNaN(value)){
			stationVos[index].unitprice = "";
		}else{
			stationVos[index].unitprice = value;
		}


		this.setState({
			stationVos
		});
	}

	openPreStationUnitPriceDialog() {
		let {
			selectedStation
		} = this.state;
		if (!selectedStation.length) {
			Notify.show([{
				message: '请先选择要录入单价的工位',
				type: 'danger',
			}]);
			return;
		}
		this.openStationUnitPriceDialog();
	}


	//录入单价dialog
	openStationUnitPriceDialog() {
		this.setState({
			openStationUnitPrice: !this.state.openStationUnitPrice
		});
	}

	//录入单价
	onStationUnitPrice(form) {

		var value = form.price;
		let {
			stationVos,
			selectedStation
		} = this.state;
		let _this = this;
		let {array} = this.props;
		array.removeAll('saleList');

		stationVos = stationVos.map(function(item, index) {
			if (selectedStation.indexOf(index) != -1) {
				item.unitprice = value;
				item.onStationUnitPrice = value;
			}
			return item;
		});
		Store.dispatch(change('joinCreateForm', 'stationVos', stationVos));


		this.setAllRent(stationVos);
		this.setState({
			stationVos,
			openStationUnitPrice:false,
			biaodan:[]
		});

	}

	//删除工位
	onStationDelete() {
		let _this = this;

		let {
			selectedStation,
			stationVos
		} = this.state;
		let allRent = 0;
		stationVos = stationVos.filter(function(item, index) {
			if (selectedStation.indexOf(index) != -1) {
				return false;
			}
			return true;
		});
		Store.dispatch(change('joinCreateForm', 'stationVos', stationVos));
		this.setAllRent(stationVos);


		this.setState({
			stationVos,
			allRent
		}, function() {
			this.calcStationNum();
		});
	}

	onStationSelect(selectedStation) {
		this.setState({
			selectedStation
		})
	}

	openStationDialog() {

		let {
			changeValues
		} = this.props;

		let {
			wherefloor,
			leaseBegindate,
			leaseEnddate
		} = changeValues;

		if (!wherefloor) {
			Notify.show([{
				message: '请先选择楼层',
				type: 'danger',
			}]);
			return;
		}

		if (!leaseBegindate) {
			Notify.show([{
				message: '请选择租赁开始时间',
				type: 'danger',
			}]);
			return;
		}

		if (!leaseEnddate) {
			Notify.show([{
				message: '请选择租赁结束时间',
				type: 'danger',
			}]);
			return;
		}

		if(new Date(leaseEnddate)<new Date(leaseBegindate)){
			Notify.show([{
				message: '结束时间不能小于开始时间',
				type: 'danger',
			}]);
			return;
		}

		this.setState({
			openStation: !this.state.openStation
		});
	}


	componentDidMount() {
		let {
			initialValues
		} = this.props;
		Store.dispatch(initialize('joinCreateForm', initialValues));
		this.setState({
			allRent:initialValues.totalrent
		})
	}

	componentWillReceiveProps(nextProps) {

		if(this.props.initialValues!= nextProps.initialValues){
			Store.dispatch(initialize('joinCreateForm', nextProps.initialValues));
			
		}
		if(this.props.initialValues.stationVos!=nextProps.initialValues.stationVos){
			this.setState({
				stationVos:nextProps.initialValues.stationVos || [],
				allRent:nextProps.initialValues.totalrent || '0'
			})
		}

	}

	onSubmit(form) {


		let {
			stationVos,
			billList
		} = this.state;

		let {
			changeValues
		} = this.props;
		if (!stationVos.length) {
			Notify.show([{
				message: "请选择工位",
				type: 'danger',
			}]);
			return;
		};
		form.lessorAddress = changeValues.lessorAddress;

		form.firstpaydate = dateFormat(form.firstpaydate, "yyyy-mm-dd 00:00:00");
		form.signdate = dateFormat(form.signdate, "yyyy-mm-dd 00:00:00");
		form.leaseBegindate = dateFormat(form.leaseBegindate, "yyyy-mm-dd 00:00:00");
		form.leaseEnddate = dateFormat(form.leaseEnddate, "yyyy-mm-dd 00:00:00");
		form.contractVersionType = 'NEW';
		// form.totalrent = (this.state.allRent).toFixed(2);
		if(!!!form.agreement){
			form.agreement = '无';
		}
		var _this = this;

		form.stationVos = stationVos;
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(form);
	}

	onCancel() {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}

	getStationUrl() {
		let {
			changeValues,
			initialValues,
			optionValues
		} = this.props;
		let {
			stationVos
		} = this.state;

		stationVos = stationVos.map(function(item) {

			var obj = {};
			obj.id = item.stationId;
			obj.belongType = item.stationType;
			

			return obj;
		});

		let params = {
			mainBillId:  this.props.initialValues.mainbillid,
			communityId: optionValues.mainbillCommunityId,
			floors: changeValues.wherefloor,
			//工位
			goalStationNum: changeValues.stationnum,
			//独立空间
			goalBoardroomNum: changeValues.boardroomnum,
			selectedObjs: stationVos,
			startDate: DateFormat(changeValues.leaseBegindate, "yyyy-mm-dd 00:00:00"),
			endDate: DateFormat(changeValues.leaseEnddate, "yyyy-mm-dd 00:00:00"),
			unitprice:0

		};
		return params;

	}
	onBlur=(item)=>{
		let {stationVos} = this.state;
		Store.dispatch(change('joinCreateForm', 'stationVos', stationVos));
		this.setAllRent(stationVos);

	}
	setAllRent=(list)=>{
		let _this = this;
		let {array} = this.props;
		array.removeAll('saleList')
		let stationList = list.map((item)=>{
		if(!item.unitprice){
				item.originalUnitprice = 0;
				item.unitprice = 0;
			}else{
				item.originalUnitprice = (item.unitprice+'').replace(/\s/g,'');
				item.unitprice = (item.unitprice+'').replace(/\s/g,'');
			}
			return item;
		})
		Http.request('getAllRent','',{stationList:JSON.stringify(list)}).then(function(response) {
			_this.setState({
				allRent:response,
				biaodan:[]
			})
			Store.dispatch(change('joinCreateForm', 'totalrent', response.toFixed(2)));

		}).catch(function(err) {
			console.log(err)
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}

	onIframeClose(billList) {
		let {array} = this.props;


		billList = [].concat(billList);

		this.openStationDialog();

		if (!billList) {
			return;
		}

		var _this = this;

		let {
			changeValues,
			initialValues
		} = this.props;

		let {
			stationVos
		} = this.state;

		try {
			billList.map(function(item, index) {
				item.leaseBeginDate = changeValues.leaseBegindate;
				item.leaseEndDate = changeValues.leaseEnddate;
				item.stationId = item.id;
				item.stationType = item.type;
				item.stationName = item.name;
				item.unitprice = '';
				item.whereFloor = item.whereFloor;
			});
		} catch (err) {
		}

		Store.dispatch(change('joinCreateForm', 'stationVos', billList));




		this.setState({
			stationVos: billList,
			allRent:0,
			biaodan:[]
		}, function() {
			this.calcStationNum();
			array.removeAll('saleList')
		});
	}

	onChangeSearchPersonel(personel) {
		Store.dispatch(change('joinCreateForm', 'lessorContacttel', personel.mobile));
		Store.dispatch(change('joinCreateForm', 'lessorContactName', personel.lastname));
	}
	showMore = () => {
		this.setState({
			HeightAuto: !this.state.HeightAuto
		})

	}
	dealRentName=(allRent)=>{
		let name = '';
		var nzhcn = nzh.cn;
		if(!allRent){
			return '零';
		}
		let  allRentName = nzhcn.encodeB(parseFloat(allRent));
		let allRentNameArray = allRentName.split('点');
		if(allRentNameArray.length==1){
			name = allRentNameArray[0] + '元整';
		}else{
			let xiaoshu = allRentNameArray[1];
			name = allRentNameArray[0]+'元'+xiaoshu[0]+'角';
			if(xiaoshu[1]){
				name = name+xiaoshu[1]+'分';
			}
		}
		return name;
	}


	rowCheck = (event,index) =>{

		
		var checkedArr = [].concat(this.state.checkedArr);
		var key = checkedArr.indexOf(index);
		
		if(event.target.checked){
			if(key===-1){
				checkedArr.push(index);
			}
		}else{
			if(key!==-1){
				checkedArr.splice(key,1);
				
			}
		}
		
		if(checkedArr.length === tabelLength){
			this.titleCheckbox.checked = true;
		}else{
			titleChecked = true;
			this.titleCheckbox.checked = false;
		}
		console.log('checkedArr',checkedArr)
		this.setState({
			checkedArr,
		})

	}
	addRow = (fields) =>{

		let {
			changeValues
		} = this.props;

		let {
			wherefloor,
			leaseBegindate,
			leaseEnddate
		} = changeValues;

		if (!wherefloor) {
			Notify.show([{
				message: '请先选择楼层',
				type: 'danger',
			}]);
			return;
		}

		if (!leaseBegindate) {
			Notify.show([{
				message: '请选择租赁开始时间',
				type: 'danger',
			}]);
			return;
		}

		if (!leaseEnddate) {
			Notify.show([{
				message: '请选择租赁结束时间',
				type: 'danger',
			}]);
			return;
		}

		if(new Date(leaseEnddate)<new Date(leaseBegindate)){
			Notify.show([{
				message: '结束时间不能小于开始时间',
				type: 'danger',
			}]);
			return;
		}

		fields.push();
		
		setTimeout(()=>{

			if(titleChecked){
				this.allChecked();
				this.clearCheckBox(false);
			}
		},50)
	}
	removeRow=(fields)=>{
		let {checkedArr,biaodan} = this.state;
		var newArr = arrReverse(checkedArr);
		if(newArr.length){
			this.clearCheckBox(true);
		}
		newArr.map((item,index)=>{
			fields.remove(item);
			biaodan.splice(item,0)

		})
		if(tabelLength == newArr.length){
			this.titleCheckbox.checked = false;
			titleChecked = false;
		}
		this.setState({
			checkedArr:[],
			biaodan:biaodan
		})
	}
	clearCheckBox = (type) =>{
		for(let i = 0;i<tabelLength;i++){
			if(type){
				if(this["checkbox"+i]){
					this["checkbox"+i].checked = false;
				} 
			}else{
				this["checkbox"+i].checked = true;
			}
			
			
		}
	}
	allChecked = () =>{
		var checkedArr = [];
		for(let i=0;i<tabelLength;i++){
			checkedArr.push(i);
		}
		this.setState({
			checkedArr,
		})
	}
	handeOnCheck = (event) =>{
		var handeCheck=event.target.checked;
		console.log('handeOnCheck',handeCheck)
		var checkedArr = [];
		if(handeCheck){
			this.clearCheckBox(false);
			this.allChecked();
		}else{
			this.clearCheckBox(true);
			this.setState({
				checkedArr:[]
			})
			
		}
		
		titleChecked = handeCheck;
	
		
		
	}
	renderBrights=({fields})=>{
		console.log('fields',fields);
		const self = this;
		tabelLength = fields.length;
		return (
			<div className="ui-tables">
				 <Grid style={{marginTop:"-28px",marginBottom:"10px"}}>
					<Row>
						<Col align="right">
							<ButtonGroup>
								<Button label="添加优惠"  onTouchTap={() => {this.addRow(fields)}}  />
								<Button label="删除"  onTouchTap={() => {this.removeRow(fields)}}  />
						  </ButtonGroup>
						</Col>
					</Row>
				</Grid>
			<table>
				<thead>
				<tr className="hander">
					<td>
						<input onChange ={this.handeOnCheck} 
						ref = {(ref)=>{
							self.titleCheckbox = ref;
						}}
						name="mm"
						type="checkbox" 
					/></td>
					<td style={{width:100}}>优惠类型</td>
					<td>开始时间</td>
					<td style={{width:130}}>结束时间</td>
					<td style={{width:80}}>折扣</td>
					<td style={{width:100}}>优惠金额</td>
				</tr>
				</thead>
				<tbody>
				{
					this.renderTr(fields)
				}
				</tbody>

			</table>
			</div>




		)
	}
	renderTr=(fields)=>{
		let self = this;
		let {
			changeValues
		} = this.props;

		let {
			wherefloor,
			leaseBegindate,
			leaseEnddate
		} = changeValues;
		let {biaodan}= this.state;
		let keyList = this.props.optionValues.saleList;
		return(
		fields.map((member, index) =>{
					if(biaodan[index] == 1){
					return(<tr key={index} className="hander">
					     <td style={{verticalAlign:'middle'}}>

					     <input type="checkbox"
						onChange = {(event)=>{
							self.rowCheck(event,index)
						}}
						ref = {(ref)=>{
							self["checkbox"+index] = ref;
						}}/></td>
				        <td >
					        <KrField
					          name={`${member}.tacticsType`}
					          type="text"
					          component='select'
					          options={keyList}
					          onChange={(event)=>{
							self.changeType(event,index,fields)
							}}/>
				        </td>
				        <td style={{textAlign:'center'}}>
					        <KrField  name={`${member}.validBegin`} type="hidden" component="input" />

					        <span style={{display:'inline-block',marginTop:'10px'}}>{leaseBegindate.substring(0,10)}</span>
				        </td>
				        <td style={{textAlign:'center'}}>
					        <KrField  name={`${member}.validEnd`} type="hidden" component="input" />

					        <span style={{display:'inline-block',marginTop:'10px'}}>{leaseEnddate.substring(0,10)}</span>

				        </td>
				        <td>
					        <KrField
					          name={`${member}.discount`}
					          type="text"
					          component='text'
					          value={member.type}
					          onBlur={(event)=>{
								self.zhekou(event,fields,index)
								}}/>
				        </td>
				        <td  style={{textAlign:'center'}}>
				        	<KrField
					          name={`${member}.discountAmount`}
					          type="text"
					          component='text'
					          disabled={false}/>
				        </td>
				      </tr>
				    )}else if(biaodan[index] == 2){
				    	return(
				    	<tr key={index} className="hander">
					     <td style={{verticalAlign:'middle'}}>
					     <input type="checkbox"
						onChange = {(event)=>{
							self.rowCheck(event,index)
						}}
						ref = {(ref)=>{
							self["checkbox"+index] = ref;
						}}/></td>
				        <td style={{verticalAlign:'top'}}>
					        <KrField
					          name={`${member}.tacticsType`}
					          type="text"
					          component='select'
					          options={keyList}
					          onChange={(event)=>{
							self.changeType(event,index,fields)
							}}/>
				        </td>
				       	<td style={{textAlign:'center'}}>
					        <KrField  name={`${member}.validBegin`} type="hidden" component="input" />
					        <span style={{display:'inline-block',marginTop:'10px'}}>{leaseBegindate.substring(0,10)}</span>
				        </td>
				        <td>
					        <KrField
					          name={`${member}.validEnd`}
					          type="text"
					          style={{width:120}}
					          component='date'
					          onChange={(event)=>{
								self.changeEndDate(event,fields,index)
								}}/>
				        </td>
					    <td style={{textAlign:'center'}}>

					        <span style={{display:'inline-block',marginTop:'10px'}}>-</span>
				        </td>
				        <td>
					        <KrField
					          name={`${member}.discountAmount`}
					          type="text"
					          component='text'
					          display={true}/>

				        </td>
				      </tr>
				    )
				    }else if(biaodan[index] == 3) {
				    	return(
				    	<tr key={index} className="hander">
					     <td style={{verticalAlign:'middle'}}>
					     <input type="checkbox"
						onChange = {(event)=>{
							self.rowCheck(event,index)
						}}
						ref = {(ref)=>{
							self["checkbox"+index] = ref;
						}}/></td>
				        <td style={{verticalAlign:'top'}}>
					        <KrField
					          name={`${member}.tacticsType`}
					          type="text"
					          component='select'
					          options={keyList}
					          onChange={(event)=>{
							self.changeType(event,index,fields)
							}}/>
				        </td>
				        <td>
					        <KrField
					          name={`${member}.validStart`}
					          type="text"
					          style={{width:120}}
					          component='date'
					          />
				        </td>
				        <td style={{textAlign:'center'}}>
					        <KrField  name={`${member}.validEnd`} type="hidden" component="input" />

					        <span style={{display:'inline-block',marginTop:'10px'}}>{leaseEnddate.substring(0,10)}</span>
				        </td>
				         <td style={{textAlign:'center'}}>
					        <span style={{display:'inline-block',marginTop:'10px'}}>-</span>
				        </td>
				        <td>
					        <KrField
					          name={`${member}.discountAmount`}
					          type="text"
					          component='text'/>
				        </td>
				      </tr>
				    )
				    }else {
				    	return(
				    	<tr key={index} className="hander">
					     <td style={{verticalAlign:'middle'}}>
					     <input type="checkbox"
						onChange = {(event)=>{
							self.rowCheck(event,index)
						}}
						ref = {(ref)=>{
							self["checkbox"+index] = ref;
						}}/></td>
				        <td style={{verticalAlign:'top'}}>
					        <KrField
					          name={`${member}.tacticsType`}
					          type="text"
					          component='select'
					          options={keyList}
					          onChange={(event)=>{
							self.changeType(event,index,fields)
							}}/>
				        </td>
				        <td>
					        <KrField
					          name={`${member}.validStart`}
					          type="text"
					          style={{width:120}}
					          component='date'
					          />
				        </td>
				        <td>
					        <KrField
					          name={`${member}.validEnd`}
					          type="text"
					          style={{width:120}}
					          component='date'/>
				        </td>
				        <td>
					        <KrField
					          name={`${member}.discount`}
					          type="text"
					          component='text'
					          value={member.type}/>
				        </td>
				        <td>
					        <KrField
					          name={`${member}.discountAmount`}
					          type="text"
					          component='text'/>
				        </td>
				      </tr>
				    )
				    }


				})
		)


	}
	changeType=(e,index,fields)=>{
		console.log('changeType',e,index,fields)
		let {biaodan} = this.state;
		let {changeValues} = this.props;
		let same = false;
		let sameFree = false;
		biaodan[index] = e.value;
		console.log('changeValues',biaodan,biaodan.length);
		biaodan.map((item)=>{
			if(item == 2 && !same){
				same = true;
			}else if(item == 2 && same){
				Notify.show([{
					message: '只可以选择一次折扣',
					type: 'danger',
				}]);
				biaodan.splice(index,1)
				fields.remove(index);
			}else if(item == 1 && !sameFree){
				sameFree = true
			}else if(item == 3 && !sameFree){
				sameFree = true;
			}else if(sameFree){
				Notify.show([{
					message: '只可以选择一个免期活动',
					type: 'danger',
				}]);
				biaodan.splice(index,1)
				fields.remove(index);
			}
		})
		this.setState({
			biaodan
		},()=>{
			this.renderBrights({fields})
		})
		setTimeout(()=>{
			this.addRow(fields);
			fields.remove(tabelLength-1)

		},50)
	}
	changeEndDate=(e,fields,index)=>{
		console.log('changeEndDate',e,fields,index);
		let {changeValues,initialValues,optionValues} = this.props;
		let {saleList}  = optionValues;
		let {stationVos} = this.state;
		let endTime = +new Date(e);
		let validEnd = +new Date(changeValues.leaseEnddate);
		let tacticsId = '';
		

		//校验时间选择的时间不得大于租赁结束时间
		if(endTime>=validEnd){
			Notify.show([{
				message: '选择的时间不得大于租赁结束时间',
				type: 'danger',
			}]);
			return;
		}
		saleList.map((item)=>{
			if(item.value == changeValues.saleList[index].tacticsType){
			   	tacticsId = item.id;
			}
		})


		let time = {
			validStart :changeValues.leaseBegindate,
			validEnd:e,
			tacticsType:changeValues.saleList[index].tacticsType,
			tacticsId:tacticsId,
			discount:0
		}
		fields.remove(index);
		fields.insert(index,time)

		changeValues.saleList[index] = Object.assign({},time)
		
		let params = {
			stationVos:JSON.stringify(stationVos),
			saleList:JSON.stringify(changeValues.saleList),
			communityId:optionValues.mainbillCommunityId,
			leaseBegindate:changeValues.leaseBegindate,
			leaseEnddate:changeValues.leaseEnddate
		};
		this.getSaleMoney(params,fields,index);

	}
	zhekou=(e,fields,index)=>{
		let {changeValues,initialValues,optionValues} = this.props;
		let {saleList}  = optionValues;
		let {stationVos} = this.state;
		let tacticsId = '';
		let _this = this;
		if(!e ||isNaN(e)){
			Notify.show([{
				message: '折扣只能为数字',
				type: 'danger',
			}]);
			return;
		}
		if(e>9.9){
			Notify.show([{
				message: '折扣不能大于9.9',
				type: 'danger',
			}]);
			return;
		}
		saleList.map((item)=>{
			if(item.value == changeValues.saleList[index].tacticsType && item.discount>e){
				let message = '折扣不能小于'+item.discount;
				Notify.show([{
					message: message,
					type: 'danger',
				}]);
				return;
			}
			if(item.value == changeValues.saleList[index].tacticsType){
			   	tacticsId = item.id;
			}
		})
		let time = {
			validStart :changeValues.leaseBegindate,
			validEnd:changeValues.leaseEnddate,
			tacticsType:changeValues.saleList[index].tacticsType,
			tacticsId:tacticsId,
			discount:e
		}
		changeValues.saleList[index] = Object.assign({},time)
		
		let params = {
			stationVos:JSON.stringify(stationVos),
			saleList:JSON.stringify(changeValues.saleList),
			communityId:optionValues.mainbillCommunityId,
			leaseBegindate:changeValues.leaseBegindate,
			leaseEnddate:changeValues.leaseEnddate
		};
		this.getSaleMoney(params,fields,index);
	}
	getSaleMoney=(params,fields,index)=>{
		let sale = JSON.parse(params.saleList);
		let length = sale.length;
		for(let i = length-1;i>=0;i--){
			if(!sale[i]){
				sale.splice(i,1);
			}
		}
		params.saleList=JSON.stringify(sale);
		let _this = this;
		Http.request('count-sale', '',params).then(function(response){
			fields.remove(index);
			let saleContent = response.saleList[index];
			fields.insert(index,{
				tacticsType:saleContent.tacticsType,
				discountAmount:saleContent.discountAmount,
				discount:saleContent.discount,
				validEnd:saleContent.validEnd,
				validStart:saleContent.validStart
			})
			Store.dispatch(change('joinCreateForm', 'totalrent', response.totalrent));

			_this.setState({
				totalrent:response.totalrent,
				allRent:response.totalrent
			})
		}).catch(function(err){
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);

		})
	}

	render() {
		var _this = this;
		let {
			error,
			handleSubmit,
			pristine,
			reset,
			submitting,
			initialValues,
			changeValues,
			optionValues
		} = this.props;
		let {
			fnaCorporationList
		} = optionValues;

		fnaCorporationList && fnaCorporationList.map(function(item, index) {
			if (changeValues.leaseId == item.id) {
				changeValues.lessorAddress = item.corporationAddress;
			}
		});

		let {
			billList,
			stationVos,
			HeightAuto,
			allRent
		} = this.state;
		let  allRentName = this.dealRentName(allRent);
		var agreementValue = '如社区申请增加补充条款的，补充条款内容经法务审核通过后，社区将审核通过的内容邮件发送法务林玉洁（linyujie@krspace.cn），抄送技术部田欢（tianhuan@krspace.cn），冯西臣（fengxichen@krspace.cn），由技术部修改该内容，修改后邮件回复社区即可联网打印盖章版本。';


		return (


			<div style={{width:615,marginLeft: "-20px"}}>

		<form className="join-form join-dialog-form" onSubmit={handleSubmit(this.onSubmit)} >
		<div className="cheek" style={{paddingLeft:0,marginLeft:23}}>
			<div className="titleBar" style={{marginLeft:-23}}><span className="order-number">1</span><span className="wire"></span><label className="small-title">租赁明细</label></div>
			<div className="small-cheek">
				<KrField name="wherefloor" style={{width:262,marginLeft:25,fontSize:"14px"}} component="select" label="所在楼层" options={optionValues.floorList} multi={true} requireLabel={true}/>
				<KrField style={{width:343,marginLeft:25,position:"absolute"}} component="group" label="租赁期限" requireLabel={true}>
					<ListGroup>
						<ListGroupItem style={{width:'141',padding:0,marginLeft:'-10px',marginTop:'-10px'}}> <KrField name="leaseBegindate" style={{width:141}} component="date" onChange={this.onChangeLeaseBeginDate} simple={true}/></ListGroupItem>
						<ListGroupItem style={{width:'31',textAlign:'center',padding:0,marginLeft:10,marginTop:'-10px'}}><span style={{display:'inline-block',lineHeight:'60px',width:'31px',textAlign:'center',left:'10px',position:"relative"}}>至</span></ListGroupItem>
						<ListGroupItem style={{width:'141',padding:0,marginTop:'-10px'}}> <KrField style={{width:141}} name="leaseEnddate" component="date" onChange={this.onChangeLeaseEndDate} simple={true}/> </ListGroupItem>
					</ListGroup>
				</KrField>

				<div className="detail-list" style={{marginTop:"-35px",marginLeft:"35px",width:"621px"}}>

				<DotTitle title='租赁明细' style={{marginTop:53,marginBottom:25,paddingLeft:0,paddingRight:0}}>

				       <Grid style={{marginTop:"-28px",marginBottom:"10px"}}>
							<Row>
								<Col align="right">
									<ButtonGroup>
										<Button label="选择工位"  onTouchTap={this.openStationDialog}  />
									    <Button label="批量录入单价" width={100} onTouchTap={this.openPreStationUnitPriceDialog} />
										<Button label="删除" cancle={true} type="button" height={28} onTouchTap={this.onStationDelete} />

								  </ButtonGroup>
								</Col>
							</Row>
						</Grid>
		<div  className={HeightAuto?'auto':'station-list'} style={{marginTop:"-10px"}}>
				<Table  displayCheckbox={true} onSelect={this.onStationSelect}>
				<TableHeader>
				<TableHeaderColumn>类别</TableHeaderColumn>
				<TableHeaderColumn>编号／名称</TableHeaderColumn>
				<TableHeaderColumn>单价(元/月)</TableHeaderColumn>
					<TableHeaderColumn>租赁开始时间</TableHeaderColumn>
						<TableHeaderColumn>租赁结束时间</TableHeaderColumn>
						</TableHeader>
						<TableBody>
						{
							stationVos.map((item, index) => {
								var typeLink = {
									value: this.state.stationVos[index].unitprice,
									requestChange: this.onStationVosChange.bind(null, index)
								}
								return (
									<TableRow key={index}>
										<TableRowColumn>{(item.stationType == 1) ?'工位':'独立空间'}</TableRowColumn>
										<TableRowColumn>{item.stationName}</TableRowColumn>
										<TableRowColumn>
												<input type="text" name="age"  valueLink={typeLink}  onBlur={this.onBlur.bind(this,item)} style={{maxWidth:'128px'}}/>
										</TableRowColumn>
										<TableRowColumn> <KrDate value={item.leaseBeginDate}/></TableRowColumn>
										<TableRowColumn><KrDate value={item.leaseEndDate}/></TableRowColumn>

										</TableRow>
								);
							})
						}
						</TableBody>

						</Table>
					</div>
						{stationVos.length>5?<div className="bottom-tip"  onTouchTap={this.showMore}> <p><span>{HeightAuto?'收起':'展开'}</span><span className={HeightAuto?'toprow':'bottomrow'}></span></p></div>:''}

                        </DotTitle>
                    {optionValues.saleList && <DotTitle title='优惠明细' style={{marginTop:53,marginBottom:25,paddingLeft:0,paddingRight:0}}>
						<FieldArray name='saleList' component={this.renderBrights}/>

				    </DotTitle>}
                     <div className="all-rent" style={{marginTop:'0px',marginBottom:25,fontSize:14}}>服务费总计：<span style={{marginRight:50,color:'red'}}>￥{allRent|| '0'}</span><span>{allRentName}</span></div>

					</div>

				<div className="titleBar" style={{marginLeft:-23}}><span className="order-number">2</span><span className="wire"></span><label className="small-title">合同基本信息</label></div>
					<div className="small-cheek" style={{paddingBottom:0}}>
					<KrField   name="mainbillid" type="hidden" component="input" />

					<KrField   name="contractstate" type="hidden" component="input" />
					<KrField   name="stationVos" type="hidden" component="input" />

					<KrField   name="contracttype" type="hidden" component="input" />
					<KrField   name="mainbillid" type="hidden" component="input" />

					<KrField grid={1}  name="stationnum" type="hidden" component="input" label="工位"/>
					<KrField grid={1}  name="boardroomnum" type="hidden" component="input" label="独立空间"/>



					<KrField name="leaseId" style={{width:262,marginLeft:25}}  component="select" label="出租方" options={optionValues.fnaCorporationList} requireLabel={true} />

					<div className="lessor-address" ><KrField style={{width:262,marginLeft:25}} name="lessorAddress" type="text" inline={false} component="labelText" label="地址" value={changeValues.lessorAddress}  defaultValue="无" toolTrue={true}/></div>


					<KrField  style={{width:262,marginLeft:25}}  name="lessorContactid" component="searchPersonel" label="联系人" onChange={this.onChangeSearchPersonel} requireLabel={true} placeholder={initialValues.lessorContactName}/>
					<KrField  style={{width:262,marginLeft:25}} name="lessorContacttel" type="text" component="input" label="电话" requireLabel={true} 
					   requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>
					

					<KrField   style={{width:262,marginLeft:25}}  component="labelText" label="承租方" inline={false} value={optionValues.customerName}/>

					<KrField  style={{width:262,marginLeft:25}}  name="leaseAddress" type="labelText" component="input" label="地址" requireLabel={true} tooltip={true}
					requiredValue={true} pattern={/^.{0,120}$/} errors={{requiredValue:'地址为必填项',pattern:'地址最大60位'}} />

					<KrField  style={{width:262,marginLeft:25}} name="leaseContact" type="text" component="input" label="联系人" requireLabel={true}
					requiredValue={true} pattern={/^.{0,20}$/} errors={{requiredValue:'联系人为必填项',pattern:'联系人最大20位'}} />
					<KrField   style={{width:262,marginLeft:25}}  name="leaseContacttel" type="labelText" component="input" label="电话" requireLabel={true}
					 requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>

					<KrField   style={{width:262,marginLeft:25}} name="communityid" component="labelText" inline={false} label="所属社区" value={optionValues.communityName} />



					<KrField    style={{width:262,marginLeft:25,position:"relative"}}  name="communityAddress" component="labelText" toolTrue={true} label="地址" inline={false} value={optionValues.communityAddress}  />


					<KrField style={{width:262,marginLeft:25}} name="contractcode" component="labelText" label="合同编号" value={initialValues.contractcode} inline={false}/>




					<KrField name="paymodel"  style={{width:262,marginLeft:25}}  component="select" label="付款方式" options={optionValues.paymentList} requireLabel={true} />
					<KrField name="paytype"  style={{width:262,marginLeft:25}}   component="select" label="支付方式" options={optionValues.payTypeList} requireLabel={true} />

					<KrField  name="signdate"  style={{width:262,marginLeft:25}} component="date"  label="签署时间" defaultValue={initialValues.signdate} requireLabel={true}/>

					<KrField  style={{width:262,marginLeft:25}}  name="firstpaydate" component="date" label="首付款时间" requireLabel={true}  />



					<KrField  style={{width:262,marginLeft:25}} name="totalrent" type="text" component="labelText" label="租金总额" placeholder="" requireLabel={true}
					value={allRent} defaultValue='0' inline={false}
					requiredValue={true} pattern={/^\d{0,16}(\.\d{0,2})?$/} errors={{requiredValue:'租金总额为必填项',pattern:'请输入正数金额，小数点后最多两位'}} />
					<KrField  style={{width:262,marginLeft:25}}  name="totaldeposit" type="text" component="input" label="押金总额" requireLabel={true}
					requiredValue={true} pattern={/^\d{0,16}(\.\d{0,2})?$/} errors={{requiredValue:'押金总额为必填项',pattern:'请输入正数金额，小数点后最多两位'}} />
						<KrField style={{width:262,marginLeft:25}}  name="stationnum" component="labelText" type="text" label="租赁工位" value={changeValues.stationnum} defaultValue="0" requireLabel={true} inline={false}/>
					<KrField  style={{width:262,marginLeft:25}} name="boardroomnum" component="labelText" type="text" label="租赁独立空间" value={changeValues.boardroomnum} defaultValue="0" requireLabel={true} inline={false}/>

					<KrField  style={{width:545,marginLeft:25}}  name="contractmark" component="textarea" label="备注" maxSize={200}/>
					<KrField style={{width:545,marginLeft:25}}  name="agreement" type="textarea" component="labelText" inline={false} label="双方其他约定内容" maxSize={200} value={agreementValue}/>

				</div>

				<div className="end-round"></div>
		</div>
	</div>

				<KrField  style={{width:545,marginLeft:25,marginTop:'-20px'}} name="contractFileList" component="input" type="hidden" label="合同附件"/>
				<KrField  style={{width:545,marginLeft:25,marginTop:'-20px',paddingLeft:"25px"}} name="fileIdList" component="file" label="合同附件" defaultValue={initialValues.contractFileList || []} onChange={(files)=>{
					Store.dispatch(change('joinCreateForm','contractFileList',files));
				}} />

						<Grid>
						<Row style={{paddingBottom:50}}>
						<Col md={12} align="center">
							<ButtonGroup>
								<Button  label="确定" type="submit"  disabled={submitting} />
								<Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}/>
							</ButtonGroup>
						  </Col>
						</Row>
						</Grid>

						</form>


					<Dialog
						title="分配工位"
						autoScrollBodyContent={true}
						contentStyle ={{ width: '100%', maxWidth: 'none',height:650}}
						open={this.state.openStation}
						onClose={this.openStationDialog}
						 >
							<PlanMapContent data={this.getStationUrl()} onClose={this.onIframeClose}/>

					  </Dialog>

					<Dialog
						title="录入单价"
						autoScrollBodyContent={true}
						onCancel={this.openStationUnitPriceDialog}
						open={this.state.openStationUnitPrice}
						 contentStyle={{width:436}}
						 onClose={this.openStationUnitPriceDialog}
						>
								<UnitPriceForm  onSubmit={this.onStationUnitPrice} onCancel={this.openStationUnitPriceDialog}/>
					  </Dialog>

			</div>);
	}
}

const validate = values => {

	const errors = {}

	++values.num;
	localStorage.setItem(values.mainbillid+''+values.customerId+values.contracttype+'create',JSON.stringify(values));


	if (!values.leaseId) {
		errors.leaseId = '请输入出租方';
	}

	if (!values.lessorContactid) {
		errors.lessorContactid = '请输入出租方联系人';
	}

	if (!values.wherefloor) {
		errors.wherefloor = '请输入所在楼层';
	}
	/*
		if (!values.lessorContacttel) {
			errors.lessorContacttel = '请输入出租方联系电话';
		}
	*/

	if (!values.contractcode) {
		errors.contractcode = '请输入合同编号';
	}

	if (!values.leaseContact) {
		errors.leaseContact = '请输入承租方联系人';
	}

	if (!values.leaseAddress) {
		errors.leaseAddress = '请输入承租方地址';
	}

	if (values.leaseAddress && !isNaN(values.leaseAddress)) {
		errors.leaseAddress = '承租方地址不能为数字';
	}

	if (!String(values.totalrent)) {
		errors.totalrent = '请输入租金总额';
	}

	if (values.totalrent && isNaN(values.totalrent)) {
		errors.totalrent = '租金总额必须为数字';
	}


	if (!values.totaldeposit) {
		errors.totaldeposit = '请输入押金总额';
	}

	if (values.totaldeposit && isNaN(values.totaldeposit)) {
		errors.totaldeposit = '押金总额必须为数字';
	}


	if (!values.paymodel) {
		errors.paymodel = '请输入付款方式';
	}

	if (!values.paytype) {
		errors.paytype = '请输入支付方式';
	}

	if (!values.signdate) {
		errors.signdate = '请输入签署时间';
	}

	if (!values.leaseBegindate) {
		errors.leaseBegindate = '请输入租赁开始时间';
	}

	if (!values.firstpaydate) {
		errors.firstpaydate = '请输入首付款时间';
	}

	if (!values.leaseEnddate) {
		errors.leaseEnddate = '请输入租赁结束时间';
	}

	if (!values.saleList || !values.saleList.length) {
    	errors.saleList = { _error: 'At least one member must be entered' }
	 } else {
	    const saleListArrayErrors = []
	    values.saleList.forEach((member, memberIndex) => {
	      const memberErrors = {}
	      if (!member || !member.tacticsType) {
	        memberErrors.tacticsType = '请选择优惠项'
	        saleListArrayErrors[memberIndex] = memberErrors
	      }
	      if (member && member.tacticsType==1 && !member.discount) {
	        memberErrors.discount = '请填写折扣'
	        saleListArrayErrors[memberIndex] = memberErrors
	      }
	      if (member && member.tacticsType==2 && !member.validEnd) {
	        memberErrors.validEnd = '请选择时间'
	        saleListArrayErrors[memberIndex] = memberErrors
	      }
	    })
	    if(saleListArrayErrors.length) {
	      errors.saleList = saleListArrayErrors
	    }
	  }


	return errors
}

const selector = formValueSelector('joinCreateForm');

NewCreateForm = reduxForm({
	form: 'joinCreateForm',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(NewCreateForm);

export default connect((state) => {

	let changeValues = {};

	changeValues.lessorId = selector(state, 'lessorId');
	changeValues.leaseId = selector(state, 'leaseId');
	changeValues.stationnum = selector(state, 'stationnum') || 0;
	changeValues.boardroomnum = selector(state, 'boardroomnum') || 0;
	changeValues.leaseBegindate = selector(state, 'leaseBegindate');
	changeValues.leaseEnddate = selector(state, 'leaseEnddate');
	changeValues.wherefloor = selector(state, 'wherefloor') || 0;
	changeValues.saleList = selector(state, 'saleList') || [];

	return {
		changeValues
	}

})(NewCreateForm);
