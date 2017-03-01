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
import StateIn from './State';
import merchants from "../Merchants/State";
import personal from "../Personal/State";
import signedClient from "../SignedClient/State";
import flushData from "../LookCustomerList/State";


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
		  let {listId,operType}=this.props;
		 var _this=this;
	       Store.dispatch(Actions.callAPI('customerVisitRecord',{},values)).then(function(response) {	       	
				flushData.lookListId(listId,operType);
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
	        merchants.openDialog=false;
		    personal.openPersonDialog=false;
		    signedClient.openPersonDialog=false;			
		    _this.onCancel();
		    
		  }).catch(function(err) {
		 	Message.error(err.message);
		 });
	}

	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}
    
	hasSelectClick = (params) =>{
		if(params.value=="NO"){
			Store.dispatch(change('NewVisitIndent','reasonId',''));
			StateIn.showMatureTime();
		}else if(params.value=="YES"){
			StateIn.noShowMatureTime();
            StateIn.noShowOtherContinue();
		}
	}

	otherContinue=(value)=>{
		if(value){
		    if(value.label=='其他'){	
			  StateIn.showOtherContinue();	
			}else{
			  StateIn.noShowOtherContinue();
			}	
		}else{
			  StateIn.noShowOtherContinue();
		}
		
	}

	componentDidMount(){
	  StateIn.noShowMatureTime();
      StateIn.noShowOtherContinue();
	}
	

	renderContinue=()=>{
		let {selectDatas}=this.props;
		var content='';
		if(StateIn.matureTime){
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
		if(StateIn.otherContinue){
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
						<div><span className="new-icon"></span><label className="title-text" style={{marginLeft:7}}>{this.props.companyName}</label></div>
						<div className="close" onClick={this.onCancel}></div>
				</div>
				
				<div className="kk" style={{marginTop:27,marginLeft:40}}>	
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
		              	<KrField  name="isContinue" label="是"  value="YES" component="radio"  type="radio" onClick={this.hasSelectClick}/>
		             	<KrField  name="isContinue" label="否"  value="NO" component="radio" type="radio" onClick={this.hasSelectClick}/>
		            </KrField>
		            {this.renderContinue()}
					{this.renderOtherContinue()}
					<div className='speakInfo'><KrField grid={1} label="沟通情况" name="visitDetail" style={{marginLeft:-6,marginTop:3}} heightStyle={{height:"80px",width:'543px'}}  component="textarea"  maxSize={100} requireLabel={true} placeholder='请输入沟通情况' lengthClass='order-textarea'/></div>
					<KrField grid={1} label="备注" name="remark" style={{marginLeft:-6,marginTop:-17}} heightStyle={{height:"80px",width:'543px'}}  component="textarea"  maxSize={100} placeholder='请输入描述' lengthClass='visit-length-textarea'/>
				</div>		
				<Grid style={{marginRight:30}}>
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
		}else if(values.reasonOther.length>50){
			errors.reasonOther = '其他原因最多填写50个字';
		}


		if (!values.visitDetail) {
			errors.visitDetail = '请填写沟通情况';
		}

		
		return errors
	}
export default reduxForm({ form: 'NewVisitIndent',validate})(NewVisitIndent);
