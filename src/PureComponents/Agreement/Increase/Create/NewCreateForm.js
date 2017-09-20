import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';
import Param from 'jquery-param';
import {
	Fields
} from 'redux-form';
import {
	Binder
} from 'react-binding';
import ReactMixin from "react-mixin";
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import dateFormat from 'dateformat';
import nzh from 'nzh';
import PlanMapContent from 'kr/PureComponents/PlanMapContent';
import {Http,DateFormat,arrReverse} from 'kr/Utils'
import {
	reduxForm,
	formValueSelector,
	change,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray
} from 'redux-form';

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
	DotTitle,
	ButtonGroup,
	ListGroup,
	ListGroupItem,
	Paper,
	KrDate,
	CircleStyle
} from 'kr-ui';
import './index.less';

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
			stationVos: this.props.initialValues.stationVos||[],
			selectedStation: [],
			openStation: false,
			openStationUnitPrice: false,
			HeightAuto: false,
			allRent:this.props.initialValues.totalrent || '0',
			biaodan:this.props.initialValues.biaodan || [],
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
		Store.dispatch(change('increaseCreateForm', 'stationnum', stationnum));
		Store.dispatch(change('increaseCreateForm', 'boardroomnum', boardroomnum));
	}

	//修改租赁期限－开始时间
	onChangeLeaseBeginDate(value) {
		let {array} = this.props;
		array.removeAll('saleList')

		value = dateFormat(value, "yyyy-mm-dd 00:00:00");

		let {
			stationVos
		} = this.state;

		if (!stationVos.length) {
			return;
		}

		Store.dispatch(change('increaseCreateForm', 'stationVos', []));

		this.setState({
			stationVos: [],
			biaodan:[]
		});
		this.setAllRent([]);
	}

	//修改租赁期限-结束时间
	onChangeLeaseEndDate(value) {
		let {array} = this.props;
		array.removeAll('saleList')
		value = dateFormat(value, "yyyy-mm-dd 00:00:00");
		let {
			stationVos
		} = this.state;

		if (!stationVos.length) {
			return;
		}
		Store.dispatch(change('increaseCreateForm', 'stationVos', []));

		this.setAllRent([]);

		this.setState({
			stationVos: [],
			biaodan:[]
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

		stationVos = stationVos.map(function(item, index) {
			if (selectedStation.indexOf(index) != -1) {
				item.unitprice = value;
			}
			return item;
		});
		Store.dispatch(change('increaseCreateForm', 'stationVos', stationVos));

		this.setAllRent(stationVos);

		this.setState({
			stationVos,
		});

		this.openStationUnitPriceDialog();
	}

	//删除工位
	onStationDelete() {

		let {
			selectedStation,
			stationVos
		} = this.state;
		let {array} = this.props;
		array.removeAll('saleList');
		stationVos = stationVos.filter(function(item, index) {

			if (selectedStation.indexOf(index) != -1) {
				return false;
			}
			return true;
		});
		let _this = this;
		Store.dispatch(change('increaseCreateForm', 'stationVos', stationVos));
		this.setAllRent(stationVos)

		this.setState({
			stationVos,
			biaodan:[]
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
		Store.dispatch(initialize('increaseCreateForm', initialValues));
		this.setState({
			allRent:initialValues.totalrent,
			biaodan:initialValues.biaodan || []
		})
	}

	componentWillReceiveProps(nextProps) {

		if(this.props.initialValues!= nextProps.initialValues){
			Store.dispatch(initialize('increaseCreateForm', nextProps.initialValues));
			
		}
		if(this.props.initialValues.stationVos!=nextProps.initialValues.stationVos){
			this.setState({
				stationVos:nextProps.initialValues.stationVos || [],
				allRent:nextProps.initialValues.totalrent || '0',
				biaodan:nextProps.initialValues.biaodan || []
			})
		}

	}

	onSubmit(form) {


		let {
			stationVos,			
		} = this.state;
		if (!stationVos.length) {
			Notify.show([{
				message: '请选择工位',
				type: 'danger',
			}]);
			return;
		}
		let unitprice = true;
		stationVos.map(function(item, index) {
			if (!item.unitprice) {
				unitprice = false;
			}
			return unitprice;
		})
		if (!unitprice) {
			Notify.show([{
				message: '请输入工位单价!',
				type: 'danger',
			}]);
			return;
		}


		let {
			billList,
			allRent
		} = this.state;

		let {
			changeValues
		} = this.props;

		form.lessorAddress = changeValues.lessorAddress;
		form.list = stationVos;
		form.firstpaydate = dateFormat(form.firstpaydate, "yyyy-mm-dd 00:00:00");
		form.signdate = dateFormat(form.signdate, "yyyy-mm-dd 00:00:00");
		form.leaseBegindate = dateFormat(form.leaseBegindate, "yyyy-mm-dd 00:00:00");
		form.leaseEnddate = dateFormat(form.leaseEnddate, "yyyy-mm-dd 00:00:00");
		form.contractVersionType = 'NEW';
		form.totalrent = allRent;
		form.stationVos = stationVos;
		if(!!!form.agreement){
			form.agreement = '无';
		}
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
			//独立空间独立空间
			goalBoardroomNum: changeValues.boardroomnum,
			selectedObjs: stationVos,
			startDate: DateFormat(changeValues.leaseBegindate, "yyyy-mm-dd 00:00:00"),
			endDate: DateFormat(changeValues.leaseEnddate, "yyyy-mm-dd 00:00:00"),
			unitprice:0

		};
		return params;
	}

	onIframeClose(billList) {

		this.openStationDialog();


		if (!billList) {
			return;
		}

		var _this = this;

		let {
			changeValues
		} = this.props;

		let stationVos = [];

		try {
			billList && billList.map(function(item, index) {
				var obj = {};
				obj.leaseBeginDate = changeValues.leaseBegindate;
				obj.leaseEndDate = changeValues.leaseEnddate;
				obj.stationId = item.id;
				obj.stationName = item.name;
				obj.stationType = item.type;
				obj.unitprice = '';
				obj.whereFloor = item.whereFloor;
				stationVos.push(obj);
			});
		} catch (err) {
		}

		Store.dispatch(change('increaseCreateForm', 'stationVos', stationVos));


		this.setState({
			stationVos
		}, function() {
			this.calcStationNum();
		});

	}

	onChangeSearchPersonel(personel) {
		Store.dispatch(change('increaseCreateForm', 'lessorContacttel', personel.mobile));
		Store.dispatch(change('increaseCreateForm', 'lessorContactName', personel.lastname));
	}
	showMore = () => {
		this.setState({
			HeightAuto: !this.state.HeightAuto
		})

	}
	onBlur=(item)=>{
		let {stationVos} = this.state;
		let allMoney = 0;
		Store.dispatch(change('increaseCreateForm', 'stationVos', stationVos));

		this.setAllRent(stationVos);

	}
	setAllRent=(list)=>{
		let _this = this;
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
		Http.request('getAllRent','',{stationList:JSON.stringify(stationList)}).then(function(response) {
			_this.setState({
				allRent:response
			})
			Store.dispatch(change('increaseCreateForm', 'totalrent', response));

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}
	dealRentName=()=>{
		let {allRent} = this.state;
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
				let _this = this;
				if(newArr.length){
					this.clearCheckBox(true);
				}
				newArr.map((item,index)=>{
					fields.remove(item);
					biaodan.splice(item,1)
		
				})
				if(tabelLength == newArr.length){
					this.titleCheckbox.checked = false;
					titleChecked = false;
				}
				this.setState({
					checkedArr:[],
					biaodan:biaodan
				},function(){
					_this.showFields(fields)
				})
			}
			showFields=(fields)=>{
				let {changeValues,optionValues} = this.props;
				let {stationVos} = this.state;
				let params = {
					stationVos:JSON.stringify(stationVos),
					saleList:JSON.stringify(changeValues.saleList),
					communityId:optionValues.mainbillCommunityId,
					leaseBegindate:changeValues.leaseBegindate,
					leaseEnddate:changeValues.leaseEnddate
				};
				this.getSaleMoney(params,fields);
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
					changeValues,
					initialValues
				} = this.props;
		
				let {
					wherefloor,
					leaseBegindate,
					leaseEnddate
				} = changeValues;
				let {biaodan}= this.state;
				let keyList = this.props.optionValues.saleList;
				let leaseBeginDate =  leaseBegindate || initialValues.leaseBegindate;
				let leaseEndDate =  leaseEnddate || initialValues.leaseEnddate;
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
		
									<span style={{display:'inline-block',marginTop:'10px'}}>{leaseBeginDate.substring(0,10)}</span>
								</td>
								<td style={{textAlign:'center'}}>
									<KrField  name={`${member}.validEnd`} type="hidden" component="input" />
		
									<span style={{display:'inline-block',marginTop:'10px'}}>{leaseEndDate.substring(0,10)}</span>
		
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
									<span style={{display:'inline-block',marginTop:'10px'}}>{leaseBeginDate.substring(0,10)}</span>
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
									   onChange={(event)=>{
								self.changeBeginDate(event,fields,index)
								}}
									  />
								</td>
								<td style={{textAlign:'center'}}>
									<KrField  name={`${member}.validEnd`} type="hidden" component="input" />
		
									<span style={{display:'inline-block',marginTop:'10px'}}>{leaseEndDate.substring(0,10)}</span>
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
				let {biaodan} = this.state;
		let {changeValues,optionValues} = this.props;
		let {saleList} = optionValues;
		let same = false;
		let sameFree = false;
		let showWarn = false;
		biaodan[index] = e.value;

		let tacticsId = '';
		saleList.map((item)=>{
			if(item.value == e.value){
			   	tacticsId = item.id;
			}
		})
		let time = {}
		if(e.value == 1){
			time = {
				validStart :changeValues.leaseBegindate,
				validEnd:changeValues.leaseEnddate,
				tacticsType:1,
				tacticsId:tacticsId,
				// discount:7

			}
		}
		if(e.value == 2){
			time = {
				validStart :changeValues.leaseBegindate,
				// validEnd:changeValues.leaseEnddate,
				tacticsType:2,
				tacticsId:tacticsId,
				// discount:7

			}
		}
		if(e.value == 3){
			time = {
				// validStart :changeValues.leaseBegindate,
				validEnd:changeValues.leaseEnddate,
				tacticsType:3,
				tacticsId:tacticsId,

			}
		}


		fields.remove(index);
		fields.insert(index,time);

		biaodan.map((item)=>{
			if(item == 1 && !same){
				same = true;
			}else if(item == 1 && same){
				Notify.show([{
					message: '只可以选择一次折扣',
					type: 'danger',
				}]);
				biaodan.splice(index,1)
				fields.remove(index);
				return;
			}else if(item == 3 && sameFree){
				showWarn = true;
				Notify.show([{
					message: '免期只能选择一种',
					type: 'danger',
				}]);
				biaodan.splice(index,1)
				fields.remove(index);
				return;
			}else if(item == 2 && sameFree){
				showWarn = true;
				Notify.show([{
					message: '免期只能选择一种',
					type: 'danger',
				}]);
				biaodan.splice(index,1)
				fields.remove(index);
				return

			}else if(item == 2 && !sameFree){
				sameFree = true
			}else if(item == 3 && !sameFree){
				sameFree = true;
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
				let validStart = +new Date(changeValues.leaseBegindate);
				let tacticsId = '';
				
		
				//校验时间选择的时间不得大于租赁结束时间
				if(endTime>=validEnd){
					Notify.show([{
						message: '选择的时间不得大于租赁结束时间',
						type: 'danger',
					}]);
					return;
				}
				if(endTime<validStart){
					Notify.show([{
						message: '选择的时间不得小于租赁开始时间',
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
			changeBeginDate=(e,fields,index)=>{
				console.log('changeEndDate',e,fields,index);
				let {changeValues,initialValues,optionValues} = this.props;
				let {saleList}  = optionValues;
				let {stationVos} = this.state;
				let beginTime = +new Date(e);
				let validStart = +new Date(changeValues.leaseBegindate);
				let validEnd = +new Date(changeValues.leaseEnddate);
				let tacticsId = '';
				
		
				//校验时间选择的时间不得大于租赁结束时间
				if(beginTime<=validStart){
					Notify.show([{
						message: '选择的时间不得小于于租赁开始时间',
						type: 'danger',
					}]);
					return;
				}
				if(beginTime>validEnd){
					Notify.show([{
						message: '选择的时间不得大于于租赁结束时间',
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
					validStart :e,
					validEnd:changeValues.leaseEnddate,
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
				e = e.replace(/\s/g,'');
				if(!(/^\d+\.\d$/.test(e))){
					Notify.show([{
						message: '折扣只能为一位小数',
						type: 'danger',
					}]);
					return;
				}
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
				let xiaoyu = false;
				saleList.map((item)=>{
					if(item.value == changeValues.saleList[index].tacticsType && item.discount>e){
						let message = '折扣不能小于'+item.discount;
						xiaoyu = true;
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
				if(xiaoyu){
					return;
				}
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
					fields.removeAll();
					let biaodan = []
					response.saleList.map((item,i)=>{
						fields.insert(i,{
							tacticsType:item.tacticsType,
							discountAmount:item.discountAmount,
							discount:item.discount,
							validEnd:item.validEnd,
							validStart:item.validStart,
							tacticsId:item.tacticsId
		
						})
						biaodan.push(item.tacticsType)
		
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
			allRent,
		} = this.state;
		let allRentName = this.dealRentName();
		var agreementValue ='如社区申请增加补充条款的，补充条款内容经法务审核通过后，社区将审核通过的内容邮件发送法务林玉洁（linyujie@krspace.cn），抄送技术部田欢（tianhuan@krspace.cn），冯西臣（fengxichen@krspace.cn），由技术部修改该内容，修改后邮件回复社区即可联网打印盖章版本。';


		return (


			<div style={{width:615,marginLeft:"-20px"}}>

<form className="m-increase-form m-increase-dialog-form" onSubmit={handleSubmit(this.onSubmit)} >
				<div className="cheek" style={{paddingLeft:0,marginLeft:23}}>
					<div className="titleBar" style={{marginLeft:-23}}><span className="order-number">1</span><span className="wire"></span><label className="small-title">租赁明细</label></div>
					<div className="small-cheek" style={{paddingBottom:"0px"}}>
					<KrField  name="wherefloor" style={{width:262,marginLeft:25}} component="select" label="所在楼层" options={optionValues.floorList} multi={true} requireLabel={true} />
					<KrField style={{width:343,marginLeft:25,position:"absolute"}} component="group" label="租赁期限"  requireLabel={true}>
						<ListGroup>
							<ListGroupItem style={{width:'141',padding:0,marginLeft:'-10px',marginTop:'-10px'}}> <KrField name="leaseBegindate" style={{width:141}}  component="date" onChange={this.onChangeLeaseBeginDate} simple={true}/></ListGroupItem>
							<ListGroupItem style={{width:'31',textAlign:'center',padding:0,marginLeft:10,marginTop:'-10px'}}><span style={{display:'inline-block',lineHeight:'60px',width:'31px',textAlign:'center',left:'10px',position:"relative"}}>至</span></ListGroupItem>
							<ListGroupItem style={{width:'141',padding:0,marginTop:'-10px'}}> <KrField name="leaseEnddate" component="date" style={{width:141}} onChange={this.onChangeLeaseEndDate} simple={true}/> </ListGroupItem>
						</ListGroup>
					</KrField>
					<div className="detailList" style={{marginTop:"-35px",width:"620px",marginLeft:"35px"}}>
					<DotTitle title='租赁明细' style={{marginTop:53,marginBottom:25,paddingLeft:0,paddingRight:0}}>

				<Grid style={{marginTop:"-28px",marginBottom:"10px"}}>
							<Row>
								<Col align="right">
									<ButtonGroup>
										<Button label="选择工位"  onTouchTap={this.openStationDialog} />
									    <Button label="批量录入单价"  width={100}  onTouchTap={this.openPreStationUnitPriceDialog} />
										<Button label="删除" height={27} cancle={true} type="button" onTouchTap={this.onStationDelete} />
								  </ButtonGroup>
								</Col>
							</Row>
						</Grid>

				<div  className={HeightAuto?'auto':'stationList'} style={{marginTop:"-10px"}}>
				<Table  displayCheckbox={true} onSelect={this.onStationSelect}>
				<TableHeader>
				<TableHeaderColumn>类别</TableHeaderColumn>
				<TableHeaderColumn>编号／名称</TableHeaderColumn>
				<TableHeaderColumn>单价(元/月)</TableHeaderColumn>
					<TableHeaderColumn>开始时间</TableHeaderColumn>
						<TableHeaderColumn>结束时间</TableHeaderColumn>
						</TableHeader>
						<TableBody>
						{stationVos && stationVos.map((item,index)=>{
							var typeLink = {
								value: this.state.stationVos[index].unitprice,
								requestChange: this.onStationVosChange.bind(null, index)
							}
							return (
								<TableRow key={index}>
									<TableRowColumn>{(item.stationType == 1) ?'工位':'独立空间'}</TableRowColumn>
									<TableRowColumn>{item.stationName}</TableRowColumn>
									<TableRowColumn>
											<input type="text" name="age"  valueLink={typeLink} onBlur={this.onBlur.bind(this,item)} style={{maxWidth:'128px'}}/>
									</TableRowColumn>
									<TableRowColumn> <KrDate value={item.leaseBeginDate}/></TableRowColumn>
									<TableRowColumn><KrDate value={item.leaseEndDate}/></TableRowColumn>

									</TableRow>
							);
						})}
						</TableBody>
						</Table>
						</div>
						{stationVos.length>5?<div className="Btip"  onTouchTap={this.showMore}> <p><span>{HeightAuto?'收起':'展开'}</span><span className={HeightAuto?'Toprow':'Bottomrow'}></span></p></div>:''}
                   </DotTitle>
				   {optionValues.saleList && <DotTitle title='优惠明细' style={{marginTop:53,marginBottom:25,paddingLeft:0,paddingRight:0}}>
						<FieldArray name='saleList' component={this.renderBrights}/>

				    </DotTitle>}
                     <div className="all-rent" style={{marginTop:'0px',marginBottom:25}}>服务费总计：<span style={{marginRight:50,color:'red'}}>￥{allRent || '0'}</span><span>{allRentName}</span></div>

                   </div>

				</div>

				<div className="titleBar" style={{marginLeft:-23}}><span className="order-number">2</span><span className="wire"></span><label className="small-title">合同基本信息</label></div>
					<div className="small-cheek" style={{paddingBottom:0}}>


					<KrField  grid={1/2}  name="mainbillid" type="hidden" component="input" />
					<KrField  grid={1/2}  name="contractstate" type="hidden" component="input" />
					<KrField  grid={1/2}  name="contracttype" type="hidden" component="input" />
					<KrField  grid={1/2}  name="paymodelName" type="hidden" component="input" />
					<KrField  grid={1/2}  name="paytypeName" type="hidden" component="input" />
					<KrField  grid={1/2}  name="contractVersionType" type="hidden" component="input" />
					<KrField  grid={1/2}  name="boardroomnum" type="hidden" component="input" />

					<KrField  name="leaseId" style={{width:262,marginLeft:25}} component="select" label="出租方" options={optionValues.fnaCorporationList} requireLabel={true}  />
					<div className="lessor-address"><KrField  style={{width:262,marginLeft:25}}  name="lessorAddress" type="text" inline={false} component="labelText" label="地址" value={changeValues.lessorAddress}  defaultValue="无" toolTrue={true}/></div>
					<KrField  style={{width:262,marginLeft:25}}  name="lessorContactid" component="searchPersonel" label="联系人" onChange={this.onChangeSearchPersonel} requireLabel={true} placeholder={initialValues.lessorContactName}/>
					<KrField style={{width:262,marginLeft:25}}  name="lessorContacttel" type="text" component="input" label="电话" requireLabel={true}

					requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>

					<KrField  style={{width:262,marginLeft:25}} component="labelText" inline={false} label="承租方" value={optionValues.customerName} />

					<KrField  style={{width:262,marginLeft:25}}  name="leaseAddress" type="text" component="input" label="地址" requireLabel={true}
					requiredValue={true} pattern={/^.{0,120}$/} errors={{requiredValue:'地址为必填项',pattern:'地址最大60位'}} />

					<KrField  style={{width:262,marginLeft:25}}  name="leaseContact" type="text" component="input" label="联系人" requireLabel={true}
					requiredValue={true} pattern={/^.{0,20}$/} errors={{requiredValue:'联系人为必填项',pattern:'联系人最大20位'}} />
					<KrField  style={{width:262,marginLeft:25}}  name="leaseContacttel" type="text" component="input" label="电话" requireLabel={true}
					requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>

					<KrField  style={{width:262,marginLeft:25}}  name="communityid" component="labelText" inline={false} label="所属社区" value={optionValues.communityName} />



					<KrField style={{width:262,marginLeft:25}} name="communityAddress" component="labelText" inline={false} label="地址" value={optionValues.communityAddress} toolTrue={true} />

					<KrField style={{width:262,marginLeft:25}} name="contractcode" component="labelText" label="合同编号" value={initialValues.contractcode} inline={false}/>

	                <KrField  name="paytype"  style={{width:262,marginLeft:25}} component="select" label="支付方式"  options={optionValues.payTypeList} requireLabel={true} onChange={(item)=>{
							Store.dispatch(change('increaseCreateForm','paytypeName',item.label));
					}} />
					<KrField  name="paymodel"  style={{width:262,marginLeft:25}} component="select" label="付款方式"  options={optionValues.paymentList} requireLabel={true} onChange={(item)=>{
							Store.dispatch(change('increaseCreateForm','paymodelName',item.label));
					}} />


					<KrField  style={{width:262,marginLeft:25}}  name="firstpaydate"  component="date"  label="首付款时间" requireLabel={true} />





					<KrField  style={{width:262,marginLeft:25}} name="signdate"  component="date"   label="签署时间" defaultValue={initialValues.signdate} requireLabel={true} />



					<KrField style={{width:262,marginLeft:25}}  name="stationnum"  component="labelText"  label="租赁工位" value={changeValues.stationnum} defaultValue="0" requireLabel={true} inline={false}/>
					<KrField  style={{width:262,marginLeft:25}} name="boardroomnum" component="labelText" type="text" label="租赁独立空间" value={changeValues.boardroomnum} defaultValue="0" requireLabel={true} inline={false}/>



					<KrField  style={{width:262,marginLeft:25}}  name="totalrent" type="text" component="labelText"  label="租金总额" placeholder="" value={allRent} defaultValue="0" inline={false} requireLabel={true}
					requiredValue={true} pattern={/^\d{0,16}(\.\d{0,2})?$/} errors={{requiredValue:'租金总额为必填项',pattern:'请输入正数金额，小数点后最多两位'}}  />
					<KrField  style={{width:262,marginLeft:25}}  name="totaldeposit" type="text" component="input"  label="押金总额" requireLabel={true}
					requiredValue={true} pattern={/^\d{0,16}(\.\d{0,2})?$/} errors={{requiredValue:'押金总额为必填项',pattern:'请输入正数金额，小数点后最多两位'}} />

					<KrField  style={{width:545,marginLeft:25}}   name="contractmark" component="textarea"  label="备注" maxSize={200}/>
					<KrField style={{width:545,marginLeft:25,marginBottom:30}}  name="agreement" type="textarea" component="labelText" inline={false} label="双方其他约定内容" maxSize={200} value={agreementValue}/>




					</div>

							<div className="end-round"></div>
					</div>





					<KrField  grid={1}  name="contractFileList" component="input"  type="hidden" label="合同附件"/>
					<KrField style={{width:545,marginLeft:25,marginTop:'-20px',paddingLeft:"25px"}}  name="fileIdList" component="file" label="上传附件" defaultValue={initialValues.contractFileList || []} onChange={(files)=>{
						Store.dispatch(change('increaseCreateForm','contractFileList',files));
					}} />




						<Grid style={{paddingBottom:50,textAlign:"center"}}>
						<Row>
						<ListGroup>
							<ListGroupItem style={{textAlign:'right',paddingRight:15}}><Button  label="确定" type="submit" disabled={pristine || submitting}  width={81} height={30} fontSize={16}/></ListGroupItem>
							<ListGroupItem style={{textAlign:'left',paddingLeft:15}}><Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}  width={81} height={30} fontSize={16}/></ListGroupItem>
						</ListGroup>
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
						open={this.state.openStationUnitPrice} contentStyle={{width:430}}
						onClose={this.openStationUnitPriceDialog}>
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
		errors.leaseId = '请填写出租方';
	}

	if (!values.lessorContactid) {
		errors.lessorContactid = '请填写出租方联系人';
	}

	if (!values.lessorContacttel) {
		errors.lessorContacttel = '请填写出租方联系电话';
	}
	if (!values.leaseAddress) {
		errors.leaseAddress = '请填写承租方地址';
	}

	if (!values.leaseContact) {
		errors.leaseContact = '请填写承租方联系人';
	}

	if (!values.leaseContacttel) {
		errors.leaseContacttel = '请填写承租方联系电话';
	}
	if (!values.whereFloor) {
		errors.whereFloor = '请填写所属楼层';
	}
	if (!values.contractcode) {
		errors.contractcode = '请填写合同编号';
	}

	if (!values.leaseBeginDate) {
		errors.leaseBeginDate = '请填写租赁期限';
	}
	if (!values.leaseEndDate) {
		errors.leaseEndDate = '请填写租赁期限';
	}

	if (!values.firstpaydate) {
		errors.firstpaydate = '请填写首付款时间';
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

	if (!values.leaseBegindate) {
		errors.leaseBegindate = '请输入租赁开始时间';
	}

	if (!values.leaseEnddate) {
		errors.leaseEnddate = '请输入租赁结束时间';
	}

	if (!String(values.totalrent)) {
		errors.totalrent = '请填写租金总额';
	}

	if (values.totalrent && isNaN(values.totalrent)) {
		errors.totalrent = '租金总额必须为数字';
	}

	if (!values.totaldeposit) {
		errors.totaldeposit = '请填写押金总额';
	}

	if (values.totaldeposit && isNaN(values.totaldeposit)) {
		errors.totaldeposit = '押金总额必须为数字';
	}

	if (!values.wherefloor) {
		errors.wherefloor = '请填写所属楼层';
	}
	 if(values.saleList && values.saleList.length){
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


const selector = formValueSelector('increaseCreateForm');

NewCreateForm = reduxForm({
	form: 'increaseCreateForm',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(NewCreateForm);

export default connect((state) => {

	let changeValues = {};

	changeValues.lessorId = selector(state, 'lessorId');
	changeValues.leaseId = selector(state, 'leaseId');
	changeValues.stationnum = selector(state, 'stationnum') || 0;
	changeValues.boardroomnum = selector(state, 'boardroomnum') || 0;
	changeValues.leaseBegindate = selector(state, 'leaseBegindate') || 0;
	changeValues.leaseEnddate = selector(state, 'leaseEnddate') || 0;
	changeValues.wherefloor = selector(state, 'wherefloor') || 0;
	changeValues.saleList = selector(state, 'saleList') || [];

	return {
		changeValues
	}

})(NewCreateForm);
