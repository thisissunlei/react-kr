import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import Param from 'jquery-param';
import { Fields } from 'redux-form';
import {Binder} from 'react-binding';
import ReactMixin from "react-mixin";
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import dateFormat from 'dateformat';

import {reduxForm,formValueSelector,initialize,change,arrayPush,arrayInsert,FieldArray} from 'redux-form';

import {Actions,Store} from 'kr/Redux';

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
	Date,
} from 'kr-ui';

@ReactMixin.decorate(LinkedStateMixin)
class NewCreateForm  extends Component{

	static DefaultPropTypes = {
		initialValues:{
			customerName:'',
			communityName:'',
			lessorAddress:'',
			payTypeList:[],
			paymentList:[],
			fnaCorporationList:[],
		}
	}

	static PropTypes = {
		initialValues:React.PropTypes.object,
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}

	constructor(props,context){
		super(props, context);

		this.onCancel  = this.onCancel.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onChangeSearchPersonel = this.onChangeSearchPersonel.bind(this);

	}


	componentDidMount(){
		let {initialValues}= this.props;
		Store.dispatch(initialize('exitEditForm',initialValues));
	}

	onChangeSearchPersonel(personel){
		Store.dispatch(change('exitEditForm','lessorContacttel',personel.mobile));
	}

	onSubmit(form){

		let {changeValues} = this.props;

		form = Object.assign({},form);

    	form.lessorAddress = changeValues.lessorAddress;
		form.signdate = dateFormat(form.signdate,"yyyy-mm-dd hh:MM:ss");
    	form.leaseBegindate = dateFormat(form.leaseBegindate,"yyyy-mm-dd hh:MM:ss");
		form.leaseEnddate = dateFormat(form.leaseEnddate,"yyyy-mm-dd hh:MM:ss");
		form.withdrawdate = dateFormat(form.withdrawdate,"yyyy-mm-dd hh:MM:ss");

		const {onSubmit} = this.props;
		onSubmit && onSubmit(form);
	}

