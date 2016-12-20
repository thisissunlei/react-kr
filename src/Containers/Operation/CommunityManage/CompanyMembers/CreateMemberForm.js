
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
			onsubmit:true


		}
		this.getBasicData();
		this.params = this.props.params;



	}
	componentWillMount() {
		this.params = this.props.params;
		let response = {
			phone:'',
			communityId:parseInt(this.params.communityId),
			companyId:parseInt(this.params.companyId),
			email:'',
			jobId:'',
			name:'',
			foreignCode:'',
			sendMsg:'0',
			code:''
		}
		Store.dispatch(initialize('NewCreateForm',response));
	}
	// 点确定提交时候如果有错误提示返回，否则提交,,如果邮箱存在有错误提示，不能提交
	 onSubmit=(values)=>{
	 	this.EmailonBlur(values.email);
	 	this.foreignCodeBlur(values.foreignCode);
	 	let {onsubmit} = this.state;
	 	if(onsubmit){
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
		 let url = this.props.params;
		let params = {
			communityId:url.communityId,
			companyId:url.companyId,
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
	 		open:true
	 	})
		 let _this = this;

		 Store.dispatch(Actions.callAPI('isPhoneRegistered',params)).then(function(response){
			//  检验response是不是空对象
				if(!$.isEmptyObject(response)){
					response.sendMsg = '0';
					Store.dispatch(initialize('NewCreateForm',response));
					console.log("response",response);
					// 此处要有提示
					Message.warn('该手机号码已被注册！','error');
					_this.setState({
						phoneSame:true,
						email:response.email,
						code:response.code
					})
					
				}
		 }).catch(function(err){
		 	let {phoneSame} = _this.state;
		 	let response = {
		 		phone:phone,
		 		communityId:parseInt(_this.params.communityId),
				companyId:parseInt(_this.params.companyId),
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
		 	console.log('phoneSame');
		 	return;
		 }

		 Store.dispatch(Actions.callAPI('isEmailRegistered',params)).then(function(response){
				//邮箱已注册
				Message.warn('该邮箱已被绑定，请更换邮箱','error');
				_this.setState({
					onsubmit:false
				})

		 }).catch(function(err){
		 	//邮箱未注册
		 	console.log('ddddd',err.message);
		 	_this.setState({
				onsubmit:true
			})
		 });
	 }
	 foreignCodeBlur=(codes)=>{
		 let params = {
			 code :codes
		 }
		 let {code,phoneSame} = this.state;
		 let _this = this;
		 this.setState({
	 		open:true
	 	})
		 if(phoneSame && code == params.code){
		 	return;
		 }

		 Store.dispatch(Actions.callAPI('membersByForeignCode',params)).then(function(response){
				//邮箱已注册
				Message.warn('该邮箱已被绑定，请更换邮箱','error');
				_this.setState({
					onsubmit:false
				})

		 }).catch(function(err){
		 	//邮箱未注册
		 	console.log('ddddd',err.message);
		 	_this.setState({
				onsubmit:true
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
			<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:20}}>
				<KrField grid={1/2} name="phone" type="text" label="手机号" requireLabel={true} style={{display:'block'}}
				   requiredValue={true} onBlur={this.onBlur} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>
				<div style={{width:'100%',textAlign:'center',height:25,marginBottom:8}}>
						<img src={imgLine}/>
				</div>
				<KrField grid={1/2} name="communityId" component="searchCommunity" label="社区" onChange={this.onChangeSearchCommunity} requireLabel={true} requiredValue={true} errors={{requiredValue:'社区为必填项'}}/>
        <KrField grid={1/2} name="email" type="input" label="邮箱" requireLabel={true} onBlur={this.EmailonBlur}
				   requiredValue={true} pattern={/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/} errors={{requiredValue:'邮箱为必填项',pattern:'请输入正确邮箱地址'}}/>
				<KrField grid={1/2} name="companyId" component="searchCompany" label="公司" onChange={this.onChangeSearchCompany} requireLabel={true} requiredValue={true} errors={{requiredValue:'社区为必填项'}}/>
        <KrField name="jobId"  grid={1/2} component="select" label="职位" options={selectOption} requireLabel={true} />
				<KrField grid={1/2} name="name" type="text" label="姓名" requireLabel={true} requiredValue={true} errors={{requiredValue:'姓名为必填项'}}/>
				<KrField grid={1/2} name="sendMsg" component="group" label="发送验证短信" >
						<KrField name="sendMsg" grid={1/2} label="是" type="radio" value="1"/>
						<KrField name="sendMsg" grid={1/2} label="否" type="radio" value="0" />
              </KrField>
        <KrField grid={1/2} name="foreignCode" type="input" label="会员卡号" requireLabel={true} onBlur={this.foreignCodeBlur}/>
				<Grid style={{marginTop:30}}>
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
