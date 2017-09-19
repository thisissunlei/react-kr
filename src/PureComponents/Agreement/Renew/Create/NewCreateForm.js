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
import {Http,arrReverse} from 'kr/Utils';
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

import AllStation from './AllStation';
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
	KrDate,
	DotTitle,
	ButtonGroup,
	Paper,
	ListGroup,
	ListGroupItem,
	CircleStyle
} from 'kr-ui';

var tabelLength = 0;
var titleChecked = false;
@ReactMixin.decorate(LinkedStateMixin)
class NewCreateForm extends Component {

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

		this.onStationSubmit = this.onStationSubmit.bind(this);
		this.onStationCancel = this.onStationCancel.bind(this);

		this.onStationDelete = this.onStationDelete.bind(this);
		this.onStationSelect = this.onStationSelect.bind(this);

		this.openStationDialog = this.openStationDialog.bind(this);
		this.openStationUnitPriceDialog = this.openStationUnitPriceDialog.bind(this);
		this.onChangeSearchPersonel = this.onChangeSearchPersonel.bind(this);
		this.onStationVosChange = this.onStationVosChange.bind(this);
		this.onCloseStation = this.onCloseStation.bind(this);


		this.state = {
			stationVos: this.props.initialValues.stationVos || [],
			selectedStation: [],
			openStation: false,
			openStationUnitPrice: false,
			allRent:this.props.initialValues.totalrent || '0',
			HeightAuto: false,
			openAdd:false,
	  	 	openMinus:false,
			oldBasicStationVos:this.props.initialValues.stationVos || [],
			biaodan:[]

		}
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

	showMore = () => {
		console.log('showmore')
		this.setState({
			HeightAuto: !this.state.HeightAuto
		})

	}
	onCloseStation() {
		this.setState({
			openStation: !this.state.openStation
		});
	}

	//录入单价dialog
	openStationUnitPriceDialog() {
		this.setState({
			openStationUnitPrice: !this.state.openStationUnitPrice
		});
	}

	onChangeSearchPersonel(personel) {
		Store.dispatch(change('renewCreateForm', 'lessorContacttel', personel.mobile));
		Store.dispatch(change('renewCreateForm', 'lessorContactName', personel.lastname));

	}

	onStationCancel() {
		this.setState({
			openStation: false
		});
	}

