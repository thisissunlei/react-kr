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
import './index.less'
@observer
 class NewVisitIndent extends Component{

		

	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}

	constructor(props){
		super(props);
	}


    
	onSubmit = (values) => {
		 console.log('66gggg',values);
		 var _this=this;
	     Store.dispatch(Actions.callAPI('customerVisitRecord',{},{values})).then(function(response) {
		   _this.onCancel();
		 }).catch(function(err) {
		 	console.log('kkknnnnn666',err);
		 	Message.error(err.message);
		 });
	}

	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

	hasSelectClick = (params) =>{
		if(params.value=="YES"){
			Store.dispatch(change('NewVisitIndent','reasonId',''));
			State.showMatureTime();
		}else if(params.value=="NO"){
			State.noShowMatureTime();
            State.noShowOtherContinue();
		}
	}

	otherContinue=(value)=>{
		if(value){
		    if(value.label=='qwerrtt'){	
			  State.showOtherContinue();	
			}else{
			  State.noShowOtherContinue();
			}	
		}else{
			  State.noShowOtherContinue();
		}
		
	}
	

	renderContinue=()=>{
		let {selectDatas}=this.props;
		var content='';
		if(State.matureTime){
			content=(<KrField grid={1/2} label="放弃原因" name="reasonId" style={{width:261,marginLeft:-6}} component="select" 
							options={selectDatas.giveupList}
							requireLabel={true}
							onChange={this.otherContinue}
					/>)
		}
		return content
	}

	renderOtherContinue=()=>{
		var content='';
		if(State.otherContinue){
			content=(<KrField grid={1/2} label="其他原因" name="reasonOther" style={{width:261,marginLeft:29}} component="input" 
							requireLabel={true}
					/>)
		}
		return content
	}


	render(){

		const { error, handleSubmit, pristine, reset,selectDatas} = this.props;

		

		return (

			<form className="m-newVisitIndent" onSubmit={handleSubmit(this.onSubmit)}>
				<div className="title">
						<div><span className="new-icon"></span><label className="title-text">{this.props.companyName}</label></div>
						<div className="close" onClick={this.onCancel}></div>
				</div>
				
				<div className="kk" style={{marginTop:27}}>	
				    <KrField name="customerId" type='hidden'/> 	
					<KrField grid={1/2} label="拜访方式" name="visitType" style={{width:261,marginLeft:-6}} component="select" 
							options={selectDatas.visitTypeList}
							requireLabel={true}
					/>
					
					<KrField grid={1/2} label="拜访时间" name="visitTime" style={{width:260,marginLeft:29}} component="date" requireLabel={true}/>
					
					<KrField grid={1/2} label="联系人" name="linkName" style={{width:261,marginLeft:-6}} component="input" requireLabel={true}/>

					<KrField grid={1/2} label="客户分类" name="levelId" component="select" style={{width:261,marginLeft:29}} 
							options={selectDatas.levelList}
							requireLabel={true}
					/>
					<KrField grid={1/2} label="联系方式" name="linkTel" style={{width:261,marginLeft:-6}} component="input" requireLabel={true}/>
					<KrField grid={1/2} label="是否继续跟进" name="isContinue" style={{width:261,marginLeft:29}} component="group" requireLabel={true}>
		              	<KrField  name="isContinue" label="是" type="radio" value="YES" onClick={this.hasSelectClick}/>
		             	<KrField  name="isContinue" label="否" type="radio" value="NO" onClick={this.hasSelectClick}/>
		            </KrField>
		            {this.renderContinue()}
					{this.renderOtherContinue()}
					<div className='speakInfo'><KrField grid={1} label="沟通情况" name="visitDetail" style={{marginLeft:-6,marginTop:3}} heightStyle={{height:"80px",width:'543px'}}  component="textarea"  maxSize={100} requireLabel={true} placeholder='请输入订单描述' lengthClass='visit-length-textarea'/></div>
					<KrField grid={1} label="备注" name="remark" style={{marginLeft:-6,marginTop:-17}} heightStyle={{height:"80px",width:'543px'}}  component="textarea"  maxSize={100} placeholder='请输入订单描述' lengthClass='visit-length-textarea'/>
				</div>		
				<Grid>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div  className='ui-btn-center'><Button  label="确定" type="submit" /></div>
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
		//let email = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
		if(!values.visitType){
			errors.visitType = '请填写拜访方式';
		}
		if (!values.visitTime) {
			errors.visitTime = '请填写拜访时间';
		}

		if (!values.linkName) {
			errors.linkName = '请填写联系人姓名';
		}

		if (!values.levelId) {
			errors.levelId = '请填写客户分类';
		}

		if (!values.linkTel) {
			errors.linkTel = '请填写联系人电话';
		}else if(!phone.test(values.linkTel)){
			errors.linkTel = '联系人电话格式错误';
		}

		
		if (!values.reasonId) {
			errors.reasonId = '请填写放弃原因';
		}

		if (!values.reasonOther) {
			errors.reasonOther = '请填写其他原因';
		}

		if (!values.visitDetail) {
			errors.visitDetail = '请填写沟通情况';
		}

		
		return errors
	}
export default reduxForm({ form: 'NewVisitIndent',validate})(NewVisitIndent);
