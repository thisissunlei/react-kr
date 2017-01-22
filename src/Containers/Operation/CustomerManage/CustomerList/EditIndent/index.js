
import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	observer
} from 'mobx-react';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup,
	Message
} from 'kr-ui';
import State from './State';
import flushData from "../LookCustomerList/State";
import './index.less'
@observer
 class EditIndent extends Component{

		

	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}

	constructor(props){
		super(props);
		let selectDatas={
			communityBaselist:[],
			customerSourceList:[],
			giveupList:[],
			levelList:[],
			roundList:[],
			stationTypeList:[],
			visitTypeList:[]
		};
		let selectData=props.selectData||selectDatas;
		State.selectDataInit(selectData);
	}



	onSubmit = (values) => {
		delete values.cityid;
		values.customerid=this.props.listId;
		values.id=this.props.editIndentId;
		values.mainbillname=this.props.orderName;
		values.mainbillcode="";
		let _this=this;
		Store.dispatch(Actions.callAPI('edit-order',{},values)).then(function(response) {
			 flushData.orderList(_this.props.listId);
         	_this.onCancel();
		}).catch(function(err) {
			Message.error(err.message);
		});
	}

	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

	hasOfficeClick = (params) =>{
		if(params.value=="HAS"){
			State.showMatureTime();
		}else if(params.value=="NOHAS"){
			State.noShowMatureTime();

		}
	}
	componentWillReceiveProps(nextProps){

			if(typeof(nextProps.orderReady)=="function"){
				return;
			}
			if(State.isInit){
				return;
			}
			State.orderReady(nextProps.orderReady)
	}
	communityChange=(value)=>{ 
		if(!value){
			return;
		}
		var community=State.orderReady.communityCity
		for(var i=0;i<community.length;i++){
			if(community[i].communityName==value.label){
				Store.dispatch(change('EditIndent','cityid',community[i].cityId));
				State.cityLableChange(community[i].cityName)

			}

		}
	}
	

	render(){
		const { error, handleSubmit, pristine, reset,companyName,orderName,cityname} = this.props;
		let citys=State.cityLable||cityname;
			citys=!citys?"无":citys;
		return (

			<form className="m-newMerchants" onSubmit={handleSubmit(this.onSubmit)}>
				<div className="title">
						<div><span className="new-icon"></span><label className="title-text">{companyName}</label></div>
						<div className="close" onClick={this.onCancel}></div>
				</div>
				
				<div className="kk" style={{marginTop:30}}>		
					<KrField grid={1/2} label="订单类型" name="mainbilltype" style={{width:252,marginLeft:15}} component="select" 
							options={State.orderFound}
							requireLabel={true}
					/>
					<KrField grid={1/2} label="所在社区" name="communityid" component="select" style={{width:252,marginLeft:15}} 
							options={State.community}
							requireLabel={true}
							onChange={this.communityChange}
					/>
					
					<KrField grid={1/2} label="所在城市" name="cityid" component="labelText" style={{width:252,marginLeft:15}} value={citys} inline={false}/>
					<KrField grid={1/2} label="订单名称" name="mainbillname" style={{width:252,marginLeft:15}} component="labelText" value={orderName} requireLabel={true} inline={false}/>
					<KrField grid={1/2} label="订单描述" name="mainbilldesc" style={{width:520,marginLeft:15}} heightStyle={{height:"80px"}}  component="textarea"  maxSize={100} requireLabel={false} />
				</div>		
				<Grid style={{marginTop:30}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm /></div>
								<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>
						
						    
				</form>
		);
	}
}
const validate = values =>{

		const errors = {};
		let phone = /(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/;
		let email = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
		if(!values.sourceId){
			errors.sourceId = '请填写客户来源';
		}

		if (!values.stationNum) {
			errors.stationNum = '请填写意向工位个数';
		}else if(isNaN(+values.stationNum)){
			errors.stationNum = '意向工位个数为数字格式';
		}

		if (!values.customerName) {
			errors.customerName = '请填写联系人姓名';
		}

		if (!values.staiontypeId) {
			errors.staiontypeId = '请填写意向工位类型';
		}

		if (!values.customerTel) {
			errors.customerTel = '请填写联系人电话';
		}else if(!phone.test(values.customerTel)){
			errors.customerTel = '联系人电话格式错误';
		}

		if(!phone.test(values.customerMail)){
			errors.customerMail = '联系人邮箱格式错误';
		}

		if (!values.staionPrice) {
			errors.staionPrice = '请填写意向工位价格';
		}else if(isNaN(+values.staionPrice)){
			errors.staionPrice = '意向工位价格为数字格式';
		}
		if(isNaN(+values.amount)){
			errors.amount = '融资金额为数字格式';
		}
		if (!values.intentionCommunityId) {
			errors.intentionCommunityId = '请填写意向入驻社区';
		}

		if (!values.inTime) {
			errors.inTime = '请填写预计入驻时间';
		}

		if (!values.customerCompany) {
			errors.customerCompany = '请填写公司名称';
		}

		if (!values.teamNum) {
			errors.teamNum = '请填写公司规模';
		}

		if(values.hasOffice && !values.deadline){
			errors.deadline='请填写到期时间';
		}

		if (!values.projectName) {
			errors.projectName = '请填写项目名称';
		}

		if (!values.districtId) {
			errors.districtId = '请填写所属地区';
		}

		if (!values.projectCategoryId) {
			errors.projectCategoryId = '请填写项目类型';
		}

		if (!values.detailAddress) {
			errors.detailAddress = '请填写详细地址';
		}


		if (!values.companyIntroduce) {
			errors.companyIntroduce = '请填写公司简介';
		}
		return errors
	}
export default reduxForm({ form: 'EditIndent',validate})(EditIndent);
