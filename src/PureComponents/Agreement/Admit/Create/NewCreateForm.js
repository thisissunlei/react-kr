import React, {
	Component,
	PropTypes
} from 'react';

import {
	connect,
	Actions,
	Store
} from 'kr/Redux';
import "./index.less";
import {Http,DateFormat} from 'kr/Utils';
import nzh from 'nzh';
import ReactMixin from "react-mixin";
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import dateFormat from 'dateformat';
import PlanMapContent from '../../../PlanMapContent';

import {
	reduxForm,
	formValueSelector,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray,
	Fields,
	change
} from 'redux-form';


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
	Paper,
	DotTitle,
	ButtonGroup,
	ListGroup,
	ListGroupItem,
	KrDate,
	CircleStyle
} from 'kr-ui';

@ReactMixin.decorate(LinkedStateMixin)
class NewCreateForm extends Component {


	static contextTypes = {
		par: React.PropTypes.object.isRequired
	}

	static defaultPropTypes = {
		initialValues: {
			customerName: '',
			communityName: '',
			lessorAddress: '',
			payTypeList: [],
			paymentList: [],
			fnaCorporationList: [],
			billList: [],
		}
	}

	static propTypes = {
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


		this.onChangeSearchPersonel = this.onChangeSearchPersonel.bind(this);
		this.onStationVosChange = this.onStationVosChange.bind(this);
		this.onChangeLeaseBeginDate = this.onChangeLeaseBeginDate.bind(this);
		this.onChangeLeaseEndDate = this.onChangeLeaseEndDate.bind(this);
		this.calcStationNum = this.calcStationNum.bind(this);
		this.onCloseStation = this.onCloseStation.bind(this);
		this.state = {
			stationVos:this.props.initialValues.stationVos || [],
			selectedStation: [],
			openStation: false,
			openStationUnitPrice: false,
			HeightAuto: false,
			allRent:0,
		}
	}

	onStationVosChange(index, value) {

		let {
			stationVos
		} = this.state;


		if(!value || isNaN(value)){
			stationVos[index].unitprice ="";
		}else{
			stationVos[index].unitprice = value;
		}

		this.setState({
			stationVos
		});
	}

	onCloseStation() {
		this.setState({
			openStation: !this.state.openStation
		});

	}


