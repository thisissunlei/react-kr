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
		this.onStationUnitPrice = this.onStationUnitPrice.bind(this);
		this.openStationUnitPriceDialog = this.openStationUnitPriceDialog.bind(this);
		this.onChangeSearchPersonel = this.onChangeSearchPersonel.bind(this);
		this.onStationVosChange = this.onStationVosChange.bind(this);
		this.state = {
			originStationVos:[],
			stationVos: [],
			delStationVos: [],
			selectedStation: [],
			openStation: false,
			openStationUnitPrice: false,
			allRent:'-1'
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

		stationVos = stationVos.map(function(item, index) {
			if (selectedStation.indexOf(index) != -1) {
				item.unitprice = value;
			}
			return item;
		});

		this.setState({
			stationVos
		});

		this.openStationUnitPriceDialog();
	}

	onChangeSearchPersonel(personel) {
		Store.dispatch(change('reduceCreateForm', 'lessorContacttel', personel.mobile));
	}

	// station list
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

		this.openStationDialog();
	}
	setAllRent=(list)=>{
		let _this = this;
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
		let rentPriceByDay =((item.unitprice*12)/365).toFixed(6);
		//工位总价钱
		let allRent = (rentPriceByDay * rentDay) + (rentMounth*item.unitprice);
		allRent = allRent.toFixed(2)*1;
		console.log('allRent',allRent,rentPriceByDay);
		return allRent;
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
		let allRent = 0;
		this.setAllRent(stationVos);


		this.setState({
			stationVos,
			delStationVos,
			allRent
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
		console.log('=====>',this.props.initialValues);
		Store.dispatch(initialize('reduceCreateForm', initialValues));
	}


	componentWillReceiveProps(nextProps) {
		if (!this.isInit && nextProps.stationVos.length) {
			let stationVos = nextProps.stationVos;
			let originStationVos = [].concat(stationVos);
			this.setState({
				stationVos,
				originStationVos
			});
			this.isInit = true;
		};
	}

	onSubmit(form) {
		console.log('fffff');

		form = Object.assign({}, form);

		let {
			changeValues,
			initialValues
		} = this.props;
		let {
			stationVos,
			delStationVos,
			originStationVos
		} = this.state;


		delStationVos = originStationVos.filter(function(origin){
				var isOk = true;
				stationVos.map(function(station){
						if(station.id == origin.id){
								isOk = false;
						}
				});
				return isOk;
		});
		// form.contractmark = '';
		if(typeof form.contractmark == 'undefined'){
			form.contractmark = '';
		}

		form.leaseBegindate = dateFormat(stationVos[0].leaseBeginDate, "yyyy-mm-dd hh:MM:ss");
		form.leaseEnddate = dateFormat(stationVos[0].leaseEndDate, "yyyy-mm-dd hh:MM:ss");
		form.signdate = dateFormat(form.signdate, "yyyy-mm-dd hh:MM:ss");
		form.lessorAddress = changeValues.lessorAddress;
		form.firstpaydate = dateFormat(form.firstpaydate, "yyyy-mm-dd hh:MM:ss");
		form.lessorContactid = form.lessorContactid;
		form.totalrent = (this.state.allRent!='-1')?this.state.allRent:initialValues.totalrent;
		if(form.totalrent == 0){
			Notify.show([{
				message: '服务费不能为零',
				type: 'danger',
			}]);
			return;
		}
		if(!!!form.agreement){
			form.agreement = '无';
		}
		if(!form.contractmark){
			form.contractmark="";
		}
		form.stationVos = JSON.stringify(stationVos);
		form.delStationVos = JSON.stringify(delStationVos);
		console.log('contractmark',form);
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
			if (initialValues.leaseId == item.id) {
				changeValues.lessorAddress = item.corporationAddress;
			}
		});

		let {
			stationVos,
			allRent
		} = this.state;
		allRent = (allRent!='-1')?allRent:initialValues.totalrent;
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
										<Button label="删除"  onTouchTap={this.onStationDelete} />
										<Button label="续租"  onTouchTap={this.openStationDialog} />
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
                     <div style={{marginTop:'-20px',marginBottom:60}}>服务费总计：<span style={{marginRight:50,color:'red'}}>￥{allRent}</span><span>{allRentName}</span></div>

						</div>
						</CircleStyle>
				<CircleStyle num={2} info='合同文本信息' circle='bottom'>

				<KrField grid={1/2}  name="mainbillid" type="hidden" component="input" />
				<KrField grid={1/2}  name="contractstate" type="hidden" component="input" />
				<KrField grid={1/2}  name="contracttype" type="hidden" component="input" />
				<KrField grid={1/2}  name="contractVersionType" type="hidden" component="input" />

				<KrField name="leaseId" style={{width:370,marginLeft:70}} component="select" label="出租方" options={optionValues.fnaCorporationList} requireLabel={true} />
				<KrField style={{width:370,marginLeft:90}} name="lessorAddress" type="text" component="labelText" label="地址" inline={false} value={changeValues.lessorAddress}  defaultValue="无"/>
				<KrField style={{width:370,marginLeft:70}} name="lessorContactid" component="searchPersonel" label="联系人" onChange={this.onChangeSearchPersonel} placeholder={optionValues.lessorContactName} requireLabel={true}/>
				<KrField style={{width:370,marginLeft:90}} name="lessorContacttel" type="text" component="input" label="电话" requireLabel={true}
				requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>

				<KrField style={{width:370,marginLeft:70}} component="labelText" label="承租方" inline={false} value={optionValues.customerName} requireLabel={true}/>

				<KrField style={{width:370,marginLeft:90}} name="leaseAddress" type="text" component="input" label="地址" requireLabel={true}
				requiredValue={true} pattern={/^.{0,120}$/} errors={{requiredValue:'地址为必填项',pattern:'地址最大60位'}} />

				<KrField style={{width:370,marginLeft:70}} name="leaseContact" type="text" component="input" label="联系人" requireLabel={true}
				requiredValue={true} pattern={/^.{0,20}$/} errors={{requiredValue:'联系人为必填项',pattern:'联系人最大20位'}} />
				<KrField style={{width:370,marginLeft:90}} name="leaseContacttel" type="text" component="input" label="电话" requireLabel={true}
				requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>

				<KrField style={{width:370,marginLeft:70}} name="communityid" component="labelText" label="所属社区" inline={false} value={optionValues.communityName} />

				<KrField style={{width:370,marginLeft:90}} name="communityAddress" component="labelText" label="地址" inline={false} value={optionValues.communityAddress} />
				
				<KrField style={{width:370,marginLeft:70}} name="contractcode" component="labelText" label="合同编号" value={initialValues.contractcode} inline={false}/>
				{/*<KrField style={{width:370,marginLeft:70}} name="contractcode" type="text" component="input" label="合同编号"  requireLabel={true}
				requiredValue={true} pattern={/^.{0,50}$/} errors={{requiredValue:'合同编号为必填项',pattern:'合同编号最大50位'}} />
*/}

				<KrField name="paymodel" style={{width:370,marginLeft:90}} component="select" label="付款方式" options={optionValues.paymentList} requireLabel={true}/>
				<KrField name="paytype" style={{width:370,marginLeft:70}} component="select" label="支付方式" options={optionValues.payTypeList} />
				<KrField name="firstpaydate" style={{width:370,marginLeft:90}} component="date" label="首付款时间" requireLabel={true} />

				<KrField style={{width:370,marginLeft:70}} name="signdate"  component="date"  label="签署时间" requireLabel={true}/>

				<KrField style={{width:370,marginLeft:90}} name="totalrent" type="text" component="labelText" label="租金总额" placeholder="" inline={false} value={allRent} defaultValue={initialValues.totalrent} requireLabel={true}
				requiredValue={true} pattern={/^\d{0,16}(\.\d{0,2})?$/} errors={{requiredValue:'租金总额为必填项',pattern:'请输入正数金额，小数点后最多两位'}} />
				<KrField style={{width:370,marginLeft:70}}  name="totaldeposit" type="text" component="input" label="押金总额" requireLabel={true}
				requiredValue={true} pattern={/^\d{0,16}(\.\d{0,2})?$/} errors={{requiredValue:'押金总额为必填项',pattern:'请输入正数金额，小数点后最多两位'}} />

				<KrField style={{width:830,marginLeft:70}} name="contractmark" component="textarea" label="备注" maxSize={200}/>
					<KrField style={{width:830,marginLeft:70}}  name="agreement" type="textarea" component="textarea" label="双方其他约定内容" maxSize={200}/>
				</CircleStyle>
				<KrField style={{width:830,marginLeft:90,marginTop:'-20px'}} name="fileIdList" component="file" label="合同附件" defaultValue={optionValues.contractFileList}/>
				<Grid style={{padding:'10px 0 50px'}}>
						<Row >
						<ListGroup>
							<ListGroupItem style={{width:'45%',textAlign:'right',paddingRight:15}}><Button  label="确定" type="submit" disabled={pristine || submitting} width={100} height={40} fontSize={16}/></ListGroupItem>
							<ListGroupItem style={{width:'45%',textAlign:'left',paddingLeft:15}}> <Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel} width={100} height={40} fontSize={16}/> </ListGroupItem>
						</ListGroup>
						</Row>
						</Grid>

						</form>

					<Dialog
						title="分配工位"
						open={this.state.openStation}
						modal={true}
						autoScrollBodyContent={true}
						autoDetectWindowHeight={true} onClose={this.onStationCancel}>
								<AllStation onSubmit={this.onStationSubmit} onCancel={this.onStationCancel} changeValues={this.props.changeValues}/>
					  </Dialog>


			</Paper>);
	}
}
const selector = formValueSelector('reduceCreateForm');
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

	// if (!values.fileIdList) {
	// 	errors.fileIdList = '请填写合同附件';
	// }

	if (!values.paymodel) {
		errors.paymodel = '请填写付款方式';
	}


	if (!values.signdate) {
		errors.signdate = '请填写签署时间';
	}

	// if (!values.contractcode) {
	// 	errors.contractcode = '请填写合同编号';
	// }

	if (!String(values.totaldeposit)) {
		errors.totaldeposit = '请填写押金总额';
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
	changeValues.leaseBegindate = selector(state, 'leaseBegindate') || 0;
	changeValues.leaseEnddate = selector(state, 'leaseEnddate') || 0;


	return {
		changeValues
	}

})(NewCreateForm);
