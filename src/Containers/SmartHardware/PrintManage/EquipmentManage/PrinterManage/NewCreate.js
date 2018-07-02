
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
			selfReader : ''
			
		}
	}

	componentDidMount(){
		this.getSelfReaderId();
	}

	
	onCancel=()=>{
		const {onCancel}=this.props;
		onCancel && onCancel();
	}

	getSelfReaderId =()=>{
		
		let _this =this;
		Http.request('getSelfReaderSerialNo',{}).then(function(response) {
			
			_this.setState({
				selfReader : response.serialNo
			});

		}).catch(function(err) {
			Message.error(err.message);
		});
	}

	

	// 新增打印机
	onSubmit=(values)=>{
		let _this = this;
		let {selfReader}= this.state;
		var NewObj = Object.assign({},values,{selfReader:selfReader});
	 	State.newCreatePrinter(NewObj);
		
	}
	render(){
		
		const { error, handleSubmit, reset} = this.props;
		let {selfReader} = this.state;
		return(
			<div style={{padding:'5px 0 0 45px'}}>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<KrField
						style={{width:"100%",marginBottom:15}}
						name="selfReader"
						inline={true}
						component="labelText"
						label="自研读卡器序列号："
						value={selfReader}
					/>
					<KrField grid={1/2} name="printerName" 
						type="text" 
						label="打印机名称" 
						requireLabel={true} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
					/>
					<KrField grid={1/2} name="alias" 
						type="text" 
						label="打印机别名" 
						requireLabel={true} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
					/>
					<KrField name="communityId" 
						component="searchCommunityAll" 
						label="所在社区"  
						requireLabel={true} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
						inline={false}
					/>
					<KrField grid={1/2} name="location" 
						type="text" 
						label="打印机位置" 
						requireLabel={true} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
					/>
					
					<KrField grid={1/2} name="readerName" 
						type="text" 
						label="读卡器名称" 
						requireLabel={true} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
					/>
					<KrField grid={1/2} name="serialNo" 
						type="text" 
						label="序列号" 
						requireLabel={true} 
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
	if(!values.alias){
		errors.alias = '打印机别名必填';
	}
	if(values.alias && values.alias.length>20){
		errors.alias = '打印机别名不能超过20个字符';
	}
	if(!values.location ){
		errors.location = '打印机位置必填';
	}
	if(values.location && values.location.length>20){
		errors.location = '打印机位置不能超过20个字符';
	}
	if(!values.printerName){

		errors.printerName = '打印机名称必填';
	}
	if(values.printerName && values.printerName.length>20){
		errors.printerName = '打印机名称不能超过20个字符';
	}
	if(!values.readerName){

		errors.readerName = '读卡器名称必填';
	}
	if(values.readerName  && values.readerName.length>20){

		errors.readerName = '读卡器名称不能超过20个字符';
	}
	if(!values.serialNo){
		errors.serialNo = '序列号必填';
	}
	if(values.serialNo && values.serialNo.length>20){
		errors.serialNo = '序列号不能超过20个字符';
	}
	
	return errors;
}
export default NewCreateDefinitionForm = reduxForm({
	form: 'NewCreateDefinitionForm',
	validate,
})(NewCreateDefinitionForm);
