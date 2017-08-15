import React, {  PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
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
import merchants from "../Merchants/State";
import signedClient from "../SignedClient/State";
import './index.less'
import {
	observer,
	inject
} from 'mobx-react';
@inject("NewIndentModel")
@observer
 class NewCustomerList extends React.Component{



	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}

	constructor(props){
		super(props);
		State.treeAllData();
		this.screening = ["内部推荐","外部推荐","推介人计划","中介客源"];
	}
	onSubmit = (values) => {
		if(values.projectCategoryId&& typeof values.projectCategoryId!='number'){
			 values.projectCategoryId='';
		}
		let _this=this;
		let {operType}=this.props;
		values.operType=this.props.operType;
		if(!values.staionPrice){
			values.staionPrice='';
		}
		if(!values.inTime){
			values.inTime='';
		}
		if(!values.teamNum){
			values.teamNum='';
		}
		Http.request('customerDataEdit',{},values).then(function(response) {
			if(operType=="SHARE"){
				merchants.searchParams={
		         	page:1,
					    pageSize:15,
					    time:+new Date()
		         }
			}
         	if(operType=="PERSON"){
         		 _this.props.NewIndentModel.searchParams={
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
         	_this.onCancel();
		}).catch(function(err) {
			Message.error(err.message);
		});
	}

    cityValue=(value)=>{
      Store.dispatch(change('NewCustomerList','distinctId',value));
    }

	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

	sourceCustomer=(value)=>{
	  if(!value){
	  	return;
	  }
	  var isTrue = false;
	  var param=value.label;
	  for(let i=0;i<this.screening.length;i++){
		  if(param == this.screening[i] ){
			isTrue = true;
			break;
		  }
	  }
      if(isTrue){
         State.sourceCustomer=true;
      }else{
      	 State.sourceCustomer=false;
      }

	}



	hasOfficeClick = (params) =>{
		if(params.value=="YES"){
			State.showMatureTime();
		}else if(params.value=="NO"){
			State.noShowMatureTime();

		}
	}
	corpNameChange = (value) =>{
		State.corpNameCheck(value);
	}
	componentDidMount(){
	 	// Store.dispatch(change('NewCustomerList','hasOffice','NOHAS'));
		 // Store.dispatch(change('NewCustomerList','hasOffice','NO'));
		 State.sourceCustomer = false;

	}
    closemm=()=>{
    	State.isCloseProject=true;
    }
    changePerson=(value)=>{
	 	Store.dispatch(change('NewCustomerList','recommendName',value.lastname));
	 	Store.dispatch(change('NewCustomerList','recommendTel',value.mobile));

    }

	render(){
		const { error, handleSubmit, pristine, reset,dataReady,open} = this.props;

		return (

			<form className="m-newMerchants" style={{paddingLeft:9}} onSubmit={handleSubmit(this.onSubmit)} isClose={State.isCloseProject} onClick={this.closemm}>
				<div className="title">
						<div><span className="new-icon"></span><label className="title-text">新建客户</label></div>
						<div className="customer-close" onClick={this.onCancel}></div>
				</div>
				<div className="cheek">
							<div className="titleBar"><span className="order-number">1</span><span className="wire"></span><label className="small-title">基本信息</label></div>
							<div className="small-cheek">
									<KrField grid={1/2} label="客户来源" name="sourceId" style={{width:262,marginLeft:15}} component="customerSource"
											requireLabel={true}
											onChange={this.sourceCustomer}
									/>

                    {State.sourceCustomer&&<KrField grid={1/2} label="介绍人姓名" name="recommendName" style={{width:262,marginLeft:28}} component="searchPersonel" requireLabel={true} onChange={this.changePerson}/>}
				   	{State.sourceCustomer&&<KrField grid={1/2} label="介绍人电话" name="recommendTel" style={{width:262,marginLeft:15}} component="input" requireLabel={true}/>}

			            <div className="krFlied-box"><KrField grid={1/2} label="意向工位个数" name="stationNum" style={{width:239,marginLeft:28}} component="input" requireLabel={true}></KrField><span className="unit">个</span></div>

									<KrField grid={1/2} label="联系人姓名" name="name" style={{width:262,marginLeft:15}} component="input" requireLabel={true}/>
									<KrField grid={1/2} label="意向工位类型" name="staionTypeId" component="select" style={{width:262,marginLeft:28}}
											options={dataReady.stationTypeList}
											requireLabel={false}
									/>
									<KrField grid={1/2} label="联系人电话" name="tel" style={{width:262,marginLeft:15}} component="input" requireLabel={true}/>
									<div className="krFlied-box"><KrField grid={1/2} label="意向工位价格" name="staionPrice" style={{width:202,marginLeft:28}} component="input"  requireLabel={false}>
									</KrField><span className="unit">元/个/月</span></div>
									<KrField grid={1/2} label="联系人邮箱"  name="mail" style={{width:262,marginLeft:15}} component="input" requireLabel={false}/>

									<KrField  grid={1/2}  name="intentionCommunityId" style={{width:262,marginLeft:28}} component='searchCommunityAll'  label="意向入驻社区" inline={false}  placeholder='请输入社区名称' requireLabel={true}/>
									<KrField grid={1/2} label="联系人微信" name="wechat" style={{width:262,marginLeft:15}} component="input" requireLabel={false}/>
									<KrField grid={1/2} label="预计入驻时间" name="inTime" style={{width:260,marginLeft:28}} component="date"/>
									<div className="middle-round"></div>
						</div>

						<div className="titleBar"><span className="order-number">2</span><span className="wire"></span><label className="small-title">公司信息</label></div>
						<div className="small-cheek" style={{paddingBottom:0}}>
								<div>
								<KrField grid={1/2} label="公司名称" name="company" component="input" style={{width:262,marginLeft:15}}  requireLabel={true} onChange={this.corpNameChange} />

								<KrField grid={1/2} label="融资轮次" name="roundId" component="select" style={{width:262,marginLeft:28}}
										options={dataReady.roundList}
										requireLabel={false}
								/>
								{State.isCorpName && <div style={{fontSize:14,color:"red",paddingLeft:26,paddingBottom:7}}>该公司名称已存在</div>}
								</div>
                                <div className="krFlied-box"><KrField grid={1/2} label="公司规模" name="teamNum" style={{width:239,marginLeft:16}} component="input" requireLabel={false}></KrField><span className="unit">人</span></div>
								<KrField grid={1/2} label="融资金额" name="amount" style={{width:262,marginLeft:28}} component="input" requireLabel={false}/>
								<KrField grid={1/2} label="所属地区" name="distinctId"  style={{width:262,marginLeft:15,zIndex:2}} component="city" onSubmit={this.cityValue} requireLabel={false} />
								<KrField grid={1/2} label="项目名称" name="projectName" style={{width:262,marginLeft:28}} component="input"/>
								<KrField grid={1/2} label="项目类型" name="projectCategoryId"  style={{width:262,marginLeft:15,zIndex:1}} component="tree" placeholder="请选择项目类型" treeAll={State.treeAll} open={open}/>
								<KrField grid={1/2} label="详细地址" name="detailAddress" style={{width:262,marginLeft:28}} component="input"/>


								<KrField grid={1/2} label="是否已有办公室" name="hasOffice" style={{width:262,marginLeft:15,marginRight:13}} component="group" >
					              	<KrField name="hasOffice" label="是" type="radio" value="YES" onClick={this.hasOfficeClick} style={{marginTop:5,display:'inline-block',width:84}}/>
					             	<KrField name="hasOffice" label="否" type="radio" value="NO" onClick={this.hasOfficeClick} style={{marginTop:5,display:'inline-block',width:53}}/>
					            </KrField>

								{State.matureTime && <KrField grid={1/2} label="到期时间" name="deadline" style={{width:262,marginLeft:15}} component="date"/>}

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

										<div style = {{display:"inline-block",marginRight:30}}><Button  label="确定" type="submit"/></div>
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
		let phone1=/(^(\d{3,4}-)?\d{3,4}-?\d{3,4}$)|(^(\+86)?(1[35847]\d{9})$)/;

		let email = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
		let RMB=/^(([1-9]\d*)|0)(\.\d{2})?$/;
		let stationN = /^([1-9][0-9]{0,7})$/;
		let staionPriceReg = /^([1-9][0-9]{0,7})$|^\d{1,8}(\.\d{1,2})?$/;
		if(!values.sourceId){
			errors.sourceId = '请填写客户来源';
		}
		if(!values.recommendName){
			errors.recommendName='请填写介绍人姓名'
		}

		if(!values.recommendTel){
			errors.recommendTel='请填写介绍人电话'
		}else if(!phone1.test(values.recommendTel)){
			errors.recommendTel='介绍人电话错误'
		}

		if(!stationN.test(values.stationNum)){
			errors.stationNum = '请输入8位以内正整数,不能以0开头';
		}
		if (!values.stationNum) {
			errors.stationNum = '请填写意向工位个数';
		}else if(isNaN(+values.stationNum)){
			errors.stationNum = '意向工位个数为数字格式';
		}else if(values.stationNum.length>8){
			errors.stationNum = '最多输入8个字符';
		}
		if (!values.name) {
			errors.name = '请填写联系人姓名';
		}else if(values.name.length>80){
			errors.name = '最多输入80个字符';
		}
		if (!values.tel) {
			errors.tel = '请填写联系人电话';
		}else if(!phone1.test(values.tel)){
			errors.tel = '联系人电话格式错误';
		}

		//意向工位价格
		if(values.staionPrice&&!staionPriceReg.test(values.staionPrice)){
			errors.staionPrice = '小数点前8位，小数点后2位';
		}

		if(values.mail&&!email.test(values.mail)){
			errors.mail = '联系人邮箱格式错误';
		}

		if(!values.intentionCommunityId){
			errors.intentionCommunityId="意向社区类型不能为空";
		}

		if(values.wechat&&values.wechat.length>50){
			errors.wechat="最多输入50个字符";
		}


		if (!values.company) {
			errors.company = '请填写公司名称';
		}else if(values.company.length>80){
			errors.company = '最多输入80个字符';
		}
		//公司规模
		if(values.teamNum&&isNaN(values.teamNum)){
			errors.teamNum = '请输入数字';
		}else if(values.teamNum&&values.teamNum.length>8){
			errors.teamNum = '最多输入8个字符';
		}
		if(values.teamNum&&!stationN.test(values.teamNum)){
			errors.teamNum = '请输入8位以内正整数,不能以0开头';
		}


		if(values.amount&&values.amount.length>20){
			errors.amount = '最多输入20个字符';
		}else if(values.amount&&isNaN(values.amount)){
			errors.amount = '请输入数字';
		}



		if(values.projectName&&values.projectName.length>20){
			errors.projectName = '最多输入20个字符';
		}


		if(values.detailAddress&&values.detailAddress.length>60){
			errors.detailAddress = '最多输入60个字符';
		}

		if(values.website&&values.website.length>100){
			errors.website = '最多输入50个字符';
		}


		return errors
	}
export default reduxForm({ form: 'NewCustomerList',validate,enableReinitialize:true,keepDirtyOnReinitialize:true})(NewCustomerList);
