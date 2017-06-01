import React from 'react';
import {
	connect
} from 'kr/Redux';

import {
	Fields
} from 'redux-form';
import PlanMapContent
from 'kr/PureComponents/PlanMapContent';

import ReactMixin from "react-mixin";
import {DateFormat,Http} from 'kr/Utils';
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
	ListGroupItem
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

		this.isInit = false;
		this.state = {
			stationUrl: '',
			stationVos: this.props.stationVos || [],
			delStationVos: [],
			selectedStation: [],
			openStation: false,
			openStationUnitPrice: false,
			HeightAuto: false,
			allRent:'-1'
		}
	}

	componentDidMount() {
		let {
			initialValues
		} = this.props;
		Store.dispatch(initialize('joinEditForm', initialValues));
	}

	componentWillReceiveProps(nextProps) {
		if (!this.isInit && nextProps.stationVos.length) {
			let stationVos = nextProps.stationVos;
			this.setState({
				stationVos,
				delStationVos:nextProps.delStationVos
			}, function() {
				this.calcStationNum();
				this.setAllRent(stationVos);
			});
			this.isInit = true;
		}
	}

	//修改租赁期限－开始时间
	onChangeLeaseBeginDate(value) {

		let {
			stationVos
		} = this.state;
		let {initialValues} = this.props;
		let delStationVos;

		if (!stationVos.length) {
			return;
		}else{
			delStationVos= stationVos;
			stationVos = [];
		}
		this.setState({
			stationVos: [],
			delStationVos: stationVos,
			allRent:0
		}, function() {
			this.getStationUrl();
			this.calcStationNum();
			this.setAllRent(stationVos)
		});
	}

	//修改租赁期限-结束时间
	onChangeLeaseEndDate(value) {
		let {
			stationVos
		} = this.state;
		let delStationVos;

		let {initialValues} = this.props;
		delStationVos= stationVos;
		stationVos = [];

		this.setState({
			stationVos,
			delStationVos,
			allRent:0
		}, function() {
			this.getStationUrl();
			this.calcStationNum();
			this.setAllRent(stationVos)
		});
	}

	onChangeSearchPersonel(personel) {
		Store.dispatch(change('joinEditForm', 'lessorContacttel', personel.mobile));
		Store.dispatch(change('joinEditForm', 'lessorContactName', personel.lastname || '请选择'));
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
		let {initialValues} = this.props;
		let allRent = 0;
		let _this = this;

		stationVos = stationVos.map(function(item, index) {
			if (selectedStation.indexOf(index) != -1) {
				item.unitprice = value;
			}
			return item;
		});
		this.setAllRent(stationVos);
		this.setState({
			stationVos,
			allRent
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
		let {initialValues} = this.props;

		stationVos = stationVos.filter(function(item, index) {
			if (selectedStation.indexOf(index) != -1) {
				delStationVos.push(item);
				return false;
			}
			return true;
		});
		let _this = this;
		let allRent = 0;
		Store.dispatch(change('joinEditForm', 'stationVos', stationVos));
		Store.dispatch(change('joinEditForm', 'delStationVos', delStationVos));


		this.setAllRent(stationVos);
		this.setState({
			stationVos,
			delStationVos,
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



		this.setState({
			openStation: !this.state.openStation
		});
	}

	onSubmit(form) {

		form = JSON.parse(JSON.stringify(form));

		let {
			stationVos,
			delStationVos,
			selectedStation
		} = this.state;
		let {
			changeValues,
			initialValues
		} = this.props;
		let unitpriceAdd = 0; 
		for(var i=0 ;i<stationVos.length;i++){
			if(!isNaN(stationVos[i].unitprice)){
				unitpriceAdd+=Number(stationVos[i].unitprice);
			}
			
		}
		console.log('----->',!unitpriceAdd)
		if(!unitpriceAdd){
			Notify.show([{
				message: '请选择工位',
				type: 'danger',
			}]);
			return ;
		}

		form.lessorAddress = changeValues.lessorAddress;

		var _this = this;

		form.delStationVos = JSON.stringify(delStationVos);
		form.stationVos = JSON.stringify(stationVos);

		form.firstpaydate = DateFormat(form.firstpaydate, "yyyy-mm-dd hh:MM:ss");
		form.signdate = DateFormat(form.signdate, "yyyy-mm-dd hh:MM:ss");
		form.leaseBegindate = DateFormat(form.leaseBegindate, "yyyy-mm-dd hh:MM:ss");
		form.leaseEnddate = DateFormat(form.leaseEnddate, "yyyy-mm-dd hh:MM:ss");
		form.totalrent = (this.state.allRent!='-1')?this.state.allRent:initialValues.totalrent;
		form.totalrent = form.totalrent;
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
			obj.whereFloor = item.whereFloor;
			return obj;
		});

		let params = {
			contractId: initialValues.id,
			mainBillId: initialValues.mainbillid,
			communityId: optionValues.mainbillCommunityId,
			floors: changeValues.wherefloor,
			//工位
			goalStationNum: changeValues.stationnum,
			//会议室
			goalBoardroomNum: changeValues.boardroomnum,
			selectedObjs: stationVos,
			startDate: DateFormat(changeValues.leaseBegindate, "yyyy-mm-dd hh:MM:ss"),
			endDate: DateFormat(changeValues.leaseEnddate, "yyyy-mm-dd hh:MM:ss"),
			unitprice:0

		};
		this.setState({
			stationUrl: params
		});
	}

	onIframeClose(billList,data) {

		this.openStationDialog();
		if (!billList) {
			return;
		}
		let {delStationVos} = this.state;
		var _this = this;
		let {
			changeValues,
			initialValues
		} = this.props;
		var stationVos = [];
		console.log('billList',billList,data,delStationVos);

		data.deleteData && data.deleteData && data.deleteData.map((item)=>{
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
				obj.whereFloor = item.whereFloor;
				stationVos.push(obj);
			});
		} catch (err) {
		}
		Store.dispatch(change('joinEditForm', 'stationVos', stationVos));
		Store.dispatch(change('joinEditForm', 'delStationVos', delStationVos));



		this.setState({
			stationVos,
			delStationVos,
			allRent:0
		}, function() {
			this.calcStationNum();
		});
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

		Store.dispatch(change('joinEditForm', 'stationnum', stationnum));
		Store.dispatch(change('joinEditForm', 'boardroomnum', boardroomnum));
	}
	showMore = () => {
		this.setState({
			HeightAuto: !this.state.HeightAuto
		})

	}
	setAllRent=(list)=>{
		let _this = this;
		let {initialValues} = this.props;
		let stationList = list.map((item)=>{
			if(!item.unitprice){
				item.unitprice = 0;
			}else{
				item.unitprice = (''+item.unitprice).replace(/\s/g,'');
			}
			return item;
		})
		Http.request('getAllRent',{},{stationList:JSON.stringify(list)}).then(function(response) {
			Store.dispatch(change('joinEditForm', 'totalrent', response));
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
	onBlur=(item)=>{
		let {stationVos} = this.state;
		let allMoney = 0;
		this.setAllRent(stationVos);

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


			<div style={{width:615}}>

<form className="m-edit-join join-edit-dialog-form" onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:-15}}>
	<div className="cheek" style={{paddingLeft:0,marginLeft:47}}>
		<div className="titleBar" style={{marginLeft:-23}}><span className="order-number">1</span><span className="wire"></span><label className="small-title">租赁明细</label></div>
			<div className="small-cheek">
			<KrField  name="wherefloor" style={{width:262,marginLeft:25}} component="select" label="所在楼层" options={optionValues.floorList} multi={true}  requireLabel={true} />
			<KrField style={{width:343,marginLeft:25,position:"absolute"}}  left={10} component="group" label="租赁期限" requireLabel={true}>
					<ListGroup>
						<ListGroupItem style={{width:'141',padding:0,marginLeft:'-10px',marginTop:'-10px'}}> <KrField style={{width:141}} name="leaseBegindate"  component="date" onChange={this.onChangeLeaseBeginDate} simple={true}/></ListGroupItem>
						<ListGroupItem style={{width:'31',textAlign:'center',padding:0,marginLeft:10,marginTop:'-10px'}}><span style={{display:'inline-block',lineHeight:'60px',width:'31px',textAlign:'center',left:'10px',position:"relative"}}>至</span></ListGroupItem>
						<ListGroupItem style={{width:'141',padding:0,marginTop:'-10px'}}> <KrField style={{width:141}}  name="leaseEnddate" component="date" onChange={this.onChangeLeaseEndDate} simple={true} /> </ListGroupItem>
					</ListGroup>
				</KrField>
				<div className="detail-list" style={{marginTop:"-35px",width:"620px",marginLeft:"35px"}}>
				<DotTitle title='租赁明细' style={{marginTop:53,marginBottom:25,paddingLeft:0,paddingRight:0}}>
				        <Grid style={{marginTop:"-28px",marginBottom:"10px"}}>
							<Row>
								<Col align="right">
									<ButtonGroup>
										<Button label="选择工位"  onTouchTap={this.openStationDialog} />
									    <Button label="批量录入单价"  width={100} onTouchTap={this.openPreStationUnitPriceDialog} />
										<Button label="删除" cancle={true} type="button"  onTouchTap={this.onStationDelete} />
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
						{stationVos.length>5?<div className="bottom-tip"  onTouchTap={this.showMore}> <p><span>{HeightAuto?'收起':'展开'}</span><span className={HeightAuto?'toprow':'bottomrow'}></span></p></div>:''}
						 </DotTitle>
                     <div className="all-rent" style={{marginTop:'0px',marginBottom:25,}}>服务费总计：<span style={{marginRight:50,color:'red'}}>￥{allRent}</span><span>{allRentName}</span></div>

						 </div>
				<div className="titleBar" style={{marginLeft:-23}}><span className="order-number">2</span><span className="wire"></span><label className="small-title">合同基本信息</label></div>
					<div className="small-cheek" style={{paddingBottom:0}}>

				<KrField  grid={1/2}  name="mainbillid" type="hidden" component="input" />
				<KrField grid={1/2}  name="contractstate" type="hidden" component="input" />
				<KrField grid={1/2}  name="contracttype" type="hidden" component="input" />

				<KrField grid={1}  name="contractVersionType" type="hidden" component="input" label="会议室"/>
				<KrField grid={1}  name="stationnum" type="hidden" component="input" label="工位"/>
				<KrField grid={1}  name="boardroomnum" type="hidden" component="input" label="会议室"/>

				<KrField style={{width:252,marginLeft:25}} name="leaseId"   component="select" label="出租方" options={optionValues.fnaCorporationList}   requireLabel={true} />
				<div className="lessor-address"><KrField style={{width:252,marginLeft:25}}  name="lessorAddress" type="text" component="labelText" label="地址" inline={false} value={changeValues.lessorAddress}  defaultValue="无" toolTrue={true}/></div>
				<KrField style={{width:252,marginLeft:25}}  name="lessorContactid" component="searchPersonel" label="联系人" onChange={this.onChangeSearchPersonel} placeholder={optionValues.lessorContactName}  requireLabel={true}  />

				<KrField style={{width:252,marginLeft:25}}  name="lessorContacttel" type="text" component="input" label="电话"  requireLabel={true}
				requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>

				<KrField style={{width:252,marginLeft:25}}  component="labelText" label="承租方" inline={false} value={optionValues.customerName} />

				<KrField style={{width:252,marginLeft:25}}  name="leaseAddress" type="text" component="input" label="地址"  requireLabel={true}
				requiredValue={true} pattern={/^.{0,120}$/} errors={{requiredValue:'地址为必填项',pattern:'地址最大60位'}} />

				<KrField style={{width:252,marginLeft:25}} name="leaseContact" type="text" component="input" label="联系人"  requireLabel={true}
				requiredValue={true} pattern={/^.{0,20}$/} errors={{requiredValue:'联系人为必填项',pattern:'联系人最大20位'}} />
				<KrField style={{width:252,marginLeft:25}}  name="leaseContacttel" type="text" component="input" label="电话"  requireLabel={true}
				requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}} />

				<KrField style={{width:252,marginLeft:25}}  name="communityid" component="labelText" inline={false} label="所属社区" value={optionValues.communityName}  requireLabel={true} />

				<KrField style={{width:252,marginLeft:25}} name="communityAddress" component="labelText" label="地址" inline={false} value={optionValues.communityAddress} toolTrue={true} />


				<KrField style={{width:262,marginLeft:25}} name="contractcode" component="labelText" label="合同编号" value={initialValues.contractcode} inline={false}/>

				<KrField style={{width:252,marginLeft:13}}  name="signdate"  component="date" label="签署时间" defaultValue={initialValues.signdate} requireLabel={true} />


				<KrField style={{width:252,marginLeft:25}} name="paymodel"   component="select" label="付款方式" options={optionValues.paymentList} requireLabel={true} />
				<KrField style={{width:252,marginLeft:25}} name="paytype"   component="select" label="支付方式" options={optionValues.payTypeList} requireLabel={true} />


				<KrField style={{width:252,marginLeft:25}} name="firstpaydate" component="date" label="首付款时间"  requireLabel={true}/>


				<KrField style={{width:252,marginLeft:25}}  name="stationnum" type="text" component="labelText"  label="工位" value={changeValues.stationnum} defaultValue="0" requireLabel={true} inline={false}/>
				<KrField style={{width:252,marginLeft:25}}  name="boardroomnum" type="text" component="labelText" label="会议室" value={changeValues.boardroomnum} defaultValue="0" requireLabel={true} inline={false}/>
				<KrField style={{width:252,marginLeft:25}}  name="totalrent" type="text" component="labelText" label="租金总额" placeholder="" requireLabel={true}
				value={allRent} defaultValue='0' inline={false}
				requiredValue={true} pattern={/^\d{0,16}(\.\d{0,2})?$/} errors={{requiredValue:'租金总额为必填项',pattern:'请输入正数金额，小数点后最多两位'}} />
				<KrField style={{width:252,marginLeft:25}}  name="totaldeposit" type="text" component="input" label="押金总额" requireLabel={true}
				requiredValue={true} pattern={/^\d{0,16}(\.\d{0,2})?$/} errors={{requiredValue:'押金总额为必填项',pattern:'请输入正数金额，小数点后最多两位'}} />
				<KrField style={{width:545,marginLeft:25}}  name="contractmark" component="textarea" label="备注" maxSize={200}/>
				<KrField style={{width:545,marginLeft:25}}  name="agreement" type="textarea" component="textarea" label="双方其他约定内容" maxSize={200}/>

				</div>

				<div className="end-round"></div>
			</div>
		</div>
				<KrField style={{width:545,marginLeft:25,marginTop:'-20px',paddingLeft:"25px"}}  name="fileIdList" component="file" label="合同附件" defaultValue={optionValues.contractFileList}  onChange={(files)=>{
					Store.dispatch(change('joinEditForm','contractFileList',files));
				}} />

				<Grid style={{paddingBottom:50}}>
						<Row >
						<ListGroup>
							<ListGroupItem style={{width:'45%',textAlign:'right',paddingRight:15}}><Button  label="确定" type="submit" disabled={pristine || submitting} /></ListGroupItem>
							<ListGroupItem style={{width:'45%',textAlign:'left',paddingLeft:15}}> <Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}/> </ListGroupItem>
						</ListGroup>
						</Row>
						</Grid>

						</form>


					<Dialog
						title="分配工位"
						autoScrollBodyContent={true}
						contentStyle ={{ width: '100%', maxWidth: 'none',height:650}}
						open={this.state.openStation} onClose={this.openStationDialog}>
							<PlanMapContent data={this.state.stationUrl} onClose={this.onIframeClose}/>
					  </Dialog>

					<Dialog
						title="录入单价"
						autoScrollBodyContent={true}
						open={this.state.openStationUnitPrice}
						onClose={this.openStationUnitPriceDialog} contentStyle={{width:430}}>
								<UnitPriceForm  onSubmit={this.onStationUnitPrice} onCancel={this.openStationUnitPriceDialog}/>
					  </Dialog>

			</div>);
	}
}

const validate = values => {

	const errors = {}

	++values.num;
	localStorage.setItem(values.mainbillid+''+values.customerId+values.contracttype+'edit',JSON.stringify(values));
	

	if (!values.leaseId) {
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
		errors.leaseAddress = '请填写承租方地址';
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


	if (!String(values.totaldeposit)) {
		errors.totaldeposit = '请输入押金总额';
	}

	if (values.totaldeposit && isNaN(values.totaldeposit)) {
		errors.totaldeposit = '押金总额必须为数字';
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

	if (!values.firstpaydate) {
		errors.firstpaydate = '请输入首付款时间';
	}





	return errors
}

const selector = formValueSelector('joinEditForm');

NewCreateForm = reduxForm({
	form: 'joinEditForm',
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
	changeValues.leaseBegindate = selector(state, 'leaseBegindate');
	changeValues.leaseEnddate = selector(state, 'leaseEnddate');
	changeValues.wherefloor = selector(state, 'wherefloor');


	return {
		changeValues
	}

})(NewCreateForm);
