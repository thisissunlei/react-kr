
import React, {PropTypes} from 'react';
import {reduxForm,formValueSelector,initialize,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';

import {
	KrField,
	Grid,
	Row,
	Button,
	Message,
	ListGroup,
	ListGroupItem
} from 'kr-ui';
import $ from 'jquery'
import imgLine from './images/line.png'

 class NewCreateForm extends React.Component{

	constructor(props){
		super(props);
		this.state={
			communityText:'',
			companyText:'',
			phoneSame:false,
			email:'',
			onsubmit:true,
			communityName:'',
			onsubmitCode:true
		}
		this.params = this.props.params;
	}


	componentDidMount(){
		this.getBasicData();
		this.getCummityName();
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
			sendMsg:'1',
			foreignCode:''
		}
		Store.dispatch(initialize('NewCreateForm',response));
	}
	// 点确定提交时候如果有错误提示返回，否则提交,,如果邮箱存在有错误提示，不能提交
	 onSubmit=(values)=>{
	 	this.EmailonBlur(values.email);
	 	this.foreignCodeBlur(values.foreignCode);
	 	let {onsubmit,onsubmitCode} = this.state;
	 	if(onsubmit && onsubmitCode){
			values.companyId = parseInt(this.params.companyId);
			values.communityId = parseInt(this.params.communityId);
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
		Http.request('getMemberBasicData',params).then(function(response){
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

		Http.request('isPhoneRegistered',params).then(function(response){
			//  检验response是不是空对象
				if(!$.isEmptyObject(response)){
					response.sendMsg = '1';
					Store.dispatch(initialize('NewCreateForm',response));
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
		 		communityId:parseInt(_this.params.communityId),
				companyId:parseInt(_this.params.companyId),
				sendMsg:'1'
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
		 	_this.setState({
				onsubmit:true
			})
		 	return;
		 }

		Http.request('isEmailRegistered',params).then(function(response){
				//邮箱已注册
				Message.warn('该邮箱已被绑定','error');
				_this.setState({
					onsubmit:false
				})

		 }).catch(function(err){
		 	//会员卡号未注册
		 	_this.setState({
				onsubmit:true
			})
		 });
	 }
	 getCummityName=()=>{
	 	let _this = this;
	 	let communityName = '';

	 	Http.request('getCommunityListByParams').then(function(response){
				response.forEach((item)=>{
					if(item.id == _this.params.communityId){
						communityName = item.communityname;
					}
				})
				_this.setState({
					communityName
				})

		 }).catch(function(err){
		 	//会员卡号未注册
		 	_this.setState({
				onsubmitCode:true
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
		 	_this.setState({
				onsubmitCode:true
			})
		 	return;
		 }
		 if(params.code !== undefined){
			Http.request('membersByForeignCode',params).then(function(response){
					//会员卡号已注册
					if(response.phone !='-1' && response.id){
						Message.warn('此会员卡号已被绑定','error');
					}else{
						Message.warn(response.name,'error');

					}
					_this.setState({
						onsubmitCode:false
					})

			 }).catch(function(err){
			 	//会员卡号未注册
			 	_this.setState({
					onsubmitCode:true
				})
			 });
		 }

	 }

	render(){
		const { error, handleSubmit, pristine, reset} = this.props;
		let communityText = '';
		let {selectOption,communityName} =this.state;


		return (
			<div style={{padding:'10px 30px 0 30px'}}>
			<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:20}}>
				<KrField grid={1/2} name="phone" type="text" label="手机号" right={20} requireLabel={true} style={{display:'block'}}
				   onBlur={this.onBlur}/>
				<div style={{width:'100%',textAlign:'center',height:25,marginBottom:8}}>
						<img src={imgLine}/>
				</div>
				<KrField grid={1/2} name="community" component="labelText" label="社区" inline={false}  defaultValue={communityName} requireLabel={true} requiredValue={true}/>
				<KrField grid={1/2} name="company" inline={false} component="labelText" label="公司" defaultValue={this.props.detail.companyName} requireLabel={true} requiredValue={true}/>
				<KrField grid={1/2} name="name" type="text" label="姓名" right={20}  requireLabel={true} requiredValue={true} />
        		<KrField grid={1/2} name="foreignCode" type="text" label="会员卡号" right={20}  onBlur={this.foreignCodeBlur}/>
        		<KrField grid={1/2} name="email" type="text" label="邮箱" right={20} requireLabel={true} onBlur={this.EmailonBlur}/>
        		<KrField name="job"  grid={1/2} label="职位"  left={20} options={selectOption}/>
        		<KrField grid={1/2} name="identityCard" type="text" label="身份证号" style={{width:'252px'}} />
				<Grid style={{marginTop:19,marginBottom:20}}>
					<Row>
							<ListGroup>
								<ListGroupItem style={{width:'269px',textAlign:'right',padding:0,paddingRight:15}}><Button  label="确定" type="submit"/></ListGroupItem>
								<ListGroupItem style={{width:'254px',textAlign:'left',padding:0,paddingLeft:15}}><Button  label="取消" type="button"  cancle={true} onTouchTap={this.onCancel} /></ListGroupItem>
							</ListGroup>
					</Row>
				</Grid>
		  </form>
		  </div>
		);
	}
}
const validate = values => {

	const errors = {}
	let code = /^\d{10}$/;
	let phone = /(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/;
	let email = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
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

	// if (!values.jobId) {
	// 	errors.jobId = '请输入职位';
	// }

	if (!values.name) {
		errors.name = '请输入姓名';
	}
	if (!email.test(values.email) ) {
        errors.email = '请填写正确邮箱';
    }
    if (!phone.test(values.phone) ) {
        errors.phone = '请输入正确电话号';
    }
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;     
    if( values.idCardNo && !reg.test(values.idCardNo)){   
        errors.idCardNo = '身份证输入不合法';   
    }
    if (/^\s+$/gi.test(values.name) ) {
        errors.name = '请输入正确姓名';
    }
    if (values.foreignCode&&!code.test(values.foreignCode) ) {
        errors.foreignCode = '会员卡号为10位纯数字';
    }
    
    // if (!values.foreignCode) {
    //     errors.foreignCode = '请输入会员卡号';
    // }

	return errors
}
const selector = formValueSelector('NewCreateForm');
export default NewCreateForm = reduxForm({
	form: 'NewCreateForm',
	validate,
})(NewCreateForm);
