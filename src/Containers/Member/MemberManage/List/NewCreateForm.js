
import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	Message,
	SnackTip
} from 'kr-ui';
import $ from 'jquery'
import imgLine from './images/line.png'

 class NewCreateForm extends Component{

	constructor(props){
		super(props);
		this.state={
			communityText:'',
			companyText:'',
			phoneSame:false,
			email:'',
			onsubmit:true,
			onSubmitCode:true,
			code:'',

		}
		this.getBasicData();
		this.params = this.props.params;



	}
	componentWillMount() {
		this.params = this.props.params;
		let response = {
			phone:'',
			communityId:'',
			companyId:'',
			email:'',
			jobId:'',
			name:'',
			foreignCode:'',
			sendMsg:'0',
			foreignCode:''
		}
		Store.dispatch(initialize('NewCreateForm',response));
	}
	// 点确定提交时候如果有错误提示返回，否则提交,,如果邮箱存在有错误提示，不能提交
	 onSubmit=(values)=>{
	 	this.EmailonBlur(values.email);
	 	this.foreignCodeBlur(values.foreignCode);
	 	let {onsubmit,onSubmitCode} = this.state;
	 	if(onsubmit && onSubmitCode){
			// 	console.log('values',values);
	 		const {onSubmit} = this.props;
		 	onSubmit && onSubmit(values);
	 	}

	 }

	 onCancel=()=>{
		 const {onCancel} = this.props;
		 onCancel && onCancel();
	 }
	 getBasicData=()=>{
	//  新增会员准备职位数据
		 let _this =this;
		let params = {
			communityId:'',
			companyId:'',
		}
		 Store.dispatch(Actions.callAPI('getMemberBasicData',params)).then(function(response){
			 response.jobList.forEach(function(item,index){
				 item.value = item.id;
				 item.label = item.jobName;
			 });
			//  let memberInfoVO = {
			// 	communityId:_this.params.communityId,
			// 	companyId:_this.params.companyId
			// }
			// Store.dispatch(initialize('NewCreateForm', memberInfoVO));
			 _this.setState({
				selectOption:response.jobList
			})
		 }).catch(function(err){
			 reject(err);
		 });
	 }
	//  输入手机号查看该手机号是否绑定
	 onBlur=(phone)=>{
		 let params = {
			 phone :phone
		 }
		 this.setState({
	 		open:true,
			phone
	 	})
		 let _this = this;

		 Store.dispatch(Actions.callAPI('isPhoneRegistered',params)).then(function(response){
			//  检验response是不是空对象
				if(!$.isEmptyObject(response)){
					response.sendMsg = '0';
					Store.dispatch(initialize('NewCreateForm',response));
					// console.log("response",response);
					// 此处要有提示
					Message.warn('该手机号码已被注册！','error');
					_this.setState({
						phoneSame:true,
						email:response.email,
						code:response.foreignCode
					})

				}
		 }).catch(function(err){
		 	let {phoneSame} = _this.state;
		 	let response = {
		 		phone:phone,
		 		communityId:'',
				companyId:'',
				sendMsg:'0'
		 	}
		 	if(phoneSame){
				Store.dispatch(initialize('NewCreateForm',response));
				_this.setState({
					phoneSame:false,
					email:''
				})


		 	}
		 });
	 }
	 EmailonBlur=(phone)=>{
		 let params = {
			 email :phone
		 }
		 let {email,phoneSame} = this.state;
		 this.setState({
	 		open:true
	 	})
		 let _this = this;
		 if(phoneSame && email == params.email){
			// 	console.log('phoneSame');
		 	_this.setState({
				onsubmit:true
			})
		 	return;
		 }else{
		 	Store.dispatch(Actions.callAPI('isEmailRegistered',params)).then(function(response){
				//邮箱已注册
				Message.warn('该邮箱已被绑定','error');
				_this.setState({
					onsubmit:false
				})

			 }).catch(function(err){
			 	//邮箱未注册
				// 	console.log('ddddd',err.message);
			 	_this.setState({
					onsubmit:true
				})
			 });
		 }
		//  console.log('EmailonBlur',phone);


	 }
	 foreignCodeBlur=(codes)=>{
		 let params = {
			 code :codes
		 }
		 let {code,phoneSame,phone} = this.state;
		 let _this = this;
		 this.setState({
	 		open:true
	 	})
		 if(phoneSame && code == params.code){
		 	_this.setState({
				onSubmitCode:true
			})
		 	return;
		 }

		 Store.dispatch(Actions.callAPI('membersByForeignCode',params)).then(function(response){

				 //会员卡号已注册
 				Message.warn('该会员卡号已被绑定','error');
 				_this.setState({
 					onSubmitCode:false
 				})
		 }).catch(function(err){
		 	//会员卡号未注册
			// 	console.log('ddddd',err.message);
		 	_this.setState({
				onSubmitCode:true
			})
		 });
	 }

	 onChangeSearchCommunity(personel) {
		Store.dispatch(change('NewCreateForm', 'communityId', personel.id));
	}
	onChangeSearchCompany(personel) {
		Store.dispatch(change('NewCreateForm', 'companyId', personel.id));
	}
	render(){
		const { error, handleSubmit, pristine, reset} = this.props;
		let communityText = '';
		let {selectOption} =this.state;


		return (
			<div>
			<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:20,marginLeft:'40px'}}>
				<KrField grid={1/2} name="phone" type="text" label="手机号" requireLabel={true} style={{display:'block',width:'252px'}}
				   requiredValue={true} onBlur={this.onBlur} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>
				<div style={{width:'100%',textAlign:'center',height:25,marginBottom:8,marginLeft:'-30px'}}>
						<img src={imgLine}/>
				</div>
				<KrField grid={1/2} name="communityId" component="searchCommunity" label="社区" onChange={this.onChangeSearchCommunity} requireLabel={true} requiredValue={true} errors={{requiredValue:'社区为必填项'}} style={{width:'252px',marginRight:'30'}}/>
        <KrField grid={1/2} name="email" type="input" label="邮箱" requireLabel={true} onBlur={this.EmailonBlur}
				   requiredValue={true} pattern={/^([a-zA-Z0-9\_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/} errors={{requiredValue:'邮箱为必填项',pattern:'请输入正确邮箱地址'}} style={{width:'252px'}}/>
				<KrField grid={1/2} name="companyId" component="searchCompany" label="公司" onChange={this.onChangeSearchCompany} requireLabel={true} requiredValue={true} errors={{requiredValue:'公司为必填项'}} style={{width:'252px',marginRight:'30'}}/>
        <KrField name="jobId"  grid={1/2} component="select" label="职位" options={selectOption} requireLabel={true} style={{width:'252px'}}/>
				<KrField grid={1/2} name="name" type="text" label="姓名" requireLabel={true} requiredValue={true} errors={{requiredValue:'姓名为必填项'}} style={{width:'252px',marginRight:'30'}}/>
				<KrField grid={1/2} name="sendMsg" component="group" label="发送验证短信"  style={{width:'252px'}}>
						<KrField name="sendMsg" grid={1/2} label="是" type="radio" value="1"/>
						<KrField name="sendMsg" grid={1/2} label="否" type="radio" value="0" />
              </KrField>
        <KrField grid={1/2} name="foreignCode" type="input" label="会员卡号" requireLabel={true} onBlur={this.foreignCodeBlur} style={{width:'252px'}}/>
				<Grid style={{marginTop:30,marginLeft:'-40px'}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
									<Button  label="确定" type="submit"/>
									<Button  label="取消" type="button"  cancle={true} onTouchTap={this.onCancel} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>
		  </form>
		  </div>
		);
	}
}
const validate = values => {

	const errors = {}

	if (!values.phone) {
		errors.phone = '请输入电话号码';
	}

	if (!values.communityId) {
		errors.communityId = '请输入社区名称';
	}

	if (!values.email) {
		errors.email = '请输入邮箱';
	}
	if (!values.companyId) {
		errors.companyId = '请输入公司';
	}

	if (!values.jobId) {
		errors.jobId = '请输入职位';
	}

	if (!values.name) {
		errors.name = '请输入姓名';
	}

	if (!values.sendMsg ) {
        errors.sendMsg = '请选择是否发送验证短信';
    }
    if (!values.foreignCode) {
        errors.foreignCode = '请输入会员卡号';
    }
	return errors
}
const selector = formValueSelector('NewCreateForm');
export default NewCreateForm = reduxForm({
	form: 'NewCreateForm',
	validate,
})(NewCreateForm);
