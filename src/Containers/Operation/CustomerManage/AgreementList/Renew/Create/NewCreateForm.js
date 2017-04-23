import React, {
	 
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
import {DateFormat} from 'kr/Utils';
import nzh from 'nzh';
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

@ReactMixin.decorate(LinkedStateMixin)
class NewCreateForm extends React.Component {

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
			stationVos: [],
			selectedStation: [],
			openStation: false,
			openStationUnitPrice: false,
			allRent:0,
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
		this.openStationDialog();
	}

	onStationSubmit(stationVos) {
		let _this = this;
		let allRent = 0;
		this.setAllRent(stationVos);
		this.setState({
			stationVos
		});
		let {initialValues} = this.props;
		localStorage.setItem(initialValues.mainbillid+''+initialValues.customerId+'RENEWcreatestationVos', JSON.stringify(stationVos));


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
		let {initialValues} = this.props;

		Store.dispatch(Actions.callAPI('getAllRent',{},{stationList:JSON.stringify(list)})).then(function(response) {
		localStorage.setItem(initialValues.mainbillid+''+initialValues.customerId+'RENEWcreatetotalrent', JSON.stringify(response));
			_this.setState({
				allRent:response
			})
		}).catch(function(err) {
			console.log(err);
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
		let rentPriceByDay = ((item.unitprice*12)/365).toFixed(6);
		//工位总价钱
		let allRent = (rentPriceByDay * rentDay) + (rentMounth*item.unitprice);
		allRent = allRent.toFixed(2)*1;
		return allRent;
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
		let _this = this;
		let allRent = 0;
		let {initialValues} = this.props;
		localStorage.setItem(initialValues.mainbillid+''+initialValues.customerId+'RENEWcreatestationVos', JSON.stringify(stationVos));

		this.setAllRent(stationVos);
		this.setState({
			stationVos,
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
			initialValues,
		} = this.props;
		Store.dispatch(initialize('renewCreateForm', initialValues));

	}

	componentWillReceiveProps(nextProps) {
		if (!this.isInit && nextProps.stationVos.length) {
			let stationVos = nextProps.stationVos;
			this.setState({
				stationVos,
			}, function() {
				this.setAllRent(nextProps.stationVos);
			});
			this.isInit = true;
		}
		if(this.props.initialValues != nextProps.initialValues){
			Store.dispatch(initialize('renewCreateForm', nextProps.initialValues));
			this.setState({
				initialValues:nextProps.initialValues
			})
		}
		if(this.props.optionValues != nextProps.optionValues){
			this.setState({
				optionValues:nextProps.optionValues
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
				message: "请选择工位",
				type: 'danger',
			}]);
			return;
		};


		form.stationVosList = stationVos;
		form.lessorAddress = changeValues.lessorAddress;

		form.leaseBegindate = DateFormat(stationVos[0].leaseBeginDate, "yyyy-mm-dd hh:MM:ss");
		form.leaseEnddate = DateFormat(stationVos[0].leaseEndDate, "yyyy-mm-dd hh:MM:ss");

		form.firstpaydate = DateFormat(form.firstpaydate, "yyyy-mm-dd hh:MM:ss");

		form.stationVos = JSON.stringify(stationVos);
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

		return (
		<div style={{width:615,marginTop:'-10px',marginLeft:"-20px"}}>

<form className="m-new-renew m-new-renew-dialog-form" onSubmit={handleSubmit(this.onSubmit)} >
			<div className="cheek" style={{paddingLeft:0,marginLeft:23}}>
				<div className="titleBar" style={{marginLeft:-23}}><span className="order-number">1</span><span className="wire"></span><label className="small-title">租赁明细</label></div>
				<div className="small-cheek">
				<div className="detailList" style={{marginTop:"-35px",width:"620px",marginLeft:"35px"}}>
				<DotTitle title='租赁明细' style={{marginTop:20,marginBottom:25}}>
				      <Grid style={{marginTop:"-28px",marginBottom:"10px"}}>
							<Row>
								<Col align="right">
									<ButtonGroup>
										<Button label="续租"  onTouchTap={this.openStationDialog} />
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
							return (
								<TableRow key={index}>
									<TableRowColumn>{(item.stationType == 1) ?'工位':'会议室'}</TableRowColumn>
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
                      {stationVos.length>5?<div className="bottom-tip"  onTouchTap={this.showMore}> <p><span>{HeightAuto?'收起':'展开'}</span><span className={HeightAuto?'toprow':'bottomrow'}></span></p></div>:''}
					
                     </DotTitle>
                     <div className="all-rent" style={{marginTop:'0px',marginBottom:25}}>服务费总计：<span style={{marginRight:50,color:'red'}}>￥{allRent}</span><span>{allRentName}</span></div>

                    </div>

			<div className="titleBar" style={{marginLeft:-23}}><span className="order-number">2</span><span className="wire"></span><label className="small-title">合同基本信息</label></div>
				<div className="small-cheek" style={{paddingBottom:0}}>
					
				<KrField grid={1/2}  name="mainbillid" type="hidden" component="input" />
				<KrField grid={1/2}  name="contractstate" type="hidden" component="input" />
				<KrField grid={1/2}  name="contracttype" type="hidden" component="input" />
				<KrField grid={1/2}  name="leaseBegindate" type="hidden" component="input" />

				<KrField style={{width:262,marginLeft:25}}  name="leaseId"   component="select" label="出租方" options={optionValues.fnaCorporationList}  requireLabel={true} />
				<div className="lessor-address"><KrField style={{width:262,marginLeft:25}}   name="lessorAddress" type="text" component="labelText" inline={false} label="地址" value={changeValues.lessorAddress}  defaultValue="无" toolTrue={true}/></div>
				<KrField style={{width:262,marginLeft:25}}   name="lessorContactid" component="searchPersonel" label="联系人" onChange={this.onChangeSearchPersonel} requireLabel={true}  placeholder={optionValues.lessorContactName || '请选择...'}/>
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
				<KrField style={{width:545,marginLeft:25}}  name="agreement" type="textarea" component="textarea" label="双方其他约定内容" maxSize={200}/>

				</div>


				<div className="end-round"></div>
		</div>
	</div>
				<KrField style={{width:545,marginLeft:25,marginTop:'-20px'}} name="contractFileList" component="input" type="hidden" label="合同附件"/>
				<KrField style={{width:545,marginLeft:25,marginTop:'-20px',paddingLeft:"25px"}}  name="fileIdList" component="file" label="合同附件" defaultValue={optionValues.contractFileList || []} onChange={(files)=>{
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
						onClose={this.onCloseStation}>
								<AllStation onSubmit={this.onStationSubmit} onCancel={this.onStationCancel} selectedStationVos={this.state.stationVos}/>
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
	++values.num;


	if(values.setlocalStorage === 'relet' && values.mainbillid && values.customerId){
		for(var i in values){
		    if (values.hasOwnProperty(i)) { //filter,只输出man的私有属性
				if(i === 'contractFileList'){
					localStorage.setItem(JSON.stringify(values.mainbillid)+JSON.stringify(values.customerId)+values.contracttype+'create'+i,JSON.stringify(values[i]));
				}else if(!!values[i] && i !== 'contractFileList' && i !== 'stationVos'){
					localStorage.setItem(JSON.stringify(values.mainbillid)+JSON.stringify(values.customerId)+values.contracttype+'create'+i,values[i]);
				}

		    };
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

	return {
		changeValues
	}

})(NewCreateForm);
