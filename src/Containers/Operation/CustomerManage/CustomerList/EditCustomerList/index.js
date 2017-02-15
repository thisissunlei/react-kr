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
import dateFormat from "dateformat";
import './index.less'
import merchants from "../Merchants/State";
import personal from '../Personal/State';
import signedClient from "../SignedClient/State";
import flushData from "../LookCustomerList/State";

@observer
 class EditCustomerList extends Component{

		

	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}

	constructor(props){
		super(props);
		let {listId}=props;
		State.treeAllData();
		
	}
	supplementZero(value) {
		if (value < 10) {
			value = '0' + value;
		}
		return value
	}

	formatDate(value) {

		var dt = new Date(value);
		var year = dt.getFullYear();
		var month = this.supplementZero(1 + dt.getMonth());
		var date = this.supplementZero(dt.getDate());
		var hours = this.supplementZero(dt.getHours());
		var minutes = this.supplementZero(dt.getMinutes());
		var seconds = this.supplementZero(dt.getSeconds());

		var result = `${year}-${month}-${date} 00:00:00`;

		if(this.props.dateNoSecond=='true'){
		 var result = `${year}-${month}-${date}`;
		}

		return result;
	}



	onSubmit = (values) => {
		let {operType}=this.props;
		let _this=this;
		if(!values.company){
			return;
		}
		values.operType=operType;
		if(!isNaN(values.inTime)){
			values.inTime=this.formatDate(values.inTime);
		}
		if(!isNaN(values.deadline)){
			values.deadline=this.formatDate(values.deadline);
		}
		Store.dispatch(Actions.callAPI('customerDataEdit',{},values)).then(function(response) {
			if(operType=="SHARE"){
				merchants.searchParams={
		         	page:1,
					pageSize:15,
					time:+new Date()
		         }
			}
         	if(operType=="PERSON"){
         		personal.searchParams={
		         	page:1,
					pageSize:15,
					time:+new Date()
		        }
         	}
         	if(operType=="SIGN"){
         		signedClient.searchParams={
		         	page:1,
					pageSize:15,
					time:+new Date()
		        }
         	}
         	flushData.lookListId(_this.props.listId,operType);
		    merchants.openDialog=false;
		    personal.openPersonDialog=false;
		    signedClient.openPersonDialog=false;
         	_this.onCancel();
		}).catch(function(err) {
			Message.error(err.message);
		});
	}
	sourceCustomer=(value)=>{
	  if(!value){
	  	return;
	  }

	  var param=value.label;
      if(param.indexOf('介绍')!=-1){
         State.sourceCustomer=true;
      }else{
      	 State.sourceCustomer=false;
      }

	}

	onCancel = () => {
		const {onCancel} = this.props;

		onCancel && onCancel();
	}
	cityValue=(value)=>{
      Store.dispatch(change('EditCustomerList','distinctId',value));
    }
	hasOfficeClick = (params) =>{
		if(params.value=="YES"){
			if(this.props.operType=="SHARE"){
				merchants.hasOfficeChange(true);
			}
			if(this.props.operType=="PERSON"){
				personal.hasOfficeChange(true);
			}
			if(this.props.operType=="SIGN"){
				signedClient.hasOfficeChange(true);
			}
			
		}else if(params.value=="NO"){
			if(this.props.operType=="SHARE"){
				merchants.hasOfficeChange(false);
			}
			if(this.props.operType=="PERSON"){
				personal.hasOfficeChange(false);
			}
			if(this.props.operType=="SIGN"){
				signedClient.hasOfficeChange(false);

			}
		}
	}
	corpNameChange = (value) =>{
		State.corpNameCheck(value);
	}
	
	render(){

		const { error, handleSubmit, pristine, reset,dataReady,hasOffice,cityName,listValue} = this.props;


		return (

			<form className="m-newMerchants" style={{paddingLeft:9}} onSubmit={handleSubmit(this.onSubmit)}>
				<div className="title">
						<div><span className="new-icon"></span><label className="title-text">编辑客户</label></div>
						<div className="customer-close" onClick={this.onCancel}></div>
				</div>
				<div className="cheek">
							<div className="titleBar"><span className="order-number">1</span><span className="wire"></span><label className="small-title">基本信息</label></div>
							<div className="small-cheek">

									<KrField grid={1/2} label="客户来源" name="sourceId" style={{width:262,marginLeft:15}} component="select" 
											options={dataReady.customerSourceList}
											requireLabel={true}
											onChange={this.sourceCustomer}
									/>

									{State.sourceCustomer&&<KrField grid={1/2} label="介绍人姓名" name="recommendName" style={{width:262,marginLeft:28}} component="input" requireLabel={true}/>}
				   					{State.sourceCustomer&&<KrField grid={1/2} label="介绍人电话" name="recommendTel" style={{width:262,marginLeft:15}} component="input" requireLabel={true}/>}
									<div className="krFlied-box"><KrField grid={1/2} label="意向工位个数" name="stationNum" style={{width:239,marginLeft:28}} component="input" requireLabel={true}>
										
									</KrField><span className="unit">个</span></div>
									<KrField grid={1/2} label="联系人姓名" name="name" style={{width:262,marginLeft:15}} component="input" requireLabel={true}/>
									<KrField grid={1/2} label="意向工位类型" name="staionTypeId" component="select" style={{width:262,marginLeft:28}} 
											options={dataReady.stationTypeList}
											requireLabel={true}
									/>
									<KrField grid={1/2} label="联系人电话" name="tel" style={{width:262,marginLeft:15}} component="input" requireLabel={true}/>
									<div className="krFlied-box"><KrField grid={1/2} label="意向工位价格" name="staionPrice" style={{width:202,marginLeft:28}} component="input"  requireLabel={true}>
									</KrField><span className="unit">元/个/月</span></div>
									<KrField grid={1/2} label="联系人邮箱"  name="mail" style={{width:262,marginLeft:15}} component="input" requireLabel={false}/>
									
									<KrField  grid={1/2}  name="intentionCommunityId" style={{width:262,marginLeft:28}} component='searchIntend'  label="意向入驻社区" inline={false} onChange={this.onChangeIntend} placeholder='请输入社区名称' requireLabel={true}/>
									<KrField grid={1/2} label="联系人微信" name="wechat" style={{width:262,marginLeft:15}} component="input" requireLabel={false}/>
									<KrField grid={1/2} label="预计入驻时间" name="inTime" style={{width:260,marginLeft:28}} component="date"/>
									<div className="middle-round"></div>
						</div>

						<div className="titleBar"><span className="order-number">2</span><span className="wire"></span><label className="small-title">公司信息</label></div>
						<div className="small-cheek" style={{paddingBottom:0}}>
								<div>
								<KrField grid={1/2} label="公司名称" name="company" component="input" style={{width:262,marginLeft:15}} requireLabel={true} onChange={this.corpNameChange}/>
								<KrField grid={1/2} label="融资轮次" name="roundId" component="select" style={{width:262,marginLeft:28}} 
										options={dataReady.roundList}
										requireLabel={false}
								/>
								{State.isCorpName && <div style={{fontSize:14,color:"red",paddingLeft:26,paddingBottom:7}}>该公司名称已存在</div>}

								</div>
								<KrField grid={1/2} label="公司规模" name="teamNum" style={{width:262,marginLeft:15}} component="input" requireLabel={true}/>


								<KrField grid={1/2} label="融资金额" name="amount" style={{width:262,marginLeft:28}} component="input" requireLabel={false}/>
								<KrField grid={1/2} label="所属地区" name="distinctId"  style={{width:262,marginLeft:15,zIndex:2}} component="city" onSubmit={this.cityValue} requireLabel={true} cityName={cityName}/>
								<KrField grid={1/2} label="项目名称" name="projectName" style={{width:262,marginLeft:28}} component="input"/>
								<KrField grid={1/2} label="项目类型" name="projectCategoryId"  style={{width:262,marginLeft:15,zIndex:1}} component="tree" placeholder="请选择项目类型"  listValueName={listValue} treeAll={State.treeAll}/>
								<KrField grid={1/2} label="详细地址" name="detailAddress" style={{width:262,marginLeft:28}} component="input"/>


								<KrField grid={1/2} label="是否已有办公室" name="hasOffice" style={{width:262,marginLeft:15,marginRight:13}} component="group">
					              	<KrField name="hasOffice" label="是" type="radio" value="YES" onClick={this.hasOfficeClick} style={{marginTop:5,display:'inline-block',width:84}}/>
					             	<KrField name="hasOffice" label="否" type="radio" value="NO" onClick={this.hasOfficeClick} style={{marginTop:5,display:'inline-block',width:53}}/>
					            </KrField>

								{hasOffice && <KrField grid={1/2} label="到期时间" name="deadline" style={{width:262,marginLeft:15}} component="date"/>}
								
								<KrField grid={1/2} label="公司网址" name="website" style={{width:262,marginLeft:15}} component="input"/>
								<div className='speakInfo'><KrField grid={1} label="公司简介" name="companyIntroduce" style={{marginLeft:15}} heightStyle={{height:"70px",width:'543px'}}  component="textarea"  maxSize={100} placeholder='请输入公司简介' lengthClass='cus-length-textarea'/></div>
								<div className='remaskInfo'><KrField grid={1} label="备注" name="remark" style={{marginLeft:15,marginTop:-15}} heightStyle={{height:"70px",width:'543px'}}  component="textarea"  maxSize={100} requireLabel={false} placeholder='请输入备注' lengthClass='cus-textarea'/></div>
						</div>
						
						<div className="end-round"></div>
				        </div>
						<Grid style={{marginTop:30}}>
							<Row>
								<Col md={12} align="center">
									<ButtonGroup>
										<div  className='ui-btn-center'><Button  label="确定" type="submit"/></div>
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
		let checkTel=/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
		let email = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
		let RMB=/^(([1-9]\d*)|0)(\.\d{2})?$/
		if(!values.sourceId){
			errors.sourceId = '请填写客户来源';
		}

		if (!values.stationNum) {
			errors.stationNum = '请填写意向工位个数';
		}else if(isNaN(+values.stationNum)){
			errors.stationNum = '意向工位个数为数字格式';
		}else if(values.stationNum.length>8){
			errors.stationNum = '最多输入8个字符';
		}


		if (!values.customerName) {
			errors.customerName = '请填写联系人姓名';
		}else if(values.customerName.length>20){
			errors.customerName = '最多输入20个字符';
		}


		if (!values.staiontypeId) {
			errors.staiontypeId = '请填写意向工位类型';
		}

		if(!values.tel) {
			errors.tel = "请填写联系人电话"
		}
		if(!values.name) {
			errors.name = "请填写联系人姓名"
		}
		if (!values.customerTel ) {
			errors.customerTel = '请填写联系人电话';
		}else if(!phone.test(values.customerTel)||!checkTel.test(values.customerTel)){
			errors.customerTel = '联系人电话格式错误';
		}

		if (!values.staionPrice) {
			errors.staionPrice = '请填写意向工位价格';
		}else if(!RMB.test(values.staionPrice)){
			errors.staionPrice = '工位价格不得超过1亿';
		}


		if(!email.test(values.customerMail)){
			errors.customerMail = '联系人邮箱格式错误';
		}

		if(!values.intentionCommunityId){
			errors.intentionCommunityId="意向工位类型不能为空";
		}

		if(values.customerWechat&&values.customerWechat.length>50){
			errors.customerWechat="最多输入50个字符";
		}

		

		if (!values.company) {
			errors.company = '请填写公司名称';
		}else if(values.company.length>20){
			errors.company = '最多输入20个字符';
		}

		if (!values.teamNum) {
			errors.teamNum = '请填写公司规模';
		}else if(isNaN(values.teamNum)){
			errors.teamNum = '请输入数字';
		}else if(values.teamNum.length>8){
			errors.teamNum = '最多输入8个字符';
		}


		if(values.amount&&values.amount.length>12){
			errors.amount = '最多输入20个字符';
		}else if(values.amount&&isNaN(values.amount)){
			errors.amount = '请输入数字';
		}

		if (!values.intentionCommunityId) {
			errors.intentionCommunityId = '请填写意向入驻社区';
		}


		if(values.projectName&&values.projectName.length>20){
			errors.projectName = '最多输入20个字符';
		}

		if (!values.districtId) {
			errors.districtId = '请填写所属地区';
		}

		

		if(values.detailAddress&&values.detailAddress.length>60){
			errors.detailAddress = '最多输入60个字符';
		}

		if(values.website&&values.website.length>50){
			errors.website = '最多输入50个字符';

		}
		
		return errors
	}
export default reduxForm({ form: 'EditCustomerList',validate,enableReinitialize:true,keepDirtyOnReinitialize:true})(EditCustomerList);
