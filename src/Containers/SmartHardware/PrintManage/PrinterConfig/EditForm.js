
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
class EditForm extends React.Component{
	constructor(props,context){
		super(props,context);
		this.detail = this.props.detail;
		this.state={
			
			
		}
	}

	componentDidMount(){
		Store.dispatch(initialize('EditForm', this.detail));
	}

	
	onCancel=()=>{
		const {closeEditEquipment}=this.props;
		closeEditEquipment && closeEditEquipment();
	}

  	
	

	// 编辑打印配置
	onSubmit=(values)=>{
			
		let _this = this;

		var postParam = {id:_this.detail.id,
						communityId : values.communityId,
						nodeIp : values.nodeIp,
						priceId : values.priceId,


			}
		
	 	State.editPrinterConfig(postParam);

		
		
	}
	render(){
		
		const { error, handleSubmit, reset} = this.props;
		console.log("State.priceListOptions",State.priceListOptions);
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
					/>
					
					<KrField grid={1/2} name="nodeIp" 
						type="text" 
						label="节点IP" 
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'智能硬件ID为必填项'}} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
					/>
					
					
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
		errors.nodeIp = '节点IP为必填项';
	}
	if(values.nodeIp && values.nodeIp.length>20){
		errors.nodeIp = '节点IP最长20个字符';
	}
	
	
	return errors;
}
export default EditForm = reduxForm({
	form: 'EditForm',
	validate,
})(EditForm);
