
import React, {PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import State from './State';

import {
	KrField,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Button,
	Message,
	err
} from 'kr-ui';
class NewCreateDefinitionForm extends React.Component{
	constructor(props,context){
		super(props,context);
		this.state={
			
			
		}
	}

	
	onCancel=()=>{
		const {onCancel}=this.props;
		onCancel && onCancel();
	}

  	
	

	// 新增打印机配置
	onSubmit=(values)=>{
		let _this = this;


		
	 	State.newCreatePrinterConfig(values);

		
		
	}
	render(){
		
		const { error, handleSubmit, reset} = this.props;


		return(
			<div style={{padding:'20px 0 0 55px'}}>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<KrField name="communityId" 
						component="searchCommunityAll" 
						onChange = {this.onChangeSearchCommunity}
						label="社区名称"  
						requireLabel={true} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
						inline={false}
					/>
					<KrField name="priceId" 
						component="select" 
						label="打印价格策略" 
						options = {State.priceListOptions}
						requireLabel={true} 
						style={{width:'252px'}}
						onChange = {this.getFloor}
					/>
					<div style={{position:"relative"}}>
						<span style={{position:"absolute",left:65,top:"-2px",color:"rgba(255, 165, 0, 0.92)"}}>（多个节点请用英文逗号分隔）</span>
						<KrField grid={1/1} name="nodeIp" 
							type="text" 
							label="节点域名" 
							requireLabel={true} 
							requiredValue={true} 
							errors={{requiredValue:'智能硬件ID为必填项'}} 
							style={{width:536}}
							onBlur = {this.hardwareIdHasFun}
						/>
					</div>
					
					<Grid>
						<Row style={{textAlign:'center',marginLeft:'-40px',marginTop:20}}>
							<ListGroup >
								<ListGroupItem style={{padding:0,display:'inline-block',marginRight:30}}>
									<Button  label="确定" type="submit"/>
								</ListGroupItem>
								<ListGroupItem style={{padding:0,display:'inline-block',marginRight:3}}>
									<Button  label="取消" type="button"  cancle={true} onTouchTap={this.onCancel} />
								</ListGroupItem>
							</ListGroup>					
						</Row>
					</Grid>
				</form>
			</div>
		);
	}
}
const validate = values=>{
	const errors={};
	if(!values.communityId){
		errors.communityId = '社区名称为必填项';
	}
	if(!values.priceId){
		errors.priceId = '价格策略为必填项';
	}
	if(!values.nodeIp){
		errors.nodeIp = '节点域名为必填项';
	}
	if(values.nodeIp && values.nodeIp.length>250){
		errors.nodeIp = '节点域名最长250个字符';
	}
	
	return errors;
}
export default NewCreateDefinitionForm = reduxForm({
	form: 'NewCreateDefinitionForm',
	validate,
})(NewCreateDefinitionForm);
