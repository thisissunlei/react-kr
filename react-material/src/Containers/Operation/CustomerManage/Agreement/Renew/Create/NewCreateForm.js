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
	ListGroupItem
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
		this.openStationUnitPriceDialog = this.openStationUnitPriceDialog.bind(this);
		this.onChangeSearchPersonel = this.onChangeSearchPersonel.bind(this);
		this.onStationVosChange = this.onStationVosChange.bind(this);
		this.onCloseStation = this.onCloseStation.bind(this);


		this.state = {
			stationVos: [],
			selectedStation: [],
			openStation: false,
			openStationUnitPrice: false,
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
		this.setState({
			stationVos
		});

		this.openStationDialog();
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
	}

	componentWillReceiveProps(nextProps) {

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

		form.leaseBegindate = dateFormat(stationVos[0].leaseBeginDate, "yyyy-mm-dd hh:MM:ss");
		form.leaseEnddate = dateFormat(stationVos[0].leaseEndDate, "yyyy-mm-dd hh:MM:ss");

		form.firstpaydate = dateFormat(form.firstpaydate, "yyyy-mm-dd hh:MM:ss");

		form.stationVos = JSON.stringify(stationVos);

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
			stationVos
		} = this.state;

		return (
			<Paper width={968}>

<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:50}}>

				<KrField grid={1/2}  name="mainbillid" type="hidden" component="input" />
				<KrField grid={1/2}  name="contractstate" type="hidden" component="input" />
				<KrField grid={1/2}  name="contracttype" type="hidden" component="input" />
				<KrField grid={1/2}  name="leaseBegindate" type="hidden" component="input" />

				<KrField right={60} name="leaseId"  grid={1/2} component="select" label="出租方" options={optionValues.fnaCorporationList}  requireLabel={true} />
				<KrField left={60} grid={1/2}  name="lessorAddress" type="text" component="labelText" inline={false} label="地址" value={changeValues.lessorAddress}  defaultValue="无"/>
				<KrField right={60} grid={1/2}  name="lessorContactid" component="searchPersonel" label="联系人" onChange={this.onChangeSearchPersonel} requireLabel={true} />
				<KrField left={60} grid={1/2}  name="lessorContacttel" type="text" component="input" label="电话" requireLabel={true}  />

				<KrField right={60} grid={1/2}  component="labelText" label="承租方" value={optionValues.customerName} inline={false}/>

				<KrField left={60} grid={1/2}  name="leaseAddress" type="text" component="input" label="地址" requireLabel={true} />

				<KrField right={60} grid={1/2}  name="leaseContact" type="text" component="input" label="联系人" requireLabel={true} />
				<KrField left={60} grid={1/2}  name="leaseContacttel" type="text" component="input" label="电话" requireLabel={true} />

				<KrField right={60} grid={1/2}  name="communityid" component="labelText" label="所属社区" inline={false} value={optionValues.communityName} />

				<KrField left={60} grid={1/2}  name="communityAddress" component="labelText" label="地址" inline={false} value={optionValues.communityAddress} requireLabel={true} />
				<KrField right={60} grid={1/2}  name="contractcode" type="text" component="input" label="合同编号"  requireLabel={true} />

				<KrField left={60} name="paymodel"  grid={1/2} component="select" label="付款方式" options={optionValues.paymentList} requireLabel={true} />
				<KrField right={60} name="paytype"  grid={1/2} component="select" label="支付方式" options={optionValues.payTypeList} requireLabel={true} />
				<KrField left={60} name="firstpaydate" grid={1/2} component="date" label="首付款时间"  requireLabel={true} />

				<KrField right={60} grid={1/2}  name="signdate"  component="date"  label="签署时间" requireLabel={true} />
				<KrField right={0} grid={1}  name="rentaluse" type="text" component="input" label="租赁用途" placeholder="办公使用"  requireLabel={true} />

				<KrField right={60} grid={1/2}  name="totalrent" type="text" component="input" label="租金总额" requireLabel={true} />

				<KrField left={60} grid={1/2}  name="totaldeposit" type="text" component="input" label="押金总额" requireLabel={true}  />

				<KrField right={0} grid={1/1}  name="contractmark" component="textarea" label="备注" />

				<KrField grid={1}  name="contractFileList" component="input" type="hidden" label="合同附件"/>
				<KrField grid={1}  name="fileIdList" component="file" label="合同附件" requireLabel={true} defaultValue={[]} onChange={(files)=>{
					Store.dispatch(change('reduceCreateForm','contractFileList',files));
				}} />

             <DotTitle title='租赁明细'>


				      <Grid>
							<Row>
								<Col align="right">
									<ButtonGroup>
										<Button label="删除"  onTouchTap={this.onStationDelete} />
										<Button label="续租"  onTouchTap={this.openStationDialog} />
								  </ButtonGroup>
								</Col>
							</Row>
						</Grid>


				<Table  displayCheckbox={true} onSelect={this.onStationSelect}>
				<TableHeader>
				<TableHeaderColumn>类别</TableHeaderColumn>
				<TableHeaderColumn>编号／名称</TableHeaderColumn>
				<TableHeaderColumn>单价(元/月)</TableHeaderColumn>
					<TableHeaderColumn>开始时间</TableHeaderColumn>
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


                     </DotTitle>
						<Grid style={{paddingBottom:30}}>
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

	if (!values.fileIdList) {
		errors.fileIdList = '请填写合同附件';
	}
	if (!values.contractcode) {
		errors.contractcode = '请填写合同编号';
	}

	if (!values.rentaluse) {
		errors.rentaluse = '请填写租赁用途';
	}

	if (!String(values.totalrent)) {
		errors.totalrent = '请填写租金总额';
	}

	if (!String(values.totaldeposit)) {
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

	if (!values.stationnum && !values.boardroomnum) {
		errors.stationnum = '租赁项目必须填写一项';
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