	onStationSubmit(stationVos) {
		let _this = this;
		let allRent = 0;
		let {initialValues} = this.props;
		let oldStationsVos = this.state.stationVos;
		let delStationVos = Object.assign([],oldStationsVos,this.state.delStationVos)
		stationVos.map(item=>{
			oldStationsVos.map((values,index)=>{
				if(item.stationId == values.stationId){
					delStationVos.splice(index,1)
				}
			})
		})
		this.setAllRent(stationVos);
		let BeginDate=stationVos[0].leaseBeginDate;
		let EndDate=stationVos[0].leaseEndDate;
		console.log('stationVos[0].leaseBeginDate)',stationVos[0].leaseBeginDate);
		Store.dispatch(change('renewCreateForm', 'stationVos', stationVos));
		Store.dispatch(change('renewCreateForm', 'delStationVos', delStationVos));
		Store.dispatch(change('renewCreateForm', 'leaseBegindate', `${BeginDate} 00:00:00`));
		Store.dispatch(change('renewCreateForm', 'leaseEnddate', `${EndDate} 00:00:00`));
		
		let openAdd = stationVos.length>5?true:false;


		this.setState({
			stationVos,
			openAdd,
			delStationVos,
			oldBasicStationVos:stationVos
		},function(){
			if(openAdd){
				this.minusClick()
			}
		});

		this.openStationDialog();
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
		Http.request('getAllRent',{},{stationList:JSON.stringify(list)}).then(function(response) {
			_this.setState({
				allRent:response
			})
		Store.dispatch(change('renewCreateForm', 'totalrent', response));

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
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
		let allRent = 0;
		Store.dispatch(change('renewCreateForm', 'stationVos', stationVos));

		this.setAllRent(stationVos);
		this.setState({
			stationVos,
			biaodan:[]
		});
	}

	onStationSelect(selectedStation) {
		this.setState({
			selectedStation
		})
	}

	openStationDialog() {
		this.setState({
			openStation: !this.state.openStation
		});
	}

	componentDidMount() {
		let {
			initialValues
		} = this.props;
		Store.dispatch(initialize('renewCreateForm', initialValues));
		this.setState({
			allRent:initialValues.totalrent
		})
	}

	componentWillReceiveProps(nextProps) {
		let _this = this;

		if(this.props.initialValues!= nextProps.initialValues){
			Store.dispatch(initialize('renewCreateForm', nextProps.initialValues));
			
		}
		if(this.props.initialValues.stationVos!=nextProps.initialValues.stationVos){
			this.setState({
				stationVos:nextProps.initialValues.stationVos || [],
				allRent:nextProps.initialValues.totalrent || '0'
			})
		}

		let initialValues = nextProps.initialValues;
		console.log(nextProps.initialValues.stationVos)
		if (!this.isInit && nextProps.initialValues.stationVos) {
			let stationVos = nextProps.initialValues.stationVos;
			let originStationVos = [].concat(stationVos);
			this.setState({
				stationVos,
				originStationVos,
				oldBasicStationVos:stationVos
			},function(){
				let {stationVos,oldBasicStationVos,openAdd}=_this.state;
			       if(oldBasicStationVos&&oldBasicStationVos.length>5){
			            _this.setState({
			            	stationVos:oldBasicStationVos.slice(0,5),
			            	openAdd:true
			            })
			        }
			        if(oldBasicStationVos&&oldBasicStationVos.length<=5){
			        	_this.setState({
			        		stationVos:oldBasicStationVos,
			        		openAdd:false
			        	})
			        }

			});
			this.isInit = true;
		};

	}

	onSubmit(form) {

		form = Object.assign({}, form);

		let {
			changeValues
		} = this.props;
		let {
			stationVos,
			oldBasicStationVos
		} = this.state;

		if (!stationVos.length) {
			Notify.show([{
				message: "请选择工位",
				type: 'danger',
			}]);
			return;
		};


		form.stationVosList = oldBasicStationVos;
		form.lessorAddress = changeValues.lessorAddress;

		form.leaseBegindate = dateFormat(stationVos[0].leaseBeginDate, "yyyy-mm-dd 00:00:00");
		form.leaseEnddate = dateFormat(stationVos[0].leaseEndDate, "yyyy-mm-dd 00:00:00");

		form.firstpaydate = dateFormat(form.firstpaydate, "yyyy-mm-dd 00:00:00");

		form.stationVos = JSON.stringify(oldBasicStationVos);
		form.delStationVos = [];
		form.contractVersionType = 'NEW';
		form.totalrent = (this.state.allRent).toFixed(2);
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
	addClick=()=>{
      let {oldBasicStationVos,stationVos,openMinus,openAdd}=this.state;
      console.log('add',oldBasicStationVos)
	   this.setState({
	  	 stationVos:oldBasicStationVos,
	  	 openMinus:true,
	  	 openAdd:false
	    })
	}

	minusClick=()=>{
      let {oldBasicStationVos,stationVos,openAdd,openMinus}=this.state;
      console.log('minu',oldBasicStationVos,oldBasicStationVos.slice(0,5))
	   
	   this.setState({
	  	 stationVos:oldBasicStationVos.slice(0,5),
	  	 openAdd:true,
	  	 openMinus:false
	    })
	}

	addRender=()=>{
    	    var _this=this;
            let add='';
             add=(<div onClick={_this.addClick} className='arrow-wrap'><span className='arrow-open'>展开</span><span className='arrow-pic'></span></div>)
            return add
        }

     minusRender=()=>{
    	 var _this=this;
            let minus='';
             minus=(<div onClick={_this.minusClick} className='arrow-wrap'><span className='arrow-open'>收起</span><span className='arrow-pic-do'></span></div>)
            return minus
    }
    onBlur=(item)=>{
		let {stationVos} = this.state;
		Store.dispatch(change('renewCreateForm', 'stationVos', stationVos));
		this.setAllRent(stationVos);

	}
	openPreStationUnitPriceDialog=()=> {
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
	//录入单价
	onStationUnitPrice=(form)=> {

		var value = form.price;
		let {
			stationVos,
			selectedStation,
			oldBasicStationVos
		} = this.state;
		let _this = this;

		stationVos = stationVos.map(function(item, index) {
			if (selectedStation.indexOf(index) != -1) {
				item.unitprice = value;
			}
			return item;
		});
		oldBasicStationVos = oldBasicStationVos.map(function(item, index) {
			if (selectedStation.indexOf(index) != -1) {
				item.unitprice = value;
			}
			return item;
		});
		Store.dispatch(change('renewCreateForm', 'stationVos', stationVos));


		this.setAllRent(oldBasicStationVos);
		this.setState({
			stationVos,
			openStationUnitPrice:false,
			oldBasicStationVos
		});

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
					stationVos
				}= this.state;
				let {
					wherefloor,
					leaseBegindate,
					leaseEnddate,
				} = changeValues;
		
				if (!stationVos) {
					Notify.show([{
						message: '请先选择工位',
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
					biaodan.splice(item,1)
		
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
									  onChange={(event)=>{
										self.changeBeginDate(event,fields,index)
										}}
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
				let showWarn = false;
				biaodan[index] = e.value;
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
					}else if(item == 3 && sameFree){
						showWarn = true;
						Notify.show([{
							message: '免期只能选择一种',
							type: 'danger',
						}]);
						biaodan.splice(index,1)
						fields.remove(index);
					}else if(item == 2 && sameFree){
						showWarn = true;
						Notify.show([{
							message: '免期只能选择一种',
							type: 'danger',
						}]);
						biaodan.splice(index,1)
						fields.remove(index);
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
			changeBeginDate=(e,fields,index)=>{
				console.log('changeEndDate',e,fields,index);
				let {changeValues,initialValues,optionValues} = this.props;
				let {saleList}  = optionValues;
				let {stationVos} = this.state;
				let beginTime = +new Date(e);
				let validStart = +new Date(changeValues.leaseBegindate);
				let tacticsId = '';
				
		
				//校验时间选择的时间不得大于租赁结束时间
				if(beginTime<=validStart){
					Notify.show([{
						message: '选择的时间不得小于于租赁开始时间',
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
						allRent:response.totalrent,
						biaodan
					},()=>{
						_this.renderBrights({fields})
					})
				setTimeout(()=>{
					_this.addRow(fields);
					fields.remove(tabelLength-1)
		
				},50)
				}).catch(function(err){
					console.log('----->',err)
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
			stationVos,
			allRent,
			HeightAuto,
			openAdd,
			openMinus
		} = this.state;
	
		let allRentName = this.dealRentName(allRent);
		var agreementValue = '如社区申请增加补充条款的，补充条款内容经法务审核通过后，社区将审核通过的内容邮件发送法务林玉洁（linyujie@krspace.cn），抄送技术部田欢（tianhuan@krspace.cn），冯西臣（fengxichen@krspace.cn），由技术部修改该内容，修改后邮件回复社区即可联网打印盖章版本。';


		return (
		<div style={{width:615,marginTop:'-10px',marginLeft:"-20px"}}>

<form className="m-new-renew m-new-renew-dialog-form" onSubmit={handleSubmit(this.onSubmit)} >
			<div className="cheek" style={{paddingLeft:0,marginLeft:23}}>
				<div className="titleBar" style={{marginLeft:-23}}><span className="order-number">1</span><span className="wire"></span><label className="small-title">租赁明细</label></div>
				<div className="small-cheek">
				<div className="detailList" style={{marginTop:"-35px",width:"620px",marginLeft:"35px"}}>
				<DotTitle title='租赁明细' style={{marginTop:20,marginBottom:25,paddingLeft:0,paddingRight:0}}>
				      <Grid style={{marginTop:"-28px",marginBottom:"10px"}}>
							<Row>
								<Col align="right">
									<ButtonGroup>
										<Button label="续租"  onTouchTap={this.openStationDialog} />
									    <Button label="批量录入单价" width={100} onTouchTap={this.openPreStationUnitPriceDialog} />
										<Button label="删除" cancle={true} type="button" height={27} onTouchTap={this.onStationDelete} />

								  </ButtonGroup>
								</Col>
							</Row>
						</Grid>

				<div style={{marginTop:"-10px"}}>
				<Table  displayCheckbox={true} onSelect={this.onStationSelect} >
				<TableHeader>
				<TableHeaderColumn>类别</TableHeaderColumn>
				<TableHeaderColumn>编号／名称</TableHeaderColumn>
				<TableHeaderColumn>单价(元/月)</TableHeaderColumn>
					<TableHeaderColumn>续租开始时间</TableHeaderColumn>
						<TableHeaderColumn>续租结束日期</TableHeaderColumn>
						</TableHeader>
						<TableBody>
						{stationVos.map((item,index)=>{
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
						})}
						</TableBody>
						</Table>

						</div>
                      {/*stationVos.length>5?<div className="bottom-tip"  onTouchTap={this.showMore}> <p><span>{HeightAuto?'收起':'展开'}</span><span className={HeightAuto?'toprow':'bottomrow'}></span></p></div>:''*/}
                      {openAdd&&this.addRender()}
			           {openMinus&&this.minusRender()}

                     </DotTitle>
					 {optionValues.saleList && !!optionValues.saleList.length && <DotTitle title='优惠明细' style={{marginTop:53,marginBottom:25,paddingLeft:0,paddingRight:0}}>
						<FieldArray name='saleList' component={this.renderBrights}/>

				    </DotTitle>}
                     <div className="all-rent" style={{marginTop:'0px',marginBottom:25}}>服务费总计：<span style={{marginRight:50,color:'red'}}>￥{allRent || '0'}</span><span>{allRentName}</span></div>

                    </div>

			<div className="titleBar" style={{marginLeft:-23}}><span className="order-number">2</span><span className="wire"></span><label className="small-title">合同基本信息</label></div>
				<div className="small-cheek" style={{paddingBottom:0}}>

				<KrField grid={1/2}  name="mainbillid" type="hidden" component="input" />
				<KrField grid={1/2}  name="contractstate" type="hidden" component="input" />
				<KrField grid={1/2}  name="contracttype" type="hidden" component="input" />
				<KrField grid={1/2}  name="leaseBegindate" type="hidden" component="input" />

				<KrField style={{width:262,marginLeft:25}}  name="leaseId"   component="select" label="出租方" options={optionValues.fnaCorporationList}  requireLabel={true} />
				<div className="lessor-address"><KrField style={{width:262,marginLeft:25}}   name="lessorAddress" type="text" component="labelText" inline={false} label="地址" value={changeValues.lessorAddress}  defaultValue="无" toolTrue={true}/></div>
				<KrField style={{width:262,marginLeft:25}}   name="lessorContactid" component="searchPersonel" label="联系人" onChange={this.onChangeSearchPersonel} requireLabel={true} placeholder={initialValues.lessorContactName}/>
				<KrField style={{width:262,marginLeft:25}}   name="lessorContacttel" type="text" component="input" label="电话" requireLabel={true}
				requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>

				<KrField style={{width:262,marginLeft:25}}   component="labelText" label="承租方" value={optionValues.customerName} inline={false}/>

				<KrField style={{width:262,marginLeft:25}}   name="leaseAddress" type="text" component="input" label="地址" requireLabel={true}
				requiredValue={true} pattern={/^.{0,120}$/} errors={{requiredValue:'地址为必填项',pattern:'地址最大60位'}} />

				<KrField style={{width:262,marginLeft:25}}   name="leaseContact" type="text" component="input" label="联系人" requireLabel={true}
				requiredValue={true} pattern={/^.{0,20}$/} errors={{requiredValue:'联系人为必填项',pattern:'联系人最大20位'}} />
				<KrField style={{width:262,marginLeft:25}}  name="leaseContacttel" type="text" component="input" label="电话" requireLabel={true}
				requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>

				<KrField style={{width:262,marginLeft:25}}  name="communityid" component="labelText" label="所属社区" inline={false} value={optionValues.communityName} />

				<KrField style={{width:262,marginLeft:25}}   name="communityAddress" component="labelText" label="地址" inline={false} value={optionValues.communityAddress} requireLabel={true} toolTrue={true}/>
				<KrField style={{width:262,marginLeft:25}} name="contractcode" component="labelText" label="合同编号" value={initialValues.contractcode} inline={false}/>



				<KrField style={{width:262,marginLeft:25}}  name="paymodel"   component="select" label="付款方式" options={optionValues.paymentList} requireLabel={true} />
				<KrField style={{width:262,marginLeft:25}}  name="paytype"   component="select" label="支付方式" options={optionValues.payTypeList} requireLabel={true} />
				<KrField style={{width:262,marginLeft:25}}  name="firstpaydate"  component="date" label="首付款时间"  requireLabel={true} />

				<KrField style={{width:262,marginLeft:25}}   name="signdate"  component="date"  label="签署时间" requireLabel={true} />


				<KrField style={{width:262,marginLeft:25}}   name="totalrent" type="text" component="labelText" label="租金总额" requireLabel={true} value={allRent} inline={false} defaultValue='0'
				requiredValue={true} pattern={/^\d{0,16}(\.\d{0,2})?$/} errors={{requiredValue:'租金总额为必填项',pattern:'请输入正数金额，小数点后最多两位'}} />

				<KrField style={{width:262,marginLeft:25}}  name="totaldeposit" type="text" component="input" label="押金总额" requireLabel={true}
				requiredValue={true} pattern={/^\d{0,16}(\.\d{0,2})?$/} errors={{requiredValue:'押金总额为必填项',pattern:'请输入正数金额，小数点后最多两位'}} />

				<KrField style={{width:545,marginLeft:25}}  name="contractmark" component="textarea" label="备注" maxSize={200}/>
				<KrField style={{width:545,marginLeft:25}}  name="agreement" type="textarea" component="labelText" inline={false} label="双方其他约定内容" maxSize={200} value={agreementValue}/>

				</div>


				<div className="end-round"></div>
		</div>
	</div>
				<KrField style={{width:545,marginLeft:25,marginTop:'-20px'}} name="contractFileList" component="input" type="hidden" label="合同附件"/>
				<KrField style={{width:545,marginLeft:25,marginTop:'-20px',paddingLeft:"25px"}}  name="fileIdList" component="file" label="合同附件" defaultValue={initialValues.contractFileList || []} onChange={(files)=>{
					Store.dispatch(change('renewCreateForm','contractFileList',files));
				}} />


						<Grid style={{paddingBottom:50,textAlign:"center"}}>
						<Row >
						<ListGroup>
							<ListGroupItem style={{textAlign:'right',paddingRight:15}}><Button  label="确定" type="submit"  width={81} height={30} fontSize={16}/></ListGroupItem>
							<ListGroupItem style={{textAlign:'left',paddingLeft:15}}><Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}  width={81} height={30} fontSize={16}/></ListGroupItem>
						</ListGroup>
						</Row>
						<Col md={4}></Col>
						</Grid>

						</form>


					<Dialog
						title="分配工位"
						open={this.state.openStation}
						modal={true}
						autoScrollBodyContent={true}
						autoDetectWindowHeight={true}
						bodyStyle={{overflowY:'scroll'}}
						onClose={this.onCloseStation}>
								<AllStation onSubmit={this.onStationSubmit} onCancel={this.onStationCancel} selectedStationVos={this.state.stationVos}/>
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

	const errors = {};
	console.log('====>',values)

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

	// if (!values.fileIdList) {
	// 	errors.fileIdList = '请填写合同附件';
	// }
	if (!values.contractcode) {
		errors.contractcode = '请填写合同编号';
	}



	if (!String(values.totalrent)) {
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

	if (!values.firstpaydate) {
		errors.firstpaydate = '请填写首付款时间';
	}

	if (!values.stationnum && !values.boardroomnum) {
		errors.stationnum = '租赁项目必须填写一项';
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


const selector = formValueSelector('renewCreateForm');

NewCreateForm = reduxForm({
	form: 'renewCreateForm',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(NewCreateForm);

export default connect((state) => {

	let changeValues = {};

	changeValues.lessorId = selector(state, 'lessorId');
	changeValues.leaseId = selector(state, 'leaseId');
	changeValues.stationnum = selector(state, 'stationnum');
	changeValues.boardroomnum = selector(state, 'boardroomnum');
	changeValues.leaseBegindate = selector(state, 'leaseBegindate');
	changeValues.leaseEnddate = selector(state, 'leaseEnddate');
	changeValues.wherefloor = selector(state, 'wherefloor');
	changeValues.saleList = selector(state, 'saleList') || [];
	return {
		changeValues
	}

})(NewCreateForm);
