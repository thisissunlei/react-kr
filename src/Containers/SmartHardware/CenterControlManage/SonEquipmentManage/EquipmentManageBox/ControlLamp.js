
import React, {PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import State from './State';
import {ShallowEqual} from 'kr/Utils';

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
class ControlLampForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			detail:{}
		}
	}

	componentDidMount(){
		let {detail} = this.props;
		this.setState({
			detail : detail
		})		
	}



	closeDialog=()=>{
		State.controlLampDialog= false;
	}
	
	// 编辑设备定义
	onSubmit=(values)=>{
		console.log("values",values);
		
	}
	render(){
		
		const { error, handleSubmit, reset ,detail} = this.props;
		console.log("detail",detail);

		return(
			<div style={{paddingTop:20}}>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					
					<div>
						<div style={{textAlign:"center"}}>
							<span>当前灯开关状态状态：</span>
							<span>当前灯开关状态状态</span>
						</div>
						<div className="btn-div">

							<div style={{display:"inline-block",marginRight:20}}><Button label="远程开灯" onTouchTap={this.productQRCode}/></div>
							<div style={{display:"inline-block"}}><Button label="远程关灯" onTouchTap={this.closeDialog}/></div>

						</div>
						
				  	</div>
					
					
				</form>
			</div>
		);
	}
}
const validate = values=>{
	const errors={};
	// if(!values.communityId){
	// 	errors.communityId = '社区名称为必填项';
	// }
	
	return errors;
}
export default ControlLampForm = reduxForm({
	form: 'ControlLampForm',
	validate,
})(ControlLampForm);
