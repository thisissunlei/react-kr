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
import dateFormat from 'dateformat';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import nzh from 'nzh';
import {
	reduxForm,
	formValueSelector,
	initialize,
	change,
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
	KrDate,
	DotTitle,
	ButtonGroup,
	ListGroup,
	ListGroupItem,
	Paper,
	CircleStyle

} from 'kr-ui';

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

		this.onStationVosChange = this.onStationVosChange.bind(this);
		this.onChangeSearchPersonel = this.onChangeSearchPersonel.bind(this);


		this.onChangeLeaseBeginDate = this.onChangeLeaseBeginDate.bind(this);
		this.onChangeLeaseEndDate = this.onChangeLeaseEndDate.bind(this);

		this.calcStationNum = this.calcStationNum.bind(this);

		this.state = {
			stationUrl: '',
			stationVos: this.props.stationVos,
			delStationVos: [],
			selectedStation: [],
			openStation: false,
			openStationUnitPrice: false,
			HeightAuto: false,
			allRent:'-1'
		}
		console.log('===>',this.props);
	}

	componentDidMount() {
		let {
			initialValues
		} = this.props;
		Store.dispatch(initialize('joinCreateForm', initialValues));
	}

	componentWillReceiveProps(nextProps) {

		if (!this.isInit && nextProps.stationVos.length) {
			let stationVos = nextProps.stationVos;
			this.setState({
				stationVos
			}, function() {
				this.calcStationNum();
			});
			this.isInit = true;
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

		let {
			stationVos
		} = this.state;

		if (!stationVos.length) {
			return;
		}

		this.setState({
			stationVos: [],
			delStationVos: stationVos,
			allRent:0
		}, function() {
			this.getStationUrl();
			this.calcStationNum();
		});
	}

	//修改租赁期限-结束时间
	onChangeLeaseEndDate(value) {
		let {
			stationVos
		} = this.state;

		if (!stationVos.length) {
			return;
		}

		this.setState({
			stationVos: [],
			delStationVos: stationVos,
			allRent:0
		}, function() {
			this.getStationUrl();
			this.calcStationNum();
		});
	}

	onChangeSearchPersonel(personel) {
		Store.dispatch(change('joinCreateForm', 'lessorContacttel', personel.mobile));
	}


	onStationVosChange(index, value) {

		let {
			stationVos
		} = this.state;
		stationVos[index].unitprice = value;

		this.setState({
			stationVos
		});
	}

	//录入单价dialog
	openStationUnitPriceDialog() {
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
		console.log('onStationUnitPrice',stationVos);
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
			stationVos,
			delStationVos
		} = this.state;

		stationVos = stationVos.filter(function(item, index) {
			if (selectedStation.indexOf(index) != -1) {
				delStationVos.push(item);
				return false;
			}
			return true;
		});
		let _this = this;
		let allMoney = 0;
		stationVos.map((item)=>{
			allMoney += _this.getSingleRent(item);
		})
		allMoney = parseFloat(allMoney).toFixed(2)*1;

		this.setState({
			stationVos,
			delStationVos,
			allRent:allMoney
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
		this.getStationUrl();
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

		this.getStationUrl();

		this.setState({
			openStation: !this.state.openStation
		});
	}

	onSubmit(form) {

		form = Object.assign({}, form);

		let {
			stationVos,
			delStationVos
		} = this.state;
		let {
			billList
		} = this.state;
		let {
			changeValues,
			initialValues
		} = this.props;
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

		form.lessorAddress = changeValues.lessorAddress;

		var _this = this;

		form.stationVos = JSON.stringify(stationVos);
		form.delStationVos = JSON.stringify(delStationVos);
		form.totalrent = (this.state.allRent!='-1')?this.state.allRent:initialValues.totalrent;
		form.firstpaydate = dateFormat(form.firstpaydate, "yyyy-mm-dd hh:MM:ss");
		form.signdate = dateFormat(form.signdate, "yyyy-mm-dd hh:MM:ss");
		form.leaseBegindate = dateFormat(form.leaseBegindate, "yyyy-mm-dd hh:MM:ss");
		form.leaseEnddate = dateFormat(form.leaseEnddate, "yyyy-mm-dd hh:MM:ss");
		if(!!!form.agreement){
			form.agreement = '无';
		}
		form.totalrent = (form.totalrent).toFixed(2);
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

		let url = "/krspace_operate_web/commnuity/communityFloorPlan/toCommunityFloorPlanSel?mainBillId={mainBillId}&communityId={communityId}&floors={floors}&goalStationNum={goalStationNum}&goalBoardroomNum={goalBoardroomNum}&selectedObjs={selectedObjs}&startDate={startDate}&endDate={endDate}&contractId={contractId}";

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
			obj.type = item.stationType;
			obj.whereFloor = item.whereFloor;
			return obj;
		});

		let params = {
			contractId: this.context.params.id,
			mainBillId: this.context.params.orderId,
			communityId: optionValues.mainbillCommunityId,
			floors: changeValues.wherefloor,
			//工位
			goalStationNum: changeValues.stationnum,
			//会议室
			goalBoardroomNum: changeValues.boardroomnum,
			selectedObjs: JSON.stringify(stationVos),
			startDate: dateFormat(changeValues.leaseBegindate, "yyyy-mm-dd"),
			endDate: dateFormat(changeValues.leaseEnddate, "yyyy-mm-dd")

		};


		if (Object.keys(params).length) {
			for (let item in params) {
				if (params.hasOwnProperty(item)) {
					url = url.replace('{' + item + '}', params[item]);
					delete params[item];
				}
			}
		}

		this.setState({
			stationUrl: url
		});

	}

	onIframeClose(billList,data) {
		
		this.openStationDialog();
		if (!billList) {
			return;
		}
		var _this = this;
		let {delStationVos} = this.state;
		let {
			changeValues
		} = this.props;

		let stationVos = [];
            // delStationVos = delStationVos.concat(data.deleteData);
            data.deleteData && data.deleteData.map((item)=>{
                    var obj = {};
                    obj.stationId = item.id;
                    obj.whereFloor = item.whereFloor;
					obj.stationType = item.type;

                    delStationVos.push(obj);
            })

		try {
			billList.map(function(item, index) {
				var obj = {};
				obj.leaseBeginDate = changeValues.leaseBegindate;
				obj.leaseEndDate = changeValues.leaseEnddate;
				obj.stationId = item.id;
				obj.stationType = item.type;
				obj.stationName = item.name;
				obj.unitprice = '';
				obj.whereFloor = item.wherefloor;
				stationVos.push(obj);
			});
		} catch (err) {
			console.log('billList 租赁明细工位列表为空');
		}
		this.setState({
			stationVos,
			delStationVos
		}, function() {
			this.calcStationNum();
		});
	}
	showMore = () => {
		this.setState({
			HeightAuto: !this.state.HeightAuto
		})

	}
		onBlur=(item)=>{
		let {stationVos} = this.state;
		let allMoney = 0;
		console.log('stationVos',stationVos);
		this.setAllRent(stationVos);
		
	}
	setAllRent=(list)=>{
		let _this = this;
		let stationList = list.map((item)=>{
			if(!item.unitprice){
				item.unitprice = 0;
			}
			return item;
		})
		Store.dispatch(Actions.callAPI('getAllRent',{},{stationList:JSON.stringify(list)})).then(function(response) {
			_this.setState({
				allRent:response
			})
		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}
	getSingleRent=(item)=>{
		//年月日
		let mounth = [31,28,31,30,31,30,31,31,30,31,30,31];
		console.log(dateFormat(item.leaseBeginDate, "yyyy-mm-dd"),dateFormat(item.leaseEndDate, "yyyy-mm-dd"));
		let rentBegin = dateFormat(item.leaseBeginDate, "yyyy-mm-dd").split('-');
		let rentEnd = dateFormat(item.leaseEndDate, "yyyy-mm-dd").split('-');
		let rentDay = 0;
		let rentMounth = (rentEnd[0]-rentBegin[0])*12+(rentEnd[1]-rentBegin[1]);
		let years = rentEnd[0];
		if(rentBegin[2]-rentEnd[2] == 1){
			rentDay = 0;
		}else{
			let a =rentEnd[2]-rentBegin[2];
			console.log('a',a);
			if(a>=0){
				rentDay = a+1;

			}else{
				let mounthIndex = rentEnd[1]-1;
				if((years%4==0 && years%100!=0)||(years%400==0) && rentEnd[1]==2 ){
					rentDay = mounth[mounthIndex]+2+a;
				}
				rentDay = mounth[mounthIndex]+1+a;
				rentMounth = rentMounth-1;
			}
		}
		console.log('day',rentMounth,rentDay);
		//计算日单价
		// let rentPriceByDay = Math.ceil(((item.unitprice*12)/365)*100)/100;
		let rentPriceByDay = ((item.unitprice*12)/365).toFixed(6);
		//工位总价钱
		let allRent = (rentPriceByDay * rentDay) + (rentMounth*item.unitprice);
		allRent = allRent.toFixed(2)*1;
		console.log('allRent',allRent,rentPriceByDay);
		return allRent;
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
			allRent
		} = this.state;
		allRent = (allRent!='-1')?allRent:initialValues.totalrent;
		let  allRentName = this.dealRentName(allRent);

		return (


			<div style={{width:615,marginLeft:25}}>

<form className="m-edit-increase" onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:-15}}  >
			<div className="cheek" style={{paddingLeft:0,marginLeft:23}}>
				<div className="titleBar" style={{marginLeft:-23}}><span className="order-number">1</span><span className="wire"></span><label className="small-title">租赁明细</label></div>
				<div className="small-cheek">
				<KrField  name="wherefloor"  style={{width:262,marginLeft:25}} component="select" label="所在楼层" multi={true} options={optionValues.floorList} requireLabel={true}/>
				<KrField style={{width:343,marginLeft:25,position:"absolute"}} component="group" label="租赁期限" requireLabel={true}>
					<ListGroup>
						<ListGroupItem style={{width:'141',padding:0,marginLeft:'-10px',marginTop:'-10px'}}><KrField  style={{width:141}}  name="leaseBegindate"  component="date" onChange={this.onChangeLeaseBeginDate} simple={true}/> </ListGroupItem>
						<ListGroupItem style={{width:'31',textAlign:'center',padding:0,marginLeft:10,marginTop:'-10px'}}><span style={{display:'inline-block',lineHeight:'60px',width:'31px',textAlign:'center',left:'10px',position:"relative"}}>至</span></ListGroupItem>
						<ListGroupItem style={{width:'141',padding:0,marginTop:'-10px'}}><KrField   name="leaseEnddate" style={{width:141}} component="date" onChange={this.onChangeLeaseEndDate} simple={true} /> </ListGroupItem>
					</ListGroup>
				</KrField>
				<div className="detailList" style={{marginTop:"-35px",width:"620px",marginLeft:"35px"}}>
				 <DotTitle title='租赁明细' style={{marginTop:53,marginBottom:25}}>
				        <Grid style={{marginTop:"-28px",marginBottom:"10px"}}>
							<Row>
								<Col align="right">
									<ButtonGroup>
										<Button label="选择工位"  onTouchTap={this.openStationDialog} />
									    <Button label="批量录入单价" width={100} onTouchTap={this.openStationUnitPriceDialog} />
										<Button label="删除" cancle={true} type="button" onTouchTap={this.onStationDelete} />
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
                     <div style={{marginTop:'0px',marginBottom:60}}>服务费总计：<span style={{marginRight:50,color:'red'}}>￥{allRent}</span><span>{allRentName}</span></div>
					
					 </div>
					 
				<div className="titleBar" style={{marginLeft:-23}}><span className="order-number">2</span><span className="wire"></span><label className="small-title">合同基本信息</label></div>
					<div className="small-cheek" style={{paddingBottom:0}}>
				<KrField grid={1/2}  name="mainbillid" type="hidden" component="input" />
				<KrField grid={1/2}  name="contractstate" type="hidden" component="input" />
				<KrField grid={1/2}  name="contracttype" type="hidden" component="input" />
				<KrField grid={1}  name="stationnum" type="hidden" component="input" label="工位"/>
				<KrField grid={1}  name="boardroomnum" type="hidden" component="input" label="会议室"/>
				<KrField grid={1}  name="contractVersionType" type="hidden" component="input" label="会议室"/>

				<KrField style={{width:262,marginLeft:25}} name="leaseId"   component="select" label="出租方" options={optionValues.fnaCorporationList}  requireLabel={true}/>
				<KrField style={{width:262,marginLeft:25}}  name="lessorAddress" type="text" component="labelText" inline={false} label="地址" value={changeValues.lessorAddress}/>
				<KrField style={{width:262,marginLeft:25}}  name="lessorContactid" component="searchPersonel" label="联系人" onChange={this.onChangeSearchPersonel} placeholder={optionValues.lessorContactName} requireLabel={true}/>

				<KrField style={{width:262,marginLeft:25}}  name="lessorContacttel" type="text" component="input" label="电话" requireLabel={true}
				requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>

				<KrField style={{width:262,marginLeft:25}}  component="labelText" label="承租方" inline={false} value={optionValues.customerName}/>

				<KrField style={{width:262,marginLeft:25}}  name="leaseAddress" type="text" component="input" label="地址" requireLabel={true}
				requiredValue={true} pattern={/^.{0,120}$/} errors={{requiredValue:'地址为必填项',pattern:'地址最大60位'}} />

				<KrField style={{width:262,marginLeft:25}}  name="leaseContact" type="text" component="input" label="联系人" requireLabel={true}
				requiredValue={true} pattern={/^.{0,20}$/} errors={{requiredValue:'联系人为必填项',pattern:'联系人最大20位'}} />
				<KrField style={{width:262,marginLeft:25}}  name="leaseContacttel" type="text" component="input" label="电话" requireLabel={true}
				requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>

				<KrField style={{width:262,marginLeft:25}}  name="communityid" component="labelText" label="所属社区" inline={false} value={optionValues.communityName} />

				<KrField style={{width:262,marginLeft:25}}  name="communityAddress" component="labelText" label="地址" inline={false} value={optionValues.communityAddress} />
				<KrField style={{width:262,marginLeft:25}}  name="contractcode" type="text" component="input" label="合同编号"  requireLabel={true}
				requiredValue={true} pattern={/^.{0,50}$/} errors={{requiredValue:'合同编号为必填项',pattern:'合同编号最大50位'}} />

				<KrField style={{width:262,marginLeft:25}} name="paymodel"  component="select" label="付款方式" options={optionValues.paymentList} requireLabel={true}/>
				<KrField style={{width:262,marginLeft:25}} name="paytype"   component="select" label="支付方式" options={optionValues.payTypeList} requireLabel={true}/>

				<KrField style={{width:262,marginLeft:25}} name="signdate"  component="date" grid={1/2} label="签署时间" defaultValue={initialValues.signdate} requireLabel={true} />

				<KrField style={{width:262,marginLeft:25}} name="firstpaydate" component="date" label="首付款时间"  requireLabel={true}/>

				

				<KrField style={{width:262,marginLeft:25}}  name="totalrent" type="text" component="labelText" inline={false} label="租金总额" placeholder="" value={allRent} defaultValue={initialValues.totalrent} requireLabel={true}
				requiredValue={true} pattern={/^\d{0,16}(\.\d{0,2})?$/} errors={{requiredValue:'租金总额为必填项',pattern:'请输入正数金额，小数点后最多两位'}} />
				<KrField style={{width:262,marginLeft:25}}  name="totaldeposit" type="text" component="input" label="押金总额" requireLabel={true}
				requiredValue={true} pattern={/^\d{0,16}(\.\d{0,2})?$/} errors={{requiredValue:'押金总额为必填项',pattern:'请输入正数金额，小数点后最多两位'}} />
				<KrField style={{width:262,marginLeft:25}}  name="stationnum" type="text" component="labelText" label="工位" value={changeValues.stationnum} inline={false} defaultValue="0"/>
				<KrField style={{width:262,marginLeft:25}}  name="boardroomnum" type="text" component="labelText"  label="会议室" value={changeValues.boardroomnum} inline={false} defaultValue="0"/>
				<KrField style={{width:545,marginLeft:25}}  name="contractmark" component="textarea" label="备注" maxSize={200}/>
				<KrField style={{width:545,marginLeft:25}}  name="agreement" type="textarea" component="textarea" label="双方其他约定内容" maxSize={200}/>
				
				</div>

							<div className="end-round"></div>
					</div>
				</div>
				<KrField style={{width:545,marginLeft:25,marginTop:'-20px',paddingLeft:"25px"}}  name="fileIdList" component="file" label="合同附件" defaultValue={optionValues.contractFileList}/>
					<Grid style={{paddingBottom:50,textAlign:"center"}}>
						<Row >
						<ListGroup>
							<ListGroupItem style={{textAlign:'right',paddingRight:15}}><Button  label="确定" type="submit"  width={81} height={30} fontSize={16}/> </ListGroupItem>
							<ListGroupItem style={{textAlign:'left',paddingLeft:15}}> <Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel} width={81} height={30} fontSize={16}/> </ListGroupItem>
						</ListGroup>
						</Row>
						</Grid>

						</form>


					<Dialog
						title="分配工位"
						autoScrollBodyContent={true}
						contentStyle ={{ width: '100%', maxWidth: 'none'}}
						open={this.state.openStation} onClose={this.openStationDialog}>
							<IframeContent src={this.state.stationUrl} onClose={this.onIframeClose}/>
					  </Dialog>

					<Dialog
						title="录入单价"
						autoScrollBodyContent={true} contentStyle={{width:430}}
						open={this.state.openStationUnitPrice} onClose={this.openStationUnitPriceDialog}>
								<UnitPriceForm  onSubmit={this.onStationUnitPrice} onCancel={this.openStationUnitPriceDialog}/>
					  </Dialog>


			</div>);
	}
}

const validate = values => {

	const errors = {}

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

	if (!String(values.totalrent)) {
		errors.totalrent = '请填写租金总额';
	}

	if (values.totalrent && isNaN(values.totalrent)) {
		errors.totalrent = '租金总额必须为数字';
	}


	if (!String(values.totaldeposit)) {
		errors.totaldeposit = '请填写押金总额';
	}

	if (values.totaldeposit && isNaN(values.totaldeposit)) {
		errors.totaldeposit = '押金总额必须为数字';
	}

	if (!values.wherefloor) {
		errors.wherefloor = '请填写所属楼层';
	}


	return errors
}


const selector = formValueSelector('joinCreateForm');

NewCreateForm = reduxForm({
	form: 'joinCreateForm',
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


	return {
		changeValues
	}

})(NewCreateForm);