import React from 'react';
import {reduxForm,change,initialize,reset} from 'redux-form';
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

import $ from 'jquery';

import imgLine from './images/line.png';

class NewCreateForm extends React.Component{

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

		this.params = this.props.params;
	}


	componentWillMount() {
		this.params = this.props.params;
		let response = {
			phone:'',
			communityId:'',
			csrId:'',
			email:'',
			job:'',
			name:'',
			foreignCode:'',
			identityCard:'',
			leader:'0'
		}
		Store.dispatch(initialize('NewCreateForm',response));
	}
	// 点确定提交时候如果有错误提示返回，否则提交,,如果邮箱存在有错误提示，不能提交
	onSubmit=(values)=>{
		//this.EmailonBlur(values.email);
		//this.foreignCodeBlur(values.foreignCode);
		let {onsubmit,onSubmitCode} = this.state;
		if(onsubmit && onSubmitCode){
			const {onSubmit} = this.props;
			onSubmit && onSubmit(values);
		}
	}
	onCancel=()=>{
		const {onCancel} = this.props;
		onCancel && onCancel();
	}
	

	//  输入手机号查看该手机号是否绑定
	onBlur=(phone)=>{

		let params = {
			phone :phone
		}

		this.setState({
			open:true,
			phone
		});
		let _this = this;
		Http.request('isPhoneRegistered',params).then(function(response){
			//  检验response是不是空对象
			if(!$.isEmptyObject(response)){
				Store.dispatch(initialize('NewCreateForm',response));
				// 此处要有提示
				Message.warntimeout('该手机号码已被注册！','error');
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
				csrId:'',
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
	// EmailonBlur=(phone)=>{
	// 	let params = {
	// 		email :phone
	// 	}
	// 	let {email,phoneSame} = this.state;
	// 	this.setState({
	// 		open:true
	// 	})
	// 	let _this = this;
	// 	if(phoneSame && email == params.email){
	// 		_this.setState({
	// 			onsubmit:true
	// 		})
	// 		return;
	// 	}else{
	// 		Http.request('isEmailRegistered',params).then(function(response){
	// 			//邮箱已注册
	// 			Message.warntimeout('该邮箱已被绑定','error');
	// 			_this.setState({
	// 				onsubmit:false
	// 			})
	// 		}).catch(function(err){
	// 			//邮箱未注册
	// 			_this.setState({
	// 				onsubmit:true
	// 			})
	// 		});
	// 	}
	// }
	// foreignCodeBlur=(codes)=>{
	// 	let params = {
	// 		code :codes
	// 	}
	// 	let {code,phoneSame,phone} = this.state;
	// 	let _this = this;
	// 	this.setState({
	// 		open:true
	// 	})
	// 	if(phoneSame && code == params.code){
	// 		_this.setState({
	// 			onSubmitCode:true
	// 		})
	// 		return;
	// 	}

	// 	if(params.code !== undefined){
	// 		Http.request('membersByForeignCode',params).then(function(response){
	// 			//会员卡号已注册
	// 			if(response.phone !='-1' && response.id){
	// 				Message.warntimeout('该会员卡号已被绑定','error');
	// 			}else{
	// 				Message.warntimeout(response.name,'error');

	// 			}
	// 			_this.setState({
	// 				onSubmitCode:false
	// 			})
	// 		}).catch(function(err){
	// 			//会员卡号未注册
	// 			_this.setState({
	// 				onSubmitCode:true
	// 			})
	// 		});
	// 	}

	// }
	onChangeSearchCommunity(community) {
		let communityId="";
		if(community!==null){
			communityId = community.id;
		}
		Store.dispatch(change('NewCreateForm', 'communityId', communityId));
	}
	onChangeSearchCompany(company) {
		let csrId="";
		if(company!==null){
			csrId = company.csrId;
		}
		Store.dispatch(change('NewCreateForm', 'csrId', csrId));
	}
	render(){
		const { error, handleSubmit, pristine, reset} = this.props;
		let communityText = '';
		let {selectOption} =this.state;
		let options = [{
			label: '公司名称',
			value: 'COMP_NAME'
		}, {
			label: '手机号',
			value: 'PHONE'
		}, {
			label: '微信',
			value: 'WECHAT'
		}, {
			label: '姓名',
			value: 'NAME'
		}];
		return (
			<div>
				<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:20,marginLeft:'40px'}}>
					<KrField grid={1/2} name="phone" type="text" onBlur={this.onBlur} label="手机号" requireLabel={true} style={{display:'block',width:'252px'}}/>
					<div style={{width:'100%',textAlign:'center',height:25,marginBottom:8,marginLeft:'-30px'}}>
						<img src={imgLine}/>
					</div>
					<KrField grid={1/2} name="communityId" component="searchCommunityAll" label="社区" onChange={this.onChangeSearchCommunity} requireLabel={true} requiredValue={true}  inline={false} style={{width:'252px',marginRight:'30'}}/>
					<KrField grid={1/2} name="csrId" component="searchMemberCompany" label="公司" onChange={this.onChangeSearchCompany} requireLabel={true} requiredValue={true}  style={{width:'252px',marginRight:'30'}}/>
					<KrField grid={1/2} name="name" type="text" label="姓名" requireLabel={true} requiredValue={true} errors={{requiredValue:'姓名为必填项'}} style={{width:'252px',marginRight:'30'}}/>
					<KrField grid={1/2} name="foreignCode" type="text" label="会员卡号" onBlur={this.foreignCodeBlur} style={{width:'252px',marginRight:'30'}} />
					<KrField grid={1/2} name="email" type="text" label="邮箱"  onBlur={this.EmailonBlur} style={{width:'252px',marginRight:'30'}}/>
					<KrField name="job"  grid={1/2}  label="职位"  style={{width:'252px'}}/>
					<KrField grid={1/2} name="identityCard" type="text" label="身份证号" style={{width:'252px',marginRight:'30'}} />
					<KrField name="leader" component="group" label="Leader"  style={{width:252}} >
						<KrField name="leader" label="是" type="radio" value="1" />
						<KrField name="leader" label="否" type="radio" value='0' />
					</KrField>
					<Grid style={{marginTop:18,marginBottom:'4px'}}>
						<Row>
							<ListGroup>
								<ListGroupItem style={{width:'269px',textAlign:'right',padding:0,paddingRight:15}}><Button  label="确定" type="submit"/></ListGroupItem>
								<ListGroupItem style={{width:'254px',textAlign:'left',padding:0,paddingLeft:15}}><Button  label="取消" type="button"  cancle={true} onTouchTap={this.onCancel} /></ListGroupItem>
						</ListGroup>					</Row>
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
	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;     
    if( values.idCardNo && !reg.test(values.idCardNo)){  
        errors.idCardNo = '身份证输入不合法';   
    }
	// if (!values.email) {
	// 	errors.email = '请输入邮箱';
	// }
	if (!values.csrId) {
		errors.csrId = '请输入公司';
	}
	if (!values.name || /^\s+$/.test(values.name)) {
		errors.name = '请输入姓名';
	}
	if (values.email && !email.test(values.email) ) {
		errors.email = '请输入正确邮箱';
	}
	if (values.phone && !phone.test(values.phone) ) {
		errors.phone = '请输入正确电话号';
	}
	// if (!code.test(values.foreignCode) ) {
	//     errors.foreignCode = '会员卡号为10位纯数字';
	// }
	
	// if (!values.foreignCode) {
	//     errors.foreignCode = '请输入会员卡号';
	// }
	// if(values.foreignCode && !code.test(values.foreignCode)){
	// 	errors.foreignCode = '请填写10位纯数字会员卡号';
	// }
	return errors
}
export default NewCreateForm = reduxForm({
	form: 'NewCreateForm',
	validate,
})(NewCreateForm);