	//删除工位
	onStationDelete() {

		let {
			selectedStation,
			stationVos
		} = this.state;
		stationVos = stationVos.filter(function(item, index) {
			if (selectedStation.indexOf(index) != -1) {
				return false;
			}
			return true;
		});
		Store.dispatch(change('admitCreateForm', 'stationVos',stationVos));
		
		this.setState({
			stationVos,
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

		if (!wherefloor) {
			Notify.show([{
				message: '请先选择楼层',
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
		Store.dispatch(initialize('admitCreateForm', initialValues));
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.initialValues!= nextProps.initialValues){
			Store.dispatch(initialize('admitCreateForm', nextProps.initialValues));
			
		}
		if(this.props.initialValues.stationVos!=nextProps.initialValues.stationVos){
			this.setState({
				stationVos:nextProps.initialValues.stationVos || [],
			})
		}

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

	//录入单价dialog
	openStationUnitPriceDialog=()=> {
		// Store.dispatch(change('admitCreateForm', 'stationVos', this.state.openStationUnitPrice));
		this.setState({
			openStationUnitPrice: !this.state.openStationUnitPrice
		});
	}

	//录入单价
	onStationUnitPrice=(form)=> {

		var value = form.price;
		let {
			stationVos,
			selectedStation
		} = this.state;
		let _this = this;
		let allMoney = 0;

		stationVos = stationVos.map(function(item, index) {
			if (selectedStation.indexOf(index) != -1) {
				item.unitprice = value;
			}
			return item;
		});

		Store.dispatch(change('admitCreateForm', 'stationVos', stationVos));

		this.setAllRent(stationVos);


		// stationVos.map((item)=>{
		// 	allMoney += _this.getSingleRent(item);
		// })
		// allMoney = parseFloat(allMoney).toFixed(2)*1;

		this.setState({
			stationVos,
			allRent:allMoney
		});

		this.openStationUnitPriceDialog();
	}

	onSubmit(form) {

		form = Object.assign({}, form);
		let {
			stationVos
		} = this.state;
		form.list = stationVos;
		form.stationVos = JSON.stringify(stationVos);


		let {
			billList,
			allRent
		} = this.state;

		let {
			changeValues
		} = this.props;

		form.lessorAddress = changeValues.lessorAddress;

		var _this = this;

		// form.stationVos =  stationVos;
		if (!stationVos.length) {
			Notify.show([{
				message: '请选择工位',
				type: 'danger',
			}]);
			return;
		}

		// form.stationVos = JSON.stringify(form.stationVos);
		form.contractVersionType = 'NEW';
		form.totalrent = allRent;
		form.signdate = dateFormat(form.signdate, "yyyy-mm-dd HH:MM:ss");
		form.leaseBegindate = dateFormat(form.leaseBegindate, "yyyy-mm-dd HH:MM:ss");
		form.leaseEnddate = dateFormat(form.leaseEnddate, "yyyy-mm-dd HH:MM:ss");
		if(!!!form.agreement){
			form.agreement = '无';
		}
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(form);
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

		Store.dispatch(change('admitCreateForm', 'stationnum', stationnum));
		Store.dispatch(change('admitCreateForm', 'boardroomnum', boardroomnum));
	}

	onCancel() {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}

	//修改租赁期限－开始时间
	onChangeLeaseBeginDate(value) {

		value = dateFormat(value, "yyyy-mm-dd HH:MM:ss");

		let {
			stationVos
		} = this.state;

		if (!stationVos.length) {
			return;
		}
		Store.dispatch(change('admitCreateForm', 'stationVos', []));
		Store.dispatch(change('admitCreateForm', 'totalrent', '0'));


		this.setState({
			stationVos: []
		});

	}

	//修改租赁期限-结束时间
	onChangeLeaseEndDate(value) {
		value = dateFormat(value, "yyyy-mm-dd HH:MM:ss");
		let {
			stationVos
		} = this.state;

		if (!stationVos.length) {
			return;
		}
		Store.dispatch(change('admitCreateForm', 'stationVos', []));
		Store.dispatch(change('admitCreateForm', 'totalrent', '0'));

		this.setState({
			stationVos: []
		});

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
			mainBillId: this.props.initialValues.mainbillid,
			communityId: optionValues.mainbillCommunityId,
			floors: changeValues.wherefloor,
			//工位
			goalStationNum: changeValues.stationnum,
			//独立空间
			goalBoardroomNum: changeValues.boardroomnum,
			selectedObjs: stationVos,
			startDate: DateFormat(changeValues.leaseBegindate, "yyyy-mm-dd HH:MM:ss"),
			endDate: DateFormat(changeValues.leaseEnddate, "yyyy-mm-dd HH:MM:ss"),
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

		let {
			stationVos
		} = this.state;


		try {
			billList && billList.map(function(item, index) {
				item.leaseBeginDate = dateFormat(changeValues.leaseBegindate, "yyyy-mm-dd");
				item.leaseEndDate = dateFormat(changeValues.leaseEnddate, "yyyy-mm-dd");
				item.stationId = item.id;
				item.stationName = item.name;
				item.stationType = item.type;
				item.unitprice = '';
				item.whereFloor = item.whereFloor;
			});
		} catch (err) {
		}

		Store.dispatch(change('admitCreateForm', 'stationVos', billList));

		this.setState({
			stationVos: billList
		}, function() {
			this.calcStationNum();
		});


		billList = [].concat(billList);


	}
	showMore = () => {
		this.setState({
			HeightAuto: !this.state.HeightAuto
		})

	}
	onChangeSearchPersonel(personel) {
		Store.dispatch(change('admitCreateForm', 'lessorContacttel', personel.mobile));
		Store.dispatch(change('admitCreateForm', 'lessorContactName', personel.lastname));
	}
	onBlur=(item)=>{

		let {stationVos} = this.state;
		let allMoney = 0;
		this.setAllRent(stationVos);
		Store.dispatch(change('admitCreateForm', 'stationVos',stationVos));


	}
	setAllRent=(list)=>{
		let _this = this;
		let stationList = list.map((item)=>{
		if(!item.unitprice){
				item.unitprice = 0;
			}else{
				item.unitprice = (item.unitprice+'').replace(/\s/g,'');
			}
			return item;
		})
		Http.request('getAllRent','',{stationList:JSON.stringify(list)}).then(function(response) {
			_this.setState({
				allRent:response
			})
		Store.dispatch(change('admitCreateForm', 'totalrent', response));

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
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
		var nzhcn = nzh.cn;
		let  allRentName = nzhcn.encodeB(parseFloat(allRent));
		var agreementValue = '如需填写双方其他约定内容，请邮件发送法务部林玉洁（linyujie@krspace.cn）审批，抄送技术部陈振江（chenzhenjiang@krspace.cn），冯西臣（fengxichen@krspace.cn），审批通过后技术部修改该内容，即可打印';

		return (


			<div>


	<div style={{width:615,marginLeft:"-20px"}}>

	<form className="m-new-create m-new-dialog-create" onSubmit={handleSubmit(this.onSubmit)} >
				<div className="cheek" style={{paddingLeft:0,marginLeft:23}}>
					<div className="titleBar" style={{marginLeft:-23}}><span className="order-number">1</span><span className="wire"></span><label className="small-title">租赁明细</label></div>
					<div className="small-cheek">
					<KrField name="wherefloor" style={{width:262,marginLeft:25}}  component="select" label="所属楼层" options={optionValues.floorList} multi={true}  requireLabel={true}/>
					 <KrField style={{width:343,marginLeft:25,position:"absolute"}}  component="group" label="租赁期限" requireLabel={true}>
										<ListGroup>
											<ListGroupItem style={{width:'141',padding:0,marginLeft:'-10px',marginTop:'-10px'}}> <KrField simple={true} style={{width:141}} name="leaseBegindate"  component="date" onChange={this.onChangeLeaseBeginDate}/> </ListGroupItem>
											<ListGroupItem style={{width:'31',textAlign:'center',padding:0,marginLeft:10,marginTop:'-10px'}}><span style={{display:'inline-block',lineHeight:'60px',width:'31px',textAlign:'center',left:'10px',position:"relative"}}>至</span></ListGroupItem>
											<ListGroupItem style={{width:'141',padding:0,marginTop:'-10px'}}> <KrField simple={true} style={{width:141}}  name="leaseEnddate" component="date" onChange={this.onChangeLeaseEndDate} /> </ListGroupItem>
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
							<Table onSelect={this.onStationSelect}>
									<TableHeader>
											<TableHeaderColumn>类别</TableHeaderColumn>
											<TableHeaderColumn>编号／名称</TableHeaderColumn>
											<TableHeaderColumn>单价(元/月)</TableHeaderColumn>
											<TableHeaderColumn>租赁开始时间</TableHeaderColumn>
											<TableHeaderColumn>租赁结束时间</TableHeaderColumn>
									</TableHeader>
									<TableBody>
										{
											stationVos && stationVos.map((item,index)=>{
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
                     <div style={{marginTop:'-20px',marginBottom:60,display:'none'}}>服务费总计：<span style={{marginRight:50,color:'red'}}>￥{allRent}</span><span>{allRentName}</span></div>

               			</div>

						<div className="titleBar" style={{marginLeft:-23}}><span className="order-number">2</span><span className="wire"></span><label className="small-title">合同文本信息</label></div>
							<div className="small-cheek" style={{paddingBottom:0}}>

								<KrField grid={1/2}  name="stationnum" type="hidden" component="input" />
								<KrField grid={1/2}  name="boardroomnum" type="hidden" component="input" />
								<KrField grid={1/2}  name="stationVos" type="hidden" component="input" />

								<KrField style={{width:262,marginLeft:25}} name="leaseId" component="select" label="出租方" options={optionValues.fnaCorporationList} requireLabel={true}/>

								<div className="lessor-address"><KrField style={{width:262,marginLeft:25}} type="text" component="labelText" inline={false} label="地址" value={changeValues.lessorAddress} defaultValue="无" toolTrue={true}/></div>
								<KrField style={{width:262,marginLeft:25}}  name="lessorContactid" component="searchPersonel" label="联系人" onChange={this.onChangeSearchPersonel} requireLabel={true}  placeholder={initialValues.lessorContactName}/>

								<KrField style={{width:262,marginLeft:25}} name="lessorContacttel" type="text" component="input" label="电话" requireLabel={true}
								 requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>

								<KrField style={{width:262,marginLeft:25}}  component="labelText" label="承租方" value={optionValues.customerName} inline={false}/>
								<KrField style={{width:262,marginLeft:25}} name="leaseAddress" type="text" component="input" label="地址" requireLabel={true}
								 requiredValue={true} pattern={/^.{0,120}$/} errors={{requiredValue:'地址为必填项',pattern:'地址最大60位'}} />

								<KrField style={{width:262,marginLeft:25}}  name="leaseContact" type="text" component="input" label="联系人" requireLabel={true}
								 requiredValue={true} pattern={/^.{0,20}$/} errors={{requiredValue:'联系人为必填项',pattern:'联系人最大20位'}}  />
								<KrField style={{width:262,marginLeft:25}}  name="leaseContacttel" type="text" component="input" label="电话" requireLabel={true}
								 requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>

								<KrField style={{width:262,marginLeft:25}} component="labelText" label="所属社区" value={optionValues.communityName} inline={false}/>





								<KrField style={{width:262,marginLeft:25}}  name="signdate"  component="date" label="签署日期"  requireLabel={true}/>
								{/*<KrField style={{width:262,marginLeft:25}} name="contractcode" type="text" component="input" label="合同编号"  requireLabel={true}
								 requiredValue={true} pattern={/^.{0,50}$/} errors={{requiredValue:'合同编号为必填项',pattern:'合同编号最大50位'}}/>
								*/}
								<KrField style={{width:262,marginLeft:25}} name="contractcode" component="labelText" label="合同编号" value={initialValues.contractcode} inline={false}/>



                                <KrField style={{width:262,marginLeft:25}}  name="totaldownpayment" type="text" component="input" label="定金总额"  requireLabel={true}
																 requiredValue={true} pattern={/^\d{0,16}(\.\d{0,2})?$/} errors={{requiredValue:'定金总额为必填项',pattern:'请输入正数金额，小数点后最多两位'}} />
								<KrField style={{width:262,marginLeft:25}} name="paymentId" type="text" component="select" label="付款方式" options={optionValues.paymentList} requireLabel={true}/>



	                            <KrField  name="templockday" style={{width:262,marginLeft:25}} component="input" type="text" label="保留天数" requireLabel={true}
																 requiredValue={true} pattern={/^\d{0,3}$/} errors={{requiredValue:'保留天数为必填项',pattern:'请输入三位以内正整数'}} />

								<KrField style={{width:545,marginLeft:25}}  name="contractmark" type="textarea" component="textarea" label="备注" maxSize={200}/>
							    <KrField style={{width:545,marginLeft:25}}  name="agreement" type="textarea" component="labelText" label="双方其他约定内容" maxSize={200} value={agreementValues} />

								<KrField style={{width:545,marginLeft:25}}  name="contractFileList" component="input" type="hidden" label="合同附件"/>
								<KrField style={{width:262,marginLeft:25}}  name="stationnum"  component="labelText" label="租赁工位" value={changeValues.stationnum} defaultValue="0" requireLabel={true} inline={false}/>
								<KrField style={{width:262,marginLeft:25}}  name="boardroomnum"  component="labelText" label="租赁独立空间" value={changeValues.boardroomnum} defaultValue="0" requireLabel={true} inline={false}/>
							</div>

							<div className="end-round"></div>
					</div>
				</div>
							<KrField  style={{width:545,marginLeft:25,marginTop:'-20px',paddingLeft:"25px"}} name="fileIdList" component="file" label="合同附件" defaultValue={initialValues.contractFileList || []} onChange={(files)=>{
								Store.dispatch(change('admitCreateForm','contractFileList',files));
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
	</div>


					<Dialog
						title="分配工位"
						autoScrollBodyContent={true}
						contentStyle ={{ width: '100%', maxWidth: 'none',height:650}}
						open={this.state.openStation}
						onClose={this.onCloseStation}
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
	if (!values.wherefloor) {
		errors.wherefloor = '请先选择楼层';
	}

	if (!values.leaseContacttel) {
		errors.leaseContacttel = '请填写承租方电话';
	}

	if (!values.leaseAddress) {
		errors.leaseAddress = '请填写承租方地址';
	}

	if (values.leaseAddress && !isNaN(values.leaseAddress)) {
		errors.leaseAddress = '承租方地址不能为数字';
	}

	if (!values.leaseContact) {
		errors.leaseContact = '请填写承租方联系人';
	}

	if (!values.paymodel) {
		errors.paymodel = '请填写付款方式';
	}

	if (!values.signdate) {
		errors.signdate = '请填写签署时间';
	}

	if (!values.leaseBegindate) {
		errors.leaseBegindate = '请填写租赁期限开始时间';
	}

	if (!values.leaseEnddate) {
		errors.leaseEnddate = '请填写租赁期限结束时间';
	}

	if (!values.templockday) {
		errors.templockday = '请填写保留天数';
	}

	if (!values.contractcode) {
		errors.contractcode = '请填写合同编号';
	}

	if (!values.paymentId) {
		errors.paymentId = '请填写付款方式';
	}

	if (!String(values.totaldownpayment)) {
		errors.totaldownpayment = '请填写定金总额';
	}

	if (values.totaldownpayment && isNaN(values.totaldownpayment)) {
		errors.totaldownpayment = '定金总额必须为数字';
	}

	return errors
}

const selector = formValueSelector('admitCreateForm');

NewCreateForm = reduxForm({
	form: 'admitCreateForm',
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

})(NewCreateForm)
