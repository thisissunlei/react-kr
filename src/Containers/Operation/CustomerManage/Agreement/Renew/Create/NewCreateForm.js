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
import {DateFormat,Http} from 'kr/Utils';
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
			openLocalStorage:this.props.openLocalStorage,
			initialValues:this.props.initialValues,
			optionValues:this.props.optionValues,
		}
	}

	componentDidMount() {
		let {
			initialValues
		} = this.props;
		Store.dispatch(initialize('reduceCreateForm', initialValues));
	}

	
	componentWillReceiveProps(nextProps) {
		this.setState({
			initialValues:nextProps.initialValues,
			optionValues:nextProps.optionValues,
		})
		if(this.props.openLocalStorage != nextProps.openLocalStorage){
			this.setState({
			openLocalStorage:nextProps.openLocalStorage
		})
		}
		if (!this.isInit && nextProps.stationVos.length) {
			let stationVos = nextProps.stationVos;
			this.setState({
				stationVos
			}, function() {
				this.setAllRent(nextProps.stationVos);
			});
			this.isInit = true;
		}
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
		Store.dispatch(change('reduceCreateForm', 'lessorContacttel', personel.mobile));
		Store.dispatch(change('reduceCreateForm', 'lessorContactName', personel.lastname));

	}

	onStationCancel() {
		this.openStationDialog();
	}

	onStationSubmit(stationVos) {
		let _this = this;
		let {initialValues} = this.props;
		let allRent = 0;
		this.setAllRent(stationVos);
		this.setState({
			stationVos
		});
		localStorage.setItem(initialValues.mainbillid+initialValues.customerId+'RENEWcreatestationVos', JSON.stringify(stationVos));

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
		Http.request('getAllRent',{},{stationList:JSON.stringify(list)}).then(function(response) {
			Store.dispatch(change('reduceCreateForm','totalrent',response));
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


	//删除工位
	onStationDelete() {

		let {
			selectedStation,
			stationVos
		} = this.state;
		let {initialValues} = this.props;
		stationVos = stationVos.filter(function(item, index) {

			if (selectedStation.indexOf(index) != -1) {
				return false;
			}
			return true;
		});
		let _this = this;
		let allRent = 0;
		this.setAllRent(stationVos);
		localStorage.setItem(initialValues.mainbillid+initialValues.customerId+'RENEWcreatestationVos', JSON.stringify(stationVos));

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



	getLocalStorageSata=()=>{
		var _this = this;
		const {
			params
		} = this.props;
		let {initialValues} = this.state;
		let {optionValues} = this.state;
		//获取localStorage数据s
			let keyWord = params.orderId+ params.customerId+'RENEWcreate';
			let mainbillId = localStorage.getItem(keyWord +'mainbillid');
			let customerId = localStorage.getItem(keyWord +'customerId');
			console.log('--->localStorage',mainbillId,customerId);
			if(mainbillId && customerId){
				initialValues.totaldownpayment = localStorage.getItem(keyWord+'totaldownpayment');
				initialValues.signdate = localStorage.getItem(keyWord+'signdate') || '日期';
				initialValues.lessorContacttel = localStorage.getItem(keyWord+'lessorContacttel');
				initialValues.lessorContactid = localStorage.getItem(keyWord+'lessorContactid');
				initialValues.leaseEnddate = localStorage.getItem(keyWord+'leaseEnddate');
				initialValues.leaseContacttel = localStorage.getItem(keyWord+'leaseContacttel');
				initialValues.leaseAddress = localStorage.getItem(keyWord+'leaseAddress') || null;
				initialValues.leaseBegindate = localStorage.getItem(keyWord+'leaseBegindate');
				optionValues.lessorContactName = localStorage.getItem(keyWord+'lessorContactName')
				initialValues.lessorContactName = localStorage.getItem(keyWord+'lessorContactName')
				initialValues.leaseId = parseInt(localStorage.getItem(keyWord+'leaseId'));
				initialValues.leaseContact = localStorage.getItem(keyWord+'leaseContact');
				initialValues.contractmark = localStorage.getItem(keyWord+'contractmark');
				initialValues.agreement = localStorage.getItem(keyWord+'agreement') || "无";
				optionValues.contractFileList = JSON.parse(localStorage.getItem(keyWord+'contractFileList')) || [];
				initialValues.totaldeposit = localStorage.getItem(keyWord+'totaldeposit');
				initialValues.firstpaydate = localStorage.getItem(keyWord+'firstpaydate');
				initialValues.paymodel = parseInt(localStorage.getItem(keyWord+'paymodel'));
				initialValues.paytype = parseInt(localStorage.getItem(keyWord+'paytype'));
				optionValues.totalrent = localStorage.getItem(keyWord+'totalrent');
				initialValues.totalrent = localStorage.getItem(keyWord+'totalrent');
			}
			initialValues.stationVos = localStorage.getItem(keyWord+'stationVos') || '[]';
			let stationVos = JSON.parse(initialValues.stationVos);

			Store.dispatch(initialize('reduceCreateForm', initialValues));
			Store.dispatch(change('reduceCreateForm', 'num', 1+parseInt(localStorage.getItem(keyWord+'num'))));


			_this.setState({
				initialValues,
				optionValues,
				stationVos,
				allRent:initialValues.totalrent
			});
	}
	onCancelStorage=()=>{
		this.setState({
			openLocalStorage:false,

		})
		let {removeLocalStorage} = this.props;
		removeLocalStorage && removeLocalStorage();
	}
	getLocalStorage=()=>{
		this.setState({
			openLocalStorage:false,
		})
		this.getLocalStorageSata();
		console.log('getLocalStorage')
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
			allRent
		} = this.state;
		let allRentName = this.dealRentName(allRent);

		return (
			<Paper width={968}>

<form onSubmit={handleSubmit(this.onSubmit)} >
			<CircleStyle num={1} info='租赁明细'  >
				<div className="detailList" style={{marginTop:'-50px'}}>
				<DotTitle title='租赁明细'>
				      <Grid style={{marginTop:'-40px'}}>
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

					
                     </DotTitle>
                     <div style={{marginTop:'0px',marginBottom:60}}>服务费总计：<span style={{marginRight:50,color:'red'}}>￥{allRent}</span><span>{allRentName}</span></div>

                     </div>
				</CircleStyle>
				<CircleStyle num={2} info='合同文本信息' circle='bottom'>
				<KrField grid={1/2}  name="mainbillid" type="hidden" component="input" />
				<KrField grid={1/2}  name="contractstate" type="hidden" component="input" />
				<KrField grid={1/2}  name="contracttype" type="hidden" component="input" />
				<KrField grid={1/2}  name="leaseBegindate" type="hidden" component="input" />

				<KrField style={{width:370,marginLeft:70}}  name="leaseId"   component="select" label="出租方" options={optionValues.fnaCorporationList}  requireLabel={true} />
				<KrField style={{width:370,marginLeft:90}}   name="lessorAddress" type="text" component="labelText" inline={false} label="地址" value={changeValues.lessorAddress}  defaultValue="无"/>
				<KrField style={{width:370,marginLeft:70}}   name="lessorContactid" component="searchPersonel" label="联系人" onChange={this.onChangeSearchPersonel} requireLabel={true} placeholder={optionValues.lessorContactName || '请选择...'}/>
				<KrField style={{width:370,marginLeft:90}}   name="lessorContacttel" type="text" component="input" label="电话" requireLabel={true}
				requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>

				<KrField style={{width:370,marginLeft:70}}   component="labelText" label="承租方" value={optionValues.customerName} inline={false}/>

				<KrField style={{width:370,marginLeft:90}}   name="leaseAddress" type="text" component="input" label="地址" requireLabel={true}
				requiredValue={true} pattern={/^.{0,120}$/} errors={{requiredValue:'地址为必填项',pattern:'地址最大60位'}} />

				<KrField style={{width:370,marginLeft:70}}   name="leaseContact" type="text" component="input" label="联系人" requireLabel={true}
				requiredValue={true} pattern={/^.{0,20}$/} errors={{requiredValue:'联系人为必填项',pattern:'联系人最大20位'}} />
				<KrField style={{width:370,marginLeft:90}}  name="leaseContacttel" type="text" component="input" label="电话" requireLabel={true}
				requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>

				<KrField style={{width:370,marginLeft:70}}  name="communityid" component="labelText" label="所属社区" inline={false} value={optionValues.communityName} />

				<KrField style={{width:370,marginLeft:90}}   name="communityAddress" component="labelText" label="地址" inline={false} value={optionValues.communityAddress} requireLabel={true} />
				

				<KrField style={{width:370,marginLeft:70}} name="contractcode" component="labelText" label="合同编号" value={initialValues.contractcode} inline={false}/>
				{/*<KrField style={{width:370,marginLeft:70}}   name="contractcode" type="text" component="input" label="合同编号"  requireLabel={true}
				requiredValue={true} pattern={/^.{0,50}$/} errors={{requiredValue:'合同编号为必填项',pattern:'合同编号最大50位'}} />

				*/}
				<KrField style={{width:370,marginLeft:90}}  name="paymodel"   component="select" label="付款方式" options={optionValues.paymentList} requireLabel={true} />
				<KrField style={{width:370,marginLeft:70}}  name="paytype"   component="select" label="支付方式" options={optionValues.payTypeList} requireLabel={true} />
				<KrField style={{width:370,marginLeft:90}}  name="firstpaydate"  component="date" label="首付款时间"  requireLabel={true} />

				<KrField style={{width:370,marginLeft:70}}   name="signdate"  component="date"  label="签署时间" requireLabel={true} />


				<KrField style={{width:370,marginLeft:90}}   name="totalrent" type="text" component="labelText" label="租金总额" requireLabel={true} value={allRent} inline={false} defaultValue='0'
				requiredValue={true} pattern={/^\d{0,16}(\.\d{0,2})?$/} errors={{requiredValue:'租金总额为必填项',pattern:'请输入正数金额，小数点后最多两位'}} />

				<KrField style={{width:370,marginLeft:70}}  name="totaldeposit" type="text" component="input" label="押金总额" requireLabel={true}
				requiredValue={true} pattern={/^\d{0,16}(\.\d{0,2})?$/} errors={{requiredValue:'押金总额为必填项',pattern:'请输入正数金额，小数点后最多两位'}} />

				<KrField style={{width:830,marginLeft:70}}  name="contractmark" component="textarea" label="备注" maxSize={200}/>
					<KrField style={{width:830,marginLeft:70}}  name="agreement" type="textarea" component="textarea" label="双方其他约定内容" maxSize={200}/>
				</CircleStyle>
				<KrField style={{width:830,marginLeft:90,marginTop:'-20px'}} name="contractFileList" component="input" type="hidden" label="合同附件"/>
				<KrField style={{width:830,marginLeft:90,marginTop:'-20px'}}  name="fileIdList" component="file" label="合同附件" defaultValue={ optionValues.contractFileList|| []} onChange={(files)=>{
					Store.dispatch(change('reduceCreateForm','contractFileList',files));
				}} />


						<Grid style={{padding:'10px 0 50px'}}>
						<Row >
						<ListGroup>
							<ListGroupItem style={{width:'45%',textAlign:'right',paddingRight:15}}><Button  label="确定" type="submit"  width={100} height={40} fontSize={16}/></ListGroupItem>
							<ListGroupItem style={{width:'45%',textAlign:'left',paddingLeft:15}}><Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}  width={100} height={40} fontSize={16}/></ListGroupItem>
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
			<Dialog
				title="提示"
				modal={true}
				autoScrollBodyContent={true}
				autoDetectWindowHeight={true}
				onClose={this.openConfirmCreateDialog}
				open={this.state.openLocalStorage} 
				contentStyle={{width:'400px'}}>
					<div>
						<p style={{textAlign:'center',margin:'30px'}}>是否加载未提交的合同数据？</p>
						<Grid>
						<Row>
						<ListGroup>
							<ListGroupItem style={{width:'40%',textAlign:'right',paddingRight:'5%'}}><Button  label="确定" type="submit"  onTouchTap={this.getLocalStorage}  width={100} height={40} fontSize={16}/></ListGroupItem>
							<ListGroupItem style={{width:'40%',textAlign:'left',paddingLeft:'5%'}}><Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancelStorage}  width={100} height={40} fontSize={16}/></ListGroupItem>
						</ListGroup>
						</Row>
						</Grid>
					</div>

			  </Dialog>


			</Paper>);
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
	for(var i in values){
	    if (values.hasOwnProperty(i)) { //filter,只输出man的私有属性
			if(i === 'contractFileList'){
				localStorage.setItem(values.mainbillid+values.customerId+values.contracttype+'create'+i,JSON.stringify(values[i]));
			}else if(!!values[i] && i !== 'contractFileList' && i !== 'stationVos'){
				localStorage.setItem(values.mainbillid+values.customerId+values.contracttype+'create'+i,values[i]);
			}else if(i =='agreement' && !!!values[i]){
				localStorage.setItem(values.mainbillid+''+values.customerId+values.contracttype+'createagreement','');

			}else if(i =='contractmark' && !!!values[i]){
				localStorage.setItem(values.mainbillid+''+values.customerId+values.contracttype+'createcontractmark','');

			}
	    };
	}

	return errors
}


const selector = formValueSelector('reduceCreateForm');

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
	changeValues.stationnum = selector(state, 'stationnum');
	changeValues.boardroomnum = selector(state, 'boardroomnum');
	changeValues.leaseBegindate = selector(state, 'leaseBegindate');
	changeValues.leaseEnddate = selector(state, 'leaseEnddate');
	changeValues.wherefloor = selector(state, 'wherefloor');

	return {
		changeValues
	}

})(NewCreateForm);
