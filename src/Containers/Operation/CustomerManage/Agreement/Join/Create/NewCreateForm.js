import React, {
	PropTypes
} from 'react';

import {
	connect,
	ReduxFrom
} from 'kr/Redux';

import Param from 'jquery-param';
import nzh from 'nzh';
import {
	Fields
} from 'redux-form';

import {
	Binder
} from 'react-binding';
import ReactMixin from "react-mixin";
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import {DateFormat,Http} from 'kr/Utils';


import {
	reduxForm,
	formValueSelector,
	change,
	initialize
} from 'redux-form';

import {
	Actions,
	Store
} from 'kr/Redux';

import UnitPriceForm from './UnitPriceForm';

import {
	Dialog,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
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
class NewCreateForm extends React.Component {

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
		let {params} = this.props;

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
			stationVos: [],
			selectedStation: [],
			openStation: false,
			openStationUnitPrice: false,
			HeightAuto: false,
			allRent: 0,
			openLocalStorage:this.props.openLocalStorage,
			initialValues:this.props.initialValues,
			optionValues:this.props.optionValues,

		}
	}

	componentDidMount() {
		let {
			initialValues
		} = this.props;
		Store.dispatch(initialize('admitCreateForm', initialValues));
	}

	componentWillReceiveProps(nextProps) {
		if (!this.isInit && nextProps.stationVos.length) {
			let stationVos = nextProps.stationVos;
			this.setState({
				stationVos
			}, function() {
				this.calcStationNum();
				this.setAllRent(nextProps.stationVos)
			});
			this.isInit = true;
		}
		this.setState({
			initialValues:nextProps.initialValues,
			optionValues:nextProps.optionValues,
		})
		if(this.props.openLocalStorage != nextProps.openLocalStorage){
			this.setState({
			openLocalStorage:nextProps.openLocalStorage
		})
		}
	}

	calcStationNum() {
		let {
			stationVos
		} = this.state;
		let {initialValues} = this.state;

		var stationnum = 0;
		var boardroomnum = 0;

		stationVos.forEach(function(item, index) {
			if (item.stationType == 1) {
				stationnum++;
			} else {
				boardroomnum++;
			}
		});

		localStorage.setItem(initialValues.mainbillid+initialValues.customerId+'ENTERcreatestationVos', JSON.stringify(stationVos));

		Store.dispatch(change('joinCreateForm', 'stationnum', stationnum));
		Store.dispatch(change('joinCreateForm', 'boardroomnum', boardroomnum));
	}

	//修改租赁期限－开始时间
	onChangeLeaseBeginDate(value) {

		value = DateFormat(value, "yyyy-mm-dd hh:MM:ss");

		let {
			stationVos
		} = this.state;

		if (!stationVos.length) {
			return;
		}

		this.setState({
			stationVos: [],
			allRent:0
		});

	}

	//修改租赁期限-结束时间
	onChangeLeaseEndDate(value) {
		value = DateFormat(value, "yyyy-mm-dd hh:MM:ss");
		let {
			stationVos
		} = this.state;

		if (!stationVos.length) {
			return;
		}

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
		let allRent = 0;
		let _this = this;
		let {initialValues} = this.props;

		stationVos = stationVos.map(function(item, index) {
			if (selectedStation.indexOf(index) != -1) {
				item.unitprice = value;
			}
			return item;
		});
		this.setAllRent(stationVos);

		localStorage.setItem(initialValues.mainbillid+initialValues.customerId+'ENTERcreatestationVos', JSON.stringify(stationVos));


		this.setState({
			stationVos,
			allRent
		});

		this.openStationUnitPriceDialog();
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
		// stationVos.map((item)=>{
		// 	allRent += _this.getSingleRent(item);
		// })
		// allRent = parseFloat(allRent).toFixed(2)*1;
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

	onSubmit(form) {

		let {
			stationVos
		} = this.state;


		let {
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

		form.firstpaydate = DateFormat(form.firstpaydate, "yyyy-mm-dd hh:MM:ss");
		form.signdate = DateFormat(form.signdate, "yyyy-mm-dd hh:MM:ss");
		form.leaseBegindate = DateFormat(form.leaseBegindate, "yyyy-mm-dd hh:MM:ss");
		form.leaseEnddate = DateFormat(form.leaseEnddate, "yyyy-mm-dd hh:MM:ss");
		form.contractVersionType = 'NEW';
		form.totalrent = this.state.allRent;
		if(!!!form.agreement){
			form.agreement = '无';
		}
		if(!form.contractmark){
			form.contractmark="";
		}
		if(form.totalrent == 0){
			Notify.show([{
				message: '服务费不能为零',
				type: 'danger',
			}]);
			return;
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

		let url = "/krspace_operate_web/commnuity/communityFloorPlan/toCommunityFloorPlanSel?mainBillId={mainBillId}&communityId={communityId}&floors={floors}&goalStationNum={goalStationNum}&goalBoardroomNum={goalBoardroomNum}&selectedObjs={selectedObjs}&startDate={startDate}&endDate={endDate}";

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
			return obj;
		});

		let params = {
			mainBillId: this.context.params.orderId,
			communityId: optionValues.mainbillCommunityId,
			floors: changeValues.wherefloor,
			//工位
			goalStationNum: changeValues.stationnum,
			//独立空间
			goalBoardroomNum: changeValues.boardroomnum,
			selectedObjs: JSON.stringify(stationVos),
			startDate: DateFormat(changeValues.leaseBegindate, "yyyy-mm-dd"),
			endDate: DateFormat(changeValues.leaseEnddate, "yyyy-mm-dd"),
			unitprice:0

		};


		if (Object.keys(params).length) {
			for (let item in params) {
				if (params.hasOwnProperty(item)) {
					url = url.replace('{' + item + '}', params[item]);
					delete params[item];
				}
			}
		}

		return url;
	}
	onBlur=(item)=>{
		let {stationVos} = this.state;
		let {initialValues} = this.props;
		let allMoney = 0;
		this.setAllRent(stationVos);
		
		localStorage.setItem(initialValues.mainbillid+initialValues.customerId+'ENTERcreatestationVos', JSON.stringify(stationVos));


	}
	setAllRent=(list)=>{
		let _this = this;
		let {initialValues} = this.props;
		let stationList = list.map((item)=>{
			if(!item.unitprice){
				item.unitprice = 0;
			}else{
				item.unitprice = item.unitprice.replace(/\s/g,'');
			}
			return item;
		})
		Http.request('getAllRent',{},{stationList:JSON.stringify(list)}).then(function(response) {
			Store.dispatch(change('joinCreateForm','totalrent',response));
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
		let rentBegin = DateFormat(item.leaseBeginDate, "yyyy-mm-dd").split('-');
		let rentEnd = DateFormat(item.leaseEndDate, "yyyy-mm-dd").split('-');
		let rentDay = 0;
		let rentMounth = (rentEnd[0]-rentBegin[0])*12+(rentEnd[1]-rentBegin[1]);
		let years = rentEnd[0];
		if(rentBegin[2]-rentEnd[2] == 1){
			rentDay = 0;
		}else{
			let a =rentEnd[2]-rentBegin[2];
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
		//计算日单价
		// let rentPriceByDay = Math.ceil(((item.unitprice*12)/365)*100)/100;
		let rentPriceByDay = ((item.unitprice*12)/365).toFixed(6);
		//工位总价钱
		let allRent = (rentPriceByDay * rentDay) + (rentMounth*item.unitprice);
		allRent = allRent.toFixed(2)*1;
		return allRent;
	}

	onIframeClose(billList) {

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
				item.whereFloor = item.wherefloor;
			});
		} catch (err) {
		}

		localStorage.setItem(initialValues.mainbillid+initialValues.customerId+'ENTERcreatestationVos', JSON.stringify(billList));


		this.setState({
			stationVos: billList,
			allRent:0
		}, function() {
			this.calcStationNum();
		});
	}

	onChangeSearchPersonel(personel) {
		Store.dispatch(change('joinCreateForm', 'lessorContacttel', personel.mobile));
		Store.dispatch(change('joinCreateForm', 'lessorContactName', personel.lastname  || '请选择'));
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


		return (


			<Paper width={960}>

		<form onSubmit={handleSubmit(this.onSubmit)} >
				<CircleStyle num="1" info="租赁明细">

				<KrField name="wherefloor" style={{width:370,marginLeft:70}} component="select" label="所在楼层" options={optionValues.floorList} multi={true} requireLabel={true}/>
				<KrField style={{width:370,marginLeft:90}} left={20}  component="group" label="租赁期限" requireLabel={true}>
					<ListGroup>
						<ListGroupItem style={{width:'47%',padding:0,marginLeft:'-10px',marginTop:'-10px'}}> <KrField name="leaseBegindate"  component="date" onChange={this.onChangeLeaseBeginDate} simple={true}/></ListGroupItem>
						<ListGroupItem style={{width:'6%',textAlign:'center',padding:0,marginLeft:10,marginTop:'-10px'}}><span style={{display:'inline-block',lineHeight:'58px'}}>至</span></ListGroupItem>
						<ListGroupItem style={{width:'45%',padding:0,marginTop:'-10px'}}> <KrField name="leaseEnddate" component="date" onChange={this.onChangeLeaseEndDate} simple={true}/> </ListGroupItem>
					</ListGroup>
				</KrField>

				<div className="detail-list" style={{marginTop:"-35px"}}>

				<DotTitle title='租赁明细'>

				       <Grid style={{marginTop:"-40px"}}>
							<Row>
								<Col align="right">
									<ButtonGroup>
									    <Button label="批量录入单价" width={100} onTouchTap={this.openPreStationUnitPriceDialog} />
									    <Button label="选择工位"  onTouchTap={this.openStationDialog}  />
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
												<input type="text" name="age"  valueLink={typeLink}  onBlur={this.onBlur.bind(this,item)}/>
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
                     <div style={{marginTop:'-20px',marginBottom:60}}>服务费总计：<span style={{marginRight:50,color:'red'}}>￥{allRent}</span><span>{allRentName}</span></div>

					</div>
					</CircleStyle>
				<CircleStyle num="2" info="合同文本信息" circle="bottom">
					<KrField   name="mainbillid" type="hidden" component="input" />

					<KrField   name="contractstate" type="hidden" component="input" />

					<KrField   name="contracttype" type="hidden" component="input" />
					<KrField   name="mainbillid" type="hidden" component="input" />

					<KrField grid={1}  name="stationnum" type="hidden" component="input" label="工位"/>
					<KrField grid={1}  name="boardroomnum" type="hidden" component="input" label="独立空间"/>



					<KrField name="leaseId" style={{width:370,marginLeft:70}}  component="select" label="出租方" options={optionValues.fnaCorporationList} requireLabel={true} />

					<KrField   style={{width:370,marginLeft:90}} name="lessorAddress" type="text" inline={false} component="labelText" label="地址" value={changeValues.lessorAddress}  defaultValue="无"/>


					<KrField  style={{width:370,marginLeft:70}}  name="lessorContactid" component="searchPersonel" label="联系人" onChange={this.onChangeSearchPersonel} requireLabel={true} placeholder={optionValues.lessorContactName || '请选择...'}/>
					<KrField  style={{width:370,marginLeft:90}} name="lessorContacttel" type="text" component="input" label="电话" requireLabel={true}
					   requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>

					<KrField   style={{width:370,marginLeft:70}}  component="labelText" label="承租方" inline={false} value={optionValues.customerName}/>

					<KrField  style={{width:370,marginLeft:90}}  name="leaseAddress" type="text" component="input" label="地址" requireLabel={true}
					requiredValue={true} pattern={/^.{0,120}$/} errors={{requiredValue:'地址为必填项',pattern:'地址最大60位'}}/>

					<KrField  style={{width:370,marginLeft:70}} name="leaseContact" type="text" component="input" label="联系人" requireLabel={true}
					requiredValue={true} pattern={/^.{0,20}$/} errors={{requiredValue:'联系人为必填项',pattern:'联系人最大20位'}} />
					<KrField   style={{width:370,marginLeft:90}}  name="leaseContacttel" type="text" component="input" label="电话" requireLabel={true}
					 requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>

					<KrField   style={{width:370,marginLeft:70}} name="communityid" component="labelText" inline={false} label="所属社区" value={optionValues.communityName} />



					<KrField    style={{width:370,marginLeft:90}}  name="communityAddress" component="labelText" label="地址" inline={false} value={optionValues.communityAddress}  />
					<KrField   style={{width:370,marginLeft:70}} name="contractcode" component="labelText" inline={false} label="合同编号" value={initialValues.contractcode} />


					{/*
					<KrField    style={{width:370,marginLeft:70}} name="contractcode" type="text" component="input" label="合同编号"  requireLabel={true}

					requiredValue={true} pattern={/^.{0,50}$/} errors={{requiredValue:'合同编码为必填项',pattern:'合同编号最大50位'}}/>
					*/}





					<KrField name="paymodel"  style={{width:370,marginLeft:90}}  component="select" label="付款方式" options={optionValues.paymentList} requireLabel={true} />
					<KrField name="paytype"  style={{width:370,marginLeft:70}}   component="select" label="支付方式" options={optionValues.payTypeList} requireLabel={true} />

					<KrField  name="signdate"  style={{width:370,marginLeft:90}} component="date"  label="签署时间" defaultValue={initialValues.signdate} requireLabel={true}/>

					<KrField  style={{width:370,marginLeft:70}}  name="firstpaydate" component="date" label="首付款时间" requireLabel={true}  />



					<KrField  style={{width:370,marginLeft:90}} name="totalrent" type="text" component="labelText" label="租金总额" placeholder="" requireLabel={true}
					value={allRent} defaultValue='0' inline={false}
					requiredValue={true} pattern={/^\d{0,16}(\.\d{0,2})?$/} errors={{requiredValue:'租金总额为必填项',pattern:'请输入正数金额，小数点后最多两位'}} />
					<KrField  style={{width:370,marginLeft:70}}  name="totaldeposit" type="text" component="input" label="押金总额" requireLabel={true}
					requiredValue={true} pattern={/^\d{0,16}(\.\d{0,2})?$/} errors={{requiredValue:'押金总额为必填项',pattern:'请输入正数金额，小数点后最多两位'}} />
						<KrField style={{width:370,marginLeft:90}}  name="stationnum" component="labelText" type="text" label="租赁工位" value={changeValues.stationnum} defaultValue="0" requireLabel={true} inline={false}/>
					<KrField  style={{width:370,marginLeft:70}} name="boardroomnum" component="labelText" type="text" label="租赁独立空间" value={changeValues.boardroomnum} defaultValue="0" requireLabel={true} inline={false}/>

					<KrField  style={{width:830,marginLeft:70}}  name="contractmark" component="textarea" label="备注" maxSize={200}/>
					<KrField style={{width:830,marginLeft:70}}  name="agreement" type="textarea" component="textarea" label="双方其他约定内容" maxSize={200}/>
				</CircleStyle>

				<KrField  style={{width:830,marginLeft:90,marginTop:'-20px'}} name="contractFileList" component="input" type="hidden" label="合同附件"/>
				<KrField  style={{width:830,marginLeft:90,marginTop:'-20px'}} name="fileIdList" component="file" label="合同附件" defaultValue={optionValues.contractFileList || []} onChange={(files)=>{
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
						contentStyle ={{ width: '100%', maxWidth: 'none'}}
						open={this.state.openStation}
						onClose={this.openStationDialog}
						 >
							<IframeContent src={this.getStationUrl()} onClose={this.onIframeClose}/>
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
			

			</Paper>);
	}
}

const validate = values => {

	const errors = {}

	++values.num;

	for(var i in values){
	    if (values.hasOwnProperty(i)) { //filter,只输出man的私有属性
			if(i === 'contractFileList'){
				localStorage.setItem(values.mainbillid+values.customerId+values.contracttype+'create'+i,JSON.stringify(values[i]));
			}else if(!!values[i] && i !== 'contractFileList' && i !== 'stationVos'){
				localStorage.setItem(values.mainbillid+values.customerId+values.contracttype+'create'+i,values[i]);
			}else if(!!!values[i]){
				localStorage.setItem(values.mainbillid+values.customerId+values.contracttype+'create'+i,'');

			}
	    };
	}


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

	return {
		changeValues
	}

})(NewCreateForm);