	onCancel(){
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

	getStationUrl(){

	    let url = "http://optest.krspace.cn/krspace_operate_web/commnuity/communityFloorPlan/toCommunityFloorPlanSel?communityId={communityId}&floors={floors}&goalStationNum={goalStationNum}&goalBoardroomNum={goalBoardroomNum}&selectedObjs={selectedObjs}";

		let {changeValues,initialValues,optionValues} = this.props;
		let {stationVos} = this.state;

		stationVos = stationVos.map(function(item){
			var obj = {};
			obj.id = item.stationId;
			obj.type = item.stationType;
			return obj;
		});

		let params = {
			communityId:optionValues.mainbillCommunityId,
			floors:changeValues.wherefloor,
			//工位
			goalStationNum:changeValues.stationnum,
			//会议室
			goalBoardroomNum:changeValues.boardroomnum,
			selectedObjs:JSON.stringify(stationVos)
		};

		if(Object.keys(params).length){
			for (let item in params) {
				if (params.hasOwnProperty(item)) {
					url = url.replace('{' + item + '}', params[item]);
					delete params[item];
				}
			}
		}
		return url ;
	}

	render(){

		let { error, handleSubmit, pristine, reset, submitting,initialValues,changeValues,optionValues} = this.props;

		let {fnaCorporationList} = optionValues;

		fnaCorporationList && fnaCorporationList.map(function(item,index){
			if(changeValues.leaseId  == item.id){
				changeValues.lessorAddress = item.corporationAddress;
			}
		});

		console.log('.....',optionValues.lessorContactName)
		return (


			<div>

<form onSubmit={handleSubmit(this.onSubmit)} enctype="multipart/form-data">

				<KrField grid={1/2}  name="mainbillid" type="hidden" component="input" />
				<KrField grid={1/2}  name="contractstate" type="hidden" component="input" />
				<KrField grid={1/2}  name="contracttype" type="hidden" component="input" />

				<KrField name="leaseId"  grid={1/2} component="select" label="出租方" options={optionValues.fnaCorporationList}  requireLabel={true}/>
				<KrField grid={1/2}  name="lessorAddress" type="text" component="labelText" label="地址" value={changeValues.lessorAddress}  defaultValue="无"/>
				<KrField grid={1/2}  name="lessorContactid" component="search" label="联系人" onChange={this.onChangeSearchPersonel}  placeholder={optionValues.lessorContactName} requireLabel={true}/>
				<KrField grid={1/2}  name="lessorContacttel" type="text" component="input" label="电话" requireLabel={true}/>

				<KrField grid={1/2}  component="labelText" label="承租方" value={optionValues.customerName}/>

				<KrField grid={1/2}  name="leaseAddress" type="text" component="input" label="地址" requireLabel={true}/>

				<KrField grid={1/2}  name="leaseContact" type="text" component="input" label="联系人" requireLabel={true}/>
				<KrField grid={1/2}  name="leaseContacttel" type="text" component="input" label="电话" requireLabel={true}/>

				<KrField grid={1/2}  name="communityid" component="labelText" label="所属社区" value={optionValues.communityName} />

				<KrField grid={1/2}  name="communityAddress" component="labelText" label="地址" value={optionValues.communityAddress} />
				<KrField grid={1}  name="contractcode" type="text" component="input" label="合同编号"  requireLabel={true}/>
				<KrField name="totalreturn"  grid={1/2} type="text" component="input" label="退租金总额" requireLabel={true}/>
				<KrField name="depositamount"  grid={1/2} type="text" component="input" label="退押金总额" requireLabel={true} />

				<KrField grid={1/2}  name="withdrawdate" component="labelText" label="撤场日期" requireLabel={true}/>
				<KrField grid={1/2}  name="signdate"  component="date" grid={1/2} label="签署时间" requireLabel={true}/>
        

				<KrField grid={1}  name="contractmark" component="textarea" label="备注" />
				<KrField grid={1}  name="fileIdList" component="file" label="上传附件" requireLabel={true}/>

						<Grid>
						<Row style={{marginTop:30}}>
						<Col md={2} align="right"> <Button  label="确定" type="submit" primary={true} /> </Col>
						<Col md={2} align="right"> <Button  label="取消" type="button"  onTouchTap={this.onCancel}/> </Col> </Row>
						</Grid>

						</form>

			</div>);
	}
}
const validate = values =>{

		const errors = {}

		if(!values.leaseId){
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

		if (values.leaseAddress && !isNaN(values.leaseAddress)) {
			errors.leaseAddress = '承租方地址不能为数字';
		}


		if (!values.leaseContact) {
			errors.leaseContact = '请填写承租方联系人';
		}

		if (!values.leaseContacttel) {
			errors.leaseContacttel = '请填写承租方联系电话';
		}
		if (!values.leaseContacttel) {
			errors.leaseContacttel = '请填写承租方联系电话';
		}
		if (!values.contractcode) {
			errors.contractcode = '请填写合同编号';
		}

		if (!values.totalreturn) {
			errors.totalreturn = '请填写退租金总额';
		}

		if (!values.depositamount) {
			errors.depositamount = '请填写退押金总额';
		}

		if (!values.withdrawdate) {
			errors.withdrawdate = '请填写撤场日期';
		}

		if (!values.signdate) {
			errors.signdate = '请填写签署时间';
		}

		if (!values.fileIdList) {
			errors.fileIdList = '请填写合同附件';
		}

		

		return errors
	}

const selector = formValueSelector('exitEditForm');

NewCreateForm = reduxForm({ form: 'exitEditForm',validate,enableReinitialize:true,keepDirtyOnReinitialize:true})(NewCreateForm);

export default connect((state)=>{

	let changeValues = {};

	changeValues.lessorId = selector(state,'lessorId');
	changeValues.leaseId = selector(state,'leaseId');
	changeValues.stationnum = selector(state,'stationnum') || 0;
	changeValues.boardroomnum = selector(state,'boardroomnum') || 0;
	changeValues.leaseBegindate = selector(state,'leaseBegindate') || 0;
	changeValues.leaseEnddate = selector(state,'leaseEnddate') || 0;
	changeValues.wherefloor = selector(state,'wherefloor') || 0;

	return {
		changeValues
	}

})(NewCreateForm);
