


import React, {PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import State from './State';
import "./index.less";

import {
	KrField,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Button,
	Notify,
	Message,
	err
} from 'kr-ui';
class EditSerialNo extends React.Component{
	constructor(props,context){
		super(props,context);
		this.state={
			detail : {}
		}
	}
	

	componentDidMount(){
		this.setState({
			detail : this.props.detail
		})
	}


	onCancel=()=>{
		const {onCancel}=this.props;
		onCancel && onCancel();
	}
  	
	
	onSubmit=(values)=>{

		let {detail} = this.state;
		let _this =this;
		Http.request('editCenterControlSerialNo',{},{id:detail.id,serialNo :values.serialNo }).then(function(response) {
			_this.onCancel();
			State.freshPageReturn();
			Message.success("编辑成功");
			
		}).catch(function(err) {
			Message.error(err.message);
		});
		
	}

	render(){
		let {detail} = this.state;
		const { error, handleSubmit, reset} = this.props;
		return(
			<div className="eidt-serial-form">
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<KrField
						style={{width:400}}
						inline={true}
						component="labelText"
						label="原序列号："
						value={detail.serialNo}
					/>
					<KrField 
						name="serialNo" 
						type="text" 
						label="新的序列号：" 
						requireLabel={true} 
						inline={true}
						style={{width:600}}
					/>
					<div style={{color: "#fb6161",margin:"10px 0"}}>注意：修改序列号会引起设备断开连接，慎重操作。</div>

					<Grid>
						<Row style={{marginTop:15,textAlign:'center',marginLeft:'-40px'}}>
							<ListGroup >
								<ListGroupItem style={{padding:0,display:'inline-block',marginRight:30}}>
									<Button  label="提交" type="submit"/>
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
	if(!values.serialNo){
		errors.serialNo = '请填写序列号';
	}

	return errors;
}
export default EditSerialNo = reduxForm({
	form: 'EditSerialNo',
	validate,
})(EditSerialNo);
