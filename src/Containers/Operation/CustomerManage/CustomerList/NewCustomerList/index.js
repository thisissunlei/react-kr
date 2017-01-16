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
} from 'kr-ui';
import State from './State';
import './index.less'
@observer
 class NewCustomerList extends Component{

		

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
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
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
	
	componentDidMount(){
	 	Store.dispatch(change('NewCustomerList','hasOffice','NOHAS'));
	}


	render(){
		const { error, handleSubmit, pristine, reset} = this.props;

		return (

			<form className="m-newMerchants" onSubmit={handleSubmit(this.onSubmit)}>
				<div className="title">
						<div><span className="new-icon"></span><label className="title-text">新建客户</label></div>
						<div className="close" onClick={this.onCancel}></div>
				</div>
				<div className="cheek">
							<div className="titleBar"><span className="order-number">1</span><span className="wire"></span><label className="small-title">基本信息</label></div>
							<div className="small-cheek">

									<KrField grid={1/2} label="客户来源" name="sourceId" style={{width:252,marginLeft:15}} component="select" 
											options={State.selectData.customerSourceList}
											requireLabel={true}
									/>
									<KrField grid={1/2} label="意向工位个数" name="stationNum" style={{width:252,marginLeft:15}} component="input" requireLabel={true}>
										<span>个</span>
									</KrField>
									<KrField grid={1/2} label="联系人姓名" name="customerName" style={{width:252,marginLeft:15}} component="input" requireLabel={true}/>
									<KrField grid={1/2} label="意向工位类型" name="staiontypeId" component="select" style={{width:252,marginLeft:15}} 
											options={State.selectData.stationTypeList}
											requireLabel={true}
									/>
									<KrField grid={1/2} label="联系人电话" name="customerTel" style={{width:252,marginLeft:15}} component="input"  requireLabel={true}/>
									<KrField grid={1/2} label="意向工位价格" name="staionPrice" style={{width:252,marginLeft:15}} component="input"  requireLabel={true}>
										<span>元/个/月</span>
									</KrField>
									<KrField grid={1/2} label="联系人邮箱"  name="customerMail" style={{width:252,marginLeft:15}} component="input" requireLabel={false}/>
									<KrField grid={1/2} label="意向入驻社区" name="intentionCommunityId" component="select" style={{width:252,marginLeft:15}} 
											options={State.selectData.communityBaselist}
											requireLabel={true}
									/>
									<KrField grid={1/2} label="联系人微信" name="customerWechat" style={{width:252,marginLeft:15}} component="input" requireLabel={false}/>
									<KrField grid={1/2} label="预计入驻时间" name="inTime" style={{width:252,marginLeft:15}} component="date"    requireLabel={true}/>
									<div className="middle-round"></div>
						</div>

						<div className="titleBar"><span className="order-number">2</span><span className="wire"></span><label className="small-title">公司信息</label></div>
						<div className="small-cheek" style={{paddingBottom:0}}>
								<KrField grid={1/2} label="公司名称" name="customerCompany" component="input" style={{width:252,marginLeft:15}}  requireLabel={true}/>
								<KrField grid={1/2} label="投资轮次" name="roundId" component="select" style={{width:252,marginLeft:15}} 
										options={State.selectData.roundList}
										requireLabel={false}
								/>
								<KrField grid={1/2} label="公司规模" name="teamNum" style={{width:252,marginLeft:15}} component="input" requireLabel={true}/>
								<KrField grid={1/2} label="融资金额" name="amount" style={{width:252,marginLeft:15}} component="input" requireLabel={false}/>
								<KrField grid={1/2} label="是否已有办公室" name="hasOffice" style={{width:252,marginLeft:15}} component="group" requireLabel={true}>
					              	<KrField name="hasOffice" label="是" type="radio" value="HAS" onClick={this.hasOfficeClick}/>
					             	<KrField name="hasOffice" label="否" type="radio" value="NOHAS" onClick={this.hasOfficeClick}/>
					            </KrField>

								{State.matureTime && <KrField grid={1/2} label="到期时间" name="deadline" style={{width:252,marginLeft:15}} component="date" requireLabel={true}/>}
								<KrField grid={1/2} label="项目名称" name="projectName" style={{width:252,marginLeft:15}} component="input" requireLabel={true}/>

								<KrField grid={1/2} label="所属地区" name="districtId"  style={{width:252,marginLeft:15}} component="city" onSubmit={this.city}/>

								<KrField grid={1/2} label="项目类型" name="projectCategoryId" component="select" style={{width:252,marginLeft:15}} 
										options={[
											{value:'PAYMENT',label:'回款'},
										  	{value:'INCOME',label:'收入'},
										]}
										requireLabel={true}
								/>
								<KrField grid={1/2} label="详细地址" name="detailAddress" style={{width:252,marginLeft:15}} component="input" requireLabel={true}/>
								<KrField grid={1/2} label="公司网址" name="website" style={{width:252,marginLeft:15}} component="input" requireLabel={true}/>
								<KrField grid={1/2} label="公司简介" name="companyIntroduce" style={{width:520,marginLeft:15}} heightStyle={{height:"80px"}}  component="textarea"  maxSize={100} requireLabel={true} />
								<KrField grid={1/2} label="备注" name="remark" style={{width:520,marginLeft:15,marginTop:-15}} heightStyle={{height:"80px"}}  component="textarea"  maxSize={100} requireLabel={false} />
						</div>
						
						<div className="end-round"></div>
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
export default reduxForm({ form: 'NewCustomerList',validate})(NewCustomerList);
