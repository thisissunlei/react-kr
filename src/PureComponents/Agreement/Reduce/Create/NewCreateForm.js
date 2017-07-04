import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';
import Param from 'jquery-param';
import {
	Binder
} from 'react-binding';
import ReactMixin from "react-mixin";
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import dateFormat from 'dateformat';
import nzh from 'nzh';

import {Http} from 'kr/Utils'
import {
	reduxForm,
	formValueSelector,
	change,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray,

} from 'redux-form';

import {
	Actions,
	Store
} from 'kr/Redux';

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
	DotTitle,
	KrDate,
	ButtonGroup,
	Paper,
	ListGroup,
	ListGroupItem,
	CircleStyle
} from 'kr-ui';

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

	static contextTypes = {
		params: React.PropTypes.object.isRequired
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

		this.state = {
			stationVos: this.props.initialValues.stationVos || [],
			selectedStation: [],
			openStation: false,
			openStationUnitPrice: false,
			allRent:this.props.initialValues.rentamount || 0,
			HeightAuto: false,
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
		this.setState({
			HeightAuto: !this.state.HeightAuto
		})

	}

	onChangeSearchPersonel(personel) {
		Store.dispatch(change('reduceCreateForm', 'lessorContacttel', personel.mobile));
	}

	//录入单价dialog
	openStationUnitPriceDialog() {
		this.setState({
			openStationUnitPrice: !this.state.openStationUnitPrice
		});
	}

	onChangeSearchPersonel(personel) {
		Store.dispatch(change('reduceCreateForm', 'lessorContacttel', personel.mobile));
		Store.dispatch(change('reduceCreateForm', 'lessorContactName', personel.lastname));
	}

	onStationCancel() {
		this.openStationDialog();
	}

	onStationSubmit(stationVos) {
		let _this = this;
		let allRent = 0;
		Store.dispatch(change('reduceCreateForm', 'stationVos', stationVos));

		this.setAllRent(stationVos);

		this.setState({
			stationVos,
		});
		this.openStationDialog();
	}
	setAllRent=(list)=>{
		let _this = this;
		let stationList = list.map((item)=>{
			if(!item.unitprice){
				item.unitprice = 0;
			}
			return item;
		})

		Http.request('reduceGetAllRent','',{stationList:JSON.stringify(list),billId:_this.props.initialValues.mainbillid}).then(function(response) {
			_this.setState({
				allRent:response
			})
		Store.dispatch(change('reduceCreateForm', 'rentamount', response));

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
		stationVos = stationVos.filter(function(item, index) {

			if (selectedStation.indexOf(index) != -1) {
				return false;
			}
			return true;
		});
		Store.dispatch(change('reduceCreateForm', 'stationVos', stationVos));

		let _this = this;
		let allRent = 0;
		this.setAllRent(stationVos);
		this.setState({
			stationVos
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
		Store.dispatch(initialize('reduceCreateForm', initialValues));
		this.setState({
			allRent:initialValues.rentamount
		})
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.initialValues!= nextProps.initialValues){
			Store.dispatch(initialize('reduceCreateForm', nextProps.initialValues));
			
		}
		if(this.props.initialValues.stationVos!=nextProps.initialValues.stationVos){
			console.log('will')
			this.setState({
				stationVos:nextProps.initialValues.stationVos || [],
				allRent:nextProps.initialValues.rentamount || '0'
			})
		}

	}

	onSubmit(form) {
		form = Object.assign({}, form);

		let {
			changeValues
		} = this.props;

		let {
			stationVos
		} = this.state;

		if (!stationVos.length) {
			Notify.show([{
				message: '请选择工位',
				type: 'danger',
			}]);
			return;
		}

		form.list = stationVos;
		form.signdate = dateFormat(form.signdate, "yyyy-mm-dd hh:MM:ss");
		form.lessorAddress = changeValues.lessorAddress;

		form.leaseBegindate = dateFormat(stationVos[0].leaseBeginDate, "yyyy-mm-dd hh:MM:ss");
		form.leaseEnddate = dateFormat(stationVos[0].leaseEndDate, "yyyy-mm-dd hh:MM:ss");


		form.stationVos = stationVos;
		// form.rentamount = (this.state.allRent).toFixed(2);
		form.stationVos = JSON.stringify(form.stationVos);
		form.contractVersionType = 'NEW';
		if(!!!form.agreement){
			form.agreement = '无';
		}
		if(form.rentamount == 0){
			Notify.show([{
				message: '服务费不能为零',
				type: 'danger',
			}]);
			return;
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
					HeightAuto
				} = this.state;
				let allRentName = this.dealRentName(allRent);
				var agreementValue = '如需填写双方其他约定内容，请邮件发送法务部林玉洁（linyujie@krspace.cn）审批，抄送技术部陈振江（chenzhenjiang@krspace.cn），冯西臣（fengxichen@krspace.cn），审批通过后技术部修改该内容，即可打印';

				return (
					<div style={{width:615,marginTop:'-10px',marginLeft:"-20px"}}>

						<form className="m-new-reduce m-new-reduce-dialog-form" onSubmit={handleSubmit(this.onSubmit)}>
							<div className="cheek" style={{paddingLeft:0,marginLeft:23}}>
								<div className="titleBar" style={{marginLeft:-23}}><span className="order-number">1</span><span className="wire"></span><label className="small-title">租赁明细</label></div>
								<div className="small-cheek">
									<div className="detailList" style={{marginTop:"-35px",width:"620px",marginLeft:"35px",paddingLeft:0,paddingRight:0}} >
										<DotTitle title='租赁明细' style={{marginTop:53,marginBottom:25,paddingLeft:0,paddingRight:0}}>
									       <Grid style={{marginTop:"-28px",marginBottom:"10px"}}>
												<Row>
													<Col align="right">
														<ButtonGroup>
															<Button label="减租"  onTouchTap={this.openStationDialog} />
															<Button label="删除" height={27} cancle={true} type="button"  onTouchTap={this.onStationDelete} />
													  	</ButtonGroup>
													</Col>
												</Row>
											</Grid>
											<div style={{marginTop:"-10px"}}>
												<Table  displayCheckbox={true} onSelect={this.onStationSelect}>
													<TableHeader>
														<TableHeaderColumn>类别</TableHeaderColumn>
														<TableHeaderColumn>编号／名称</TableHeaderColumn>
														<TableHeaderColumn>单价(元/月)</TableHeaderColumn>
														<TableHeaderColumn>减租开始时间</TableHeaderColumn>
														<TableHeaderColumn>减租结束日期</TableHeaderColumn>
													</TableHeader>
													<TableBody>
														{stationVos.map((item,index)=>{
															return (
																<TableRow key={index}>
																	<TableRowColumn>{(item.stationType == 1) ?'工位':'独立空间'}</TableRowColumn>
																	<TableRowColumn>{item.stationName}</TableRowColumn>
																	<TableRowColumn>
																			{item.unitprice}
																	</TableRowColumn>
																	<TableRowColumn> <KrDate value={item.leaseBeginDate}/></TableRowColumn>
																	<TableRowColumn><KrDate value={item.leaseEndDate}/></TableRowColumn>

																</TableRow>
															);
														})}
													</TableBody>
												</Table>
											</div>

				                       		{stationVos.length > 5 ? <div className="bottom-tip"  onTouchTap={this.showMore}> <p><span>{HeightAuto?'收起':'展开'}</span><span className={HeightAuto?'toprow':'bottomrow'}></span></p></div>:''}

							            </DotTitle>
							            <div className="all-rent" style={{marginTop:'0px',marginBottom:25}}>减少费用总计：<span style={{marginRight:50,color:'red'}}>￥{allRent || '0'}</span><span>{allRentName}</span></div>

					                </div>

									<div className="titleBar" style={{marginLeft:-23}}><span className="order-number">2</span><span className="wire"></span><label className="small-title">合同基本信息</label></div>
									<div className="small-cheek" style={{paddingBottom:0}}>
										<KrField grid={1/2}  name="mainbillid" type="hidden" component="input" />
										<KrField grid={1/2}  name="contractstate" type="hidden" component="input" />
										<KrField grid={1/2}  name="contracttype" type="hidden" component="input" />
										<KrField grid={1/2}  name="leaseEnddate" type="hidden" component="input" />
										<KrField grid={1/2}  name="leaseBegindate" type="hidden" component="input" />

										<KrField style={{width:262,marginLeft:25}} name="leaseId" component="select" label="出租方" options={optionValues.fnaCorporationList} requireLabel={true} />
										<div className="lessor-address"> <KrField style={{width:262,marginLeft:25}} name="lessorAddress" type="text" component="labelText" inline={false} label="地址" value={changeValues.lessorAddress}  defaultValue="无" toolTrue={true}/></div>
										<KrField style={{width:262,marginLeft:25}} name="lessorContactid" component="searchPersonel" label="联系人" onChange={this.onChangeSearchPersonel} requireLabel={true} placeholder={initialValues.lessorContactName}/>
										<KrField style={{width:262,marginLeft:25}} name="lessorContacttel" type="text" component="input" label="电话" requireLabel={true}
										requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} />

										<KrField style={{width:262,marginLeft:25}} component="labelText" label="承租方" inline={false} value={optionValues.customerName}/>

										<KrField style={{width:262,marginLeft:25}} name="leaseAddress" type="text" component="input" label="地址" requireLabel={true}
										requiredValue={true} pattern={/^.{0,120}$/} />

										<KrField style={{width:262,marginLeft:25}} name="leaseContact" type="text" component="input" label="联系人" requireLabel={true}
										requiredValue={true} pattern={/^.{0,20}$/} />
										<KrField style={{width:262,marginLeft:25}} name="leaseContacttel" type="text" component="input" label="电话" requireLabel={true}
										requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} />

										<KrField style={{width:262,marginLeft:25}} name="communityid" component="labelText" label="所属社区" inline={false} value={optionValues.communityName} />

										<KrField style={{width:262,marginLeft:25}} name="communityAddress" component="labelText" label="地址" inline={false} value={optionValues.communityAddress} toolTrue={true}/>

										<KrField style={{width:262,marginLeft:25}} name="contractcode" component="labelText" label="合同编号" value={initialValues.contractcode} inline={false}/>
										<KrField style={{width:262,marginLeft:25}} name="rentamount" component="labelText" inline={false} type="text" requireLabel={true} label="减租金额" value={allRent} defaultValue="0"
										requiredValue={true} pattern={/^\d{0,16}(\.\d{0,2})?$/} />

										<KrField  style={{width:545,marginLeft:25}} name="contractmark" component="textarea" label="备注" maxSize={200}/>
										<KrField style={{width:545,marginLeft:25}}  name="agreement" type="textarea" component="labelText" inline={false} label="双方其他约定内容" maxSize={200} value={agreementValue}/>

									</div>

									<div className="end-round"></div>
								</div>
							</div>
							<KrField  style={{width:545,marginLeft:25,marginTop:'-20px'}}   name="contractFileList" component="input" type="hidden" label="合同附件"/>
							<KrField style={{width:545,marginLeft:25,marginTop:'-20px',paddingLeft:"25px"}}  name="fileIdList" component="file" label="合同附件"  defaultValue={initialValues.contractFileList || []} onChange={(files)=>{
								Store.dispatch(change('reduceCreateForm','contractFileList',files));
							}} />

				         	<div style={{paddingBottom:50,textAlign:"center"}}>
								<Grid >
									<Row >
										<ListGroup>
											<ListGroupItem style={{textAlign:'right',paddingRight:15}}><Button  label="确定" type="submit" disabled={pristine || submitting} width={81} height={30} fontSize={16} /></ListGroupItem>
											<ListGroupItem style={{textAlign:'left',paddingLeft:15,paddingRight:0}}><Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel} width={81} height={30} fontSize={16}/></ListGroupItem>
										</ListGroup>
									</Row>
								</Grid>
							</div>

						</form>

						<Dialog
							title="分配工位"
							open={this.state.openStation}
							modal={true}
							autoScrollBodyContent={true}
							autoDetectWindowHeight={true}
							onClose={this.onStationCancel}>
								<AllStation onSubmit={this.onStationSubmit} onCancel={this.onStationCancel} params= {this.props.params}/>
					    </Dialog>


					</div>);
			}
}
const selector = formValueSelector('reduceCreateForm');
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

	if (!values.signdate) {
		errors.signdate = '请填写签署时间';
	}

	if (!values.contractcode) {
		errors.contractcode = '请填写合同编号';
	}


	return errors
}
NewCreateForm = reduxForm({
	form: 'reduceCreateForm',
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
	changeValues.wherefloor = selector(state, 'wherefloor') || 0;

	return {
		changeValues
	}

})(NewCreateForm);
