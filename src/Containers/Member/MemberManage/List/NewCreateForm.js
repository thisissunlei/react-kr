
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
} from 'kr-ui';
import $ from 'jQuery'
import imgLine from './images/line.png'
class NewCreateForm extends Component{
     static contextTypes = {
   		params: React.PropTypes.object.isRequired
   	}

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
		 onSubmit:React.PropTypes.func,
		 onCancel:React.PropTypes.func,
	 }

	constructor(props){
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.state={
			communityText:'',
			companyText:'',

		}

		Store.dispatch(reset('newCreateForm'));
		Store.dispatch(change('newCreateForm','enableflag','ENABLE'));

	}
	// 点确定提交时候如果有错误提示返回，否则提交,,如果邮箱存在有错误提示，不能提交
	 onSubmit(values){
		 const {onSubmit} = this.props;
		 onSubmit && onSubmit(values);
	 }

	 onCancel(){
		 const {onCancel} = this.props;
		 onCancel && onCancel();
	 }
	 componentDidMount(){
	//  新增会员准备职位数据
		 let _this =this;
		 Store.dispatch(Actions.callAPI('getMemberPosition')).then(function(response){
			 response[0].jobList.forEach(function(item,index){
				 item.value = item.id;
				 item.label = item.jobName;
			 });
			 _this.setState({
				selectOption:response[0].jobList
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
		 Store.dispatch(Actions.callAPI('isPhoneRegistered',params)).then(function(response){
			//  检验response是不是空对象
				if(!$.isEmptyObject(response)){
					Store.dispatch(initialize('NewCreateForm',response));
					// console.log("response",response);
					// 此处要有提示
				}
		 }).catch(function(err){
			 reject(err);
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

			<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:'20'}}>
				<KrField grid={1/2} name="phone" type="text" label="手机号" requireLabel={true} style={{display:'block'}}
				   requiredValue={true} onBlur={this.onBlur} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>
				<div style={{width:'100%',textAlign:'center',height:25,marginBottom:8}}>
						<img src={imgLine}/>
				</div>
				<KrField grid={1/2} name="communityId" component="searchCommunity" label="社区" onChange={this.onChangeSearchCommunity} requireLabel={true} requiredValue={true} errors={{requiredValue:'社区为必填项'}}/>
        <KrField grid={1/2} name="email" type="text" label="邮箱" requireLabel={true}
				   requiredValue={true} pattern={/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/} errors={{requiredValue:'邮箱为必填项',pattern:'请输入正确邮箱地址'}}/>
				<KrField grid={1/2} name="companyId" component="searchCompany" label="公司" onChange={this.onChangeSearchCompany} requireLabel={true} requiredValue={true} errors={{requiredValue:'社区为必填项'}}/>
        <KrField name="jobId"  grid={1/2} component="select" label="职位" options={selectOption} requireLabel={true} />
				<KrField grid={1/2} name="name" type="text" label="姓名" requireLabel={true} requiredValue={true} errors={{requiredValue:'姓名为必填项'}}/>
				<KrField grid={1/2} name="enableflag" component="group" label="发送验证短信" requireLabel={true}>
						<KrField name="enableflag" grid={1/4} label="是" type="radio" value="ENABLE"/>
						<KrField name="enableflag" grid={1/4} label="否" type="radio" value="DISENABLE" />
              </KrField>
        <KrField grid={1/2} name="foreignCode" type="text" label="会员卡号" />
				<Grid style={{marginTop:30}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
									<Button  label="确定" type="submit" onTouchTap={this.onSubmit}/>
									<Button  label="取消" type="button"  cancle={true} onTouchTap={this.onCancel} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>
		  </form>
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

	if (!values.enableflag) {
		errors.enableflag = '请选择是否发送验证短信';
	}
	return errors
}
const selector = formValueSelector('NewCreateForm');
export default NewCreateForm = reduxForm({
	form: 'NewCreateForm',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(NewCreateForm);
