
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
 class NewMerchants extends Component{
	 static PropTypes = {
		 onSubmit:React.PropTypes.func,
		 onCancel:React.PropTypes.func,
	 }

	constructor(props){
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);

	}



	 onSubmit(values){
		 const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	 }

	 onCancel(){
		 const {onCancel} = this.props;
		 onCancel && onCancel();
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

									<KrField grid={1/2} label="客户来源" name="proptype" style={{width:252,marginLeft:15}} component="select" options={[
											{value:'PAYMENT',label:'回款'},
										   {value:'INCOME',label:'收入'},]}
											 requireLabel={true}
									/>
									<KrField grid={1/2} label="意向工位个数" name="propcode" style={{width:252,marginLeft:15}} component="input" requireLabel={true}>
										<span>个</span>
									</KrField>
									<KrField grid={1/2} label="联系人姓名" name="propcode" style={{width:252,marginLeft:15}} component="input" requireLabel={true}/>
									<KrField grid={1/2} label="意向工位类型" name="proptype" component="select" style={{width:252,marginLeft:15}} options={[
											 {value:'PAYMENT',label:'回款'},
										   {value:'INCOME',label:'收入'},]}
											 requireLabel={true}
									/>
									<KrField grid={1/2} label="联系人电话" name="propcode" style={{width:252,marginLeft:15}} component="input"  requireLabel={true}/>
									<KrField grid={1/2} label="意向工位价格" name="propcode" style={{width:252,marginLeft:15}} component="input"  requireLabel={true}>
										<span>元/个/月</span>
									</KrField>
									<KrField grid={1/2} label="联系人邮箱"  name="propcode" style={{width:252,marginLeft:15}} component="input" requireLabel={false}/>
									<KrField grid={1/2} label="意向入驻社区" name="proptype" component="select" style={{width:252,marginLeft:15}} options={[
										   {value:'PAYMENT',label:'回款'},
										   {value:'INCOME',label:'收入'},]}
											 requireLabel={true}
									/>
									<KrField grid={1/2} label="联系人微信" name="propcode" style={{width:252,marginLeft:15}} component="input" requireLabel={false}/>
									<KrField grid={1/2} label="预计入驻时间" name="receiveDate" style={{width:252,marginLeft:15}} component="date"    requireLabel={true}/>
									<div className="middle-round"></div>
						</div>

						<div className="titleBar"><span className="order-number">2</span><span className="wire"></span><label className="small-title">公司信息</label></div>
						<div className="small-cheek">
								<KrField grid={1/2} label="公司信息" name="propcode" style={{width:252,marginLeft:15}} component="input" requireLabel={false}/>
								<KrField grid={1/2} label="投资轮次" name="proptype" component="select" style={{width:252,marginLeft:15}} options={[
										 {value:'PAYMENT',label:'回款'},
										 {value:'INCOME',label:'收入'},]}
										 requireLabel={false}
								/>
								<KrField grid={1/2} label="公司规模" name="propcode" style={{width:252,marginLeft:15}} component="input" requireLabel={true}/>
								<KrField grid={1/2} label="融资金额" name="propcode" style={{width:252,marginLeft:15}} component="input" requireLabel={false}/>
								<KrField grid={1/2} name="enableflag" component="group" label="是否启用" style={{width:252,marginLeft:15}} requireLabel={true}>
		              	<KrField name="enableflag" label="是" type="radio" value="ENABLE" checked={true}/>
		             		<KrField name="enableflag" label="否" type="radio" value="DISENABLE" />
		            </KrField>
								<KrField grid={1/2} label="项目名称" name="propcode" style={{width:252,marginLeft:15}} component="input" requireLabel={true}/>
								<KrField grid={1/2} label="所属地区" name="proptype" component="select" style={{width:252,marginLeft:15}} options={[
										 {value:'PAYMENT',label:'回款'},
										 {value:'INCOME',label:'收入'},]}
										 requireLabel={true}
								/>
								<KrField grid={1/2} label="项目类型" name="proptype" component="select" style={{width:252,marginLeft:15}} options={[
										 {value:'PAYMENT',label:'回款'},
										 {value:'INCOME',label:'收入'},]}
										 requireLabel={true}
								/>
								<KrField grid={1/2} label="详细地址" name="propcode" style={{width:252,marginLeft:15}} component="input" requireLabel={true}/>
								<KrField grid={1/2} label="公司地址" name="propcode" style={{width:252,marginLeft:15}} component="input" requireLabel={true}/>
								<KrField grid={1/2} label="公司简介" name="propcode" style={{width:520,marginLeft:15}} heightStyle={{height:"80px"}}  component="textarea"  maxSize={100} requireLabel={true} />
								<KrField grid={1/2} label="备注" name="propcode" style={{width:520,marginLeft:15,marginTop:-15}} heightStyle={{height:"80px"}}  component="textarea"  maxSize={100} requireLabel={false} />
								<div className="middle-round"></div>
						</div>
						<div className="titleBar"><span className="order-number">3</span><span className="wire"></span><label className="small-title">拜访记录</label></div>
						<div className="small-cheek">
								<KrField grid={1/2} label="拜访方式" name="proptype" component="select" style={{width:252,marginLeft:15}} options={[
										 {value:'PAYMENT',label:'回款'},
										 {value:'INCOME',label:'收入'},]}
										 requireLabel={false}
								/>
								<KrField grid={1/2} label="联系方式" name="propcode" style={{width:252,marginLeft:15}} component="input" requireLabel={true}/>
								<KrField grid={1/2} label="拜访时间" name="receiveDate" style={{width:252,marginLeft:15}} component="date"    requireLabel={true}/>
								<KrField grid={1/2} label="客户类型" name="proptype" component="select" style={{width:252,marginLeft:15}} options={[
										 {value:'PAYMENT',label:'回款'},
										 {value:'INCOME',label:'收入'},]}
										 requireLabel={true}
								/>
								<KrField grid={1/2} label="联系人" name="propcode" style={{width:252,marginLeft:15}} component="input" requireLabel={true}/>


								<KrField grid={1/2} label="是否跟进" name="enableflag" component="group"  style={{width:252,marginLeft:15}} requireLabel={true}>
										<KrField name="enableflag" label="是" type="radio" value="ENABLE" checked={true}/>
										<KrField name="enableflag" label="否" type="radio" value="DISENABLE" />
								</KrField>
								<KrField grid={1/2} label="备注" name="propcode" style={{width:520,marginLeft:15}} heightStyle={{height:"80px"}}  component="textarea"  maxSize={100} requireLabel={false} />
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

		const errors = {}

		if(!values.propcode){
			errors.propcode = '请填写属性编码';
		}

		if (!values.propname) {
			errors.propname = '请填写属性名称';
		}

		if (!values.proptype) {
			errors.proptype = '请填写属性类别';
		}

		if (!values.ordernum) {
			errors.ordernum = '请填写排序号';
		}



		return errors
	}
export default reduxForm({ form: 'NewMerchants',validate, enableReinitialize:true,keepDirtyOnReinitialize:true})(NewMerchants);
